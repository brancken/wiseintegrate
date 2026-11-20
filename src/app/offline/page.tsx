import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "You are offline", robots: { index: false } };

export default function Offline() {
  return (
    <div className="narrow py-24 text-center">
      <h1 className="text-3xl font-extrabold">You are offline</h1>
      <p className="mt-4 text-muted">This page is not saved on your device yet. Check your internet connection and try again. Pages you opened before still work.</p>
      <Link href="/" className="btn btn-primary mt-8">Go to the home page</Link>
    </div>
  );
}
