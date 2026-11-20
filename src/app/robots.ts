import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { allowIndexing } from "@/lib/seo";

// Search engines and AI assistants are welcome on public pages; private areas stay out.
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: [{ userAgent: "*", disallow: "/" }] };
  const privateAreas = ["/api/", "/dashboard", "/tools/", "/admin", "/account", "/learn"];
  // Search engines and AI assistants are named so it is clear they are welcome (they cite and recommend sites they can read).
  const welcome = [
    "Googlebot", "Bingbot", "Applebot", "DuckDuckBot",
    "OAI-SearchBot", "ChatGPT-User", "GPTBot",
    "Claude-SearchBot", "Claude-User", "ClaudeBot",
    "PerplexityBot", "Perplexity-User",
    "Google-Extended", "Applebot-Extended", "Meta-ExternalAgent", "CCBot",
  ];
  return {
    rules: [{ userAgent: welcome, allow: "/", disallow: privateAreas }, { userAgent: "*", allow: "/", disallow: privateAreas }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
