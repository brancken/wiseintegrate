# wiseintegrate.com now runs on Cloudflare Workers (21 Nov 2026)

Why: Netlify's Free plan charges credits per publish; 23 publishes on 20 Nov used the month up and Netlify skipped every build.
Vercel's free Hobby plan does not allow commercial sites. Cloudflare Workers Free allows selling and has no per-publish charge.

- Worker: **wiseintegrate** (Cloudflare account brancken@protonmail.com's). Publish from this computer: `npm run cf:deploy`
  (at most once or twice a day, after Dr. Brancken's yes). Test on this computer first: `npm run cf:preview` (port 8787).
- `wrangler.jsonc` routes `www.wiseintegrate.com/*` and `wiseintegrate.com/*` to the Worker; `SITE_ENV=production` keeps sales off and Google listing on.
- DNS: the two CNAME records (`@` and `www` to `wiseintegrate.netlify.app`) were left as they are and switched to **Proxied (orange cloud)**.
  Cloudflare then sends visitors to the Worker; Netlify is no longer reached.
- **Going back to Netlify:** set those two records to **DNS only** (grey cloud). Nothing else to change.
- Cache Components is off (Cloudflare cannot run it yet; tested). Without it all main pages are still prebuilt.
- Checked 21 Nov 2026 on the live address: all pages 200 (terms-of-sale and refund-policy 404 as before, until approved), "Sales open soon",
  robots allows Google, dashboard login reaches Supabase, Lighthouse Home 97/100/100/100, course 98/100/100/100, churches 99/100/100/100.
- Free plan limit to watch: 10 ms computer time per request. If pages start failing, Workers Paid is US$5/month.

---

# (History) Moving wiseintegrate.com from Vercel to Netlify (20 Nov 2026)

Netlify site: **wiseintegrate** (https://wiseintegrate.netlify.app), team "Brancken Team", builds automatically from GitHub branch `rebuild-2026` (netlify.toml). Domain added in Netlify: www.wiseintegrate.com (main) and wiseintegrate.com.
Vercel is NOT changed or cancelled: it still builds `main` (the old site) and can take the domain back at any time.

## The switch (Cloudflare DNS, zone wiseintegrate.com)
Before (Vercel), recorded 20 Nov 2026:
- `wiseintegrate.com` (@) CNAME `5d67eaabc0653ad9.vercel-dns-017.com`, DNS only
- `www` CNAME `5d67eaabc0653ad9.vercel-dns-017.com`, DNS only

After (Netlify):
- `wiseintegrate.com` CNAME `wiseintegrate.netlify.app` (Cloudflare flattens it), **DNS only (grey cloud)**
- `www` CNAME `wiseintegrate.netlify.app`, **DNS only (grey cloud)**
Netlify then issues the free HTTPS certificate (a few minutes to an hour).

## Status
SWITCHED 20 Nov 2026 (both records now CNAME wiseintegrate.netlify.app, DNS only). Netlify certificate issued for both names (expires 18 Feb 2027, renews itself). Live checks passed. IndexNow sent (25 pages, 202). Step 4 (close anon access) waits for Dr. Brancken's yes.

## Order on switch day
1. DONE 20 Nov 2026: secure functions applied and dashboard password set (tested on Netlify: sign-in works, 7 assessments listed).
2. Cloudflare: change the two records above.
3. Check https://www.wiseintegrate.com pages, the assessment (a test submission) and the dashboard sign-in.
4. Supabase: run `supabase/migrations/20261120_close_anon_access.sql` (the old site no longer needs the open table).
5. IndexNow: `node scripts/indexnow.mjs`. Search Console / Bing: submit the sitemap.

## Going back to Vercel (if ever needed)
Put the two "Before" records back in Cloudflare. Note: after step 4 the OLD site's assessment and dashboard no longer work (they used the open table), so going back would also mean deploying the new site on Vercel (it runs there too) rather than the old one.
