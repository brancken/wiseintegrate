# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**WiseIntegrate** — a static PWA for an AI integration consultancy serving churches and businesses. No build toolchain; all source files are deployed directly.

## Development

There is no build step. Edit HTML/CSS/JS files directly and preview in a browser. Deployment happens automatically via Vercel on push to `main`.

To develop locally, serve with any static file server:
```bash
npx serve .
# or
python -m http.server 8080
```

There are no lint, test, or build commands configured.

## Architecture

### Static site, no framework
All pages are plain `.html` files. Sub-pages live in named folders (`business/index.html`, `church/index.html`, `contact/index.html`) so Vercel serves them at clean URLs (`/business`, `/church`, `/contact`).

### CSS layers (load order matters)
```html
reset.css → main.css → components.css → animations.css
```
- `main.css` — design tokens (CSS custom properties), base layout, typography
- `components.css` — reusable UI (buttons, cards, forms)
- `animations.css` — `@keyframes` and `[data-reveal]` scroll-reveal classes

### JS modules (all vanilla, no bundler)
Each script file is self-contained and loaded at page bottom:
- `cursor.js` — custom glowing cursor + ambient orb via `mousemove`
- `nav.js` — mobile hamburger toggle + scroll-based active link
- `animations.js` — `IntersectionObserver` scroll reveals with staggered delays
- `pwa.js` — `beforeinstallprompt` capture + service worker registration
- `form.js` — assessment form validation + URL redirect to `/assessment` with query params; Supabase submission wired here

### Assessment flow
`assessment-intro.html` collects name/org/email and sector (church/business), then redirects to `assessment.html` via URL params. `assessment.html` reads those params and submits the full responses to Supabase.

### PWA
`sw.js` uses cache-first for static assets (`wiseintegrate-static-v2`) and network-first for HTML navigation. Service worker explicitly bypasses Supabase API requests. `manifest.json` is the PWA manifest.

### Supabase backend
Supabase project: `ppgecvmyuyuntwnqwcru` (region: ap-southeast-2)

`form.js` posts assessment submissions to a Supabase `assessments` table. The Supabase URL and anon key are stored as Vercel environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`). RLS is enabled; only the service role can read rows.

```sql
-- assessments table schema (public.assessments)
CREATE TABLE assessments (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ,
  name TEXT, org TEXT, email TEXT,
  mode TEXT,       -- 'form' | 'voice'
  sector TEXT,     -- 'church' | 'business'
  status TEXT,     -- 'pending' | 'analysed' | 'contacted'
  ai_summary TEXT,
  send_snapshot BOOLEAN, snapshot_sent BOOLEAN,
  responses JSONB
);

-- ai_assessments table schema (public.ai_assessments) — 45-question pipeline
CREATE TABLE ai_assessments (
  id UUID PRIMARY KEY,
  submitted_at TIMESTAMPTZ,
  organisation TEXT, name TEXT, role TEXT, org_type TEXT, org_size TEXT, location TEXT, prompt_reason TEXT,
  d1_leadership INT, d2_data INT, d3_literacy INT, d4_governance INT,
  d5_usage INT, d6_departments INT, d7_security INT,  -- max 24 each
  d8_budget INT,      -- max 12
  total_score INT, maturity_stage INT,  -- 1-5
  ai_report TEXT,     -- prose report from generate-report
  report_data JSONB   -- structured scoring data (scores, findings, recommendations)
);
```

### Supabase Edge Functions
All functions are in `supabase/functions/` and deployed to the project above.

- `generate-report` — takes a submitted `ai_assessments` row, scores all 8 dimensions, calls Claude for qualitative output, returns `{ report, report_data }`. Called from `assessment.html` after submission.
- `report-summary` — JSON API: takes `?id=<uuid>`, returns `report_data` for the Leadership Summary page. CORS-enabled.
- `report-guide` — JSON API: same as above, feeds the Consultant Guide page. CORS-enabled.

### Vercel config
`vercel.json` sets security headers (`X-Frame-Options`, `X-Content-Type-Options`, CSP) and 1-year immutable caching on `/css/*`, `/js/*`, `/images/*`. Routes include clean URLs for all pages.

## Design tokens

Key CSS custom properties defined in `main.css`:

| Token | Value |
|---|---|
| `--bg` | `#08080f` |
| `--blue-1` | `#1d4ed8` |
| `--blue-3` | `#60a5fa` |
| `--text-primary` | `#eff6ff` |
| `--text-secondary` | `rgba(239,246,255,0.55)` |
| `--nav-height` | `68px` |
| `--section-pad` | `6rem 5vw` |

Fonts: **Manrope** (headings) and **Inter** (body), loaded from Google Fonts.

## Pages status

| Route | File | Status |
|---|---|---|
| `/` | `index.html` | Done |
| `/assessment-intro` | `assessment-intro.html` | Done |
| `/assessment` | `assessment.html` | Done |
| `/church` | `church/index.html` | Done |
| `/business` | `business/index.html` | Done |
| `/contact` | `contact/index.html` | Done |
| `/dashboard` | `dashboard.html` | Done — password auth, Supabase data, report buttons |
| `/about` | `about/index.html` | Done |
| `/faq` | `faq/index.html` | Done |
| `/privacy` | `privacy/index.html` | Done |
| `/terms` | `terms/index.html` | Done |
| `/report-summary` | `report-summary/index.html` | Done — fetches JSON from Supabase, renders radar chart |
| `/report-guide` | `report-guide/index.html` | Done — consultant-only, fetches JSON from Supabase |
