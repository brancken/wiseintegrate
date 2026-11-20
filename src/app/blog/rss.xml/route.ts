import { getPosts } from "@/lib/blog";
import { site } from "@/config/site";
import { abs } from "@/lib/seo";

// RSS feed of every blog post, built from content/blog. New posts appear here automatically.
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

// RFC 822 date from the post's year-month-day (noon UTC so the day never shifts).
const rssDate = (d: string) => new Date(`${d}T12:00:00Z`).toUTCString();

export async function GET() {
  const posts = getPosts();
  const items = posts
    .map((p) => {
      const url = abs(`/blog/${p.slug}`);
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <description>${esc(p.description)}</description>`,
        `      <category>${p.category === "church" ? "Church" : "Business"}</category>`,
        p.date ? `      <pubDate>${rssDate(p.date)}</pubDate>` : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Blog</title>
    <link>${abs("/blog")}</link>
    <atom:link href="${abs("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc("Practical thinking on AI integration for small businesses and non-profit organisations.")}</description>
    <language>en-nz</language>
${posts[0]?.date ? `    <lastBuildDate>${rssDate(posts[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
