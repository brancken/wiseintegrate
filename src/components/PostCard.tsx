import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { Icon } from "./Icon";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card group flex flex-col p-6" data-reveal data-category={post.category}>
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
        <span className="rounded-full bg-panel-strong px-2.5 py-1 text-accent">{post.category === "church" ? "Church" : "Business"}</span>
        {post.badge && <span className="text-muted">{post.badge}</span>}
      </div>
      <h3 className="mt-4 text-xl font-bold leading-snug">{post.title}</h3>
      <p className="mt-2 flex-1 text-muted">{post.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Read, {post.readingMinutes} min <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
