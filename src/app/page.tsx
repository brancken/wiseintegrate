import Link from "next/link";
import { products } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";
import { Section, FeatureCard, Steps, CtaBand } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { LatestPosts } from "@/components/LatestPosts";
import { processSteps, promises } from "@/config/services";
import { InstallAppButton } from "@/components/Pwa";

export default function Home() {
  const [featured, ...rest] = products;
  return (
    <>
      {/* 1. Opening */}
      <section className="hero-glow relative overflow-hidden border-b border-line">
        <div className="wrap grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <p className="eyebrow rise">Digital products and AI solutions</p>
            <h1 className="rise mt-4 text-[clamp(2.3rem,1.5rem+3.6vw,4.2rem)] font-extrabold leading-[1.04]" style={{ "--d": "60ms" } as React.CSSProperties}>
              AI should serve your mission. <span className="grad">Not replace it.</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              We make practical digital products, like our course on building your own website with Claude, and we help individuals, small businesses, organisations and churches use AI simply, safely and well.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "180ms" } as React.CSSProperties}>
              <Link href="/shop" className="btn btn-primary"><Icon name="bag" className="h-4 w-4" /> Browse our products</Link>
              <Link href="/services" className="btn btn-ghost">Our AI services</Link>
            </div>
          </div>
          <div className="rise grid grid-cols-2 gap-4" style={{ "--d": "200ms" } as React.CSSProperties}>
            <Link href="/shop" className="card col-span-2 flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="bag" /></span>
              <span><span className="block font-bold">Digital products</span><span className="text-sm text-muted">Courses and Claude tools you can use today</span></span>
            </Link>
            <Link href="/churches" className="card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="church" /></span>
              <span className="mt-3 block font-bold">Churches and non-profits</span>
            </Link>
            <Link href="/business" className="card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name="briefcase" /></span>
              <span className="mt-3 block font-bold">Businesses and organisations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* App: get WiseIntegrate on your phone or computer */}
      <section className="border-b border-line bg-bg-alt">
        <div className="wrap flex flex-col items-start gap-6 py-10 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-192.png" alt="The WiseIntegrate app icon" width={72} height={72} loading="lazy" className="h-16 w-16 shrink-0 rounded-2xl shadow-[var(--shadow-soft)]" />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold">Get the WiseIntegrate app</h2>
            <p className="mt-1 text-muted">Your courses, AI guides and our latest news, one tap away on your phone or computer. Free, no app store needed, and it takes a few seconds.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <InstallAppButton label="Get our app" className="btn bg-[#f97316] text-[#1a0b00] hover:bg-[#ea580c] hover:text-white" />
            <Link href="/app" className="btn btn-ghost">How it works</Link>
          </div>
        </div>
      </section>

      {/* 2. Products */}
      <Section id="products" eyebrow="Our products" title={<>Tools and courses that <em>do the heavy lifting.</em></>} intro="Buy once, download, and use them at your own pace. Each one comes with clear steps, so you are never on your own.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProductCard p={featured} featured />
          {rest.filter((p) => p.id === "church-policy-pack").map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        <div className="mt-8" data-reveal>
          <Link href="/shop" className="btn btn-ghost">See all products <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* 3. Services: churches one side, businesses the other */}
      <Section id="services" alt eyebrow="Our services" title={<>From your first AI question to <em>full implementation.</em></>} intro="We assist businesses, churches and non-profits at every stage of their AI journey, from understanding AI to developing strategies, policies and team training for safe and effective use.">
        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard icon="church" title="Churches and non-profits" href="/churches" cta="Church and ministry integration">
            <p>For churches and non-profits ready to engage AI wisely. From pastoral buy-in to full implementation, with a theological framework, clear boundaries, and training your staff can trust.</p>
          </FeatureCard>
          <FeatureCard icon="briefcase" title="Businesses, organisations and individuals" href="/business" cta="Business integration">
            <p>For leaders who want AI that actually works. We map your workflows, select the right tools, build your policy framework and train your team, so AI actually delivers results in your organisation.</p>
          </FeatureCard>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <FeatureCard icon="cap" title="Training and coaching" href="/services#training" cta="More">
            <p>Practical AI training for your team, from beginner workshops to personal one-on-one coaching.</p>
          </FeatureCard>
          <FeatureCard icon="cog" title="AI integration" href="/services#integration" cta="More">
            <p>We map your workflows, select the right tools, and integrate AI directly into how you operate.</p>
          </FeatureCard>
          <FeatureCard icon="shield" title="Policy and governance" href="/services#governance" cta="More">
            <p>Every implementation comes with a clear policy and a review cycle.</p>
          </FeatureCard>
        </div>
      </Section>

      {/* 4. How we work */}
      <Section eyebrow="Our foundation" title={<>How we work, and what we will <em>never compromise on.</em></>} intro="We lead with questions before we recommend tools. Every engagement starts with your mission, your people and your values.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((p, i) => (
            <div key={p} className="card p-6" data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <Icon name="check" className="h-6 w-6 text-accent" strokeWidth={2.4} />
              <h3 className="mt-3 text-lg font-bold">{p}</h3>
            </div>
          ))}
        </div>
        <blockquote className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-lg italic text-muted" data-reveal>
          &ldquo;AI is already doing formation work inside your organisation. The only question is whether you are guiding it.&rdquo;
          <footer className="mt-2 text-sm not-italic">WiseIntegrate Integration Framework</footer>
        </blockquote>
      </Section>

      {/* 5. Process */}
      <Section alt eyebrow="The process" title={<>From first conversation to <em>full integration.</em></>}>
        <Steps steps={processSteps} />
      </Section>

      {/* 6. Blog */}
      <LatestPosts />

      {/* 7. Assessment */}
      <CtaBand
        title={<>Find out where your <em>organisation stands.</em></>}
        text="Before any tool is recommended, we need to understand where you are. The free AI Readiness Assessment: 45 questions, about 15 minutes. Free. No obligation. No sales pitch."
        primary={{ label: "Start your free assessment", href: "/assessment" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
