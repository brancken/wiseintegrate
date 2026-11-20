import { site } from "@/config/site";

/** True only on the real live site, so Vercel preview copies never appear in Google. */
// "Production" = the live build on Cloudflare (SITE_ENV, set by scripts/cloudflare.mjs), Netlify (CONTEXT) or Vercel (VERCEL_ENV).
// Previews and this computer are not. It keeps sales off and Google listing on, so the live build must always set it.
export const isProduction =
  process.env.SITE_ENV === "production" || process.env.CONTEXT === "production" || process.env.VERCEL_ENV === "production";
export const allowIndexing = isProduction || process.env.ALLOW_INDEXING === "1";

export const abs = (p: string) => new URL(p, site.url).toString();

/** Site-wide structured data: who we are, for Google and AI assistants. */
export function orgJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": abs("/#org"),
        name: site.name,
        url: site.url,
        logo: abs("/brand/logo.png"),
        image: abs("/opengraph-image.jpg"),
        description: site.description,
        slogan: site.tagline,
        email: site.email,
        address: { "@type": "PostalAddress", addressLocality: "Auckland", addressCountry: "NZ" },
        areaServed: "Worldwide",
        founder: { "@id": abs("/about#founder") },
        knowsAbout: ["Artificial intelligence", "AI integration", "AI governance", "AI training", "Church administration", "Website building with Claude"],
        sameAs: site.socials.map((s) => s.url),
        contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: site.supportEmail, availableLanguage: ["en"] }],
      },
      {
        "@type": "Person",
        "@id": abs("/about#founder"),
        name: site.founder.name,
        jobTitle: "Founder",
        description: "Senior pastor with 33 years in full-time ministry, church planter, and author of the How to Make a Website with Claude course.",
        image: abs(site.founder.photo),
        worksFor: { "@id": abs("/#org") },
      },
      {
        "@type": "WebSite",
        "@id": abs("/#website"),
        url: site.url,
        name: site.name,
        publisher: { "@id": abs("/#org") },
        inLanguage: "en-NZ",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.href) })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
