import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/Blocks";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The Terms of Use for the WiseIntegrate website and services, including the AI Readiness Assessment and consultancy. Governed by New Zealand law.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Terms of Use", href: "/terms" }])} />
      <PageHero
        eyebrow="Legal"
        title={<>Terms of <em>Use</em></>}
        intro="Please read these terms carefully before using our website or services. By continuing, you agree to be bound by them."
      />

      <section className="py-16 sm:py-20">
        <div className="narrow">
          <p className="mb-10 text-sm text-muted">Effective date: 30 June 2026 · WiseIntegrate · Auckland, New Zealand</p>
          <div className="prose-wi">
            <h2>About these terms</h2>
            <p>These Terms of Use govern your access to and use of the WiseIntegrate website at wiseintegrate.com and the services we provide, including the AI Readiness Assessment and any consultancy services. They form a binding agreement between you and WiseIntegrate.</p>
            <p>By accessing our website or using our services, you confirm that you have read, understood, and agree to these terms. If you do not agree, please do not use our website or services.</p>
            <p>WiseIntegrate is operated from Auckland, New Zealand. These terms are governed by New Zealand law.</p>

            <h2>Our services</h2>
            <p>WiseIntegrate provides AI integration consultancy services to churches, businesses, and non-profit organisations. Our services include:</p>
            <ul>
              <li>Free online AI Readiness Assessments and personalised results reports.</li>
              <li>Strategic consultancy, implementation planning, and AI governance support.</li>
              <li>Staff training, workshops, and ongoing advisory services.</li>
              <li>Website content, resources, and educational material.</li>
            </ul>
            <p>Descriptions of our services on this website are general in nature and illustrate our areas of expertise. Specific outcomes, timelines, and deliverables for any paid engagement are determined by the scope of work agreed in a separate engagement agreement, not by website content.</p>
            <p>We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice.</p>

            <h2>Acceptable use</h2>
            <p>When using our website or services, you agree that you will not:</p>
            <ul>
              <li>Provide false, misleading, or fraudulent information in any form or assessment.</li>
              <li>Use our website or services for any unlawful purpose or in violation of any applicable law or regulation.</li>
              <li>Attempt to interfere with, disrupt, or gain unauthorised access to our systems or data.</li>
              <li>Copy, reproduce, or redistribute our content, tools, or materials without prior written permission.</li>
              <li>Use automated tools, scrapers, or bots to access or extract content from our website.</li>
            </ul>

            <h2>Assessment results and professional advice</h2>
            <p>The AI Readiness Assessment is a general diagnostic tool designed to give you an indicative picture of your organisation&apos;s current AI readiness across eight dimensions. When you submit your assessment, your responses are processed by Claude, an AI model developed by Anthropic, to generate your personalised report. This AI processing is described in our <Link href="/privacy">Privacy Policy</Link>.</p>
            <p>Assessment results are based on the information you provide and are intended as a starting point for conversation, not a definitive audit or professional recommendation. Results are reviewed by our consultant as part of any follow-up engagement. Your assessment responses are treated as confidential in accordance with our Privacy Policy.</p>
            <p>The AI Readiness Assessment is provided free of charge and without any guaranteed response time. While we aim to follow up on all assessment submissions promptly, follow-up is provided on a best-efforts basis.</p>
            <p>Nothing on this website or in any assessment result constitutes legal, financial, technical, or professional advice. You should seek independent professional advice before making significant decisions about AI adoption based on any content we provide.</p>
            <p>WiseIntegrate is not liable for any decisions made in reliance on assessment results or website content.</p>

            <h2>Consultancy engagements</h2>
            <p>Where you engage WiseIntegrate for paid consultancy services, the specific scope of work, deliverables, fees, and timelines will be set out in a separate engagement agreement or proposal. In the event of any conflict between these Terms of Use and that engagement agreement, the engagement agreement will take precedence.</p>
            <p>Payment terms, cancellation rights, and deliverable ownership will be specified in your engagement agreement.</p>

            <h2>Intellectual property</h2>
            <p>All content on the WiseIntegrate website, including text, graphics, logos, assessment frameworks, tools, and methodologies, is owned by or licensed to WiseIntegrate and is protected by New Zealand and international copyright law.</p>
            <p>You may view, print, or download content for your own personal, non-commercial use. You must not reproduce, republish, distribute, or commercialise any part of our website content without our prior written consent.</p>
            <p>Any feedback, suggestions, or ideas you provide to us may be used by WiseIntegrate without obligation or compensation to you.</p>

            <h2>Disclaimer of warranties</h2>
            <p>Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. To the extent permitted by the Consumer Guarantees Act 1993 and the Fair Trading Act 1986, WiseIntegrate makes no warranties, express or implied, regarding:</p>
            <ul>
              <li>The accuracy, completeness, or reliability of any content on the website.</li>
              <li>The availability or uninterrupted operation of the website.</li>
              <li>The fitness of any assessment results or content for a particular purpose.</li>
            </ul>
            <p>Nothing in these terms is intended to exclude or limit rights that cannot be excluded under the Consumer Guarantees Act 1993 where those rights apply to you as a consumer.</p>
            <p>Where services are acquired by you for the purposes of a business, including a church, ministry, or non-profit organisation in its operational capacity, you agree that the Consumer Guarantees Act 1993 does not apply to those services, to the extent permitted by section 43 of that Act.</p>

            <h2>Limitation of liability</h2>
            <p>To the maximum extent permitted by New Zealand law, WiseIntegrate&apos;s total liability to you for any claim arising out of or in connection with these terms or your use of our website or services will not exceed the amount you paid to WiseIntegrate in the three months preceding the claim, or NZD $100, whichever is greater.</p>
            <p>WiseIntegrate will not be liable for any indirect, consequential, special, or punitive loss or damage, loss of data, loss of profit, or loss of opportunity, even if advised of the possibility of such loss.</p>

            <h2>Third-party links and services</h2>
            <p>Our website may contain links to third-party websites or reference third-party tools and services. These links are provided for your convenience only. WiseIntegrate does not endorse, control, or take responsibility for the content or practices of any third-party website or service.</p>
            <p>Your use of any third-party website or service is at your own risk and subject to that third party&apos;s own terms and policies.</p>

            <h2>Privacy</h2>
            <p>Your privacy matters to us. Our collection and use of personal information is governed by our <Link href="/privacy">Privacy Policy</Link>, which forms part of these terms. By using our website or services, you also agree to our Privacy Policy.</p>

            <h2>Changes to these terms</h2>
            <p>We may update these Terms of Use from time to time to reflect changes in our services, legal requirements, or other circumstances. When we do, we will update the effective date at the top of this page.</p>
            <p>Your continued use of our website or services after any changes constitutes your acceptance of the updated terms. We encourage you to review this page periodically.</p>

            <h2>Governing law and disputes</h2>
            <p>These terms are governed by the laws of New Zealand. Any dispute arising out of or relating to these terms or your use of our services will be subject to the exclusive jurisdiction of the New Zealand courts.</p>
            <p>We encourage you to contact us first if you have a concern. Most issues can be resolved quickly and without the need for formal proceedings.</p>

            <h2>Contact us</h2>
            <p>If you have any questions about these Terms of Use or our services, please reach out through our <Link href="/contact">contact page</Link>. We are happy to help.</p>
          </div>
        </div>
      </section>
    </>
  );
}
