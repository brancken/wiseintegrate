import type { Metadata } from "next";
import { products } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";
import { PageHero, Section, CtaBand } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { preload } from "react-dom";

export const metadata: Metadata = {
  title: "Shop: courses and Claude tools",
  description: "Practical digital products from WiseIntegrate: build your own website with Claude, plus Claude tools for pastors, churches and writers. Buy once, use at your own pace.",
  alternates: { canonical: "/shop" },
};

export default function Shop() {
  preload("/images/courses/package-640.webp", { as: "image", imageSrcSet: "/images/courses/package-640.webp 640w, /images/courses/package-800.webp 800w, /images/courses/package.webp 1280w", imageSizes: "(min-width: 768px) 50vw, 100vw", fetchPriority: "high" });
  const available = products.filter((p) => p.status === "available");
  const soon = products.filter((p) => p.status === "soon");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Shop", href: "/shop" }])} />
      <PageHero eyebrow="Shop" title={<>Digital products that <em>do the heavy lifting.</em></>} intro="Courses and Claude tools for churches, businesses, organisations and individuals. Buy once, download, and use them at your own pace." />
      <Section eyebrow="Available now" title="Courses" intro="Our first course takes you step by step through building your own professional website, app and church office, with Claude doing most of the work. Each course can be bought on its own, or all three together in the complete package.">
        <div className="grid gap-6 md:grid-cols-2">
          {available.map((p, i) => <ProductCard key={p.id} p={p} featured priority={i === 0} />)}
        </div>
      </Section>
      <Section id="coming-soon" alt eyebrow="Coming soon" title={<>Claude tools <em>in the making.</em></>} intro="Each one is a ready-made skill you add to Claude, with a one-page guide. They are being tested now and will appear here when they are ready.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {soon.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </Section>
      <CtaBand title={<>Not sure where to start?</>} text="Tell us what you are trying to do, and we will point you to the right product or service." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Our AI services", href: "/services" }} />
    </>
  );
}
