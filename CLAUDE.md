# CLAUDE.md (wiseintegrate.com)

WiseIntegrate: digital products (courses, Claude tools) and AI services for churches, businesses, organisations and individuals. Rebuilt on 20 Nov 2026 to the same standard as shilohministries.nz.

## Rules (Dr. Brancken)
- Never publish, push to main, deploy, post or send anything without Dr. Brancken's explicit yes. Pushing to `main` on GitHub publishes the live site (Vercel builds it).
- The GitHub repo is PUBLIC: never commit keys, passwords, course ZIPs or private course page codes. Keys go in Vercel environment variables, pasted by Dr. Brancken.
- British/NZ English, no em or en dashes, never invent facts. Under-promise ("can", not "will").
- Don't delete; move unwanted files to `C:\Wise\websites\_to_delete`.

## Stack
Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4, MDX blog. Fonts served from the site (next/font). No analytics or tracking scripts.
- `npm run dev` (port 3077), `npm run build`, `npm start`. Run `npm run build` and `npx eslint src` before saying a change is done.
- Facts: `src/config/site.ts`. Products and prices: `src/config/products.ts` (`STRIPE_LIVE` switches the live buy buttons on). Shared service wording: `src/config/services.ts`.
- Page parts: `src/components/Blocks.tsx` (PageHero, Section, FeatureCard, Steps, CtaBand, Checks), `ProductCard`, `PostCard`, `Header`, `Footer`, `TabBar` (phone app bar), `Pwa` (install app), `ThemeToggle` (dark blue default, light option).
- Blog: one file per post in `content/blog/<slug>.mdx`. See `BLOG_INSTRUCTIONS.md`.
- Web app: `src/app/manifest.ts`, `public/sw.js` (never caches /api, /account, /learn, /admin, /dashboard, /tools or the assessment).
- SEO and AI search: `src/lib/seo.ts` (JSON-LD), `sitemap.ts`, `robots.ts`, `llms.txt`. Only wiseintegrate.com is indexed (preview copies get noindex).
- Security headers and the Content Security Policy: `next.config.ts`. Old addresses redirect there too.

## AI Readiness Assessment and consultant dashboard
- The assessment, its two report pages and the dashboard are the old plain pages in `public/tools/` (addresses /assessment, /assessment/start, /report-summary, /report-guide, /dashboard).
- They no longer touch the database directly. The browser talks to our server routes, which use the secret Supabase service key:
  - `POST /api/assessment` saves a submission and makes the AI report (Supabase Edge Function `generate-report`).
  - `/api/admin/*` (login, logout, list, notes, regenerate, snapshot) for the dashboard. Login checks `ADMIN_PASSWORD`; a signed cookie lasts 12 hours; 5 wrong tries lock for 15 minutes.
- Vercel env vars needed: `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` (a new one), optional `ADMIN_SESSION_SECRET`; for the thank-you code: `STRIPE_SECRET_KEY`, `STRIPE_THANKYOU_COUPON`.
- At go-live, after the new site is live: run `supabase/migrations/20261120_close_anon_access.sql` to remove the public read/update access to `ai_assessments`.
- Supabase project `ppgecvmyuyuntwnqwcru`; edge functions in `supabase/functions/`.

## Old site
The old static site is in `legacy/` for reference only (not served). It can go once Dr. Brancken has approved the new site; git history keeps it.
