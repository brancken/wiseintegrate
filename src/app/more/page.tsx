import type { Metadata } from "next";
import Link from "next/link";
import { mainNav, footerLinks } from "@/config/site";
import { Icon } from "@/components/Icon";
import { InstallAppButton } from "@/components/Pwa";

export const metadata: Metadata = { title: "Menu", description: "Everything on the WiseIntegrate site in one place: shop, services for churches and businesses, the free assessment, blog, FAQ, contact and legal pages.", alternates: { canonical: "/more" } };

export default function More() {
  const links = [...mainNav, { label: "Free AI Readiness Assessment", href: "/assessment" }, { label: "FAQ", href: "/faq" }, { label: "Get the app", href: "/app" }, ...footerLinks[3].links];
  return (
    <div className="wrap max-w-xl py-10">
      <h1 className="text-3xl font-extrabold">Menu</h1>
      <ul className="mt-6 grid gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="card flex items-center justify-between px-5 py-4 font-semibold">
              {l.label} <Icon name="arrow" className="h-4 w-4 text-accent" />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8"><InstallAppButton /></div>
    </div>
  );
}
