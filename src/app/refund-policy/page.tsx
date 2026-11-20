import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalDraftBar } from "@/components/LegalDraftBar";

// Set to true once Dr. Brancken has approved the wording (removes the draft notice).
const approved = false;

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Our refund policy for WiseIntegrate digital products and courses: if it does not work as described, you can have your money back within 14 days.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicy() {
  return (
    <div className="narrow py-14">
      {!approved && <LegalDraftBar />}
      <h1 className="text-4xl font-extrabold">Refund policy</h1>
      <p className="mt-3 text-sm text-muted">Effective date: [date of approval] · WiseIntegrate · Auckland, New Zealand</p>
      <div className="prose-wi mt-8">
        <p><strong>Seller:</strong> [your legal name], trading as WiseIntegrate, New Zealand. Contact: <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.</p>
        <p>What you are buying is a digital product (a course or a Claude skill), delivered straight away as a download after payment.</p>
        <h2>If it does not work as described</h2>
        <p>You can have your money back. Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> within 14 days of buying, say which product it was, and tell us what did not work (a screenshot helps). We will refund the full price to the card you paid with. You do not need to return anything.</p>
        <h2>If you simply change your mind</h2>
        <p>Please contact us anyway. Because the product is delivered instantly and cannot be returned, a refund for a change of mind is at our discretion.</p>
        <h2>Your rights under New Zealand law</h2>
        <p>Nothing in this policy limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.</p>
        <h2>How refunds are paid</h2>
        <p>Refunds go back through Stripe to the card you paid with and normally reach you within [5 to 10] business days, depending on your bank.</p>
      </div>
    </div>
  );
}
