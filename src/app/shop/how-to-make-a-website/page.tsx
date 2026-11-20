import type { Metadata } from "next";
import Link from "next/link";
import { courseProducts, STRIPE_LIVE } from "@/config/products";
import { site } from "@/config/site";
import { Section, CtaBand, Checks } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbJsonLd, faqJsonLd, isProduction } from "@/lib/seo";
import { legalApproved } from "@/config/legal";

export const metadata: Metadata = {
  title: "Church Website, App and Church Management System Course",
  description: "Build your own church website, church app and church management system with no monthly fees, step by step with Claude AI. No web developer needed.",
  alternates: { canonical: "/shop/how-to-make-a-website" },
  openGraph: { images: ["/images/courses/package.webp"] },
};

// Buy buttons: live Stripe links once STRIPE_LIVE is true. Until then they show only on preview copies
// (Stripe test mode, no real money), and the live site says sales open soon.
const showBuy = STRIPE_LIVE || !isProduction;

// Google's "Course list" result: each course with a name, a short description and the provider.
function courseListJsonLd() {
  const descriptions: Record<string, string> = {
    "htmaw-course-1": "Build a church management system on Google: forms, people, follow-ups and group emails.",
    "htmaw-course-2": "Build a fast church website that also works as an app, with Claude.",
    "htmaw-course-3": "Get found on Google, AI search and maps; add a podcast and notifications.",
  };
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courseProducts.filter((c) => descriptions[c.id]).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        url: abs(`/shop/how-to-make-a-website#${c.id}`),
        name: c.name.replace(/^Course \d: /, ""),
        description: descriptions[c.id],
        provider: { "@type": "Organization", name: site.name, sameAs: site.url },
      },
    })),
  };
}

function courseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "How to Make a Website with Claude",
    description: metadata.description,
    url: abs("/shop/how-to-make-a-website"),
    image: abs("/images/courses/package.webp"),
    inLanguage: "en",
    provider: { "@type": "Organization", name: site.name, url: site.url },
    author: { "@type": "Person", name: site.founder.name },
    offers: courseProducts.map((c) => ({ "@type": "Offer", name: c.name, price: c.price.replace(/[^0-9.]/g, ""), priceCurrency: "USD", category: "Paid", availability: STRIPE_LIVE ? "https://schema.org/InStock" : "https://schema.org/PreOrder" })),
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online" },
  };
}

// Questions buyers ask (answers use only facts stated elsewhere on this page and in the course Introduction).
const faqs = [
  { q: "Do I need to know how to code?", a: "No. Claude does most of the work and checks with you at every step. No degree or web design diploma is needed, and you edit your finished website yourself in your browser, with no code." },
  { q: "Is there a monthly fee for the church management system?", a: "Course 1 builds your own church management system on Google: forms, people, follow-ups, group emails and a team dashboard. On a free Gmail account it has no monthly fees." },
  { q: "What does it cost to run the website?", a: "Mainly your web address, usually about 10 to 15 US dollars a year. We recommend one month of a paid Claude plan while you build. At the time we made this course, hosting was free for a church or personal website; a business needs the host's paid plan." },
  { q: "How long does it take?", a: "All three courses take about three to four days of work, spread over a week or two. Your website can be online within the first day or two." },
  { q: "Is it only for churches?", a: "The course focuses on churches, and it can easily be changed for businesses, organisations and individuals." },
  { q: "Will my website also work as an app?", a: "Yes. Your website is also your app: people save it to their phone's home screen. There is no need to list an app on Google Play or the Apple App Store." },
  { q: "What do I need?", a: "A Windows 10 or later PC, or a Mac with macOS 13 or later (8 GB memory, 16 recommended), steady broadband internet and a smartphone. The course works on Claude's free plan." },
  { q: "What if I get stuck?", a: "Most questions are answered by Claude: take a screenshot, paste it into Claude and say where you are. If you are still stuck, email office@wiseintegrate.com. Where it is really needed, we arrange a short Zoom call." },
];

const youGet = {
  website: [
    "Your own web address with the padlock (the little lock that tells visitors your site is safe)",
    "A calm design in your colours, with day and night mode",
    "Made for phones, and it works like an app",
    'Service times, map, and events with "add to my calendar"',
    "Sermons or videos appear by themselves from YouTube",
    "Contact and prayer forms that keep spam (junk messages) out",
    "You edit it yourself in your browser. No code",
    "100 out of 100 in all four areas of Google's speed test on a phone",
  ],
  office: ["Every visitor in one list, by themselves", "A follow-up for the right person", "A thank-you email on its way", "Birthday emails and group emails", "Automatic backups", "A private dashboard for your team"],
  found: ["On Google, Bing and maps", "Help for AI assistants such as ChatGPT and Claude to understand your church", "YouTube, Facebook and Instagram linked up", "A podcast on Spotify and Apple Podcasts", "Notifications on people's phones, that they choose", "Optional: a daily Thought for the Day and other languages"],
};

export default function CoursePage() {
  return (
    <>
      <JsonLd data={[courseJsonLd(), courseListJsonLd(), breadcrumbJsonLd([{ name: "Shop", href: "/shop" }, { name: "How to Make a Website", href: "/shop/how-to-make-a-website" }])]} />

      {/* Opening */}
      <section className="hero-glow border-b border-line">
        <div className="wrap grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow rise">A course with Claude, step by step</p>
            <h1 className="rise mt-4 text-[clamp(2.3rem,1.5rem+3.4vw,4rem)] font-extrabold leading-[1.05]" style={{ "--d": "60ms" } as React.CSSProperties}>
              No more expensive <span className="grad">web developers.</span>
            </h1>
            <p className="rise mt-6 text-lg text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              A website company can take weeks and charge thousands of dollars. With this course, and Claude doing most of the work, you can build a professional website yourself in about <strong className="text-ink">three to four days of work</strong>, at a very affordable price.
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "180ms" } as React.CSSProperties}>
              <a href="#prices" className="btn btn-primary">Get the course</a>
              <a href="https://howtomakeawebsite.fyi" target="_blank" rel="noopener" className="btn btn-ghost">See the live sample site</a>
            </div>
            <p className="mt-4 text-sm text-muted">This course focuses on churches, and it can easily be changed for businesses, organisations and individuals.</p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/courses/package.webp" srcSet="/images/courses/package-640.webp 640w, /images/courses/package-800.webp 800w, /images/courses/package.webp 1280w" sizes="(min-width: 1024px) 50vw, 100vw" alt="How to Make a Website: the complete package" width={1280} height={720} fetchPriority="high" className="rise w-full rounded-3xl border border-line shadow-[var(--shadow-soft)]" />
        </div>
      </section>

      {/* Save money */}
      <Section eyebrow="Save money, three ways" title={<>Keep the money for your <em>mission.</em></>}>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: "user", t: "No web developer costs", p: "You build it yourself, with Claude beside you. No degree or web design diploma needed." },
            { icon: "smartphone", t: "Website and app all in one", p: "No need to build a church app or list it on Google Play or the Apple App Store. No extra costs, no extra work, no agents. Your website is also your app: people simply save it to their phone's home screen." },
            { icon: "users", t: "Your own Church Management System. No monthly fees.", p: "Course 1 builds your own church management system on Google: forms, people, follow-ups, group emails and a team dashboard, all connected. On a free Gmail account it has no monthly fees, and it grows with your church." },
          ].map((c) => (
            <div key={c.t} className="card p-6" data-reveal>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name={c.icon} /></span>
              <h3 className="mt-4 text-xl font-bold">{c.t}</h3>
              <p className="mt-2 text-muted">{c.p}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* What you can have */}
      <Section alt eyebrow="What you can have" title={<>A website, an office and <em>people who find you.</em></>}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card p-6" data-reveal><h3 className="mb-4 text-xl font-bold">A website people love to use</h3><Checks items={youGet.website} /></div>
          <div className="card p-6" data-reveal><h3 className="mb-4 text-xl font-bold">An office that does the work</h3><Checks items={youGet.office} /></div>
          <div className="card p-6" data-reveal><h3 className="mb-4 text-xl font-bold">People who find you</h3><Checks items={youGet.found} /></div>
        </div>
        <p className="mt-8 text-muted" data-reveal>
          See this website in full action for a church in Auckland, New Zealand: <a href="https://shilohministries.nz" target="_blank" rel="noopener" className="font-semibold text-accent underline underline-offset-4">Shiloh Ministries, shilohministries.nz</a>.
        </p>
      </Section>

      {/* Three ways */}
      <Section eyebrow="Three ways to do it" title={<>Relax with your coffee. <em>Claude does most of the work.</em></>}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6" data-reveal><h3 className="text-xl font-bold">1. The full manual</h3><p className="mt-2 text-muted">Every session as a PDF and the complete book: more than 450 pages with real screenshots.</p></div>
          <div className="card p-6" data-reveal><h3 className="text-xl font-bold">2. Do it with Claude</h3><p className="mt-2 text-muted">A Claude Project with our ready-made files. Say &ldquo;Start Part 1&rdquo; and Claude takes you through every step.</p></div>
          <div className="card relative border-line-strong p-6" data-reveal>
            <span className="absolute -top-3 left-6 rounded-full bg-[var(--btn)] px-3 py-1 text-xs font-bold text-white">Recommended</span>
            <h3 className="text-xl font-bold">3. Let Claude lead</h3>
            <p className="mt-2 text-muted">Our Claude guide, included for every buyer, teaches Claude the whole course. Claude does most of the work and checks with you every step: &ldquo;Can you see the page? Is it open?&rdquo; You type your own passwords and say yes before anything goes live.</p>
          </div>
        </div>
      </Section>

      {/* Prices */}
      <Section id="prices" alt eyebrow="Choose your course" title={<>Each course on its own, or <em>the complete package.</em></>} intro="Every session has a short video, a PDF, a checklist and a quiz. Every course includes Start Here (set up Claude) and its Claude guide.">
        {!STRIPE_LIVE && showBuy && (
          <p className="mb-6 rounded-2xl border border-line-strong bg-panel p-4 text-sm text-muted">Preview: these Buy buttons use Stripe&rsquo;s test mode. No real money moves.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courseProducts.map((c) => (
            <div key={c.id} id={c.id} className={`card flex scroll-mt-24 flex-col overflow-hidden ${c.best ? "border-line-strong" : ""}`} data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.imageSmall} alt="" width={640} height={360} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  {c.was && <s className="text-muted">{c.was}</s>}
                  <span className="font-display text-3xl font-extrabold">{c.price}</span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted">{c.short}</p>
                {showBuy ? (
                  <a href={c.buy} className="btn btn-primary mt-5 w-full">Buy {c.best ? "the package" : c.name.split(":")[0]}</a>
                ) : (
                  <span className="btn btn-ghost mt-5 w-full cursor-default">Sales open soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="card mt-6 p-6" data-reveal>
          <h3 className="text-lg font-bold">Thank-you gift</h3>
          <p className="mt-1 text-muted">Every buyer gets their own code for <strong className="text-ink">20% off their next purchase</strong>. Single use, valid for about 30 days.</p>
        </div>
        <p className="mt-4 text-center text-sm text-muted">Prices in US dollars. Secure checkout by Stripe. Instant digital download.{legalApproved.termsOfSale && <> By buying you agree to our <Link href="/terms-of-sale" className="underline">Terms of Sale</Link>; see our <Link href="/refund-policy" className="underline">Refund Policy</Link>.</>}</p>
        {!showBuy && <p className="mt-2 text-center text-sm text-muted">Want to hear the moment sales open? Email <a className="text-accent underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.</p>}
      </Section>

      {/* Good to know */}
      <Section eyebrow="Good to know" title={<>What you need, and what it <em>costs to run.</em></>}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card p-6" data-reveal><h3 className="mb-4 text-xl font-bold">What you need</h3><Checks items={["A Windows 10 or later PC, or a Mac with macOS 13 or later (8 GB memory, 16 recommended)", "Steady broadband internet and a smartphone", "Claude: the course works on the free plan; we recommend one month of a paid plan while you build"]} /></div>
          <div className="card p-6" data-reveal><h3 className="mb-4 text-xl font-bold">What it costs to run</h3><Checks items={["Your web address: usually about 10 to 15 US dollars a year", "Claude: one month of a paid plan recommended", "Hosting: at the time we made this course, free for a church or personal website; a business needs the host's paid plan", "Everything else the course uses: no charge for what the course uses"]} /></div>
          <div className="card p-6" data-reveal><h3 className="mb-4 text-xl font-bold">How long it takes</h3><Checks items={["All three courses: about three to four days of work, spread over a week or two", "Your website can be online within the first day or two"]} /></div>
        </div>
      </Section>

      {/* Who made this */}
      <Section alt eyebrow="Who made this">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/abri-brancken-320.webp" srcSet="/images/abri-brancken-320.webp 320w, /images/abri-brancken-400.webp 400w" sizes="220px" alt="Dr. Abri Brancken" width={640} height={800} loading="lazy" className="w-44 rounded-3xl border border-line-strong shadow-[var(--shadow-soft)] sm:w-56" />
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold">Dr. Abri Brancken</h2>
            <p className="mt-3 text-lg text-muted">Dr. Abri Brancken is a senior pastor with 33 years in full-time ministry. He has planted several churches, served in churches of up to 17,000 members and ministered in more than 30 countries. He knows where churches struggle, and put this course together as a well-thought-through tool for any church, especially church plants, start-ups and outreaches.</p>
          </div>
        </div>
      </Section>

      {/* Questions */}
      <Section id="faq" alt eyebrow="Questions" title={<>Questions people <em>ask us.</em></>}>
        <JsonLd data={faqJsonLd(faqs)} />
        <div className="grid max-w-3xl gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                <h3 className="text-lg">{f.q}</h3>
                <Icon name="chevron" className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* Commitment */}
      <Section eyebrow="Our commitment to you">
        <div className="max-w-2xl" data-reveal>
          <Checks items={["Your passwords stay with you.", "Nothing that costs money or goes live happens without your yes.", <>Need help? Email <a className="text-accent underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. Where it is really needed, we arrange a short Zoom call.</>]} />
          <p className="mt-6 text-sm text-muted">A guide only: the course sets out, to the best of our knowledge and ability, the steps used to build shilohministries.nz. Services change their screens and prices; see the disclaimer in every PDF.</p>
        </div>
      </Section>

      <CtaBand title={<>Build it yourself, <em>with Claude beside you.</em></>} primary={{ label: "Choose your course", href: "#prices" }} secondary={{ label: "Questions? Contact us", href: "/contact" }} />
      <p className="sr-only"><Link href="/shop">Back to the shop</Link></p>
    </>
  );
}
