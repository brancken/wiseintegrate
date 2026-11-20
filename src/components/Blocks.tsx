import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

/** Top of an inner page: small label, big title (one phrase can be blue via <em>), short intro. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="hero-glow border-b border-line">
      <div className="wrap py-16 sm:py-20">
        {eyebrow && <p className="eyebrow rise">{eyebrow}</p>}
        <h1 className="rise mt-3 max-w-4xl text-[clamp(2.1rem,1.4rem+3vw,3.6rem)] font-extrabold leading-[1.08] [&_em]:not-italic [&_em]:grad" style={{ "--d": "60ms" } as React.CSSProperties}>
          {title}
        </h1>
        {intro && <p className="rise mt-5 max-w-2xl text-lg text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>{intro}</p>}
        {children && <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "180ms" } as React.CSSProperties}>{children}</div>}
      </div>
    </section>
  );
}

/** A page section with an optional label, heading and intro. alt = slightly different background. */
export function Section({ id, eyebrow, title, intro, alt, children, center }: { id?: string; eyebrow?: string; title?: ReactNode; intro?: ReactNode; alt?: boolean; center?: boolean; children?: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-20 ${alt ? "bg-bg-alt" : ""}`}>
      <div className="wrap">
        {(eyebrow || title || intro) && (
          <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`} data-reveal>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="mt-3 text-[clamp(1.7rem,1.2rem+2vw,2.6rem)] font-extrabold leading-tight [&_em]:not-italic [&_em]:grad">{title}</h2>}
            {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** A card with an icon, title and text. Add href to make the whole card a link. */
export function FeatureCard({ icon, title, children, href, cta }: { icon?: string; title: ReactNode; children?: ReactNode; href?: string; cta?: string }) {
  const inner = (
    <>
      {icon && (
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-panel-strong text-accent">
          <Icon name={icon} className="h-5 w-5" />
        </span>
      )}
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      {children && <div className="mt-2 text-muted [&_li]:mt-1.5 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">{children}</div>}
      {href && cta && (
        <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent">
          {cta} <Icon name="arrow" className="h-4 w-4" />
        </span>
      )}
    </>
  );
  return href ? (
    <Link href={href} className="card block p-6" data-reveal>{inner}</Link>
  ) : (
    <div className="card p-6" data-reveal>{inner}</div>
  );
}

/** Numbered steps (the four-step process and similar). */
export function Steps({ steps }: { steps: { title: string; text: ReactNode }[] }) {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="card p-6" data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
          <span className="font-display text-4xl font-extrabold text-accent">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
          <p className="mt-2 text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** A call-to-action band at the bottom of pages. */
export function CtaBand({ title, text, primary, secondary }: { title: ReactNode; text?: ReactNode; primary: { label: string; href: string }; secondary?: { label: string; href: string } }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="wrap">
        <div className="hero-glow card overflow-hidden p-8 text-center sm:p-12" data-reveal>
          <h2 className="mx-auto max-w-2xl text-[clamp(1.6rem,1.2rem+1.8vw,2.4rem)] font-extrabold leading-tight [&_em]:not-italic [&_em]:grad">{title}</h2>
          {text && <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{text}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={primary.href} className="btn btn-primary">{primary.label} <Icon name="arrow" className="h-4 w-4" /></Link>
            {secondary && <Link href={secondary.href} className="btn btn-ghost">{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Check-mark list. */
export function Checks({ items }: { items: ReactNode[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-muted">
          <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={2.4} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
