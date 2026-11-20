import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/blog";
import { site } from "@/config/site";
import { abs, breadcrumbJsonLd } from "@/lib/seo";
import { Mdx } from "@/components/Mdx";
import { CtaBand, Section } from "@/components/Blocks";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/Icon";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      siteName: site.name,
      locale: site.locale,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = abs(`/blog/${post.slug}`);
  const category = post.category === "church" ? "Church" : "Business";
  const others = getPosts().filter((p) => p.slug !== post.slug);
  const more = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  const org = { "@type": "Organization", name: site.name, url: site.url };
  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
    image: abs("/opengraph-image.jpg"),
    inLanguage: "en-NZ",
    author: org,
    publisher: { ...org, logo: { "@type": "ImageObject", url: abs("/brand/logo.png") } },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <JsonLd data={[article, breadcrumbJsonLd([{ name: "Blog", href: "/blog" }, { name: post.title, href: `/blog/${post.slug}` }])]} />
      <article>
        <header className="hero-glow border-b border-line">
          <div className="wrap max-w-3xl py-14 sm:py-20">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-accent">
              <Icon name="arrow" className="h-4 w-4 rotate-180" /> All articles
            </Link>
            <p className="eyebrow rise mt-6">
              {category}
              {post.badge && <span className="text-muted"> · {post.badge}</span>}
            </p>
            <h1 className="rise mt-3 text-[clamp(2rem,1.4rem+2.6vw,3.2rem)] font-extrabold leading-[1.1]" style={{ "--d": "60ms" } as React.CSSProperties}>
              {post.title}
            </h1>
            <p className="rise mt-4 text-sm text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
              {post.readingMinutes} min read
            </p>
          </div>
        </header>
        <div className="wrap max-w-3xl py-12 sm:py-16">
          <div className="prose-wi text-lg leading-relaxed">
            <Mdx source={post.body} />
          </div>
        </div>
      </article>

      <CtaBand
        title={<>Not sure where <em>to start?</em></>}
        text="Our free AI Readiness Assessment gives you a clear picture of where your organisation stands and which areas will deliver the greatest return. No technical knowledge required."
        primary={{ label: "Take the free assessment", href: "/assessment" }}
        secondary={{ label: "All articles", href: "/blog" }}
      />

      {more.length > 0 && (
        <Section eyebrow="Keep reading" title={<>More <em>articles.</em></>} alt>
          <div className="grid gap-6 md:grid-cols-3">
            {more.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </Section>
      )}
    </>
  );
}
