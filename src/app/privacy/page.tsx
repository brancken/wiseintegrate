import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How WiseIntegrate collects, uses, shares and protects your personal information under the New Zealand Privacy Act 2020, and how to contact our Privacy Officer.",
  alternates: { canonical: "/privacy" },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Privacy Policy", href: "/privacy" }])} />
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <em>Policy</em></>}
        intro="We respect your privacy and are committed to being transparent about how we handle your information."
      />

      <section className="py-16 sm:py-20">
        <div className="narrow">
          <p className="mb-10 text-sm text-muted">Effective date: 20 November 2026 · WiseIntegrate · Auckland, New Zealand</p>
          <div className="prose-wi">
            <h2>Who we are</h2>
            <p>WiseIntegrate is an AI integration consultancy based in Auckland, New Zealand, providing services globally. We help churches, businesses, and non-profit organisations integrate AI wisely. References to &quot;we&quot;, &quot;us&quot;, or &quot;our&quot; in this policy refer to WiseIntegrate.</p>
            <p><strong>Privacy Officer:</strong> Abri Brancken has been appointed as WiseIntegrate&apos;s Privacy Officer under the New Zealand Privacy Act 2020. The Privacy Officer is responsible for ensuring WiseIntegrate handles personal information in accordance with this policy and applicable law.</p>
            <p>To contact our Privacy Officer with questions about this policy or your personal information, please use our <Link href="/contact">contact page</Link>.</p>

            <h2>Information we collect</h2>
            <p>We collect information you provide directly to us through the following interactions:</p>
            <ul>
              <li><strong>AI Readiness Assessment:</strong> your name, organisation name, email address, sector (church or business), and your responses to assessment questions.</li>
              <li><strong>Contact form:</strong> your name, email address, organisation name, organisation type, and the message you submit.</li>
              <li><strong>Consultancy engagement:</strong> any information you share with us in the course of a consulting relationship, including via email or calls.</li>
            </ul>
            <p>We also collect limited technical information automatically when you visit our website, such as your IP address, browser type, pages visited, and referring URL. This is standard server infrastructure data used to maintain and operate the site.</p>

            <h2>When you buy a product</h2>
            <p>Payments are processed by Stripe. We never see or store your card details. From Stripe we receive your name, email address, country, what you bought and the amount paid. We use this to deliver your purchase, send your thank-you code, help you if you contact us, and keep the sales records New Zealand tax law requires (normally seven years). Your course files are kept in private storage with Supabase and are only reachable through short-lived links on your personal purchase page.</p>

            <h2>How we use your information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Deliver and personalise the AI Readiness Assessment results we send to you.</li>
              <li>Respond to enquiries you submit through our contact form.</li>
              <li>Provide consultancy services you have engaged us for.</li>
              <li>Improve the performance and content of our website.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>We do not use your information for automated decision-making that produces legal or similarly significant effects without your involvement.</p>

            <h2>AI-assisted processing</h2>
            <p>When you complete the AI Readiness Assessment, your submitted information, including your name, organisation, and assessment responses, is processed by Claude, an AI model developed by Anthropic (United States), to generate your personalised AI readiness report. This processing is necessary to deliver the assessment service you have requested.</p>
            <p>Anthropic processes this data solely to generate your report under contractual data processing obligations. Anthropic is contractually prohibited from using your data to train its AI models. This protection is guaranteed under Anthropic&apos;s Commercial Terms of Service, which govern all API usage. The resulting report is stored in your assessment record in our secure database and is reviewed only by our Privacy Officer.</p>
            <p>No automated decisions with legal or similarly significant effects are made solely on the basis of your assessment responses.</p>

            <h2>How we share your information</h2>
            <p>We do not sell, rent, or trade your personal information. We may share your information with trusted third-party service providers who assist us in operating our website and delivering our services, solely as necessary and under confidentiality obligations:</p>
            <ul>
              <li><strong>Supabase:</strong> cloud database (United States) used to store assessment submissions securely. Row-Level Security is enabled on our database.</li>
              <li><strong>Anthropic:</strong> AI provider (United States) whose Claude model processes your assessment responses solely to generate your personalised AI readiness report.</li>
              <li><strong>Stripe:</strong> payment processor (United States and Ireland) used when you buy a product. Stripe handles your card details under its own privacy policy at <a href="https://stripe.com/privacy" {...ext}>stripe.com/privacy</a>.</li>
              <li><strong>EmailJS:</strong> used to deliver contact form messages to our team. Contact form submissions are not stored by EmailJS beyond delivery.</li>
              <li><strong>Cloudflare:</strong> website hosting and infrastructure provider (United States). Cloudflare may log standard server access data including IP addresses.</li>
              <li><strong>jsDelivr:</strong> open-source CDN (European Union) used to deliver an icon set on our AI Readiness Assessment pages. jsDelivr may log your IP address as a standard server request log when these files are loaded.</li>
              <li><strong>Google Fonts:</strong> typography resources loaded from Google&apos;s servers on our AI Readiness Assessment pages. The rest of our website serves its fonts from our own servers. No advertising or tracking cookies are set by this service.</li>
            </ul>
            <p>We may disclose your information if required by law, court order, or to protect the rights, property, or safety of WiseIntegrate or others.</p>

            <h2>Cookies and tracking</h2>
            <p>We do not use analytics, advertising or retargeting cookies on this website.</p>
            <p>Your browser may store cached files locally through our Progressive Web App service worker. This improves load speed and enables offline access to previously visited pages. This cache is stored on your own device and is not transmitted to us.</p>
            <p>When your browser loads our AI Readiness Assessment pages, it makes a request to Google&apos;s servers to load web fonts (Google Fonts). Google may log your IP address as part of this request.</p>
            <p>You can control and clear stored browser data through your browser settings.</p>

            <h2>Data retention</h2>
            <p>We retain assessment submissions and contact enquiries for as long as necessary to fulfil the purpose for which they were collected, typically for the duration of a consultancy engagement and a reasonable period thereafter for administrative purposes.</p>
            <p>If you would like your data deleted earlier, please contact us and we will action your request promptly.</p>

            <h2>International data transfers</h2>
            <p>Our service providers, Supabase, Cloudflare, Anthropic, EmailJS, Stripe, and Google (Fonts, on our assessment pages), are based in the United States. jsDelivr, a CDN used to deliver an icon set on our assessment pages, is based in the European Union. When you use our website or submit an assessment, your personal information may be transferred to and processed overseas.</p>
            <p>New Zealand holds an adequacy decision from the European Union, meaning our data protection standards are recognised as equivalent internationally. We take reasonable steps to ensure that our overseas service providers protect your information in accordance with at least equivalent standards to those required under the New Zealand Privacy Act 2020.</p>

            <h2>Privacy breach notifications</h2>
            <p>If our Privacy Officer becomes aware of a privacy breach that is likely to cause serious harm to any individual, we will notify both the affected individual(s) and the Office of the Privacy Commissioner as soon as practicable, as required by the New Zealand Privacy Act 2020.</p>
            <p>If you believe your information may have been involved in a privacy breach, please contact our Privacy Officer immediately through our <Link href="/contact">contact page</Link>.</p>

            <h2>Your rights</h2>
            <p>Under the New Zealand Privacy Act 2020, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> ask us to correct any personal information we hold that is inaccurate, out of date, incomplete, irrelevant, or misleading.</li>
            </ul>
            <p>To make an access or correction request, please contact our Privacy Officer, Abri Brancken, through our <Link href="/contact">contact page</Link>. We will acknowledge your request promptly and respond within 20 working days, as required by the Privacy Act.</p>
            <p>You may also request deletion of your personal information. We will action such requests unless we are required to retain the information by law.</p>
            <p>If you are not satisfied with our response to any privacy concern, you have the right to make a complaint to the <strong>Office of the Privacy Commissioner</strong> at <a href="https://www.privacy.org.nz" {...ext}>www.privacy.org.nz</a>.</p>

            <h2>Children&apos;s privacy</h2>
            <p>Our services are directed at adults and organisations. We do not knowingly collect personal information from individuals under the age of 16. If you believe we have inadvertently collected such information, please contact us so we can delete it.</p>

            <h2>Data security</h2>
            <p>We take reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. Our data is stored using Supabase with Row-Level Security enabled, and our website is served over HTTPS.</p>
            <p>No method of transmission over the internet is entirely secure. While we do our best to protect your information, we cannot guarantee absolute security.</p>

            <h2>Changes to this policy</h2>
            <p>We may update this Privacy Policy from time to time. When we do, we will revise the effective date at the top of this page. We encourage you to review this page periodically. Continued use of our website or services after any changes constitutes acceptance of the updated policy.</p>

            <h2>Contact us</h2>
            <p>If you have any questions about this Privacy Policy or how we handle your information, please contact our Privacy Officer, Abri Brancken, through our <Link href="/contact">contact page</Link>. We are happy to help and will respond within 20 working days.</p>
            <p>If you are not satisfied with our response, you may escalate your complaint to the Office of the Privacy Commissioner at <a href="https://www.privacy.org.nz" {...ext}>www.privacy.org.nz</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
