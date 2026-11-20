import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.appName,
    short_name: site.appName,
    description: site.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#08080f",
    theme_color: "#08080f",
    lang: "en-NZ",
    categories: ["education", "business", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    related_applications: [{ platform: "webapp", url: `${site.url}/manifest.webmanifest` }],
    shortcuts: [
      { name: "Shop", url: "/shop" },
      { name: "Free AI Readiness Assessment", url: "/assessment" },
      { name: "Blog", url: "/blog" },
    ],
  };
}
