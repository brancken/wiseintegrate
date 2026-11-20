// Our digital products. Shown on the homepage and the shop.
// status: "available" = on sale (or about to be), "soon" = coming soon (no buy button).
// Prices and buy links come from WiseIntegrate-Shop/products.yaml and Stripe (live links replace the test ones before launch).

export type Product = {
  id: string;
  name: string;
  short: string;
  price: string;
  was?: string;
  href: string;
  image?: string;
  imageSmall?: string;
  imageMid?: string;
  status: "available" | "soon";
  badge?: string;
  audience: string;
};

import stripeConfig from "./stripe.json";

// Buy links and price IDs come from src/config/stripe.json (written by scripts/stripe-setup.mjs).
export const STRIPE_LIVE = stripeConfig.mode === "live";
const stripeFor = (id: keyof typeof stripeConfig.products) => stripeConfig.products[id];

// What each purchase unlocks: files in the private Supabase storage bucket "course-downloads"
// (uploaded by scripts/upload-downloads.mjs). "download" is the file name the buyer sees.
export const DOWNLOAD_BUCKET = "course-downloads";
export const downloads: Record<string, { title: string; start: string; files: { path: string; download: string; label: string }[] }> = {
  "htmaw-course-1": { title: "Course 1: Your Office on Google", start: "Start Course 1", files: [{ path: "htmaw-course-1.zip", download: "How to Make a Website - Course 1 - Your Office on Google.zip", label: "Course 1: Your Office on Google" }] },
  "htmaw-course-2": { title: "Course 2: Build Your Website", start: "Start Course 2", files: [{ path: "htmaw-course-2.zip", download: "How to Make a Website - Course 2 - Build Your Website.zip", label: "Course 2: Build Your Website" }] },
  "htmaw-course-3": { title: "Course 3: Grow and Connect", start: "Start Course 3", files: [{ path: "htmaw-course-3.zip", download: "How to Make a Website - Course 3 - Grow and Connect.zip", label: "Course 3: Grow and Connect" }] },
  "htmaw-package": { title: "The complete package", start: "Start Course 2", files: [{ path: "htmaw-package.zip", download: "How to Make a Website - The complete package.zip", label: "The complete package: all three courses and the complete book" }] },
};

/** Which product a Stripe price belongs to. */
export function productForPrice(priceId: string) {
  return (Object.keys(stripeConfig.products) as (keyof typeof stripeConfig.products)[]).find((k) => stripeConfig.products[k].price === priceId);
}

export const courseProducts = [
  {
    id: "htmaw-course-1",
    name: "Course 1: Your Office on Google",
    short: "Forms, follow-ups, group emails and a team dashboard.",
    price: "US$97",
    image: "/images/courses/course-1-blue.webp",
    imageSmall: "/images/courses/course-1-640-blue.webp",
    buy: stripeFor("htmaw-course-1").link,
  },
  {
    id: "htmaw-course-2",
    name: "Course 2: Build Your Website",
    short: "Your own address, your design, your app.",
    price: "US$97",
    image: "/images/courses/course-2-blue.webp",
    imageSmall: "/images/courses/course-2-640-blue.webp",
    buy: stripeFor("htmaw-course-2").link,
  },
  {
    id: "htmaw-course-3",
    name: "Course 3: Grow and Connect",
    short: "Google, AI search, maps, podcasts and notifications.",
    price: "US$97",
    image: "/images/courses/course-3-blue.webp",
    imageSmall: "/images/courses/course-3-640-blue.webp",
    buy: stripeFor("htmaw-course-3").link,
  },
  {
    id: "htmaw-package",
    name: "The complete package",
    short: "Launch price. All three courses, the complete book and all three Claude guides.",
    price: "US$197",
    was: "US$247",
    image: "/images/courses/package-blue.webp",
    imageSmall: "/images/courses/package-640-blue.webp",
    buy: stripeFor("htmaw-package").link,
    best: true,
  },
];

export const products: Product[] = [
  {
    id: "how-to-make-a-website",
    name: "How to Make a Website with Claude",
    short: "Build your own professional website, app and church office, with Claude doing most of the work. About three to four days of work.",
    price: "From US$97",
    href: "/shop/how-to-make-a-website",
    image: "/images/courses/package-blue.webp",
    imageSmall: "/images/courses/package-640-blue.webp",
    imageMid: "/images/courses/package-800-blue.webp",
    status: "available",
    badge: "New course",
    audience: "Churches, businesses, organisations and individuals",
  },
  {
    id: "church-policy-pack",
    name: "Church Policy Pack",
    short: "Ready-made church policies you can adapt to your church: child safety, children's ministry, AI use, privacy, social media, volunteers, money, health and safety, and more.",
    price: "Price to come",
    href: "/shop/church-policy-pack",
    image: "/images/products/policy-pack.webp",
    imageSmall: "/images/products/policy-pack-640.webp",
    imageMid: "/images/products/policy-pack-800.webp",
    status: "soon",
    badge: "Church resources",
    audience: "Pastors, church boards and administrators",
  },
  {
    id: "exegesis",
    name: "Exegesis skill for Claude",
    short: "A careful six-step method for studying a Bible passage, with approved sources and a proper bibliography.",
    price: "US$15",
    href: "/shop#coming-soon",
    status: "soon",
    audience: "Pastors and Bible teachers",
  },
  {
    id: "church-policy-governance",
    name: "Church policy and governance skill",
    short: "Help writing clear church policies and governance documents.",
    price: "US$15",
    href: "/shop#coming-soon",
    status: "soon",
    audience: "Church leaders and boards",
  },
  {
    id: "write-more-human",
    name: "Write more human",
    short: "Writing that sounds like a person, not a machine.",
    price: "US$15",
    href: "/shop#coming-soon",
    status: "soon",
    audience: "Anyone who writes with AI",
  },
  {
    id: "human-rewrite",
    name: "Human rewrite",
    short: "Rewrite AI-sounding text so it reads naturally.",
    price: "US$15",
    href: "/shop#coming-soon",
    status: "soon",
    audience: "Anyone who writes with AI",
  },
];
