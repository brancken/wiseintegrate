import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, FeatureCard, Steps, CtaBand, Checks } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { processSteps, promises } from "@/config/services";

export const metadata: Metadata = {
  title: "AI services: training, integration and governance",
  description:
    "AI training and coaching, business and church integration, and policy and governance. From your first AI question to full organisational implementation.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", href: "/services" }])} />

      <PageHero
        eyebrow="What we offer"
        title={<>From your first AI question to <em>full organisational implementation.</em></>}
        intro="We assist businesses, churches, and non-profits at every stage of their AI journey, from understanding AI to developing strategies, policies, and team training for safe and effective use."
      >
        <Link href="/assessment" className="btn btn-primary">Start your free assessment <Icon name="arrow" className="h-4 w-4" /></Link>
        <Link href="#process" className="btn btn-ghost">How it works</Link>
      </PageHero>

      <Section id="training" eyebrow="Training and coaching" title={<>Practical AI training <em>for your team</em></>}>
        <div className="max-w-xl">
          <FeatureCard icon="cap" title="Training and coaching">
            <p>Practical AI training for your team, from beginner workshops to personal one-on-one coaching sessions.</p>
          </FeatureCard>
        </div>
      </Section>

      <Section
        id="integration"
        alt
        eyebrow="AI integration"
        title={<>AI integrated into <em>how you operate</em></>}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard icon="briefcase" title="Business integration" href="/business" cta="Business integration pathway">
            <p>We map your workflows, select the right tools, and integrate AI directly into how your business operates.</p>
          </FeatureCard>
          <FeatureCard icon="church" title="Church and ministry integration" href="/churches" cta="Church integration pathway">
            <p>Purpose-built AI integration for churches and ministries, with firm theological boundaries built in from day one.</p>
          </FeatureCard>
        </div>
      </Section>

      <Section
        id="governance"
        eyebrow="Policy and governance"
        title={<>Every implementation comes with <em>a policy and a review cycle</em></>}
        intro="We lead with questions before we recommend tools. Every engagement starts with your mission, your people, and your values."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard icon="shield" title="Strategy and governance">
            <p>AI policy framework, staff training, tool selection, data protection, and quarterly review cycles.</p>
          </FeatureCard>
          <FeatureCard icon="lock" title="Firm boundaries, built in">
            <p>These are not guidelines. They are convictions. Every church we work with agrees to these boundaries before a single tool is deployed.</p>
            <ul>
              <li>No member&rsquo;s personal or pastoral information ever enters an AI system</li>
              <li>Every AI output is reviewed by a human before it is used</li>
            </ul>
          </FeatureCard>
        </div>
        <div className="card mt-6 max-w-3xl p-6 sm:p-8" data-reveal>
          <h3 className="text-xl font-bold">Our foundation: what we will never compromise on</h3>
          <div className="mt-4">
            <Checks items={promises} />
          </div>
        </div>
        <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-lg italic text-muted" data-reveal>
          &ldquo;AI is already doing formation work inside your organisation. The only question is whether you are guiding it.&rdquo;
          <footer className="mt-2 text-sm not-italic">WiseIntegrate Integration Framework</footer>
        </blockquote>
      </Section>

      <Section
        id="who"
        alt
        eyebrow="Who we serve"
        title={<>We serve businesses and <em>non-profit organisations</em></>}
        intro="AI should serve your people, protect your values, and advance your purpose, and that is our commitment."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard icon="church" title="Churches and non-profits" href="/churches" cta="Church integration pathway">
            <p className="font-semibold text-ink">For churches and non-profits ready to engage AI wisely</p>
            <p className="mt-2">From pastoral buy-in to full implementation, with a theological framework, clear boundaries, and training your staff can trust.</p>
          </FeatureCard>
          <FeatureCard icon="briefcase" title="Businesses, organisations and individuals" href="/business" cta="Business integration pathway">
            <p className="font-semibold text-ink">For leaders who want AI that actually works</p>
            <p className="mt-2">We map your workflows, select the right tools, build your policy framework, and train your team, so AI actually delivers results in your organisation.</p>
          </FeatureCard>
        </div>
      </Section>

      <Section id="process" eyebrow="The process" title={<>From first conversation to <em>full integration</em></>}>
        <Steps steps={processSteps} />
      </Section>

      <CtaBand
        title={<>Find out where your <em>organisation stands</em></>}
        text="Before any tool is recommended, we need to understand where you are. The assessment gives you a clear picture and gives us everything we need to build your plan. 45 questions, 15 minutes. Free. No obligation. No sales pitch. Works on mobile and desktop."
        primary={{ label: "Start your free assessment", href: "/assessment" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
