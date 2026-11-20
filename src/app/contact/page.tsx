import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHero } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/ContactForm";
import { breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Talk to WiseIntegrate about AI for your church, business or non-profit. Send us a message, email us, or get help with a course you have bought.",
  alternates: { canonical: "/contact" },
};

function InfoCard({ icon, title, children }: { icon: string; title: string; children: ReactNode }) {
  return (
    <div className="card flex gap-4 p-5" data-reveal>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-panel-strong text-accent">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="mt-1 text-muted">{children}</div>
      </div>
    </div>
  );
}

const linkCls = "mt-2 inline-flex items-center gap-1.5 font-semibold text-accent break-all";

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", href: "/contact" }])} />
      <PageHero
        eyebrow="Get in touch"
        title={<>Let us talk about your <em>organisation</em></>}
        intro="Whether you are a business, non-profit, or a church, every conversation starts with your mission, not our tools."
      />

      <section className="py-16 sm:py-20">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          <div className="grid content-start gap-4">
            <InfoCard icon="map" title="Location">
              <p>Providing AI consulting and implementation services globally through virtual collaboration. We are based in {site.location}.</p>
            </InfoCard>
            <InfoCard icon="mail" title="Email us">
              <p>For general enquiries, consultancy questions, or to start a conversation.</p>
              <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a>
            </InfoCard>
            <InfoCard icon="church" title="Church enquiries">
              <p>Working with a church or ministry? We understand the theological and pastoral context your team needs.</p>
              <Link href="/churches" className={linkCls}>View Church Integration <Icon name="arrow" className="h-4 w-4" /></Link>
            </InfoCard>
            <InfoCard icon="briefcase" title="Business enquiries">
              <p>Bringing AI into your business or organisation? See how we work with teams like yours.</p>
              <Link href="/business" className={linkCls}>View Business Integration <Icon name="arrow" className="h-4 w-4" /></Link>
            </InfoCard>
            <InfoCard icon="cap" title="Course help">
              <p>Bought a course and need help? Email us. Where it is really needed, we can arrange a short Zoom call.</p>
              <a href={`mailto:${site.supportEmail}`} className={linkCls}>{site.supportEmail}</a>
            </InfoCard>
          </div>

          <div className="card p-6 sm:p-8" data-reveal>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Send us a message</h2>
            <p className="mt-2 text-muted">We will get back to you soon.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
