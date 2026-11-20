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

## Hosting
Netlify (free plan allows commercial use) builds the live site from GitHub branch `main` (netlify.toml); wiseintegrate.com points to Netlify (Cloudflare DNS, see HOSTING-SWITCH.md). Vercel is kept as an unused fallback. `isProduction` in src/lib/seo.ts recognises both.

## AI Readiness Assessment, consultant dashboard and purchases
- The assessment, its report pages and the dashboard are the old plain pages in `public/tools/` (/assessment, /assessment/start, /report-summary, /report-guide, /dashboard).
- They talk only to our server routes, which call Supabase **database functions** with the public anon key (`src/lib/supabase-public.ts`; functions in `supabase/migrations/20261120_secure_functions.sql`): `wi_submit_assessment`, `wi_save_first_report`, `wi_admin_login` (password checked in the database, 12-hour token in an http-only cookie, lockout after 10 wrong tries), `wi_admin_list/get/set_notes/save_report/set_password`.
- The dashboard password fingerprint is set from a private SQL file on Dr. Brancken's computer (never in this public repo).
- At go-live: run `20261120_secure_functions.sql`, then the private password file, then (after the switch) `20261120_close_anon_access.sql`.
- Purchases: Stripe payment link -> `/purchase/complete?session_id=...` checks the payment with Stripe (`STRIPE_SECRET_KEY`), shows 1-hour signed download links from the private Supabase bucket `course-downloads` (`SUPABASE_SERVICE_ROLE_KEY`, only for this) and the 20% thank-you code. Set up with `scripts/stripe-setup.mjs` and `scripts/upload-downloads.mjs` (see TEST-AT-HOME.md).

## Old site
The old static site is in `legacy/` for reference only (not served). It can go once Dr. Brancken has approved the new site; git history keeps it.
