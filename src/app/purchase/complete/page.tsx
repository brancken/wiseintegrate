import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getPaidSession, stripeReady, thankYouCode } from "@/lib/stripe";
import { signedDownloads } from "@/lib/downloads";
import { downloads, productForPrice } from "@/config/products";
import { site } from "@/config/site";
import { Icon } from "@/components/Icon";
import { BookmarkHint } from "@/components/BookmarkHint";

// The buyer's page after paying (Stripe sends them here with ?session_id=...).
// Everything is checked with Stripe on every visit, so the address works as the buyer's personal course page.
export const metadata: Metadata = {
  title: "Your purchase",
  robots: { index: false, follow: false },
};

export default function PurchaseComplete({ searchParams }: PageProps<"/purchase/complete">) {
  return (
    <div className="narrow py-14">
      <Suspense fallback={<p className="min-h-[70vh] text-muted">Checking your purchase with Stripe…</p>}>
        <Purchase searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Purchase({ searchParams }: { searchParams: PageProps<"/purchase/complete">["searchParams"] }) {
  const sp = await searchParams;
  const sessionId = typeof sp.session_id === "string" ? sp.session_id : "";

  if (!stripeReady()) {
    return <Problem title="Purchases are being set up" text="This copy of the site is not connected to Stripe yet." />;
  }
  const paid = sessionId ? await getPaidSession(sessionId) : null;
  if (!paid) {
    return <Problem title="We could not find a paid purchase" text="The link may be incomplete. Please use the full link from the end of your checkout, or email us and we will send your course straight away." />;
  }

  const productIds = Array.from(new Set(paid.priceIds.map(productForPrice).filter(Boolean))) as string[];
  const [files, gift] = await Promise.all([signedDownloads(productIds), thankYouCode(paid.id)]);
  const titles = productIds.map((id) => downloads[id]?.title).filter(Boolean);
  const start = productIds.length ? downloads[productIds[0]]?.start : "Start Course 1";

  return (
    <>
      <p className="eyebrow">Thank you for your purchase</p>
      <h1 className="mt-3 text-[clamp(2rem,1.5rem+2vw,2.8rem)] font-extrabold leading-tight">
        Welcome{paid.name ? `, ${paid.name.split(" ")[0]}` : ""}. <span className="grad">Your course is ready.</span>
      </h1>
      <p className="mt-4 text-lg text-muted">
        You bought: <strong className="text-ink">{titles.join(", ") || "How to Make a Website"}</strong>. A receipt from Stripe is on its way to {paid.email || "your email"}.
      </p>
      <BookmarkHint />

      <section className="card mt-8 p-6">
        <h2 className="text-xl font-bold">1. Download your course</h2>
        {files === null ? (
          <p className="mt-3 text-muted">Downloads are being set up on this copy of the site. Email <a className="text-accent underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and we send your files straight away.</p>
        ) : (
          <ul className="mt-4 grid gap-3">
            {files.map((f) => (
              <li key={f.label} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line p-4">
                <span className="font-semibold">{f.label}</span>
                {f.url ? (
                  <a href={f.url} className="btn btn-primary"><Icon name="download" className="h-4 w-4" /> Download (ZIP)</a>
                ) : (
                  <span className="text-sm text-muted">Not available right now: please email {site.supportEmail}</span>
                )}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-sm text-muted">Download links last one hour; open this page again for fresh ones. After downloading, right-click the ZIP file and choose <strong>Extract All</strong> (on a Mac, double-click it). Do not unzip the file that starts with &ldquo;Claude guide&rdquo;: Claude needs it as a ZIP.</p>
      </section>

      <section className="card mt-6 p-6">
        <h2 className="text-xl font-bold">2. Start here</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
          <li>Open <strong className="text-ink">READ ME FIRST</strong>, then <strong className="text-ink">Start Here 00, Introduction</strong>.</li>
          <li>Choose your way: the full manual, do it with Claude, or let Claude lead (recommended).</li>
          <li>To let Claude lead: in the Claude desktop app click <strong className="text-ink">Plugins</strong>, <strong className="text-ink">Add</strong>, <strong className="text-ink">Upload plugin</strong>, choose the file that starts with &ldquo;Claude guide&rdquo;, then start a new chat and type <strong className="text-ink">{start}</strong>.</li>
        </ol>
      </section>

      <section className="card mt-6 p-6">
        <h2 className="text-xl font-bold">3. Your thank-you gift</h2>
        {gift ? (
          <>
            <p className="mt-2 text-muted">Your own code for <strong className="text-ink">20% off your next purchase</strong>, valid until {gift.expires}. Single use.</p>
            <p className="mt-4 inline-block rounded-2xl border-2 border-dashed border-line-strong px-5 py-3 font-display text-2xl font-extrabold tracking-wider">{gift.code}</p>
            <p className="mt-3 text-sm text-muted">Type it in the &ldquo;Add promotion code&rdquo; box at checkout.</p>
          </>
        ) : (
          <p className="mt-2 text-muted">Your 20% thank-you code could not be made just now. Email {site.supportEmail} and we send it to you.</p>
        )}
      </section>

      <section className="mt-8 text-muted">
        <h2 className="text-lg font-bold text-ink">Need help?</h2>
        <p className="mt-2">Most questions are answered by Claude: take a screenshot, paste it into Claude and say where you are. If you are still stuck, email <a className="text-accent underline" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. Where it is really needed, we arrange a short Zoom call.</p>
        <p className="mt-4 text-sm">A guide only: the course sets out, to the best of our knowledge and ability, the steps used to build shilohministries.nz. Services change their screens and prices; see the disclaimer in every PDF. <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy</Link>.</p>
      </section>
    </>
  );
}

function Problem({ title, text }: { title: string; text: string }) {
  return (
    <div className="card p-8 text-center">
      <h1 className="text-2xl font-extrabold">{title}</h1>
      <p className="mt-3 text-muted">{text}</p>
      <p className="mt-6">
        <a className="btn btn-primary" href={`mailto:${site.supportEmail}?subject=My%20course%20purchase`}>Email {site.supportEmail}</a>
      </p>
    </div>
  );
}
