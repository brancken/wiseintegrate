"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * "Ask WiseIntegrate": a small question helper in the corner of every page (made like Ask Shiloh on shilohministries.nz).
 * It answers ONLY from the website's own words (FAQ answers and page text, see src/app/ask-index.json/route.ts).
 * The search runs in the visitor's browser: no AI service, no API key, no cost, nothing is sent anywhere.
 */
type Entry = { kind: "faq" | "page" | "post"; title: string; url: string; q?: string; text: string };
type Msg = { from: "me" | "bot"; text: string; links?: { label: string; href: string }[] };

const STOP = new Set("a an the and or but if is are was were be been am do does did i me my we our you your it its of to in on at for from by with about as this that these those what which who whom how when where why can could would should will shall may might there here have has had any some please tell know want like get just so not no yes".split(" "));

// Words people use for the same thing on this site.
const SYNONYMS: Record<string, string[]> = {
  price: ["cost", "us", "buy"], prices: ["price", "cost"], cost: ["price", "fee", "costs"], costs: ["cost", "price"], cheap: ["cost", "price", "free"], free: ["no", "monthly", "fee"], fee: ["cost", "monthly"], buy: ["price", "purchase", "course"], pay: ["price", "stripe", "buy"], refund: ["refund", "money", "back"],
  website: ["site", "web", "course"], site: ["website", "web"], web: ["website"], course: ["courses", "website", "lessons"], lessons: ["course", "session"], learn: ["course", "training"],
  chms: ["church", "management", "system"], crm: ["church", "management", "system"], database: ["church", "management", "system", "office"], software: ["system", "tools"],
  ai: ["artificial", "intelligence", "integration"], chatgpt: ["ai", "claude"], claude: ["ai", "claude"],
  church: ["churches", "ministry", "non"], churches: ["church", "ministry"], ministry: ["church"], nonprofit: ["non", "profit", "church"], charity: ["non", "profit"],
  business: ["businesses", "organisation", "company"], company: ["business", "organisation"], small: ["business", "individual"],
  policy: ["policies", "governance"], policies: ["policy", "pack"], safeguarding: ["child", "safety"], child: ["children", "safety"], kids: ["children", "child"],
  assessment: ["readiness", "test", "questions"], test: ["assessment"], quiz: ["assessment"], readiness: ["assessment"],
  training: ["coaching", "workshop", "train"], coach: ["coaching"], help: ["support", "contact", "stuck"], stuck: ["help", "support"],
  contact: ["email", "office", "hello"], email: ["contact", "office"], phone: ["contact", "app"], app: ["install", "home", "screen"],
  privacy: ["data", "privacy", "personal"], data: ["privacy", "data"], safe: ["privacy", "security", "boundaries"],
  who: ["founder", "brancken", "about"], founder: ["brancken", "abri"], pastor: ["brancken", "abri"],
  long: ["days", "time", "hours"], time: ["days", "hours", "long"], quick: ["days", "time"],
};

function stem(w: string) {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}
function words(s: string) {
  return s.toLowerCase().replace(/[’']/g, "").split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w));
}
function terms(s: string) {
  return words(s).map(stem);
}

type Indexed = Entry & { tf: Map<string, number>; qset: Set<string>; len: number };

function buildIndex(entries: Entry[]) {
  const docs: Indexed[] = entries.map((e) => {
    const tf = new Map<string, number>();
    const all = terms(`${e.q ?? ""} ${e.title} ${e.text}`);
    for (const t of all) tf.set(t, (tf.get(t) ?? 0) + 1);
    return { ...e, tf, qset: new Set(terms(`${e.q ?? ""} ${e.title}`)), len: all.length };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
  const avg = docs.reduce((s, d) => s + d.len, 0) / Math.max(1, docs.length);
  return { docs, df, avg, n: docs.length };
}

function search(index: ReturnType<typeof buildIndex>, question: string) {
  const base = words(question);
  const expanded = new Map<string, number>();
  for (const w of base) expanded.set(stem(w), 1);
  // Synonyms are looked up on every word, including small ones like "where" and "when".
  for (const w of question.toLowerCase().replace(/[’']/g, "").split(/[^a-z0-9]+/)) {
    for (const s of SYNONYMS[w] ?? []) if (!expanded.has(stem(s))) expanded.set(stem(s), 0.5);
  }
  const { docs, df, avg, n } = index;
  const k1 = 1.4, b = 0.7;
  const scored = docs.map((d) => {
    let score = 0;
    for (const [t, weight] of expanded) {
      const f = d.tf.get(t);
      if (!f) continue;
      const idf = Math.log(1 + (n - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
      score += weight * idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avg)));
      if (d.qset.has(t)) score += weight * idf * 0.8; // words in the question or title count extra
    }
    if (d.kind === "faq") score *= 1.35;
    if (d.kind === "post") score *= 0.8;
    return { d, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score);
}

const CHIPS = ["What does the course cost?", "Is there a free church management system?", "What is in the Church Policy Pack?", "How does the free assessment work?", "Do I need to know how to code?", "How can you help my business with AI?"];

const WELCOME: Msg = { from: "bot", text: "Hello! I can answer questions about WiseIntegrate, our courses, tools and AI services, from the information on this website. What would you like to know?" };

export function AskWise() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const indexRef = useRef<ReturnType<typeof buildIndex> | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 150); }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Not shown inside forms-only and admin pages.
  if (pathname.startsWith("/purchase")) return null;

  const answer = async (question: string) => {
    const text = question.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setQ("");
    if (/^(hi|hello|hey|good (morning|afternoon|evening)|kia ora)\b/i.test(text) && text.split(/\s+/).length <= 4) {
      setMsgs((m) => [...m, { from: "bot", text: "Kia ora! Ask me about our courses, the free church management system, the Church Policy Pack, the free AI assessment, or our AI services for churches and businesses." }]);
      return;
    }
    if (/^(thanks|thank you|cheers|ta)\b/i.test(text)) {
      setMsgs((m) => [...m, { from: "bot", text: "You're welcome! Anything else, just ask." }]);
      return;
    }
    setBusy(true);
    try {
      if (!indexRef.current) {
        const entries = (await fetch("/ask-index.json").then((r) => r.json())) as Entry[];
        indexRef.current = buildIndex(entries);
      }
      const results = search(indexRef.current, text);
      const best = results[0];
      if (!best || best.score < 2.2) {
        setMsgs((m) => [...m, { from: "bot", text: "Sorry, I couldn't find that on our website. Please try different words, or get in touch with us and we'll gladly help.", links: [{ label: "Contact us", href: "/contact" }, { label: "Frequently asked questions", href: "/faq" }] }]);
        return;
      }
      const links: { label: string; href: string }[] = [{ label: best.d.title, href: best.d.url }];
      for (const r of results.slice(1, 8)) {
        if (links.length >= 3) break;
        if (r.score < best.score * 0.45) break;
        if (!links.some((l) => l.href === r.d.url)) links.push({ label: r.d.title, href: r.d.url });
      }
      const reply = best.d.kind === "faq" ? best.d.text : `From "${best.d.title}": ${best.d.text}`;
      setMsgs((m) => [...m, { from: "bot", text: reply, links }]);
    } catch {
      setMsgs((m) => [...m, { from: "bot", text: "Sorry, something went wrong. Please try again in a moment.", links: [{ label: "Contact us", href: "/contact" }] }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="ask-wise"
        aria-label={open ? "Close Ask WiseIntegrate" : "Ask WiseIntegrate a question"}
        className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3 z-30 flex h-12 items-center gap-2 rounded-full bg-[var(--btn)] px-4 font-semibold text-white shadow-soft transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
      >
        <Icon name={open ? "close" : "chat"} className="h-5 w-5" />
        <span className="hidden sm:inline">{open ? "Close" : "Ask us"}</span>
      </button>

      {open && (
        <section
          id="ask-wise"
          role="dialog"
          aria-label="Ask WiseIntegrate"
          className="fixed bottom-[calc(8.25rem+env(safe-area-inset-bottom))] right-3 z-50 flex h-[min(34rem,calc(100dvh-11rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-bg shadow-soft lg:bottom-24 lg:right-6"
        >
          <header className="flex items-center gap-3 border-b border-line bg-panel px-4 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-192.png" alt="" width={36} height={36} className="h-9 w-9 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="font-display font-semibold leading-tight">Ask WiseIntegrate</p>
              <p className="text-xs text-muted">Answers from our website</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-bg"><Icon name="close" className="h-4 w-4" /></button>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.from === "me" ? "flex justify-end" : "flex"}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.95rem] leading-relaxed ${m.from === "me" ? "bg-[var(--btn)] text-white" : "bg-panel"}`}>
                  <p>{m.text}</p>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.links.map((l) => (
                        <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-full border border-accent/40 bg-bg px-2.5 py-1 text-xs font-semibold text-accent hover:border-accent">
                          {l.label} &rarr;
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && <p className="text-sm text-muted">Looking that up&hellip;</p>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {CHIPS.map((c) => (
                  <button key={c} type="button" onClick={() => answer(c)} className="rounded-full border border-line bg-bg px-3 py-1.5 text-left text-xs font-semibold hover:border-accent">{c}</button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); answer(q); }} className="flex items-center gap-2 border-t border-line p-3">
            <label htmlFor="ask-wise-input" className="sr-only">Your question</label>
            <input
              id="ask-wise-input"
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type your question…"
              autoComplete="off"
              maxLength={200}
              className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-[0.95rem] outline-none focus:border-accent"
            />
            <button type="submit" disabled={!q.trim() || busy} aria-label="Send" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--btn)] text-white disabled:opacity-40"><Icon name="arrow" className="h-5 w-5" /></button>
          </form>
          <p className="px-4 pb-2 text-center text-[0.7rem] text-muted">Answers come from this website only. Nothing you type is stored or sent anywhere.</p>
        </section>
      )}
    </>
  );
}
