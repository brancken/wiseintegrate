import Link from "next/link";
import type { Product } from "@/config/products";
import { Icon } from "./Icon";

export function ProductCard({ p, featured = false, priority = false }: { p: Product; featured?: boolean; priority?: boolean }) {
  const soon = p.status === "soon";
  return (
    <Link href={p.href} className={`card group flex flex-col overflow-hidden ${featured ? "md:col-span-2 md:flex-row" : ""}`} data-reveal>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={p.imageSmall ?? p.image}
          srcSet={p.imageSmall ? `${p.imageSmall} 640w, ${p.imageMid ? `${p.imageMid} 800w, ` : ""}${p.image} 1280w` : undefined}
          sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          alt=""
          width={1280}
          height={720}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={`aspect-video w-full object-cover ${featured ? "md:m-5 md:w-[calc(50%-1.25rem)] md:self-center md:rounded-2xl" : ""}`}
        />
      ) : (
        <div className="hero-glow grid aspect-[3/1] w-full place-items-center bg-panel-strong text-accent md:aspect-video">
          <Icon name="sparkles" className="h-10 w-10" />
        </div>
      )}
      <div className={`flex flex-1 flex-col p-6 ${featured ? "md:justify-center md:p-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          {p.badge && <span className="rounded-full bg-[var(--btn)] px-2.5 py-1 text-white">{p.badge}</span>}
          {soon && <span className="rounded-full bg-[#f97316] px-2.5 py-1 text-[#1a0b00]">Coming soon</span>}
          <span className="text-muted">{p.audience}</span>
        </div>
        <h3 className={`mt-3 font-bold ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>{p.name}</h3>
        <p className="mt-2 flex-1 text-muted">{p.short}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-display text-lg font-extrabold">{p.price}</span>
          {(!soon || !p.href.includes("#")) && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-accent">
              {soon ? "See what is inside" : "See the course"} <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
