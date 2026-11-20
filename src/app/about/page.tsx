import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CtaBand } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { preload } from "react-dom";

export const metadata: Metadata = {
  title: "About WiseIntegrate",
  description:
    "Built from the field, grounded in expertise. The story behind WiseIntegrate, our privacy commitment, the founder's credentials and our specialist advisors.",
  alternates: { canonical: "/about" },
};

const stats = [
  { n: "30+", label: "Years of experience" },
  { n: "30+", label: "Countries served" },
  { n: "100%", label: "Human-first approach" },
];

export default function AboutPage() {
  preload("/images/abri-brancken-320.webp", { as: "image", imageSrcSet: "/images/abri-brancken-320.webp 320w, /images/abri-brancken-400.webp 400w", imageSizes: "(min-width:768px) 280px, 45vw", fetchPriority: "high" });
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "About", href: "/about" }])} />

      <PageHero
        eyebrow="Our story"
        title={<>Built from the field, <em>grounded in expertise.</em></>}
        intro="WiseIntegrate was not built in a boardroom. It was built inside decades of building and leading organisations, and a discovery that changed how leaders spend their time."
      />

      <Section id="story" eyebrow="The founder" title={<>Thirty years of leading. Thirty countries. <em>One discovery.</em></>}>
        <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
          <figure className="mx-auto w-[70vw] max-w-[280px] md:mx-0 md:w-auto" data-reveal>
            <img
              src="/images/abri-brancken-320.webp"
              srcSet="/images/abri-brancken-320.webp 320w, /images/abri-brancken-400.webp 400w"
              sizes="(min-width:768px) 280px, 45vw"
              width={640}
              height={800}
              alt="Dr. Abri Brancken"
              className="h-auto w-full rounded-3xl border border-line"
              fetchPriority="high"
            />
          </figure>
          <div className="grid gap-5 text-lg text-muted" data-reveal>
            <p>
              The founder of WiseIntegrate has spent over thirty years building and leading organisations, starting businesses, building teams, and planting churches across multiple continents. That journey included travelling to more than thirty countries and working alongside organisations of every size, from small community efforts to large multi-staff operations in both the ministry and business world.
            </p>
            <p>
              In every context, the same pattern appeared. In churches, pastors spending twenty or more hours a week on administration, correspondence, and scheduling, instead of with the people they were called to serve. In businesses, owners and leaders buried in routine tasks and management overhead, instead of driving the vision that built their organisation in the first place. The work that actually required the leader&rsquo;s presence, judgment, and skill was consistently crowded out by work that didn&rsquo;t.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card p-6" data-reveal>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="cap" className="h-5 w-5" /></span>
            <h3 className="mt-4 text-xl font-bold">Research and people development</h3>
            <p className="mt-2 text-muted">
              Alongside that practical experience, the founder holds a PhD and has worked extensively as an academic, not just studying organisations, but developing the people within them. It was through that lens, of understanding how people and organisations grow, that the potential of AI became clear. Not as a replacement for human work, but as something that could remove the friction standing between a leader and what they were actually built to do.
            </p>
          </div>
          <div className="card p-6" data-reveal>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="compass" className="h-5 w-5" /></span>
            <h3 className="mt-4 text-xl font-bold">Staying ahead of the field</h3>
            <p className="mt-2 text-muted">
              AI is a field that moves faster than any institution can formally certify. What matters is staying close to the work, learning from practitioners, from the companies building these tools, and from others navigating the same challenges in real organisations. Completed programmes include Anthropic certificates in AI Fluency for Non-Profits, AI Fluency for Small Business, AI Fluency Framework and Foundations, and Teaching AI; alongside a Certificate in AI and Career Empowerment from the University of Maryland.
            </p>
          </div>
        </div>

        <dl className="mt-10 grid gap-5 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={s.label} className="card p-6 text-center" data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold text-accent">{s.n}</dd>
              <dd className="mt-1 text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>

        <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-lg italic text-muted" data-reveal>
          &ldquo;AI does not replace the pastor. It does not replace the business leader. It does not replace your people. It takes the weight of repetitive administration off those who matter most, freeing them to focus entirely on the work only they can do.&rdquo;
          <footer className="mt-2 text-sm not-italic">WiseIntegrate: Founding Principle</footer>
        </blockquote>
      </Section>

      <Section
        id="privacy-commit"
        alt
        eyebrow="Our commitment"
        title={<>Privacy is built into <em>every engagement</em></>}
        intro="Working with churches and organisations means handling trust, often in its most sensitive form. We take that seriously."
      >
        <div className="grid max-w-3xl gap-5 text-lg text-muted" data-reveal>
          <p>
            When helping any organisation integrate AI, clear data boundaries are established before any implementation begins. There are specific categories of information, such as pastoral conversations, counselling records, personal member data, and confidential business information, that never enter an AI system. These boundaries are not optional add-ons; they are the starting point.
          </p>
          <p>
            WiseIntegrate operates under the New Zealand Privacy Act 2020 and holds the same standard of care with client data that we ask AI providers to hold. The AI tools we recommend are selected in part because of their data governance, including providers whose commercial terms contractually prohibit using your data for AI model training.
          </p>
          <p>
            Every organisation we work with leaves the engagement with a documented data policy and a clear set of AI usage guidelines tailored to their context, not a generic template, but a living document built around their people, their mission, and their specific use of AI.
          </p>
          <p>
            For full details on how WiseIntegrate itself handles your information, see our{" "}
            <Link href="/privacy" className="text-accent underline underline-offset-4">Privacy Policy</Link>.
          </p>
        </div>
      </Section>

      <Section
        id="credentials"
        eyebrow="The foundation"
        title={<>Experience, credentials, <em>and trusted expertise</em></>}
        intro="WiseIntegrate does not operate on enthusiasm alone. Behind every recommendation is formal training, verified expertise, and a technical team that knows what it is doing."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6" data-reveal>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="cap" className="h-5 w-5" /></span>
            <h3 className="mt-4 text-xl font-bold">Academic foundation. Practical expertise.</h3>
            <p className="mt-2 text-muted">
              The founder holds a PhD and brings an academic background in organisational development alongside decades of real-world experience. AI training includes Anthropic certificates in AI Fluency for Non-Profits and Small Business, the AI Fluency Framework and Foundations, and Teaching AI, supplemented by a Certificate in AI and Career Empowerment from the University of Maryland. AI rewards those who stay close to it. The goal is always to be one step ahead of the clients we serve.
            </p>
          </div>
          <div id="advisors" className="card scroll-mt-20 p-6" data-reveal>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="shield" className="h-5 w-5" /></span>
            <h3 className="mt-4 text-xl font-bold">Specialist advisors on call</h3>
            <p className="mt-2 text-muted">
              WiseIntegrate does not work alone. When clients need technical depth, specialist advisors are available across two key areas: information security and cyber risk management, with credentials spanning CISSP, CISA, CRISC, and CISM alongside Stanford engineering training, and AI development and implementation. Between them, they provide the technical backbone that keeps every recommendation safe, sound, and properly built for the organisations we serve.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        title={<>Ready to find out where your <em>organisation stands?</em></>}
        text="Before any tool is recommended, we need to understand where you are. The free AI Readiness Assessment gives you a clear picture, and gives us everything we need to build a plan that fits your people, your mission, and your values. Free. No obligation. No sales pitch. Works on mobile and desktop."
        primary={{ label: "Start your free assessment", href: "/assessment" }}
      />
    </>
  );
}
