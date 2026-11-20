import type { Metadata } from "next";
import { site } from "@/config/site";
import { Section, CtaBand, Checks } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Church Policy Pack: child safety, AI and more",
  description: "Coming soon: ready-made church policies you can adapt to your church, including child safety, children's ministry, AI use, privacy, volunteers and money handling.",
  alternates: { canonical: "/shop/church-policy-pack" },
  openGraph: { images: ["/images/products/policy-pack-banner.webp"] },
};

// The policies planned for the pack (Dr. Brancken's list, 20 Nov 2026). Each one: a short, plain policy with
// [Your Church Name] style blanks to fill in, plus a one-page checklist where it helps.
const policies = [
  { icon: "child", t: "Child safety and safeguarding", d: "How your church keeps children safe: safe recruitment, two adults in every room, reporting concerns." },
  { icon: "heart", t: "Children's ministry health and safety", d: "Sign-in and sign-out, allergies, first aid, room checks, and what to do when a child is unwell." },
  { icon: "sparkles", t: "AI use policy for churches", d: "Where AI may help in church administration, where it never belongs, and how people stay in charge." },
  { icon: "lock", t: "Privacy and data protection", d: "What personal information you keep, who may see it, how long you keep it, and how people ask for it." },
  { icon: "share", t: "Social media and online communication", d: "Who may post, photos of children, messaging young people, and respectful online conduct." },
  { icon: "users", t: "Volunteer code of conduct", d: "What you expect of every volunteer, in plain words they can sign." },
  { icon: "chart", t: "Money handling and financial controls", d: "Counting offerings, two-person rules, approving spending, and keeping records." },
  { icon: "shield", t: "Health, safety and emergencies", d: "Hazards, incident reporting, evacuation and emergency contacts for your building and events." },
  { icon: "chat", t: "Complaints and concerns", d: "A fair, clear way for anyone to raise a concern, and how it is handled." },
  { icon: "church", t: "Church governance charter", d: "How decisions are made, the role of leaders or the board, and how policies are reviewed." },
];

export default function PolicyPackPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Shop", href: "/shop" }, { name: "Church Policy Pack", href: "/shop/church-policy-pack" }])} />
      <section className="hero-glow border-b border-line">
        <div className="wrap grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="rise"><span className="rounded-full bg-[#f97316] px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#1a0b00]">Coming soon</span></p>
            <h1 className="rise mt-5 text-[clamp(2.3rem,1.5rem+3.4vw,4rem)] font-extrabold leading-[1.05]" style={{ "--d": "60ms" } as React.CSSProperties}>
              Church <span className="grad">Policy Pack</span>
            </h1>
            <p className="rise mt-6 text-lg text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              Ready-made policies you can adapt to your own church. Each one is written in plain words, with clear blanks for your church&rsquo;s name and details, so your leaders can review it, adopt it and get on with ministry.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "180ms" } as React.CSSProperties}>
              <a href={`mailto:${site.supportEmail}?subject=Tell%20me%20when%20the%20Church%20Policy%20Pack%20is%20ready`} className="btn btn-primary">Tell me when it is ready</a>
              <a href="#inside" className="btn btn-ghost">See what is inside</a>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/products/policy-pack-800.webp" srcSet="/images/products/policy-pack-640.webp 640w, /images/products/policy-pack-800.webp 800w, /images/products/policy-pack.webp 1280w" sizes="(min-width: 1024px) 50vw, 100vw" alt="The Church Policy Pack on a laptop and phone, beside a stack of policy folders" width={1280} height={720} loading="lazy" decoding="async" className="hidden w-full rounded-3xl border border-line lg:block" />
        </div>
      </section>

      <Section id="inside" eyebrow="What is inside" title={<>Ten policies most churches <em>need.</em></>} intro="The planned contents. Each policy comes ready to adapt, and the ones used on a Sunday come with a one-page checklist.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {policies.map((p) => (
            <div key={p.t} className="card p-6" data-reveal>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name={p.icon} /></span>
              <h3 className="mt-4 text-lg font-bold">{p.t}</h3>
              <p className="mt-2 text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="wrap -mt-6 mb-10 lg:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/products/policy-pack-640.webp" srcSet="/images/products/policy-pack-640.webp 640w, /images/products/policy-pack-800.webp 800w" sizes="100vw" alt="" width={1280} height={720} loading="lazy" decoding="async" className="w-full rounded-3xl border border-line" />
      </div>

      <Section alt eyebrow="Why a pack" title={<>Good policies protect <em>people and ministry.</em></>}>
        <div className="max-w-3xl" data-reveal>
          <Checks items={[
            "Start from a clear draft instead of a blank page.",
            "Plain words your volunteers will actually read.",
            "Blanks for your church's own names, roles and contact details.",
            "A review date on every policy, so they stay current.",
            "Pairs with our AI services if you want help putting them in place.",
          ]} />
          <p className="mt-6 text-sm text-muted">Templates only, not legal advice. Laws differ between countries and change over time, so please check each policy against the law where your church is, and with your denomination or insurer where they have requirements.</p>
        </div>
      </Section>

      <CtaBand title={<>Be the first to <em>know.</em></>} text="Email us and we will tell you the moment the Church Policy Pack is ready." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Back to the shop", href: "/shop" }} />
    </>
  );
}
