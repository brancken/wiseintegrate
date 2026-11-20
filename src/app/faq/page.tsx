import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CtaBand } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Clear answers about WiseIntegrate: who we help, the free AI readiness assessment, data and privacy, pricing, our courses and Claude tools, and course help.",
  alternates: { canonical: "/faq" },
};

type Faq = { q: string; a: string[]; link?: { href: string; label: string } };

// Questions 1 to 10 are word for word from the old site. 11 and 12 are about our products.
const faqs: Faq[] = [
  {
    q: "Who is WiseIntegrate for?",
    a: [
      "WiseIntegrate works with two kinds of organisations: small-to-medium businesses, and churches and non-profit ministries. What they share is the same problem, leaders spending too much time on administration and not enough on the work only they can do. If you recognise that pattern in your organisation, this is for you.",
    ],
  },
  {
    q: "What does the free assessment involve?",
    a: [
      "It is a 45-question online assessment that takes about 15 to 20 minutes. It covers eight areas: leadership and strategy, data and systems, AI literacy, staff readiness, governance, current AI usage, security and privacy, and budget. When you finish, you receive an immediate on-screen result showing your readiness level. We then review the full results before any conversation about implementation begins.",
    ],
  },
  {
    q: "Will AI replace my staff or my team?",
    a: [
      "No. In a business context, AI handles routine and repetitive tasks so your people can focus on work that requires human judgment, relationships, and strategic thinking. In a church or ministry context, that same boundary holds, and goes further. AI will never preach, provide pastoral counselling, interpret Scripture, or be presented to the congregation as a spiritual guide. The people work stays with people.",
    ],
  },
  {
    q: "What if my organisation is not ready for AI yet?",
    a: [
      "Then we will tell you. The assessment is designed to surface exactly that. Some organisations need to get their data practices, governance, or team culture in order before AI can deliver real value. If that is where you are, we will say so honestly and give you a clear picture of what needs to happen first. We are not here to sell tools before you need them.",
    ],
  },
  {
    q: "How do you protect our data and privacy?",
    a: [
      "Clear data boundaries are set before any implementation begins. For businesses, that means confidential client data, financial records, and internal strategy stay out of AI systems unless specifically governed. For churches, it goes further, including pastoral conversations, counselling records, and personal member data.",
      "The tools we recommend are selected partly for their data governance, including providers whose terms contractually prohibit using your data for model training. WiseIntegrate operates under the New Zealand Privacy Act 2020, and every organisation leaves the engagement with a documented data policy built for their specific context.",
    ],
  },
  {
    q: "What can AI actually do for my organisation?",
    a: [
      "For businesses, it handles the administrative and operational work that currently crowds out strategic time. That includes workflow automation, scheduling, meeting notes, document drafting, email sequences, content creation, and customer follow-up, freeing your team to focus on work that actually moves the organisation forward.",
      "For churches and ministries, it covers the work that takes your pastor and staff hours each week but does not require pastoral presence. Emails, newsletters, bulletins, volunteer coordination, event planning, visitor care workflows, and social media. The pastoral work, the counselling, the preaching, and the relationships stay entirely with your people.",
    ],
  },
  {
    q: "Why do most AI projects fail, and how is this different?",
    a: [
      "Most AI projects fail because organisations skip the foundations. They start with tools instead of strategy, and they never properly assess where they actually are. There is no governance, no team readiness, and no clear measure of what success looks like. The result is tools that get adopted inconsistently and then quietly abandoned.",
      "WiseIntegrate starts with the assessment, builds a roadmap before anything is deployed, and measures outcomes rather than counting tools. Quick wins come first, then systematic expansion built on what is actually working.",
    ],
  },
  {
    q: "What does the implementation process look like?",
    a: [
      "It starts with the free online assessment. We review the results and build a personalised priority report. Then we meet to walk through it, answer your questions, and build a step-by-step plan specific to your organisation. Implementation follows with hands-on guidance throughout. We do not hand you a setup and disappear.",
    ],
  },
  {
    q: "How much does it cost?",
    a: [
      "The online assessment is free to complete, and when you finish you receive an immediate on-screen result showing your readiness level at no cost.",
      "If you want the full written report without engaging a consultant, that is available for NZ$50. It gives you a detailed breakdown across all eight dimensions so you can take the information and act on it independently.",
      "If you want to discuss the results and move into implementation planning, that is where the consulting engagement begins. The full report, the prioritised roadmap, and the guidance to build and execute your AI strategy are part of the paid consulting process. Pricing depends on the size and scope of your organisation and is agreed at the start.",
    ],
  },
  {
    q: "What makes WiseIntegrate different from a tech agency or software vendor?",
    a: [
      "A tech agency will build what you ask for. A software vendor will sell you what they have. WiseIntegrate starts by asking whether AI is the right move at all, and if so, what your specific organisation needs.",
      "The founder brings 30 years of experience building and leading organisations across both business and ministry contexts, with academic training in organisational development alongside hands-on AI implementation work. The approach is built around your mission, not around a product. If AI is not the right fit for where you are right now, that is what you will hear.",
    ],
  },
  {
    q: "What digital products do you sell?",
    a: [
      "Practical courses and Claude tools. Our first course, How to Make a Website with Claude, takes you step by step through building your own professional website, app and church office, with Claude doing most of the work. More Claude tools for pastors and writers are coming soon.",
    ],
    link: { href: "/shop", label: "Visit the shop" },
  },
  {
    q: "I bought a course and need help. Who do I contact?",
    a: [`Email ${site.supportEmail}. Where it is really needed, we can arrange a short Zoom call.`],
  },
];

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
