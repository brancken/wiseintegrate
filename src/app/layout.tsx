import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { ViewTransition } from "react";
import "./globals.css";
import { site } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TabBar } from "@/components/TabBar";
import { PwaSupport } from "@/components/Pwa";
import { AskWise } from "@/components/AskWise";
import { CursorGlow } from "@/components/CursorGlow";
import { themeScript } from "@/components/ThemeToggle";
import { orgJsonLd, allowIndexing } from "@/lib/seo";

// Fonts are downloaded at build time and served from our own site (no Google request when a page opens).
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap", fallback: ["Arial", "Helvetica", "sans-serif"] });
const heading = Manrope({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-heading", display: "swap", fallback: ["Arial", "Helvetica", "sans-serif"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "WiseIntegrate | Digital products and AI solutions", template: "%s | WiseIntegrate" },
  description: site.description,
  applicationName: site.appName,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/", types: { "application/rss+xml": "/blog/rss.xml" } },
  robots: allowIndexing
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  openGraph: { type: "website", siteName: site.name, locale: site.locale, url: "/" },
  twitter: { card: "summary_large_image" },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : {}),
    ...(process.env.BING_SITE_VERIFICATION ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } } : {}),
  },
  appleWebApp: { capable: true, title: site.appName, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#08080f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NZ" className={`${body.variable} ${heading.variable} no-js`} suppressHydrationWarning data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()).replace(/</g, "\\u003c") }} />
        <link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt" />
      </head>
      <body className="min-h-dvh antialiased">
        <CursorGlow />
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <ViewTransition name="page">
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <TabBar />
        <PwaSupport />
        <AskWise />
      </body>
    </html>
  );
}
