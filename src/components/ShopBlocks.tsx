import Link from "next/link";
import { courseProducts, type Product } from "@/config/products";
import { Icon } from "@/components/Icon";

/** The four course blocks (home page and shop): picture, name, short text, price, each opening its own page. */
export function CourseBlocks({ priority = false }: { priority?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {courseProducts.map((c, i) => (
        <Link key={c.id} href={c.href} className={`card group flex flex-col overflow-hidden ${c.best ? "ring-2 ring-[var(--accent)]" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.imageSmall} alt="" width={640} height={360} loading={priority && i < 2 ? "eager" : "lazy"} decoding="async" className="aspect-video w-full object-cover" />
          <div className="flex flex-1 flex-col p-5">
            {c.best && <span className="mb-2 w-fit rounded-full bg-[#f97316] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#1a0b00]">Best value</span>}
            <h3 className="text-lg font-bold leading-snug">{c.name}</h3>
            <p className="mt-1 flex-1 text-sm text-muted">{c.short}</p>
            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="font-display text-xl font-extrabold">{c.price}{c.was && <s className="ml-2 text-sm font-semibold text-muted">{c.was}</s>}</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">More <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Coming-soon products in the same block style. */
export function SoonBlocks({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p) => {
        const hasPage = !p.href.includes("#");
        const inner = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imageSmall ?? p.image} alt="" width={640} height={360} loading="lazy" decoding="async" className="aspect-video w-full object-cover" />
            <div className="flex flex-1 flex-col p-5">
              <span className="mb-2 w-fit rounded-full bg-[#f97316] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#1a0b00]">Coming soon</span>
              <h3 className="text-lg font-bold leading-snug">{p.name}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{p.short}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="font-display text-xl font-extrabold">{p.price}</span>
                {hasPage && <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">More <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>}
              </div>
            </div>
          </>
        );
        return hasPage ? (
          <Link key={p.id} href={p.href} className="card group flex flex-col overflow-hidden">{inner}</Link>
        ) : (
          <div key={p.id} className="card flex flex-col overflow-hidden">{inner}</div>
        );
      })}
    </div>
  );
}
