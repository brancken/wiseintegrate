// Sets up (or updates) the How to Make a Website products, prices, the 20% thank-you coupon and the payment links
// in whichever Stripe account the key in .env.local belongs to, then writes src/config/stripe.json for the site.
//
//   node --env-file=.env.local scripts/stripe-setup.mjs http://localhost:3077        (test key: for testing on this computer)
//   node --env-file=.env.local scripts/stripe-setup.mjs https://www.wiseintegrate.com (live key: at launch, with Dr. Brancken's yes)
//
// Safe to run again: it finds what already exists (by lookup key / metadata) and only fixes what differs.
// After paying, Stripe sends the buyer to <site>/purchase/complete?session_id=..., their personal course page.
import fs from "node:fs";

const KEY = process.env.STRIPE_SECRET_KEY;
const SITE = (process.argv[2] || "http://localhost:3077").replace(/\/$/, "");
if (!KEY || !/^(sk|rk)_(test|live)_/.test(KEY)) {
  console.error("Put STRIPE_SECRET_KEY=sk_test_... (or sk_live_...) in .env.local first.");
  process.exit(1);
}
const MODE = KEY.includes("_live_") ? "live" : "test";
if (MODE === "live" && SITE.startsWith("http://")) {
  console.error("A live key must send buyers to the real https address.");
  process.exit(1);
}

async function api(path, method = "GET", body) {
  const r = await fetch("https://api.stripe.com/v1" + path, {
    method,
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: body ? new URLSearchParams(body).toString() : undefined,
  });
  const data = await r.json();
  if (!r.ok) throw new Error(`${method} ${path}: ${data.error?.message || r.status}`);
  return data;
}

const PRODUCTS = [
  { id: "htmaw-course-1", name: "How to Make a Website: Course 1, Your Office on Google", amount: 9700, desc: "Start Here + Course 1 (forms, follow-ups, group emails and a team dashboard on Google) + its Claude guide. Digital download." },
  { id: "htmaw-course-2", name: "How to Make a Website: Course 2, Build Your Website", amount: 9700, desc: "Start Here + Course 2 (your own address, your design, your app) + its Claude guide. Digital download." },
  { id: "htmaw-course-3", name: "How to Make a Website: Course 3, Grow and Connect", amount: 9700, desc: "Start Here + Course 3 (Google, AI search, maps, podcasts and notifications) + its Claude guide. Digital download." },
  { id: "htmaw-package", name: "How to Make a Website: the complete package", amount: 19700, desc: "Start Here + all three courses + the complete book + all three Claude guides. Launch price. Digital download." },
];

const account = await api("/account");
console.log(`Stripe ${MODE} account ${account.id} (${account.settings?.dashboard?.display_name || account.business_profile?.name || ""}); buyers go to ${SITE}`);

// 20% thank-you coupon, used once per code
const coupons = await api("/coupons?limit=100");
let coupon = coupons.data.find((c) => c.metadata?.wi_id === "thank-you-20");
if (!coupon) coupon = await api("/coupons", "POST", { percent_off: "20", duration: "once", name: "Thank you: 20% off", "metadata[wi_id]": "thank-you-20" });

const links = await api("/payment_links?limit=100&active=true");
const out = { _note: "Written by scripts/stripe-setup.mjs (do not edit by hand). Payment links and price IDs are not secret. mode: test or live.", mode: MODE, account: account.id, coupon: coupon.id, products: {} };

for (const p of PRODUCTS) {
  const lookup = `${p.id}-usd-${p.amount}`;
  let price = (await api(`/prices?limit=1&active=true&lookup_keys[]=${lookup}`)).data[0];
  if (!price) {
    const found = await api(`/products/search?query=${encodeURIComponent(`metadata['wi_id']:'${p.id}'`)}`).catch(() => ({ data: [] }));
    const product = found.data[0] || (await api("/products", "POST", { name: p.name, description: p.desc, "metadata[wi_id]": p.id }));
    price = await api("/prices", "POST", { product: product.id, currency: "usd", unit_amount: String(p.amount), lookup_key: lookup });
  }
  const redirect = `${SITE}/purchase/complete?session_id={CHECKOUT_SESSION_ID}`;
  let link = links.data.find((l) => l.metadata?.wi_id === p.id);
  const settings = {
    "after_completion[type]": "redirect",
    "after_completion[redirect][url]": redirect,
    allow_promotion_codes: "true",
  };
  if (!link) {
    link = await api("/payment_links", "POST", { "line_items[0][price]": price.id, "line_items[0][quantity]": "1", "metadata[wi_id]": p.id, ...settings });
  } else {
    link = await api(`/payment_links/${link.id}`, "POST", settings);
  }
  out.products[p.id] = { price: price.id, link: link.url };
  console.log(`  ${p.id}: ${price.id}  ${link.url}`);
}

fs.writeFileSync(new URL("../src/config/stripe.json", import.meta.url), JSON.stringify(out, null, 2) + "\n");

// The coupon ID is not secret: make sure .env.local has it so the thank-you codes work.
const envFile = new URL("../.env.local", import.meta.url);
const env = fs.existsSync(envFile) ? fs.readFileSync(envFile, "utf8") : "";
if (!/^STRIPE_THANKYOU_COUPON=/m.test(env)) fs.appendFileSync(envFile, `\nSTRIPE_THANKYOU_COUPON=${coupon.id}\n`);
console.log(`Done. src/config/stripe.json updated; thank-you coupon ${coupon.id}. Rebuild the site (npm run build) to use the new links.`);
