import type { Metadata } from "next";
import Link from "next/link";
import { courseProducts } from "@/config/products";
import { site } from "@/config/site";
import { PageHero, Section, Steps, CtaBand, Checks } from "@/components/Blocks";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { abs, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

// Every fact on this page comes from the How to Make a Website course files
// (Start Here introduction and Course 1 session texts) or is already on the course page.
// Do not add competitor prices or features here without checking the vendor's own website.

const PATH = "/church-management-system";
const UPDATED = "2026-11-20";

const description =
  "Build your own church management system on Google: forms, people, follow-ups, group emails, backups and a team dashboard. On free Gmail, no monthly fees.";

export const metadata: Metadata = {
  title: { absolute: "Free Church Management System on Google, No Monthly Fee" },
  description,
  alternates: { canonical: PATH },
  openGraph: { images: ["/images/courses/course-1-v3.webp"] },
};

const course1 = courseProducts.find((c) => c.id === "htmaw-course-1");
const pkg = courseProducts.find((c) => c.id === "htmaw-package");

const visitorFlow = [
  "Their details go into a response sheet.",
  "They are added to your People list.",
  "A row appears in Follow Ups, so somebody phones them within three days.",
  'They are added to Google Contacts with the label "New Visitors".',
  "The office gets an email, and the visitor gets a thank-you email.",
];

const features = [
  { icon: "lock", t: "Accounts that belong to the church", p: 'Accounts that belong to your organisation, not to one person, with role addresses such as "office" and 2-step verification.' },
  { icon: "book", t: "Tidy Google Drive folders", p: "One place where everything is kept, with private answers kept private." },
  { icon: "mail", t: "Online forms", p: "Forms for new visitors, baptism, groups, events and pastoral care, each linked to its own response sheet." },
  { icon: "users", t: "People, follow-ups and groups", p: "A People list of everyone, a Follow Ups list of who needs a call, and groups as labels in Google Contacts." },
  { icon: "sparkles", t: "Automatic care", p: "Thank-you emails for visitors, birthday emails, group emails with each person's own name, and a backup copy of your lists every second Sunday." },
  { icon: "smartphone", t: "A private team dashboard", p: "One login page with big buttons for people, groups, group emails, forms and follow-ups, on a computer or a phone. It can have its own short web address." },
];

const costs: { item: string; cost: string }[] = [
  { item: "A free Gmail account for the church (Path A)", cost: "No charge" },
  { item: "Google Forms, Sheets, Drive, Contacts and the scripts", cost: "No charge on either path" },
  { item: "Google Workspace (Path B, optional: own-domain addresses, a login for each person)", cost: "A monthly price for each person, or no charge if Google for Nonprofits accepts your registered charity" },
  { item: "A short web address for the dashboard (optional)", cost: "No charge as part of a domain you already own; otherwise the yearly fee for a domain. A bookmark of the long address also works." },
  { item: "Claude, the AI assistant that guides you", cost: "The course works on Claude's free plan. We recommend one month of a paid plan while you build." },
  { item: `${course1?.name ?? "Course 1"} (the course itself)`, cost: `${course1?.price ?? ""} once, or ${pkg?.price ?? ""} for the complete package of three courses` },
];

const compare: { row: string; ours: string; paid: string }[] = [
  { row: "Monthly fee", ours: "None on a free Gmail account. Workspace (optional) is per person, or free for churches Google for Nonprofits accepts.", paid: "Usually a subscription. Prices and free tiers vary by vendor and church size, so check each vendor's own website." },
  { row: "Where your data lives", ours: "In your own Google account: your Drive, your Sheets, your Contacts.", paid: "On the vendor's system, under the vendor's terms." },
  { row: "Setup", ours: "You build it yourself with Claude: about 5 to 7 hours hands-on for Course 1.", paid: "Ready-made. You sign up, set it up and bring your people across." },
  { row: "Flexibility", ours: "You can change the forms, lists, emails and dashboard yourself, with Claude's help.", paid: "You work within the features the vendor offers." },
  { row: "Extras such as child check-in or online giving", ours: "Not part of Course 1.", paid: "Many dedicated systems offer features like these. Check what each plan includes." },
];

const steps = [
  { title: "Set up Claude", text: "The three short Start Here sessions (about 1 to 1.5 hours) set up Claude, connect your tools safely and show you how to ask." },
  { title: "Choose your path", text: "Part 1 helps you choose free Gmail (Path A) or Google Workspace (Path B), and whether to apply to Google for Nonprofits." },
  { title: "Build the office", text: "Parts 2 to 7: church accounts and 2-step verification, Drive folders, forms, the People and Follow Ups lists, groups and the automations." },
  { title: "Open the dashboard", text: "Parts 8 to 10: the login dashboard, an optional short address, sharing checks and a simple weekly routine." },
];

const faqs = [
  { q: "Is there really no monthly fee?", a: "On a free Gmail account (Path A) the church management system has no monthly fees: the forms, sheets, Drive, Contacts and scripts it uses cost nothing. Google Workspace (Path B) is optional and charged per person, unless Google for Nonprofits accepts your church." },
  { q: "What does a church management system do?", a: "A church management system is simply a place that keeps your people, your forms and your emails together. Ours does it with Google's own tools: forms, a People list, a Follow Ups list, groups, automatic emails, backups and a team dashboard." },
  { q: "Do I need to know how to code?", a: "No. The course was written for people who can copy, paste and click. You copy ready-made scripts into Google, and Claude guides you through every step and checks with you as you go." },
  { q: "How long does it take to build?", a: "Course 1 takes about 5 to 7 hours of hands-on time for a beginner, after the Start Here sessions of about 1 to 1.5 hours." },
  { q: "Free Gmail or Google Workspace?", a: "If one person does the office work and there is no money to spare, start with free Gmail. With two or more office people, or if you want addresses on your own domain, choose Google Workspace, and apply to Google for Nonprofits first if you are a registered charity. Nothing is wasted if you move later: the folders, forms and scripts are the same." },
  { q: "How many emails can it send?", a: "Google limits how many people scripts can email in a day. When the course was written this was about 100 people a day on free Gmail and about 1,500 on Google Workspace. Check Google's Quotas for Google services page if your church is large." },
  { q: "Can I bring in our existing list of people?", a: "Yes. An appendix to Course 1 shows how to import an existing list of people, along with contact sync and a forms manager." },
  { q: "Who made it?", a: "Dr. Abri Brancken, a senior pastor with 33 years in full-time ministry who has planted several churches and served in churches of up to 17,000 members. The system was first built for Shiloh Ministries, a church in Auckland, New Zealand." },
];

function pageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": abs(`${PATH}#page`),
    url: abs(PATH),
    name: "Free church management system on Google, with no monthly fee",
    headline: "A church management system on Google, with no monthly fee",
    description,
    inLanguage: "en-NZ",
    isPartOf: { "@id": abs("/#website") },
    publisher: { "@id": abs("/#org") },
    author: { "@type": "Person", "@id": abs("/about#founder"), name: site.founder.name },
    datePublished: UPDATED,
    dateModified: UPDATED,
    image: abs("/images/courses/course-1-v3.webp"),
    about: { "@type": "Thing", name: "Church management system" },
  };
}

const th = "border border-line px-4 py-3 text-left font-bold";
const td = "border border-line px-4 py-3 align-top text-muted";

export default function ChurchManagementSystemPage() {
  return (
    <>
      <JsonLd data={[pageJsonLd(), breadcrumbJsonLd([{ name: "Church management system", href: PATH }])]} />

      <PageHero
        eyebrow="For churches and charities"
        title={<>A church management system on Google, <em>with no monthly fee</em></>}
        intro={
          <>
            You can build your own church management system from Google&rsquo;s tools: online forms, a People list, follow-ups, groups, thank-you, birthday and group emails, automatic backups and a private team dashboard. On a free Gmail account it has no monthly fees. Course 1 of How to Make a Website shows you how to build it step by step, with Claude doing most of the work.
          </>
        }
      >
        <Link href="/shop/how-to-make-a-website#htmaw-course-1" className="btn btn-primary">See Course 1 <Icon name="arrow" className="h-4 w-4" /></Link>
        <Link href="/shop/how-to-make-a-website" className="btn btn-ghost">The complete package</Link>
        <p className="w-full text-sm text-muted">Last updated 20 November 2026 by {site.founder.name}</p>
      </PageHero>

      <Section id="what-it-does" eyebrow="What it does" title={<>What this church management system <em>does</em></>} intro="Many churches keep their members in a spreadsheet, or pay every month for a church database. Often the tools are not connected, and a lot is manual work that needs an admin person. This system connects it all and lets much of it run by itself.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.t} className="card p-6" data-reveal>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent"><Icon name={f.icon} className="h-5 w-5" /></span>
              <h3 className="mt-4 text-xl font-bold">{f.t}</h3>
              <p className="mt-2 text-muted">{f.p}</p>
            </div>
          ))}
        </div>
        <div className="card mt-8 max-w-3xl p-6" data-reveal>
          <h3 className="text-xl font-bold">What happens when a visitor fills in your welcome form</h3>
          <ol className="mt-4 grid list-decimal gap-2 pl-5 text-muted">
            {visitorFlow.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </div>
      </Section>

      <Section id="cost" alt eyebrow="What it costs" title={<>What a church management system on Google <em>costs</em></>} intro="Prices change, so check each company's own website. These were the prices when the course was made.">
        <div className="max-w-4xl overflow-x-auto" data-reveal>
          <table className="w-full border-collapse text-base">
            <thead><tr><th className={th}>Item</th><th className={th}>Cost</th></tr></thead>
            <tbody>
              {costs.map((c) => <tr key={c.item}><th scope="row" className={`${td} text-left font-semibold text-ink`}>{c.item}</th><td className={td}>{c.cost}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="compare" eyebrow="Compared" title={<>How it compares with <em>paid church management software</em></>} intro="Dedicated church management software is a good fit for many churches. This is an honest, general comparison, not a review of any one product.">
        <div className="max-w-5xl overflow-x-auto" data-reveal>
          <table className="w-full border-collapse text-base">
            <thead><tr><th className={th} scope="col"><span className="sr-only">Compared</span></th><th className={th}>Your own system on Google</th><th className={th}>Paid church management software</th></tr></thead>
            <tbody>
              {compare.map((c) => <tr key={c.row}><th scope="row" className={`${td} text-left font-semibold text-ink`}>{c.row}</th><td className={td}>{c.ours}</td><td className={td}>{c.paid}</td></tr>)}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="who" alt eyebrow="Is it right for you?" title={<>Who it suits, and <em>who it does not</em></>}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6" data-reveal>
            <h3 className="mb-4 text-xl font-bold">It suits</h3>
            <Checks items={[
              "A church that has no church management system, or pays for one and would like to stop",
              "Church plants, start-ups and outreaches",
              "A church whose members are still in a spreadsheet",
              "A team happy to spend about 5 to 7 hours building it with Claude",
              "Charities, clubs and organisations: only the words change",
            ]} />
          </div>
          <div className="card p-6" data-reveal>
            <h3 className="mb-4 text-xl font-bold">It may not suit</h3>
            <Checks items={[
              "A church that needs child check-in, online giving processing or built-in accounting: Course 1 does not build these, so dedicated software may fit better",
              "A large church emailing more people a day than Google allows (about 100 people a day on free Gmail when the course was written, about 1,500 on Workspace)",
              "Several office people on free Gmail: they share one login, so Google Workspace works better for two or more",
              "A church with nobody willing to look after it each week",
            ]} />
          </div>
        </div>
      </Section>

      <Section id="how-to-build" eyebrow="How to build it" title={<>How to build your church management system <em>step by step</em></>} intro="Course 1 has ten sessions. Each one is a printable guide with a checklist and a quiz.">
        <Steps steps={steps} />
        <p className="mt-8 max-w-3xl text-muted" data-reveal>
          Get <Link href="/shop/how-to-make-a-website#htmaw-course-1" className="font-semibold text-accent underline underline-offset-4">Course 1: Church Management System on Google</Link> on its own, or the <Link href="/shop/how-to-make-a-website#htmaw-package" className="font-semibold text-accent underline underline-offset-4">complete package</Link> with Course 2 (your church website) and Course 3 (getting found on Google and AI search). Want to see it working? <a href="https://shilohministries.nz" target="_blank" rel="noopener" className="font-semibold text-accent underline underline-offset-4">Shiloh Ministries in Auckland</a> was built by following exactly these steps.
        </p>
      </Section>

      <Section id="faq" alt eyebrow="Questions" title={<>Church management system: <em>questions people ask</em></>}>
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

      <CtaBand
        title={<>Keep the money <em>for your mission.</em></>}
        text="Build your own church management system on Google, step by step, with Claude beside you."
        primary={{ label: "See Course 1", href: "/shop/how-to-make-a-website#htmaw-course-1" }}
        secondary={{ label: "Read the guide to a church website", href: "/blog/how-to-build-a-church-website-with-claude" }}
      />
    </>
  );
}
