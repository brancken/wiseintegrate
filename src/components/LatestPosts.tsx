import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { Section } from "./Blocks";
import { PostCard } from "./PostCard";
import { Icon } from "./Icon";

export function LatestPosts({ category }: { category?: "church" | "business" }) {
  const posts = getPosts().filter((p) => !category || p.category === category).slice(0, 3);
  if (!posts.length) return null;
  return (
    <Section eyebrow="From the blog" title={<>Clear, practical <em>AI guidance.</em></>}>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
      <div className="mt-8" data-reveal>
        <Link href="/blog" className="btn btn-ghost">All articles <Icon name="arrow" className="h-4 w-4" /></Link>
      </div>
    </Section>
  );
}
