import { site } from "@/config/site";
import { products } from "@/config/products";
import { getPosts } from "@/lib/blog";

// A plain-text summary of the site for AI assistants (llmstxt.org).
export async function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Based in ${site.location}. Tagline: "${site.tagline}" General enquiries: ${site.email}. Course help: ${site.supportEmail}.`,
    "",
    "## Products",
    ...products.map((p) => `- [${p.name}](${site.url}${p.href.split("#")[0]}): ${p.short} ${p.price}.${p.status === "soon" ? " Coming soon." : ""}`),
    "",
    "## Services",
    `- [Churches and non-profits](${site.url}/churches): AI integration with a theological framework, clear boundaries and staff training.`,
    `- [Businesses, organisations and individuals](${site.url}/business): workflow mapping, tool selection, policy framework and team training.`,
    `- [All services](${site.url}/services): training and coaching, AI integration, policy and governance.`,
    `- [Free AI Readiness Assessment](${site.url}/assessment): 45 questions across eight dimensions, about 15 minutes.`,
    "",
    "## Articles",
    ...getPosts().map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.description}`),
    "",
    "## More",
    `- [About](${site.url}/about)`,
    `- [FAQ](${site.url}/faq)`,
    `- [Contact](${site.url}/contact)`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
