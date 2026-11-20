import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CtaBand, Checks } from "@/components/Blocks";
import { AppButtons, InstallAppPanel } from "@/components/Pwa";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/config/site";

// "How to install our app": made like the Get our app page on shilohministries.nz (20 Nov 2026).
export const metadata: Metadata = {
  title: "How to install the WiseIntegrate app",
  description: "Add the free WiseIntegrate app to your phone or computer in a few taps: iPhone, Android, Windows and Mac. No app store needed. Courses, AI guides and news in one place.",
  alternates: { canonical: "/app" },
};

const steps = {
  iphone: [
    <>Open <strong className="text-ink">www.wiseintegrate.com</strong> in <strong className="text-ink">Safari</strong>.</>,
    <>Tap the <strong className="text-ink">Share</strong> button (a square with an arrow pointing up). On newer iPhones, tap the <strong className="text-ink">three dots (•••)</strong> first, then <strong className="text-ink">Share</strong>.</>,
    <>Scroll down and tap <strong className="text-ink">Add to Home Screen</strong>.</>,
    <>Check the name says <strong className="text-ink">WiseIntegrate</strong>, then tap <strong className="text-ink">Add</strong>. The blue W icon is now on your home screen.</>,
  ],
  android: [
    <>Open <strong className="text-ink">www.wiseintegrate.com</strong> in <strong className="text-ink">Chrome</strong>.</>,
    <>If you see an <strong className="text-ink">Install</strong> button at the top of this page, tap it and you are done.</>,
    <>Otherwise tap the <strong className="text-ink">menu</strong> (three dots at the top right).</>,
    <>Tap <strong className="text-ink">Install app</strong> or <strong className="text-ink">Add to Home screen</strong>, then <strong className="text-ink">Install</strong>.</>,
  ],
};

function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to install the WiseIntegrate app on an iPhone",
    description: "Add the free WiseIntegrate web app to an iPhone home screen. No app store needed.",
    url: abs("/app"),
    totalTime: "PT1M",
    step: [
      { "@type": "HowToStep", position: 1, text: "Open www.wiseintegrate.com in Safari." },
      { "@type": "HowToStep", position: 2, text: "Tap the Share button (a square with an arrow pointing up)." },
      { "@type": "HowToStep", position: 3, text: "Scroll down and tap Add to Home Screen." },
      { "@type": "HowToStep", position: 4, text: "Check the name says WiseIntegrate, then tap Add." },
    ],
  };
}

function Numbered({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="grid gap-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-muted">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--btn)] text-sm font-bold text-white">{i + 1}</span>
          <span className="pt-0.5">{it}</span>
        </li>
      ))}
    </ol>
  );
}

export default function AppPage() {
  return (
    <>
      <JsonLd data={[howToJsonLd(), breadcrumbJsonLd([{ name: "How to install our app", href: "/app" }])]} />
      <PageHero eyebrow="The WiseIntegrate app" title={<>How to install <em>our app.</em></>} intro="Your courses, AI guides and our latest news, one tap away. It is free, there is no app store, and it takes less than a minute." />

      <Section>
        <div className="max-w-3xl">
          <InstallAppPanel />
        </div>
        <h2 className="mt-10 text-2xl font-extrabold">Choose your device</h2>
        <p className="mt-2 text-muted">Tap your phone or computer below and we install the app for you, or show you exactly where to tap.</p>
        <AppButtons />
      </Section>

      <Section alt id="steps" eyebrow="Step by step" title={<>Where to tap, <em>device by device.</em></>}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card p-6" data-reveal>
            <h3 className="text-xl font-bold">iPhone or iPad</h3>
            <div className="mt-4"><Numbered items={steps.iphone} /></div>
          </div>
          <div className="card p-6" data-reveal>
            <h3 className="text-xl font-bold">Android phone</h3>
            <div className="mt-4"><Numbered items={steps.android} /></div>
            <p className="mt-4 text-sm text-muted">Samsung Internet: tap the <strong className="text-ink">menu</strong> (three lines), then <strong className="text-ink">Add page to</strong>, then <strong className="text-ink">Home screen</strong>.</p>
          </div>
          <div className="card p-6" data-reveal>
            <h3 className="text-xl font-bold">Computer</h3>
            <ul className="mt-4 grid gap-3 text-muted">
              <li><strong className="text-ink">Chrome (Windows or Mac):</strong> click the small <strong className="text-ink">install icon</strong> at the right end of the address bar, then <strong className="text-ink">Install</strong>.</li>
              <li><strong className="text-ink">Microsoft Edge:</strong> click <strong className="text-ink">App available</strong> at the right end of the address bar, then <strong className="text-ink">Install</strong>.</li>
              <li><strong className="text-ink">Safari on a Mac:</strong> click <strong className="text-ink">File</strong>, then <strong className="text-ink">Add to Dock</strong>, then <strong className="text-ink">Add</strong>.</li>
              <li><strong className="text-ink">Firefox:</strong> cannot install web apps yet. Bookmark the page (<strong className="text-ink">Ctrl + D</strong>, or <strong className="text-ink">Cmd + D</strong> on a Mac), or use Chrome, Edge or Safari.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section eyebrow="What is a web app?" title={<>Our website, saved as an <em>app.</em></>}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div data-reveal>
            <p className="text-lg text-muted">A web app is our website saved to your home screen. It gets its own icon, the blue W, and opens full screen, just like any other app.</p>
            <div className="mt-6"><Checks items={[
              <><strong className="text-ink">It is free.</strong> There is nothing to buy and no account to create.</>,
              <><strong className="text-ink">No app store.</strong> You add it straight from this website.</>,
              <><strong className="text-ink">It takes up almost no space</strong> on your phone.</>,
              <><strong className="text-ink">It updates itself,</strong> so you always see the latest courses, guides and news.</>,
            ]} /></div>
          </div>
          <div className="card p-6" data-reveal>
            <h3 className="text-xl font-bold">What you will find in the app</h3>
            <div className="mt-4"><Checks items={[
              <><Link href="/shop" className="text-accent underline">Our courses and Claude tools</Link>, and your purchase page with your downloads</>,
              <><Link href="/blog" className="text-accent underline">AI guides and articles</Link> for churches and businesses</>,
              <><Link href="/assessment" className="text-accent underline">The free AI Readiness Assessment</Link></>,
              <>Ask WiseIntegrate: questions answered from our website</>,
              <>Pages you opened before still open when you are offline</>,
            ]} /></div>
          </div>
        </div>
      </Section>

      <CtaBand title={<>Need a <em>hand?</em></>} text={`Email ${site.email} and we will gladly help you set it up.`} primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Back to home", href: "/" }} />
    </>
  );
}
