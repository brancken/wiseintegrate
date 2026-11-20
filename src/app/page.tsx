import Link from "next/link";
import { products, courseProducts } from "@/config/products";
import { ProductCard } from "@/components/ProductCard";
import { Section, FeatureCard, Steps, CtaBand } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { LatestPosts } from "@/components/LatestPosts";
import { processSteps, promises } from "@/config/services";
import { InstallAppButton } from "@/components/Pwa";

export default function Home() {
  return (
    <>
      {/* 1. Opening: the products first (20 Nov 2026, Dr. Brancken) */}
      <section className="hero-glow relative overflow-hidden border-b border-line">
        <div className="wrap grid items-center gap-10 pt-14 pb-10 sm:pt-20 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow rise">New course: How to Make a Website with Claude</p>
            <h1 className="rise mt-4 text-[clamp(2.3rem,1.5rem+3.6vw,4.2rem)] font-extrabold leading-[1.04]" style={{ "--d": "60ms" } as React.CSSProperties}>
              Courses and tools that <span className="grad">do the heavy lifting.</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              Build your own website, app and church office with Claude doing most of the work. Three courses, step by step, at your own pace.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "180ms" } as React.CSSProperties}>
              <Link href="/shop/how-to-make-a-website" className="btn btn-primary"><Icon name="cap" className="h-4 w-4" /> See the courses</Link>
              <Link href="/shop" className="btn btn-ghost"><Icon name="bag" className="h-4 w-4" /> All products</Link>
            </div>
          </div>
          <Link href="/shop/how-to-make-a-website" className="rise mx-auto block w-full max-w-[560px] overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-soft)] lg:mr-0" style={{ "--d": "200ms" } as React.CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/courses/ad-blue-720.webp" srcSet="/images/courses/ad-blue-720.webp 720w, /images/courses/ad-blue-1080.webp 1080w" sizes="(min-width: 1024px) 560px, 100vw" alt="New course: how to make your own professional website with Claude. Website and app, church management system." width={1080} height={1080} fetchPriority="high" decoding="async" className="aspect-square w-full object-cover" />
          </Link>
        </div>
        <div className="wrap pb-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {courseProducts.map((c) => (
              <Link key={c.id} href="/shop/how-to-make-a-website" className={`card group flex flex-col overflow-hidden ${c.best ? "ring-2 ring-[var(--accent)]" : ""}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.imageSmall} alt="" width={640} height={360} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  {c.best && <span className="mb-2 w-fit rounded-full bg-[#f97316] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#1a0b00]">Best value</span>}
                  <h2 className="text-lg font-bold leading-snug">{c.name}</h2>
                  <p className="mt-1 flex-1 text-sm text-muted">{c.short}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="font-display text-xl font-extrabold">{c.price}{c.was && <s className="ml-2 text-sm font-semibold text-muted">{c.was}</s>}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">More <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. More products */}
      <Section id="products" eyebrow="More products" title={<>Ready-made resources, <em>coming soon.</em></>} intro="Buy once, download, and use them at your own pace. Each one comes with clear steps, so you are never on your own.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.filter((p) => p.id !== "how-to-make-a-website").slice(0, 3).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        <div className="mt-8" data-reveal>
          <Link href="/shop" className="btn btn-ghost">See all products <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
      </Section>

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

      {/* 3. Services: churches one side, businesses the other */}
      <Section id="services" alt eyebrow="Our services" title={<>AI should serve your mission. <em>Not replace it.</em></>} intro="We assist businesses, churches and non-profits at every stage of their AI journey, from understanding AI to developing strategies, policies and team training for safe and effective use.">
        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard icon="briefcase" title="Businesses, organisations and individuals" href="/business" cta="Business integration">
            <p>For leaders who want AI that actually works. We map your workflows, select the right tools, build your policy framework and train your team, so AI actually delivers results in your organisation.</p>
          </FeatureCard>
          <FeatureCard icon="church" title="Churches and non-profits" href="/churches" cta="Church and ministry integration">
            <p>For churches and non-profits ready to engage AI wisely. From pastoral buy-in to full implementation, with a theological framework, clear boundaries, and training your staff can trust.</p>
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
