import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Blog posts are MDX files in content/blog (one file per post, the file name is the address).
// See BLOG_INSTRUCTIONS.md for how a new post is added.
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // year-month-day, used for sorting and for search engines (not shown on the page)
  category: "church" | "business";
  badge?: string;
  readingMinutes: number;
  draft?: boolean;
};
export type Post = PostMeta & { body: string };

function read(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.mdx?$/, ""),
    title: String(data.title),
    description: String(data.description ?? ""),
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    category: data.category === "church" ? "church" : "business",
    badge: data.badge ? String(data.badge) : undefined,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    draft: Boolean(data.draft),
    body: content,
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(read)
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
