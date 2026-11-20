import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Blocks";
import { AppButtons } from "@/components/Pwa";

export const metadata: Metadata = {
  title: "Get the WiseIntegrate app",
  description: "Add WiseIntegrate to your phone or computer as an app: open our courses, tools and articles with one tap. Free, no app store needed, takes a few seconds.",
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  return (
    <>
      <PageHero eyebrow="The WiseIntegrate app" title={<>WiseIntegrate on your <em>home screen.</em></>} intro="Your courses, AI guides and our latest news, one tap away. No app store needed: add WiseIntegrate to your phone or computer and it opens like an app, full screen." />
      <Section title="Choose your device">
        <AppButtons />
      </Section>
    </>
  );
}
