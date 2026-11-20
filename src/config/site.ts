// All facts about Wise Integrate in one place. Pages read from here; never type these facts into a page.
export const site = {
  name: "WiseIntegrate",
  appName: "WiseIntegrate",
  url: "https://www.wiseintegrate.com", // the live address (wiseintegrate.com redirects here)
  locale: "en_NZ",
  tagline: "AI should serve your mission. Not replace it.",
  description:
    "Digital products and AI solutions for churches, businesses, organisations and individuals: practical courses and tools, plus AI strategy, training and integration done wisely.",
  email: "hello@wiseintegrate.com", // general enquiries (as on the old site)
  supportEmail: "office@wiseintegrate.com", // course buyers and Stripe receipts
  location: "Auckland, New Zealand",
  facebook: "https://www.facebook.com/wiseintegrate",
  // Add each profile here once it exists; it then appears in the footer and in the data for Google and AI assistants.
  socials: [
    { name: "Facebook", url: "https://www.facebook.com/wiseintegrate" },
    // { name: "LinkedIn", url: "https://www.linkedin.com/company/wiseintegrate" },
    // { name: "YouTube", url: "https://www.youtube.com/@wiseintegrate" },
    // { name: "Instagram", url: "https://www.instagram.com/wiseintegrate" },
  ] as { name: string; url: string }[],
  founder: {
    name: "Dr. Abri Brancken",
    photo: "/images/abri-brancken.webp",
  },
  keywords: [
    "AI integration",
    "AI for churches",
    "AI for business",
    "AI readiness assessment",
    "AI training",
    "AI policy and governance",
    "how to make a website with Claude",
    "church website course",
    "Claude AI course",
    "New Zealand AI consultancy",
  ],
} as const;

export type NavItem = { label: string; href: string; icon?: string };

export const mainNav: NavItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Churches", href: "/churches" },
  { label: "Business", href: "/business" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// The bottom bar in the phone app (five places).
export const tabNav: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Shop", href: "/shop", icon: "bag" },
  { label: "Churches", href: "/churches", icon: "church" },
  { label: "Business", href: "/business", icon: "briefcase" },
  { label: "Menu", href: "/more", icon: "menu" },
];

export const footerLinks: { title: string; links: NavItem[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "How to Make a Website", href: "/shop/how-to-make-a-website" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Churches and non-profits", href: "/churches" },
      { label: "Businesses and organisations", href: "/business" },
      { label: "All services", href: "/services" },
      { label: "Free AI Readiness Assessment", href: "/assessment" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];
