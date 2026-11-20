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

export const STRIPE_LIVE = false; // switch to true when the live Stripe links are in

export const courseProducts = [
  {
    id: "htmaw-course-1",
    name: "Course 1: Your Office on Google",
    short: "Forms, follow-ups, group emails and a team dashboard.",
    price: "US$97",
    image: "/images/courses/course-1.webp",
    imageSmall: "/images/courses/course-1-640.webp",
    buy: "https://buy.stripe.com/test_7sYcN5fpodZt6kD6W677O00",
  },
  {
    id: "htmaw-course-2",
    name: "Course 2: Build Your Website",
    short: "Your own address, your design, your app.",
    price: "US$97",
    image: "/images/courses/course-2.webp",
    imageSmall: "/images/courses/course-2-640.webp",
    buy: "https://buy.stripe.com/test_eVq14n1yy5sX7oH3JU77O01",
  },
  {
    id: "htmaw-course-3",
    name: "Course 3: Grow and Connect",
    short: "Google, AI search, maps, podcasts and notifications.",
    price: "US$97",
    image: "/images/courses/course-3.webp",
    imageSmall: "/images/courses/course-3-640.webp",
    buy: "https://buy.stripe.com/test_7sY3cvfpog7B8sLeoy77O02",
  },
  {
    id: "htmaw-package",
    name: "The complete package",
    short: "Launch price. All three courses, the complete book and all three Claude guides.",
    price: "US$197",
    was: "US$247",
    image: "/images/courses/package.webp",
    imageSmall: "/images/courses/package-640.webp",
    buy: "https://buy.stripe.com/test_eVqdR95OOg7BeR96W677O03",
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
    image: "/images/courses/package.webp",
    imageSmall: "/images/courses/package-640.webp",
    imageMid: "/images/courses/package-800.webp",
    status: "available",
    badge: "New course",
    audience: "Churches, businesses, organisations and individuals",
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
