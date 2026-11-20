import type { Metadata } from "next";
import { products } from "@/config/products";
import { PageHero, Section } from "@/components/Blocks";
import { CourseBlocks, SoonBlocks } from "@/components/ShopBlocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Shop: courses, church resources and Claude tools",
  description: "All WiseIntegrate products: three courses (church management system on Google, professional website and app, market yourself online) and the complete package, plus church resources and Claude tools coming soon.",
  alternates: { canonical: "/shop" },
};

// All products, in blocks: the courses first, then what is coming soon. (21 Nov 2026, Dr. Brancken)
export default function Shop() {
  const soon = products.filter((p) => p.status === "soon");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Shop", href: "/shop" }])} />
      <PageHero eyebrow="Shop" title={<>All our <em>products.</em></>} intro="Courses, church resources and Claude tools. Buy once, download, and use them at your own pace." />
      <Section eyebrow="Courses" title={<>How to Make a Website <em>with Claude.</em></>} intro="Three courses, each on its own or all together in the complete package. Open a course to see exactly what is inside.">
        <CourseBlocks priority />
      </Section>
      <Section id="coming-soon" alt eyebrow="Coming soon" title={<>In <em>development.</em></>} intro="These are being written and tested now. They will open here when they are ready.">
        <SoonBlocks items={soon} />
      </Section>
    </>
  );
}
