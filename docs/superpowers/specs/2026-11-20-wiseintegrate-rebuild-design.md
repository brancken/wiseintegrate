# wiseintegrate.com rebuild: design plan (DRAFT for Dr. Brancken, 20 Nov 2026)

Goal: rebuild wiseintegrate.com as a fast, installable web app, at least as good as shilohministries.nz (100 out of 100 on Google's speed test on a phone). The homepage leads with our digital products, then gives an overview of our AI services. Churches and non-profits get their own section, and businesses get theirs. Buyers can log in with an email and password and take courses on the site. Nothing on the current site is lost.

Nothing goes live without your yes. The rebuild happens on a separate branch on this computer, and you check it before anything is pushed.

## 1. What the research found

- **shilohministries.nz** is built with Next.js 16. Its speed comes from: its own fonts, no tracking scripts, small images in WebP, a service worker for the web app, day and night mode, and strong Google and AI-search set-up.
- **The current wiseintegrate.com** has some hidden problems:
  - The "install as an app" part does not work. The icons it points to do not exist, and the offline helper is never switched on.
  - Every page carries its own copy of the styles, which slows it down.
  - Google Fonts and Google Analytics load from outside the site.
  - Unknown addresses show the homepage instead of a "page not found" page, which Google does not like.
  - **Security:** the consultant dashboard's password is written inside the page itself, and the assessment answers can be read with the public key. This must be fixed.
- **Hosting rule:** Vercel's free plan is for non-commercial use only (terms updated 19 Oct 2026). A site that sells courses needs Vercel Pro: US$20 a month. Shiloh can stay on the free plan because it is a ministry.
- **Course logins:** Supabase (your free wiseintegrate.com project) handles logins and course access well. Its own email sender only reaches your team (2 emails an hour), so login and password-reset emails need Resend, which Shiloh already uses (free up to 100 emails a day).
- **Course videos:** Supabase's free plan is too small for videos. Bunny Stream is the best value: from US$1 a month, about US$8 a month at 500 students, with protected video links.

## 2. Site map (every current page kept)

| Page | What it holds |
|---|---|
| **Home** `/` | (1) Opening: "Digital products and AI solutions for churches, businesses and individuals". (2) **Our products**: the How to Make a Website course in front, the Claude skills marked "coming soon". (3) **Our services**: two blocks side by side, *Churches and non-profits* and *Businesses and organisations*, each with a short overview and a button to its section. (4) How we work (our four promises). (5) The free AI Readiness Assessment. (6) Latest blog posts. |
| **Shop** `/shop` | All digital products. Each product has its own page; the course moves to `/shop/how-to-make-a-website` (the old address forwards there). |
| **Churches and non-profits** `/churches` | Everything on today's Church page, plus the church services. `/church` forwards here. |
| **Businesses** `/business` | Everything on today's Business page, for individuals, small businesses and organisations. |
| **Services** `/services` | One overview: training and coaching, integration, policy and governance, the assessment and process steps. |
| **About, FAQ, Contact, Blog, Terms, Privacy** | Same content, new design. All 7 blog posts keep their addresses. |
| **AI Readiness Assessment** | Same questions, scoring and AI report. |
| **Consultant dashboard** | Kept, but behind a real login (only you), with the public read access closed. |
| **Log in, My account, My courses** `/login`, `/account`, `/learn` | New: buyers log in and take their courses. |

Menu: Home, Shop, Churches, Businesses, Services, About, Blog, Contact, and a "Log in" button. On phones: a menu button plus a bottom bar in the web app.

## 3. Look and feel

The Wise Integrate dark blue look stays (logo, colours #08080f and the blue range, Manrope headings), made calmer and faster: no mouse-following glow, one shared style file, our own fonts, light/day mode as an option like Shiloh. The blue ads and the course images fit straight in.

## 4. Technology (same as Shiloh)

- Next.js 16, Tailwind CSS, fonts served from our own site, WebP images, no tracking scripts. Speed target: 100 out of 100 on a phone, checked before every release.
- Web app: proper icons, install button (with iPhone "Share, Add to Home Screen" steps), an offline page, and the service worker caching only public pages, never anyone's course content.
- Google and AI search: structured data, sitemap, robots, llms.txt, like Shiloh.
- Security headers like Shiloh, plus a "page not found" page.

## 5. Courses on the site (built in a second stage)

1. A buyer pays through the Stripe link.
2. Stripe tells our site; the site gives that email access to the course, and if the person has no account yet, emails them a link to set a password.
3. They log in at `/learn`: sessions in order, the video, the text, the PDF downloads, the checklist and quiz, and a progress tick for each session.
4. Database rules make sure each person sees only the courses they bought. PDFs are handed out through short-lived private links.

The download package (ZIP) stays available too, so nothing depends on the videos being finished.

## 6. Stages

1. **Stage 1, public site:** new design, all pages, shop and course sales page, web app, speed 100, assessment kept, dashboard secured. You check it on this computer, then we go live.
2. **Stage 2, logins and courses:** Supabase logins, Stripe link to access, the `/learn` course area.
3. **Stage 3, videos:** Bunny Stream, once the course videos are made.

## 7. Decisions for you

1. **Technology:** the same as Shiloh (Next.js). Recommended: one set of tools for all your sites, proven 100 score.
2. **Hosting:** Vercel Pro, US$20 a month, because the site sells. (The alternative, selling through Payhip, costs 5% of every sale.) Recommended: Vercel Pro, from the day the shop goes live.
3. **Videos:** Bunny Stream (about US$1 to US$8 a month) when the videos exist. The free alternative, unlisted YouTube, lets anyone with the link watch and share.
4. **Google Analytics:** remove it (faster, more private, fewer cookie questions), like Shiloh. Vercel's own simple visitor counts can replace it.

## 8. Things that must keep working

- The blog automation: posts become simple files; its instructions (BLOG_INSTRUCTIONS.md) are updated in the same change.
- The assessment's Supabase table, report emails and AI report.
- The course draft's thank-you code (20% off) and the private download pages.
- Every current address works or forwards.
