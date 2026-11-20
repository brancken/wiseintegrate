import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courseProducts, STRIPE_LIVE } from "@/config/products";
import { coursePages } from "@/config/course-pages";
import { site } from "@/config/site";
import { Section, Checks } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbJsonLd, isProduction } from "@/lib/seo";

// One page per course: what it helps you achieve, the 10 lessons, what you have at the end. Nothing else.
type Props = { params: Promise<{ course: string }> };
const showBuy = STRIPE_LIVE || !isProduction;

export function generateStaticParams() {
  return coursePages.map((c) => ({ course: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course } = await params;
  const c = coursePages.find((x) => x.slug === course);
  if (!c) return {};
  const p = courseProducts.find((x) => x.id === c.productId);
  const url = `/shop/how-to-make-a-website/${c.slug}`;
  return {
    title: `${c.number}: ${c.title}`,
    description: `${c.tagline} ${c.intro}`.slice(0, 158),
    alternates: { canonical: url },
    openGraph: { url, images: p ? [p.image] : undefined },
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { course } = await params;
  const c = coursePages.find((x) => x.slug === course);
  if (!c) notFound();
  const p = courseProducts.find((x) => x.id === c.productId)!;
  const url = `/shop/how-to-make-a-website/${c.slug}`;
  const others = coursePages.filter((x) => x.slug !== c.slug);
  const pkg = courseProducts.find((x) => x.best);

  const courseLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${c.number}: ${c.title}`,
    description: c.intro,
    url: abs(url),
    image: abs(p.image),
    inLanguage: "en",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    offers: { "@type": "Offer", price: p.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD", category: "Paid", availability: STRIPE_LIVE ? "https://schema.org/InStock" : "https://schema.org/PreOrder" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online" },
  };

  return (
    <>
      <JsonLd data={[courseLd, breadcrumbJsonLd([{ name: "Shop", href: "/shop" }, { name: "How to Make a Website", href: "/shop/how-to-make-a-website" }, { name: c.number, href: url }])]} />

      {/* Opening: the course name, what it gives you, its picture and price */}
      <section className="hero-glow border-b border-line">
        <div className="wrap grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow rise"><Link href="/shop" className="hover:underline">Shop</Link> &rsaquo; {c.number}</p>
            <h1 className="rise mt-4 text-[clamp(2.1rem,1.4rem+3vw,3.6rem)] font-extrabold leading-[1.06]" style={{ "--d": "60ms" } as React.CSSProperties}>
              {c.title}
            </h1>
            <p className="rise mt-3 text-xl font-semibold grad" style={{ "--d": "100ms" } as React.CSSProperties}>{c.tagline}</p>
            <p className="rise mt-5 text-lg text-muted" style={{ "--d": "140ms" } as React.CSSProperties}>{c.intro}</p>
            <div className="rise mt-7 flex flex-wrap items-center gap-4" style={{ "--d": "180ms" } as React.CSSProperties}>
              <span className="font-display text-4xl font-extrabold">{p.price}</span>
              {showBuy ? (
                <a href={p.buy} className="btn btn-primary">Buy {c.number}</a>
              ) : (
                <span className="btn btn-ghost cursor-default">Sales open soon</span>
              )}
            </div>
            <p className="mt-3 text-sm text-muted">Includes Start Here (setting up Claude), a printable guide for every lesson, and the Claude guide.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} srcSet={`${p.imageSmall} 640w, ${p.image} 1280w`} sizes="(min-width: 1024px) 52vw, 100vw" alt={`${c.number}: ${c.title}`} width={1280} height={720} fetchPriority="high" className="rise w-full rounded-3xl border border-line shadow-[var(--shadow-soft)]" />
        </div>
      </section>

      {/* What it helps you achieve */}
      <Section eyebrow="What this course helps you achieve" title={<>{c.tagline.replace(/\.$/, "")}, <em>step by step.</em></>}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.achieve.map((a) => (
            <div key={a.t} className="card p-6" data-reveal>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name={a.icon} /></span>
              <h3 className="mt-4 text-xl font-bold">{a.t}</h3>
              <p className="mt-2 text-muted">{a.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* The lessons */}
      <Section alt eyebrow="What is in the course" title={<>10 lessons. <em>One step at a time.</em></>} intro="Each lesson has a printable guide with pictures, a checklist and a short quiz. Claude can walk you through every step.">
        <ol className="grid gap-4 md:grid-cols-2">
          {c.lessons.map((l, i) => (
            <li key={l.t} className="card flex gap-4 p-5" data-reveal>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--btn)] font-display font-extrabold text-white">{i + 1}</span>
              <div>
                <h3 className="text-lg font-bold">{l.t}</h3>
                <p className="mt-1 text-muted">{l.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* At the end, and good to know */}
      <Section eyebrow="At the end of the course" title={<>What you will <em>have.</em></>}>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="card p-6" data-reveal><Checks items={c.youHave} /></div>
          <div className="grid gap-6">
            <div className="card p-6" data-reveal><h3 className="mb-3 text-lg font-bold">How long it takes</h3><Checks items={c.goodToKnow.time} /></div>
            <div className="card p-6" data-reveal><h3 className="mb-3 text-lg font-bold">What it costs to run</h3><Checks items={c.goodToKnow.cost} /></div>
            <div className="card p-6" data-reveal><h3 className="mb-3 text-lg font-bold">What you need</h3><Checks items={c.goodToKnow.need} /></div>
          </div>
        </div>
      </Section>

      {/* The other courses, and the package */}
      <Section alt eyebrow="The other courses" title={<>Better together: <em>all three courses.</em></>}>
        <div className="grid gap-6 md:grid-cols-3">
          {others.map((o) => {
            const op = courseProducts.find((x) => x.id === o.productId)!;
            return (
              <Link key={o.slug} href={`/shop/how-to-make-a-website/${o.slug}`} className="card group flex flex-col overflow-hidden" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={op.imageSmall} alt="" width={640} height={360} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{o.number}: {o.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-muted">{o.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">{op.price} &middot; See the course <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                </div>
              </Link>
            );
          })}
          {pkg && (
            <Link href="/shop/how-to-make-a-website" className="card group flex flex-col overflow-hidden ring-2 ring-[var(--accent)]" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pkg.imageSmall} alt="" width={640} height={360} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-2 w-fit rounded-full bg-[#f97316] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#1a0b00]">Best value</span>
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">All three courses in one.</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">{pkg.price}{pkg.was && <s className="ml-1 text-muted">{pkg.was}</s>} &middot; See the package <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </Link>
          )}
        </div>
      </Section>
    </>
  );
}
