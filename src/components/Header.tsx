"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { mainNav, type NavItem } from "@/config/site";
import { useOpenUntilNavigate } from "@/lib/hooks";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";
import { InstallAppButton } from "./Pwa";

function isActive(pathname: string, href: string) {
  const path = href.split("#")[0];
  return path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(path + "/");
}

/** A top-menu item with a drop-down list (opens on hover or click; Escape or a click elsewhere closes it). */
function Dropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useOpenUntilNavigate();
  const ref = useRef<HTMLLIElement>(null);
  const active = item.children?.some((c) => isActive(pathname, c.href));
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open, setOpen]);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors ${active ? "bg-panel-strong text-ink" : "text-muted hover:text-ink"}`}
      >
        {item.label}
        <Icon name="chevron" className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute left-0 top-full z-50 pt-2 transition-all duration-200 ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}>
        <ul className="w-72 rounded-2xl border border-line bg-bg p-2 shadow-[var(--shadow-soft)]">
          {item.children!.map((c) => (
            <li key={c.href + c.label}>
              <Link href={c.href} className={`block rounded-xl px-3 py-2 text-[0.95rem] transition-colors hover:bg-panel ${pathname === c.href ? "font-semibold text-accent" : ""}`}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useOpenUntilNavigate();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center gap-4">
        <Logo className="h-8 w-auto sm:h-9" />
        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) =>
              item.children ? (
                <Dropdown key={item.label} item={item} pathname={pathname} />
              ) : (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className={`rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors ${isActive(pathname, item.href) ? "bg-panel-strong text-ink" : "text-muted hover:text-ink"}`}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 lg:ml-2">
          <ThemeToggle />
          <InstallAppButton page="top" label="Get our app" className="btn !min-h-10 gap-1.5 !px-3 text-sm whitespace-nowrap bg-[#f97316] text-[#1a0b00] hover:bg-[#ea580c] hover:text-white" />
          <Link href="/assessment" className="btn btn-primary hidden !min-h-10 whitespace-nowrap !px-4 text-sm xl:inline-flex">Free assessment</Link>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg lg:hidden">
          <ul className="wrap grid gap-1 py-3">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 font-semibold hover:bg-panel [&::-webkit-details-marker]:hidden">
                      {item.label}
                      <Icon name="chevron" className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="pb-2 pl-3">
                      {item.children.map((c) => (
                        <li key={c.href + c.label}><Link href={c.href} className="block rounded-xl px-3 py-2.5 text-muted hover:bg-panel hover:text-ink">{c.label}</Link></li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className="block rounded-xl px-3 py-3 font-semibold hover:bg-panel">{item.label}</Link>
                )}
              </li>
            ))}
            <li className="grid gap-2 pt-3">
              <Link href="/app" className="btn w-full bg-[#f97316] text-[#1a0b00]"><Icon name="smartphone" className="h-4 w-4" /> How to install our app</Link>
              <Link href="/assessment" className="btn btn-primary w-full">Start your free assessment</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
