import Link from "next/link";

/** The Wise Integrate logo (blue on transparent, readable in both themes). */
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <Link href="/" aria-label="WiseIntegrate home" className="inline-flex shrink-0 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-sm.webp" srcSet="/brand/logo-sm.webp 250w, /brand/logo.webp 499w" sizes="190px" alt="WiseIntegrate: AI Solutions and Systems" width={499} height={96} className={className} />
    </Link>
  );
}
