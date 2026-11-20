import "server-only";

// Small Stripe helper using Stripe's web API directly (no extra package).
// Needs STRIPE_SECRET_KEY: on this computer in .env.local (sk_test_...), on the live host in its settings (sk_live_...).
// Dr. Brancken pastes keys himself; they never go in code or chat.

const API = "https://api.stripe.com/v1";

export const stripeReady = () => Boolean(process.env.STRIPE_SECRET_KEY);

export async function stripe<T = Record<string, unknown>>(path: string, method = "GET", body?: Record<string, string>) {
  const r = await fetch(API + path, {
    method,
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: body ? new URLSearchParams(body).toString() : undefined,
    cache: "no-store",
  });
  return { ok: r.ok, status: r.status, data: (await r.json()) as T };
}

export type PaidSession = {
  id: string;
  email: string;
  name: string;
  priceIds: string[];
  amountTotal: number;
  currency: string;
};

/** Returns the checkout session only if it is really paid (checked with Stripe), with the prices bought. */
export async function getPaidSession(sessionId: string): Promise<PaidSession | null> {
  if (!/^cs_(test|live)_[A-Za-z0-9]{10,}$/.test(sessionId) || !stripeReady()) return null;
  const s = await stripe<{
    id: string;
    payment_status: string;
    customer_details?: { email?: string; name?: string };
    amount_total: number;
    currency: string;
    line_items?: { data: { price: { id: string } }[] };
  }>(`/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=line_items`);
  if (!s.ok || s.data.payment_status !== "paid") return null;
  return {
    id: s.data.id,
    email: s.data.customer_details?.email ?? "",
    name: s.data.customer_details?.name ?? "",
    priceIds: s.data.line_items?.data.map((li) => li.price.id) ?? [],
    amountTotal: s.data.amount_total,
    currency: s.data.currency,
  };
}

const nice = (ts: number) => new Date(ts * 1000).toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" });

/**
 * The buyer's own single-use 20% thank-you code (valid 30 days). The same session always gets the same code.
 * Needs STRIPE_THANKYOU_COUPON (the coupon ID); returns null when it is not set up.
 */
export async function thankYouCode(sessionId: string): Promise<{ code: string; expires: string } | null> {
  const coupon = process.env.STRIPE_THANKYOU_COUPON;
  if (!coupon || !stripeReady()) return null;
  const code = "THANKS-" + sessionId.slice(-8).toUpperCase().replace(/[^A-Z0-9]/g, "X");
  const found = await stripe<{ data: { code: string; expires_at?: number }[] }>(`/promotion_codes?limit=1&code=${encodeURIComponent(code)}`);
  if (found.ok && found.data.data?.length) {
    const p = found.data.data[0];
    return { code: p.code, expires: p.expires_at ? nice(p.expires_at) : "" };
  }
  const expires = Math.floor(Date.now() / 1000) + 30 * 86400;
  const made = await stripe<{ code: string }>("/promotion_codes", "POST", {
    "promotion[type]": "coupon",
    "promotion[coupon]": coupon,
    code,
    max_redemptions: "1",
    expires_at: String(expires),
    "metadata[checkout_session]": sessionId,
  });
  return made.ok ? { code: made.data.code, expires: nice(expires) } : null;
}
