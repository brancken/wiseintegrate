import fs from "node:fs";
import path from "node:path";
import { faqs } from "@/config/faqs";
import { courseFaqs } from "@/config/course-faqs";
import { products, courseProducts } from "@/config/products";
import { policies } from "@/config/policies";
import { promises, processSteps } from "@/config/services";
import { site } from "@/config/site";
import { getPosts } from "@/lib/blog";

/**
 * Data for "Ask WiseIntegrate", the question helper (src/components/AskWise.tsx), made like Shiloh's "Ask Shiloh".
 * Everything is the website's own wording: FAQ answers, products, services, policies, blog posts and page text,
 * cut into short passages. The visitor's browser searches it: no AI service, no key, no cost, nothing is sent anywhere.
 * Rebuilt with each deploy, so new pages and answers are included automatically.
 */
type Entry = { kind: "faq" | "page" | "post"; title: string; url: string; q?: string; text: string };

function passages(plain: string, max = 420) {
  const sentences = plain.replace(/\s+/g, " ").split(/(?<=[.!?])\s+(?=[A-Z0-9"(])/);
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if ((cur + " " + s).length > max && cur) { out.push(cur.trim()); cur = s; }
    else cur = cur ? `${cur} ${s}` : s;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter((p) => p.length > 40);
}

const mdPlain = (md: string) =>
  md.replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[#*_>`|]/g, " ").replace(/\s+/g, " ").trim();

/** The readable sentences written in a page file (text between tags and longer quoted strings). */
function pageText(file: string) {
  const src = fs.readFileSync(file, "utf8").replace(/^import .*$/gm, "").replace(/export const metadata[\s\S]*?\n};/, "");
  const bits: string[] = [];
  for (const m of src.matchAll(/>([^<>{}]{25,})</g)) bits.push(m[1]);
  for (const m of src.matchAll(/"([^"\n]{40,})"/g)) if (!/^(https?:|\/|[a-z-]+\s[a-z-]+:)/.test(m[1]) && !m[1].includes("className")) bits.push(m[1]);
  return bits.join(". ").replace(/&rsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&amp;/g, "&").replace(/\.\s*\./g, ".").replace(/\s+/g, " ");
}

const PAGES: { file: string; title: string; url: string }[] = [
  { file: "page.tsx", title: "Home", url: "/" },
  { file: "churches/page.tsx", title: "Churches and non-profits", url: "/churches" },
  { file: "business/page.tsx", title: "Businesses and organisations", url: "/business" },
  { file: "services/page.tsx", title: "Our services", url: "/services" },
  { file: "about/page.tsx", title: "About WiseIntegrate", url: "/about" },
  { file: "contact/page.tsx", title: "Contact us", url: "/contact" },
  { file: "church-management-system/page.tsx", title: "Free church management system", url: "/church-management-system" },
  { file: "shop/how-to-make-a-website/page.tsx", title: "How to Make a Website with Claude", url: "/shop/how-to-make-a-website" },
  { file: "shop/church-policy-pack/page.tsx", title: "Church Policy Pack", url: "/shop/church-policy-pack" },
  { file: "app/page.tsx", title: "Get the app", url: "/app" },
  { file: "privacy/page.tsx", title: "Privacy Policy", url: "/privacy" },
];

export async function GET() {
  const e: Entry[] = [];
  for (const f of faqs) e.push({ kind: "faq", title: f.link?.label ?? "Frequently asked questions", url: f.link?.href ?? "/faq", q: f.q, text: f.a.join(" ") });
  for (const f of courseFaqs) e.push({ kind: "faq", title: "How to Make a Website with Claude", url: "/shop/how-to-make-a-website#faq", q: f.q, text: f.a });
  for (const p of products) e.push({ kind: "faq", title: p.name, url: p.href.split("#")[0], q: `${p.name} price what is`, text: `${p.name}: ${p.short} Price: ${p.price}.${p.status === "soon" ? " Coming soon." : ""} For: ${p.audience}.` });
  e.push({ kind: "faq", title: "Prices", url: "/shop/how-to-make-a-website#prices", q: "How much does the course cost? price cost buy", text: `Course prices: ${courseProducts.map((c) => `${c.name} ${c.price}`).join("; ")}. Prices in US dollars. Every buyer gets their own code for 20% off their next purchase.` });
  e.push({ kind: "faq", title: "Church Policy Pack", url: "/shop/church-policy-pack#inside", q: "Which church policies are in the pack?", text: `The Church Policy Pack (coming soon) includes: ${policies.map((p) => p.t).join("; ")}. Each is ready to adapt to your church.` });
  for (const p of policies) e.push({ kind: "page", title: "Church Policy Pack", url: "/shop/church-policy-pack#inside", text: `${p.t}: ${p.d}` });
  e.push({ kind: "faq", title: "How we work", url: "/services", q: "How do you work? principles approach", text: `Our foundation: ${promises.join(". ")}.` });
  e.push({ kind: "faq", title: "The process", url: "/services#process", q: "What is the process? steps how does it work", text: processSteps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join(" ") });
  e.push({ kind: "faq", title: "Contact us", url: "/contact", q: "How do I contact you? email phone help support", text: `General enquiries: ${site.email}. Course help and purchases: ${site.supportEmail}. We are based in ${site.location} and work with organisations everywhere, online.` });
  e.push({ kind: "faq", title: "Businesses and organisations", url: "/business", q: "How can you help my business with AI? company small business organisation", text: "For leaders who want AI that actually works. We map your workflows, select the right tools, build your policy framework and train your team, so AI actually delivers results in your organisation. We work with individuals, small businesses and organisations. Start with the free AI Readiness Assessment." });
  e.push({ kind: "faq", title: "Churches and non-profits", url: "/churches", q: "How can you help my church with AI? ministry non-profit charity", text: "For churches and non-profits ready to engage AI wisely: from pastoral buy-in to full implementation, with a theological framework, clear boundaries, and training your staff can trust." });
  e.push({ kind: "faq", title: "About WiseIntegrate", url: "/about", q: "Who is behind WiseIntegrate? who runs it founder owner", text: "WiseIntegrate was founded by Dr. Abri Brancken, a senior pastor with 33 years in full-time ministry. He has planted several churches, served in churches of up to 17,000 members and ministered in more than 30 countries." });
  e.push({ kind: "faq", title: "Contact us", url: "/contact", q: "Can I get a refund? money back return purchase problem", text: `Questions about a purchase, including refunds: email ${site.supportEmail} and we will help you. Your rights under New Zealand consumer law are always kept.` });
  e.push({ kind: "faq", title: "Free AI Readiness Assessment", url: "/assessment", q: "How do I start the free assessment? readiness test", text: "The free AI Readiness Assessment has 45 questions across eight dimensions and takes about 15 to 20 minutes. You receive a snapshot of your organisation's AI readiness, and we receive the full priority report. Free, no obligation, no sales pitch." });
  for (const pg of PAGES) {
    const file = path.join(process.cwd(), "src", "app", pg.file);
    if (!fs.existsSync(file)) continue;
    for (const text of passages(pageText(file))) e.push({ kind: "page", title: pg.title, url: pg.url, text });
  }
  for (const p of getPosts()) for (const text of passages(mdPlain(p.body)).slice(0, 8)) e.push({ kind: "post", title: p.title, url: `/blog/${p.slug}`, text });
  return Response.json(e);
}
