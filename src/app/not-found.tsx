import Link from "next/link";

export default function NotFound() {
  return (
    <div className="narrow py-24 text-center">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-3 text-4xl font-extrabold">We could not find that page.</h1>
      <p className="mt-4 text-muted">It may have moved. Try the home page, the shop or our services.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Home</Link>
        <Link href="/shop" className="btn btn-ghost">Shop</Link>
        <Link href="/services" className="btn btn-ghost">Services</Link>
      </div>
    </div>
  );
}
