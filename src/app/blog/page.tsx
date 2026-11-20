import type { Metadata } from "next";
import { getPosts } from "@/lib/blog";
import { PageHero, Section, CtaBand } from "@/components/Blocks";
import { PostCard } from "@/components/PostCard";
import { BlogFilter } from "@/components/BlogFilter";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical thinking on AI integration for small businesses, churches and non-profit organisations. Clear, honest guidance without the hype.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Blog", href: "/blog" }])} />
      <PageHero
        eyebrow="Blog"
        title={<>Articles and guides on <em>using AI wisely.</em></>}
        intro="Practical thinking on AI integration for small businesses and non-profit organisations."
      />
      <Section>
        {posts.length ? (
          <>
            <h2 className="sr-only">All articles</h2>
            <BlogFilter>
              {posts.map((p) => <PostCard key={p.slug} post={p} />)}
            </BlogFilter>
          </>
        ) : (
          <p className="text-muted">New articles are on the way.</p>
        )}
      </Section>
      <CtaBand
        title={<>Not sure where <em>to start?</em></>}
        text="Our free AI Readiness Assessment gives you a clear picture of where your organisation stands and which areas will deliver the greatest return."
        primary={{ label: "Take the free assessment", href: "/assessment" }}
      />
    </>
  );
}
