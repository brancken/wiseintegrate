import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, FeatureCard, Steps, CtaBand } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { processSteps } from "@/config/services";

export const metadata: Metadata = {
  title: "AI for churches and non-profits",
  description:
    "AI will never replace your pastor. Church and ministry AI integration with firm boundaries, built by a pastor with over 32 years of ministry experience.",
  alternates: { canonical: "/churches" },
};

const boundaries = [
  "AI will never preach, teach Scripture, or exercise pastoral authority",
  "AI will never provide pastoral counselling, spiritual direction, or crisis care",
  "AI will never interpret Scripture or produce theological doctrine",
  "AI will never be presented as a spiritual guide to your congregation",
  "No member's personal or pastoral information ever enters an AI system",
  "Every AI output is reviewed by a human before it is used",
];

// The old church page said "for your church" in step three; keep that wording here.
const churchSteps = processSteps.map((s, i) =>
  i === 2 ? { ...s, text: s.text.replace("for your organisation", "for your church") } : s,
);

export default function ChurchesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Churches and non-profits", href: "/churches" }])} />

      <PageHero
        eyebrow="Churches and non-profits"
        title={<>AI will never replace your pastor. <em>It will free him up to be one.</em></>}
        intro="Built by a pastor, for pastors. With over 32 years of international ministry, missions, and church planting experience behind every recommendation."
      >
        <Link href="/assessment" className="btn btn-primary">Start your free assessment <Icon name="arrow" className="h-4 w-4" /></Link>
        <p className="w-full text-sm text-muted">Church and ministry AI integration</p>
      </PageHero>

      <Section id="concerns" eyebrow="We understand your concerns" title={<>We know what <em>you are thinking</em></>}>
        <div className="grid max-w-3xl gap-5 text-lg text-muted" data-reveal>
          <p>
            You have heard the hype. You have also heard the warnings. Pastors are asking whether AI will replace the pulpit, undermine Scripture, or turn ministry into a content machine. Those are the right questions. And we have built this entire programme around answering them honestly.
          </p>
          <p>
            AI will not preach your sermons. It will not counsel your congregation. It will not replace the Holy Spirit, your eldership, or your presence with your people. What it will do is take the 20-plus hours of administrative work off your plate every week, so you can get back to the work only you can do.
          </p>
        </div>
      </Section>

      <Section
        id="boundaries"
        alt
        eyebrow="Non-negotiable"
        title={<>What AI will never do <em>in your church</em></>}
        intro="These are not guidelines. They are convictions. Every church we work with agrees to these boundaries before a single tool is deployed."
      >
        <ul className="grid gap-4 md:grid-cols-2">
          {boundaries.map((b, i) => (
            <li key={b} className="card flex gap-3 p-5" data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <Icon name="close" className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2.4} />
              <span className="font-semibold">{b}</span>
            </li>
          ))}
        </ul>
        <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-lg italic text-muted" data-reveal>
          <p>&ldquo;AI can assist with research, administration, communication, and education. But it cannot provide divine revelation, spiritual discernment, prophetic authority, or biblical truth.&rdquo;</p>
          <p className="mt-3 font-semibold not-italic text-ink">No algorithm will ever shepherd a soul.</p>
          <footer className="mt-2 text-sm not-italic">WiseIntegrate</footer>
        </blockquote>
      </Section>

      <Section
        id="automate"
        eyebrow="Where we help"
        title={<>What we automate so <em>you do not have to</em></>}
        intro="These are the tasks that consume your team's time without requiring pastoral judgment."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon="mail" title="Admin and communications">
            <p>Emails, bulletins, scheduling, meeting notes, staff communications, and follow-up correspondence.</p>
          </FeatureCard>
          <FeatureCard icon="users" title="Ministry operations">
            <p>Volunteer coordination, event planning, follow-up sequences, rosters, and visitor care workflows.</p>
          </FeatureCard>
          <FeatureCard icon="share" title="Content and outreach">
            <p>Social media, sermon clip creation, website updates, translation, newsletters, and donor communications.</p>
          </FeatureCard>
        </div>
      </Section>

      <Section id="course" alt eyebrow="Our course" title={<>Build your church website <em>with Claude</em></>}>
        <div className="max-w-xl">
          <FeatureCard icon="monitor" title="How to Make a Website with Claude" href="/shop/how-to-make-a-website" cta="See the course">
            <p>A course that takes you step by step through building your own church website, app and church office, with Claude doing most of the work.</p>
          </FeatureCard>
        </div>
      </Section>

      <Section id="process" eyebrow="How we work" title={<>How we work <em>with your church</em></>}>
        <Steps steps={churchSteps} />
      </Section>

      <CtaBand
        title={<>Ready to find out where <em>your church stands?</em></>}
        text="Start with a free AI Readiness Assessment. It takes 15 to 20 minutes and gives us everything we need to build a plan that fits your church, your team, and your values. Free. No obligation. No sales pitch. Works on mobile and desktop."
        primary={{ label: "Start your free assessment", href: "/assessment" }}
      />
    </>
  );
}
