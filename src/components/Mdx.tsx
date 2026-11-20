import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import type { ComponentProps } from "react";

// Keeps headings in order for screen readers: a heading is never more than one level below the one before (page title is h1).
type MdNode = { type: string; depth?: number; children?: MdNode[] };
function remarkHeadingOrder() {
  return (tree: MdNode) => {
    let last = 1;
    const visit = (n: MdNode) => {
      if (n.type === "heading" && n.depth) {
        if (n.depth === 1) n.depth = 2;
        if (n.depth > last + 1) n.depth = last + 1;
        last = n.depth;
      }
      n.children?.forEach(visit);
    };
    visit(tree);
  };
}

function A({ href = "", children, ...rest }: ComponentProps<"a">) {
  const h = String(href);
  if (h.startsWith("/")) return <Link href={h} {...rest}>{children}</Link>;
  const external = /^https?:\/\//.test(h);
  return <a href={h} {...rest} {...(external ? { target: "_blank", rel: "noopener" } : {})}>{children}</a>;
}

function Img({ src = "", alt = "", title }: ComponentProps<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={String(src)} alt={alt} title={title} loading="lazy" decoding="async" className="rounded-2xl" />;
}

export async function Mdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm, remarkHeadingOrder], baseUrl: import.meta.url });
  return <Content components={{ a: A, img: Img }} />;
}
