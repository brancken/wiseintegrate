import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CtaBand } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { site } from "@/config/site";
import { faqs } from "@/config/faqs";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Clear answers about WiseIntegrate: who we help, the free AI readiness assessment, data and privacy, pricing, our courses and Claude tools, and course help.",
  alternates: { canonical: "/faq" },
};


/** Shows an answer paragraph, turning the support email address into a mail link. */
function Answer({ text }: { text: string }) {
  const parts = text.split(site.supportEmail);
  if (parts.length === 1) return <p>{text}</p>;
  return (
    <p>
      {parts[0]}
      <a href={`mailto:${site.supportEmail}`} className="font-semibold text-accent underline underline-offset-4">{site.supportEmail}</a>
      {parts.slice(1).join(site.supportEmail)}
    </p>
  );
}

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "FAQ", href: "/faq" }]),
          faqJsonLd(faqs.map((f) => ({ q: f.q, a: f.a.join(" ") }))),
        ]}
      />
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <em>answered.</em></>}
        intro="Find clear answers to what we hear most often. If something is not covered here, the free assessment is a good place to start, or reach out directly."
      />

      <Section>
        <div className="mx-auto grid max-w-3xl gap-4">
          {faqs.map((f, i) => (
            <details key={f.q} className="card group" data-reveal>
              <summary className="flex cursor-pointer list-none items-start gap-4 rounded-[1.25rem] p-5 sm:p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span className="font-display text-sm font-extrabold text-accent tabular-nums pt-1" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 text-lg font-bold leading-snug">{f.q}</span>
                <Icon name="chevron" className="mt-1 h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="grid gap-3 px-5 pb-6 text-muted sm:px-6 sm:pl-[3.75rem]">
                {f.a.map((p) => <Answer key={p} text={p} />)}
                {f.link && (
                  <p>
                    <Link href={f.link.href} className="inline-flex items-center gap-1.5 font-semibold text-accent">
                      {f.link.label} <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand
        title={<>Still have a <em>question?</em></>}
        text="Reach out directly, or take the free assessment to see where your organisation stands."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Free AI Readiness Assessment", href: "/assessment" }}
      />
    </>
  );
}
