# Moving wiseintegrate.com from Vercel to Netlify (20 Nov 2026)

Netlify site: **wiseintegrate** (https://wiseintegrate.netlify.app), team "Brancken Team", builds automatically from GitHub branch `rebuild-2026` (netlify.toml). Domain added in Netlify: www.wiseintegrate.com (main) and wiseintegrate.com.
Vercel is NOT changed or cancelled: it still builds `main` (the old site) and can take the domain back at any time.

## The switch (Cloudflare DNS, zone wiseintegrate.com)
Before (Vercel), recorded 20 Nov 2026:
- `wiseintegrate.com` A records 216.198.79.1 and 64.29.17.1 (Vercel)
- `www` CNAME `5d67eaabc0653ad9.vercel-dns-017.com` (Vercel)

After (Netlify):
- `wiseintegrate.com` CNAME `wiseintegrate.netlify.app` (Cloudflare flattens it), **DNS only (grey cloud)**
- `www` CNAME `wiseintegrate.netlify.app`, **DNS only (grey cloud)**
Netlify then issues the free HTTPS certificate (a few minutes to an hour).

## Order on switch day
1. DONE 20 Nov 2026: secure functions applied and dashboard password set (tested on Netlify: sign-in works, 7 assessments listed).
2. Cloudflare: change the two records above.
3. Check https://www.wiseintegrate.com pages, the assessment (a test submission) and the dashboard sign-in.
4. Supabase: run `supabase/migrations/20261120_close_anon_access.sql` (the old site no longer needs the open table).
5. IndexNow: `node scripts/indexnow.mjs`. Search Console / Bing: submit the sitemap.

## Going back to Vercel (if ever needed)
Put the two "Before" records back in Cloudflare. Note: after step 4 the OLD site's assessment and dashboard no longer work (they used the open table), so going back would also mean deploying the new site on Vercel (it runs there too) rather than the old one.
