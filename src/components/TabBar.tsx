"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabNav } from "@/config/site";
import { Icon } from "./Icon";

/** The bottom bar on phones and tablets, like a phone app. */
export function TabBar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary (mobile)" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {tabNav.map((t) => {
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          return (
            <li key={t.href}>
              <Link href={t.href} aria-current={active ? "page" : undefined} className={`flex h-16 flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold transition-colors ${active ? "text-accent" : "text-muted"}`}>
                <span className={`grid h-8 w-12 place-items-center rounded-full transition-all duration-300 ${active ? "bg-panel-strong text-ink" : ""}`}>
                  <Icon name={t.icon ?? "arrow"} className="h-[1.3rem] w-[1.3rem]" />
                </span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
