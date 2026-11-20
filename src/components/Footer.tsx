import Link from "next/link";
import { footerLinks, site } from "@/config/site";
import { Logo } from "./Logo";
import { InstallAppButton } from "./Pwa";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-bg-alt">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(4,1fr)]">
        <div>
          <Logo className="h-9 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-muted">{site.tagline}</p>
          <p className="mt-3 text-sm text-muted">Based in {site.location}. Working with organisations everywhere, online.</p>
          <div className="mt-5"><InstallAppButton /></div>
        </div>
        {footerLinks.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-accent">{col.title}</h2>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-muted transition-colors hover:text-ink">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-xs text-muted">
          <p>&copy; 2026 WiseIntegrate. All rights reserved.</p>
          <p>
            <a href={`mailto:${site.email}`} className="hover:text-ink">{site.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={site.facebook} target="_blank" rel="noopener" className="hover:text-ink">Facebook</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
