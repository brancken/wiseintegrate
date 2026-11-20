import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts } from "@/lib/blog";

// lastModified = the date each page last really changed (Bing and Google use it; they ignore priority and changefreq).
// When you change a page's content, update its date here.
const pages: Record<string, string> = {
  "": "2026-11-20",
  "/shop": "2026-11-20",
  "/shop/how-to-make-a-website": "2026-11-20",
  "/church-management-system": "2026-11-20",
  "/shop/church-policy-pack": "2026-11-20",
  "/churches": "2026-11-20",
  "/business": "2026-11-20",
  "/services": "2026-11-20",
  "/assessment": "2026-11-20",
  "/about": "2026-11-20",
  "/blog": "2026-11-20",
  "/faq": "2026-11-20",
  "/contact": "2026-11-20",
  "/app": "2026-11-20",
  "/privacy": "2026-11-20",
  "/terms": "2026-06-30",
  "/terms-of-sale": "2026-11-20",
  "/refund-policy": "2026-11-20",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...Object.entries(pages).map(([p, d]) => ({ url: `${site.url}${p}`, lastModified: d })),
    ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
