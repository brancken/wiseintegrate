import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { allowIndexing } from "@/lib/seo";

// Search engines and AI assistants are welcome on public pages; private areas stay out.
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard", "/tools/", "/admin", "/account", "/learn"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
