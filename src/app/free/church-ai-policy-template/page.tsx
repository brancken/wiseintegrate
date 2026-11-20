import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { PageHero, Section, CtaBand } from "@/components/Blocks";
import { Mdx } from "@/components/Mdx";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

// Free starter AI policy for churches (20 Nov 2026). The text lives in content/free/church-ai-policy-template.md;
// the Word copy in public/downloads is made from the same text. Email sign-up is added later (needs a Kit account).
export const metadata: Metadata = {
  title: "Free church AI policy template",
  description: "A free, plain-language AI use policy template for churches: where AI can help with administration, where it never belongs, privacy, and how people stay in charge. Read it here or download it in Word.",
  alternates: { canonical: "/free/church-ai-policy-template" },
};

const DOWNLOAD = "/downloads/WiseIntegrate-church-AI-policy-starter-template.docx";

export default function FreeAiPolicyPage() {
  const text = fs.readFileSync(path.join(process.cwd(), "content", "free", "church-ai-policy-template.md"), "utf8");
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Free church AI policy template", href: "/free/church-ai-policy-template" }])} />
      <PageHero
        eyebrow="Free for churches"
        title={<>A church AI policy <em>template.</em></>}
        intro="A short starter policy your leaders can adapt in an afternoon: where AI can help with administration, where it never belongs, and how people stay in charge. Read it below, or download it in Word to fill in your church's details."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={DOWNLOAD} download className="btn btn-primary"><Icon name="download" className="h-4 w-4" /> Download in Word</a>
          <Link href="/shop/church-policy-pack" className="btn btn-ghost">See the full Church Policy Pack</Link>
        </div>
      </PageHero>

      <Section>
        <article className="prose-wi mx-auto max-w-3xl">
          <Mdx source={text} />
        </article>
      </Section>

      <CtaBand
        title={<>Want the <em>complete set?</em></>}
        text="The Church Policy Pack (coming soon) has the full AI use policy and nine more: child safety, children's ministry, privacy, social media, volunteers, money handling, health and safety, complaints and governance."
        primary={{ label: "See the Church Policy Pack", href: "/shop/church-policy-pack" }}
        secondary={{ label: "Take the free AI Readiness Assessment", href: "/assessment" }}
      />
    </>
  );
}
