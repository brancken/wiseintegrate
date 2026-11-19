# wiseintegrate.com rebuild, Stage 1 (public site) Implementation Plan

> For agentic workers: use superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Rebuild wiseintegrate.com as a Next.js 16 web app with the approved structure (products first, churches and businesses sections, services page), PWA install, speed 100 on mobile, the assessment kept and its data secured.

**Architecture:** Same stack as `C:\Wise\websites\shiloh-website` (Next.js 16 App Router, Tailwind 4, self-hosted fonts via next/font, MDX content, no tracking). Content lives in `content/` (MDX/JSON). The assessment and its reports keep their current HTML/JS but read and write through new server routes that use the Supabase service-role key; anon access to `ai_assessments` is closed at go-live. Stage 2 (logins, `/learn`) builds on the same app.

**Tech stack:** next 16.4.6, react 19.3.0, tailwindcss 4.3.3, @mdx-js/mdx, gray-matter, remark-gfm, sharp (dev), @supabase/supabase-js (server only in Stage 1), stripe (thank-you code route).

**Decisions (20 Nov 2026, Dr. Brancken):** approved design `docs/superpowers/specs/2026-11-20-wiseintegrate-rebuild-design.md` with all four recommendations. Stay on Vercel Hobby until the first sale is near, then Pro. Fix all errors found.

**Security note:** the GitHub repo is PUBLIC. Never commit course ZIPs, private course page codes, keys or passwords. `c/` and `*.zip` go in `.gitignore`.

---

### Task 1: Branch and scaffold
- [ ] Commit current drafts on `course-shop-drafts` (without `c/`, ZIPs), then `git switch -c rebuild-2026`.
- [ ] `git mv` all old static files into `legacy/` (reference only, excluded from build; deleted before go-live, history keeps them).
- [ ] Create `package.json`, `next.config.ts`, `tsconfig.json`, `postcss`/Tailwind setup, `src/app/layout.tsx`, `src/app/globals.css` following Shiloh's files.
- [ ] Verify: `npm install` then `npm run build` succeeds.

### Task 2: Design system and shell
- Files: `src/config/site.ts` (all facts: name, email office@wiseintegrate.com and hello@, nav, social), `src/app/globals.css` (tokens: #08080f bg, blue range, light theme), `src/components/{Header,Footer,TabBar,ThemeToggle,Pwa,Motion,Icon,Button,Section}.tsx`, fonts Manrope + Inter via next/font (self-hosted at build).
- [ ] Logo as optimised WebP/PNG at nav size (current logo.png 137 KB).
- [ ] Verify: header/footer render, theme toggle works, no console errors.

### Task 3: Pages (content moved, nothing lost)
- `/` home: hero (products + AI solutions), products (course featured, skills "coming soon"), services split (Churches and non-profits | Businesses and organisations), foundation (4 promises), assessment CTA, latest posts.
- `/shop`, `/shop/how-to-make-a-website` (from `courses/how-to-make-a-website/index.html`, photo, test links kept until Stage 2/live Stripe), redirect `/courses/how-to-make-a-website`.
- `/churches` (all of legacy church page; redirect `/church`), `/business`, `/services` (services + process + foundation detail), `/about`, `/faq`, `/contact`, `/terms`, `/privacy`, `/blog` + 7 posts as MDX in `content/blog/` keeping slugs.
- `not-found.tsx`, `offline` page.
- [ ] Verify: every URL in legacy `sitemap.xml` returns 200 or a redirect to its new home.

### Task 4: Contact form
- Keep EmailJS (current working setup) behind a client component loaded only on `/contact`; CSP allows it.

### Task 5: Assessment, reports, dashboard (secured)
- Serve the legacy assessment/report pages from `public/legacy-app/` with rewrites `/assessment`, `/assessment/start`, `/report-summary`, `/report-guide`, restyled header link back to the site.
- New server routes (service role key, env `SUPABASE_SERVICE_ROLE_KEY`): `POST /api/assessment` (insert, call generate-report, save report, notify), `/api/admin/*` (list, update notes, regenerate, send snapshot) behind `/admin` login (env `ADMIN_PASSWORD`, signed cookie, lockout after 5 tries).
- Assessment and dashboard JS changed to call these routes instead of Supabase REST with the anon key.
- Migration `supabase/migrations/2026xxxx_close_anon.sql` dropping the three anon policies; applied only at go-live, together with the deploy.

### Task 6: Web app, SEO, headers, speed
- `manifest.ts` (real icons, maskable), `public/sw.js` (static only, never `/api`, `/learn`, `/account`, `/admin`), install prompt like Shiloh, JSON-LD (Organization, WebSite, Product/Course, BlogPosting, FAQPage, Person), `sitemap.ts`, `robots.ts`, `llms.txt`, security headers + CSP, GA4 removed.
- [ ] Verify: Lighthouse mobile on `next start` locally: 100 / 100 / 100 / 100 target on home, shop, course page, a blog post.

### Task 7: Thank-you code route and course pages
- `api/thank-you-code.js` becomes `src/app/api/thank-you-code/route.ts` (same behaviour).
- Private download pages (`c/<code>`) are not committed (public repo). Stage 2 moves downloads behind login; until then the course is not sold.

### Task 8: Blog automation and docs
- Rewrite `BLOG_INSTRUCTIONS.md` for MDX posts (one file per post, front matter, no sitemap edit needed). Update `CLAUDE.md` and `README.md` to the new truth.

### Task 9: Review with Dr. Brancken, then go live
- Local preview, his corrections, `npm run build` clean, Lighthouse check, then (with his yes) merge to main, he adds env vars in Vercel, apply the RLS migration, check live.
