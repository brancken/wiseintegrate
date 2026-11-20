import type { NextConfig } from "next";

// Content Security Policy: the browser only runs scripts and connects to the places listed here.
// When you add a new service (a video host, a form provider), add its address to the right line.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net", // the two last ones: only the old assessment pages in /tools
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
  "media-src 'self' blob: https:",
  "connect-src 'self' https://api.emailjs.com https://ppgecvmyuyuntwnqwcru.supabase.co",
  "frame-src 'self' https://www.youtube-nocookie.com https://iframe.mediadelivery.net",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://buy.stripe.com https://checkout.stripe.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "X-Frame-Options", value: "SAMEORIGIN" }, { key: "Content-Security-Policy", value: csp }]
    : []),
];

// Old addresses that moved (every old link keeps working).
const redirects = [
  { source: "/church", destination: "/churches", permanent: true },
  { source: "/courses/how-to-make-a-website", destination: "/shop/how-to-make-a-website", permanent: true },
  { source: "/courses", destination: "/shop", permanent: true },
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/assessment-intro.html", destination: "/assessment", permanent: true },
  { source: "/assessment.html", destination: "/assessment/start", permanent: true },
  { source: "/dashboard.html", destination: "/dashboard", permanent: true },
  { source: "/manifest.json", destination: "/manifest.webmanifest", permanent: true },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  async redirects() {
    return redirects;
  },
  // The assessment, its reports and the consultant dashboard are plain pages kept from the old site (public/tools).
  async rewrites() {
    return [
      { source: "/assessment", destination: "/tools/assessment-intro.html" },
      { source: "/assessment/start", destination: "/tools/assessment.html" },
      { source: "/report-summary", destination: "/tools/report-summary.html" },
      { source: "/report-guide", destination: "/tools/report-guide.html" },
      { source: "/dashboard", destination: "/tools/dashboard.html" },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Only wiseintegrate.com may appear in search results; Vercel preview copies are kept out.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?!(www\\.)?wiseintegrate\\.com$).*" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      { source: "/tools/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-cache" }] },
      { source: "/dashboard", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: "/sw.js", headers: [{ key: "Cache-Control", value: "no-cache" }, { key: "Service-Worker-Allowed", value: "/" }] },
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
    ];
  },
};

export default nextConfig;
