import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { getPosts } from "@/lib/blog";

const pages = ["", "/shop", "/shop/how-to-make-a-website", "/churches", "/business", "/services", "/assessment", "/about", "/blog", "/faq", "/contact", "/app", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : p.startsWith("/shop") ? 0.9 : 0.7 })),
    ...getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
