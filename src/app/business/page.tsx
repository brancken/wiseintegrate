import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, FeatureCard, Steps, CtaBand, Checks } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { processSteps } from "@/config/services";

export const metadata: Metadata = {
  title: "AI for businesses, organisations and individuals",
  description:
    "AI that actually works for your business. We map your workflows, build your policy framework, train your team and implement AI that delivers measurable results.",
  alternates: { canonical: "/business" },
};

export default function BusinessPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Businesses, organisations and individuals", href: "/business" }])} />

      <PageHero
        eyebrow="Businesses, organisations and individuals"
        title={<>AI that actually works for your business, <em>not just your tech team.</em></>}
        intro="We map your workflows, build your policy framework, train your team, and implement AI that delivers measurable results from day one."
      >
        <Link href="/assessment" className="btn btn-primary">Start your free assessment <Icon name="arrow" className="h-4 w-4" /></Link>
        <p className="w-full text-sm text-muted">Business and organisation AI integration, for individuals, small businesses and organisations.</p>
      </PageHero>

      <Section id="why" eyebrow="The reality" title={<>Why most AI projects fail, and how <em>we make sure yours does not</em></>}>
        <div className="grid max-w-3xl gap-5 text-lg text-muted" data-reveal>
          <p>
            A 2025 MIT study found that 95% of organisations see zero measurable return from AI investment. Not because the technology does not work, but because they skipped the foundations.{" "}
            <a href="https://nanda.media.mit.edu/ai_report_2025.pdf" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
              [MIT: The GenAI Divide 2025]
            </a>
          </p>
          <p>
            We do it differently. Before we recommend a single tool, we assess where your organisation actually stands. Then we build the foundations, deploy carefully, and measure what matters.
          </p>
        </div>
        <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-lg italic text-muted" data-reveal>
          &ldquo;AI should handle the repetitive, the routine, and the administrative. Your people should focus on judgment, relationships, and the work that actually moves your business forward. That is the only trade worth making.&rdquo;
          <footer className="mt-2 text-sm not-italic">WiseIntegrate</footer>
        </blockquote>
      </Section>

      <Section
        id="value"
        alt
        eyebrow="Where we help"
        title={<>Where AI delivers real <em>value in your organisation</em></>}
        intro="These are the areas where AI consistently delivers measurable results, when implemented correctly."
      >
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard icon="cog" title="Operations and admin">
            <p>Workflow automation, scheduling, meeting notes, document drafting, and repetitive task elimination.</p>
          </FeatureCard>
          <FeatureCard icon="chat" title="Communications and marketing">
            <p>Content creation, email sequences, social media, customer follow-up, and outreach campaigns.</p>
          </FeatureCard>
          <FeatureCard icon="shield" title="Strategy and governance">
            <p>AI policy framework, staff training, tool selection, data protection, and quarterly review cycles.</p>
          </FeatureCard>
        </div>
      </Section>

      <Section
        id="different"
        eyebrow="Why WiseIntegrate"
        title={<>What makes us <em>different</em></>}
        intro="We are not a software vendor. We are not a tech agency. We are a consultancy that starts with your people and builds from there."
      >
        <div className="card max-w-3xl p-6 sm:p-8" data-reveal>
          <Checks
            items={[
              "We start with an assessment, not a sales pitch",
              "We do not disappear after setup. We are here when you need us",
              "You will never be handed a tool and left to figure it out",
              "If AI is not the right move yet, we will tell you",
            ]}
          />
        </div>
      </Section>

      <Section id="process" alt eyebrow="How we work" title={<>How we work with <em>your business</em></>}>
        <Steps steps={processSteps} />
      </Section>

      <CtaBand
        title={<>Ready to find out where <em>your business stands?</em></>}
        text="Start with a free AI Readiness Assessment. It takes 15 to 20 minutes and gives us everything we need to build a plan that fits your business, your team, and your goals. Free. No obligation. No sales pitch. Works on mobile and desktop."
        primary={{ label: "Start your free assessment", href: "/assessment" }}
      />
    </>
  );
}
