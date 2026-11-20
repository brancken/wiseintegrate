"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/site";
import { useOpenUntilNavigate } from "@/lib/hooks";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "./Icon";
import { InstallAppButton } from "./Pwa";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useOpenUntilNavigate();
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center gap-4">
        <Logo className="h-8 w-auto sm:h-9" />
        <nav aria-label="Primary" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={`rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors ${active ? "bg-panel-strong text-ink" : "text-muted hover:text-ink"}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
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
        <nav id="mobile-menu" aria-label="Menu" className="border-t border-line bg-bg lg:hidden">
          <ul className="wrap grid gap-1 py-3">
            <li><Link href="/" className="block rounded-xl px-3 py-3 font-medium hover:bg-panel">Home</Link></li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined} className="block rounded-xl px-3 py-3 font-medium hover:bg-panel">{item.label}</Link>
              </li>
            ))}
            <li><Link href="/faq" className="block rounded-xl px-3 py-3 font-medium hover:bg-panel">FAQ</Link></li>
            <li className="pt-2"><Link href="/assessment" className="btn btn-primary w-full">Start your free assessment</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
