import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalDraftBar } from "@/components/LegalDraftBar";

import { notFound } from "next/navigation";
import { legalApproved } from "@/config/legal";
import { isProduction } from "@/lib/seo";

const approved = legalApproved.termsOfSale;

export const metadata: Metadata = {
  title: "Terms of Sale",
  description: "Terms of sale for WiseIntegrate digital products and courses: what you buy, prices in US dollars, instant download, how you may use it, support and refunds.",
  alternates: { canonical: "/terms-of-sale" },
};

export default function TermsOfSale() {
  if (!approved && isProduction) notFound();
  return (
    <div className="narrow py-14">
      {!approved && <LegalDraftBar />}
      <h1 className="text-4xl font-extrabold">Terms of sale</h1>
      <p className="mt-3 text-sm text-muted">Effective date: [date of approval] · WiseIntegrate · Auckland, New Zealand</p>
      <div className="prose-wi mt-8">
        <ol>
          <li><strong>Who we are.</strong> [your legal name], trading as WiseIntegrate, New Zealand. Contact <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. GST: not registered (below the New Zealand registration threshold).</li>
          <li><strong>What we sell.</strong> Digital products: courses (PDF sessions, a complete book, Claude guides and project files) and skills for use with Claude. Each product page describes what is included.</li>
          <li><strong>Prices and payment.</strong> Prices are in US dollars. Payment is taken securely by Stripe. We never see or store your card details. Your bank may charge a currency conversion fee.</li>
          <li><strong>Delivery.</strong> Your download is available straight after payment on your personal purchase page, which Stripe takes you to. Please bookmark it: you can return to it for fresh download links.</li>
          <li><strong>Using the product.</strong> You may use it for yourself and for your own church, organisation or business. You may not resell it, share the files with others, or publish them.</li>
          <li><strong>No guarantee of results.</strong> Our courses set out, to the best of our knowledge and ability, steps that worked for us. Outside services (such as Claude, Google, hosting companies and domain sellers) change their screens, plans and prices, and AI output can be wrong, so please check important facts. Our products are not legal, financial or pastoral advice.</li>
          <li><strong>Help.</strong> Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> if you are stuck. Where it is really needed, we can arrange a short Zoom call.</li>
          <li><strong>Refunds.</strong> See our <Link href="/refund-policy">refund policy</Link>.</li>
          <li><strong>Your rights.</strong> Nothing here limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.</li>
          <li><strong>Changes.</strong> We may update a product or these terms. A change does not affect something you have already bought.</li>
          <li><strong>Law.</strong> New Zealand law applies.</li>
        </ol>
        <p>See also our <Link href="/terms">Terms of Use</Link> for the website and our <Link href="/privacy">Privacy Policy</Link>.</p>
      </div>
    </div>
  );
}
