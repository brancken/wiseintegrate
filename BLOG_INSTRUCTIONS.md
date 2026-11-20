# WiseIntegrate: Blog Publishing Instructions

This file gives a Claude instance (or the blog automation) everything needed to write and publish a new blog post on wiseintegrate.com without reading any other files.

---

## Overview

- **Site:** wiseintegrate.com, a Next.js app deployed by Vercel when `main` is pushed.
- **Repo:** github.com/brancken/wiseintegrate
- **Posts live in:** `content/blog/`, one `.mdx` file per post. The file name is the web address.
- **Owner contact:** hello@wiseintegrate.com

---

## Every new blog post is exactly ONE new file

Create `content/blog/<slug>.mdx`. That is all.

Do **not** edit anything else. These are all automatic and update themselves from the files in `content/blog/`:

- the blog listing at `/blog` (newest first, by the `date` in the front matter)
- the Church / Business filter on the listing
- the article page itself, its reading time, its search-engine data and the "More articles" row
- the "From the blog" boxes on other pages of the site
- the sitemap and the RSS feed (`/blog/rss.xml`)

Never create HTML files, never edit a listing page, never edit a sitemap.

---

## Part 1: Writing rules (read before writing anything)

- **No em dashes or en dashes** anywhere. Never use `—` or `–`. Rewrite the sentence, or use a comma, colon or full stop instead.
- **No publication dates in the text.** Articles are timeless. Do not mention a date anywhere in the body. (The `date` field in the front matter is only for ordering and search engines; it is never shown on the page.)
- **No sermon preparation suggestions.** Never suggest AI for writing or researching sermons. AI makes too many theological errors.
- **Simple language.** Write for a non-technical audience (church leaders, small business owners).
- **Tone:** honest, practical, direct. Not promotional. Not hype.
- **Length:** 400 to 700 words of body content is ideal. Short and useful beats long and padded.
- **Spelling:** British / New Zealand spelling (organisation, recognise, summarise, colour).
- **No assessment box at the end.** The page template already adds a call to the free AI Readiness Assessment under every article. A natural sentence that links to it is fine, for example `[AI Readiness Assessment](/assessment)`.
- **No em dashes.** Worth repeating. Zero tolerance.

---

## Part 2: Choosing a slug and category

The slug is the file name and becomes the address: `content/blog/ai-for-non-profits.mdx` is published at `wiseintegrate.com/blog/ai-for-non-profits`.

- Lowercase letters, numbers and hyphens only. No spaces, no special characters.
- Never reuse or rename an existing slug (old links would break).

Category (the `category` field), exactly one of:

- `church`: content aimed at churches and non-profits
- `business`: content aimed at small businesses and organisations

Badge (the optional `badge` field):

- For educational explainers, use `badge: "Beginner's Guide"` with `category: business`.
- Otherwise leave the badge out. The category label (Church or Business) is always shown.

---

## Part 3: The file template

Copy this exactly. Replace every `{{PLACEHOLDER}}`.

```mdx
---
title: "{{ARTICLE TITLE}}"
description: "{{1 to 2 sentences, plain language, no hype. Used on the card, in Google and when shared.}}"
date: "{{YYYY-MM-DD, the day it is published}}"
category: {{church|business}}
badge: "{{optional, e.g. Beginner's Guide; delete this whole line if there is no badge}}"
---

{{Opening paragraph.}}

## {{Section heading}}

{{Paragraphs.}}

### {{Smaller heading, e.g. a numbered point: 1. Start with one task}}

{{Paragraphs.}}

- {{bullet point}}
- {{bullet point}}

> {{An optional pull quote.}}

{{Closing paragraph.}}
```

Rules for the file:

- Put the title, description and badge in double quotes. If the text itself contains a double quote, use single quotes around it instead.
- Do not repeat the title as a heading in the body. The page shows the title already.
- Use `##` for section headings and `###` for smaller ones. Never use a single `#`.
- Bold: `**text**`. Italic: `*text*`. Link: `[link text](/assessment)` for our own pages, or a full `https://` address for other sites.
- Do not type curly braces `{ }` or a `<` sign in the text (they have a special meaning in MDX files). Write "less than" in words instead.
- No HTML, no images, no SVG drawings. Plain text, headings, lists, quotes and links only.

If a post should be saved but not shown yet, add `draft: true` to the front matter. Remove it to publish.

---

## Part 4: Publish (commit and push)

**Only publish with Dr. Brancken's approval.** His standing rule: nothing goes live on the website until he has seen and approved it. Write the post, show it to him, and only then commit and push.

Once approved:

```bash
git add content/blog/{{SLUG}}.mdx
git commit -m "Add blog post: {{ARTICLE TITLE}}"
git push origin main
```

Vercel builds and deploys automatically when `main` is pushed. The post is live within a few minutes at `https://wiseintegrate.com/blog/{{SLUG}}`. Open that address afterwards to check it.

If the deploy fails, the most likely cause is a broken front matter block (a missing quote or `---` line) or a curly brace or `<` in the text. Fix the file and push again.

---

## Existing posts for reference

| Slug | Category | Badge |
|------|----------|-------|
| `start-small-with-ai` | business | |
| `how-ai-powers-small-business` | business | |
| `three-disadvantages-of-ai` | business | |
| `making-ai-work-for-your-organisation` | business | |
| `what-is-artificial-intelligence` | business | Beginner's Guide |
| `ai-for-admin-free-your-team` | church | |
| `how-to-introduce-ai-to-church-leadership` | church | |
