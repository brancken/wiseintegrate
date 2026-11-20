# WiseIntegrate — AI Integration Consultancy

**Stack:** Static HTML/CSS/JS · Vercel · Cloudflare · Supabase · PWA

---

## Project Structure

```
wiseintegrate/
├── index.html              ← Homepage
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service worker
├── vercel.json             ← Vercel deployment config
├── css/
│   ├── reset.css
│   ├── main.css            ← Core styles + tokens
│   ├── components.css      ← Reusable UI components
│   └── animations.css      ← Keyframes + scroll reveals
├── js/
│   ├── cursor.js           ← Moon cursor + orb follower
│   ├── nav.js              ← Mobile menu + scroll
│   ├── pwa.js              ← Install prompt + SW reg
│   ├── animations.js       ← IntersectionObserver reveals
│   └── form.js             ← Form validation + submission
├── images/
│   ├── icon-192.png        ← PWA icon (create)
│   ├── icon-512.png        ← PWA icon large (create)
│   ├── screenshot-desktop.png
│   └── screenshot-mobile.png
└── assessment/             ← Assessment page (next build)
    └── index.html
```

---

## 1. GitHub Setup

```bash
# From inside the wiseintegrate/ folder
git init
git add .
git commit -m "Initial commit — WiseIntegrate homepage"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wiseintegrate.git
git push -u origin main
```

---

## 2. Vercel Deployment

1. Go to **vercel.com** → New Project
2. Import your GitHub repo
3. Framework Preset: **Other**
4. Root Directory: `/` (the folder you uploaded)
5. Build Command: *(leave empty)*
6. Output Directory: `.`
7. Click **Deploy**

Vercel will give you a `.vercel.app` URL. Test it there first.

---

## 3. Cloudflare Domain Setup

Your domain `wiseintegrate.com` is already on Cloudflare.

### Point to Vercel:
1. In Vercel → Project Settings → Domains → Add `wiseintegrate.com` and `www.wiseintegrate.com`
2. Vercel will show you the DNS records to add
3. In **Cloudflare** → DNS → Add these records:
   - Type: `CNAME` | Name: `www` | Target: `cname.vercel-dns.com`
   - Type: `A` | Name: `@` | Target: `76.76.19.61` (Vercel IP)
4. Set both records to **DNS only** (grey cloud) initially, then enable proxy once live

### SSL:
- Cloudflare: SSL/TLS → Full (strict)
- Auto-HTTPS redirect: On

---

## 4. Supabase Setup

### Create tables:

```sql
-- Assessment submissions table
CREATE TABLE assessments (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  name        TEXT NOT NULL,
  org         TEXT NOT NULL,
  email       TEXT NOT NULL,
  mode        TEXT DEFAULT 'form',        -- 'form' or 'voice'
  sector      TEXT,                       -- 'church' or 'business'
  status      TEXT DEFAULT 'pending',     -- 'pending' | 'analysed' | 'contacted'
  ai_summary  TEXT,                       -- AI-generated priority summary
  send_snapshot BOOLEAN DEFAULT FALSE,    -- YOUR toggle switch
  snapshot_sent BOOLEAN DEFAULT FALSE,
  responses   JSONB                       -- Full Q&A data (added later)
);

-- Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Only your service role can read/write
CREATE POLICY "Service role only"
  ON assessments
  USING (auth.role() = 'service_role');
```

### Add Supabase to the project:

Create `/js/supabase.js`:

```js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

Add to `vercel.json` environment variables in Vercel dashboard:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY` (for server-side operations)

---

## 5. PWA Icons

You need to create two icon files:
- `/images/icon-192.png` — 192×192px
- `/images/icon-512.png` — 512×512px

Use the WiseIntegrate logo on a `#08080f` background with the purple `#a78bfa` accent. Can be created in Canva or Figma.

---

## 6. Environment Variables (Vercel)

Set these in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | `https://wiseintegrate.com` |

---

## 7. Next Pages to Build

- `/assessment/index.html` — Full Pastor AI Readiness Assessment (form + voice)
- `/church/index.html` — Church integration services page
- `/business/index.html` — Business integration services page
- `/about/index.html` — About page
- `/dashboard/` — Password-protected admin dashboard (you only)

---

## Colour Tokens (for reference)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#08080f` | Page background |
| `--purple-1` | `#7c3aed` | Primary buttons, borders |
| `--purple-2` | `#5b21b6` | Button gradient end |
| `--purple-3` | `#a78bfa` | Accents, icons |
| `--purple-4` | `#c4b5fd` | Headline gradient |
| `--purple-5` | `#e0d4ff` | Light text, hover |

---

*WiseIntegrate © 2026 — AI should serve your mission. Not replace it.*
