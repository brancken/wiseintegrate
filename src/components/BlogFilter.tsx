"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const filters = [
  { value: "all", label: "All" },
  { value: "church", label: "Church" },
  { value: "business", label: "Business" },
] as const;

type Filter = (typeof filters)[number]["value"];

/** Filter buttons above the blog cards. Every card stays in the HTML; this only hides the ones that do not match. */
export function BlogFilter({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Filter>("all");
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    grid.current?.querySelectorAll<HTMLElement>("[data-category]").forEach((card) => {
      card.hidden = active !== "all" && card.dataset.category !== active;
    });
  }, [active]);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter articles">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setActive(f.value)}
            aria-pressed={active === f.value}
            className={`btn ${active === f.value ? "btn-primary" : "btn-ghost"}`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div ref={grid} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </>
  );
}
