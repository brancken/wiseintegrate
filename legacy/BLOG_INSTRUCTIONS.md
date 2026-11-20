# WiseIntegrate — Blog Publishing Instructions

This file gives a Claude instance everything needed to write and publish a new blog post on wiseintegrate.com without reading any other files.

---

## Overview

- **Site:** wiseintegrate.com — static HTML site, no build step, auto-deployed via Vercel on push to `main`
- **Repo:** github.com/brancken/wiseintegrate
- **Stack:** Plain HTML/CSS/JS. No framework, no npm, no bundler.
- **Owner contact:** hello@wiseintegrate.com

---

## Every new blog post requires exactly 3 file changes

1. **Create** `blog/<slug>/index.html` — the new article page
2. **Edit** `blog/index.html` — add a card to the listing grid
3. **Edit** `sitemap.xml` — add the URL entry

Then commit and push to `main`.

---

## Part 1 — Writing rules (read before writing anything)

- **No em dashes** anywhere — never use `—` or `–`. Rewrite sentences to avoid them.
- **No publication dates** — articles are timeless. Do not include a date anywhere in the post.
- **No sermon preparation suggestions** — never suggest AI for writing or researching sermons. AI makes too many theological errors.
- **Simple language** — write for a non-technical audience (church leaders, small business owners).
- **Tone** — honest, practical, direct. Not promotional. Not hype.
- **Length** — 400–700 words of body content is ideal. Short and useful beats long and padded.
- **No em dashes** — worth repeating. Zero tolerance.

---

## Part 2 — Choosing a slug and category

The slug becomes the URL: `wiseintegrate.com/blog/<slug>`

- Use lowercase, hyphens only, no special characters
- Example: `ai-for-non-profits` → `/blog/ai-for-non-profits`

Category options (used in the card `data-category` and the badge):
- `church` — content aimed at churches and non-profits
- `business` — content aimed at small businesses
- Use `Beginner's Guide` as the badge text (but `business` as data-category) for educational explainers

---

## Part 3 — Full blog post HTML template

Copy this template exactly. Replace every `{{PLACEHOLDER}}` with the correct value.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{META_DESCRIPTION — 1-2 sentences, plain language, no hype}}">
<meta name="theme-color" content="#08080f">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="WiseIntegrate">
<meta property="og:title" content="{{ARTICLE TITLE}} — WiseIntegrate">
<meta property="og:description" content="{{META_DESCRIPTION}}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://wiseintegrate.com/blog/{{SLUG}}">
<meta property="og:image" content="https://wiseintegrate.com/images/og-image.png">
<meta property="og:site_name" content="WiseIntegrate">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://wiseintegrate.com/images/og-image.png">
<link rel="canonical" href="https://wiseintegrate.com/blog/{{SLUG}}">
<title>{{ARTICLE TITLE}} — WiseIntegrate</title>
<link rel="manifest" href="/manifest.json">
<link rel="icon" href="/images/favicon.png" type="image/png">
<link rel="apple-touch-icon" href="/images/icon-192.png">
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: #08080f; --bg2: #0a0a16; --bg3: rgba(29,78,216,0.06);
  --accent: #1d4ed8; --accent2: #60a5fa;
  --border: rgba(37,99,235,0.15); --border2: rgba(37,99,235,0.28);
  --text: #eff6ff; --text2: rgba(239,246,255,0.6); --text3: rgba(239,246,255,0.35);
  --radius: 12px; --font-head: 'Manrope', sans-serif; --font-body: 'Inter', sans-serif;
}
html { scroll-behavior: smooth; }
body {
  background: var(--bg); color: var(--text); font-family: var(--font-body);
  font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased; overflow-x: hidden;
}
body { cursor: none !important; }
a, button, [role="button"] { cursor: pointer !important; }
.mouse-ambient {
  position: fixed; top: 0; left: 0; width: 700px; height: 700px; border-radius: 50%;
  background: radial-gradient(circle, rgba(29,78,216,0.22) 0%, rgba(29,78,216,0.09) 40%, transparent 70%);
  pointer-events: none; z-index: 0; transform: translate(-50%,-50%);
  will-change: left,top; transition: left 0.08s linear, top 0.08s linear;
}
.cursor-glow {
  position: fixed; top: 0; left: 0; width: 14px; height: 14px; border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.72) 0%, rgba(180,210,255,0.42) 40%, rgba(96,165,250,0.18) 70%, transparent 100%);
  box-shadow: 0 0 12px 6px rgba(96,165,250,0.52), 0 0 26px 10px rgba(29,78,216,0.26);
  filter: blur(1.5px); pointer-events: none; z-index: 99999; transform: translate(-50%,-50%);
  will-change: left,top; transition: width 0.12s ease, height 0.12s ease;
}
.cursor-glow.hovering { width: 22px; height: 22px; }
.reading-progress {
  position: fixed; top: 0; left: 0; height: 3px; z-index: 1001; width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent2)); transition: width 0.1s linear;
}
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(8,8,15,0.92); backdrop-filter: blur(12px);
  border-bottom: 0.5px solid var(--border); padding: 0 24px; height: 60px;
  display: flex; align-items: center; justify-content: space-between;
}
.nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0; }
.nav-logo img { height: 42px; width: auto; }
.nav-links { display: flex; align-items: center; gap: 24px; list-style: none; flex-shrink: 0; }
.nav-links a { color: var(--text2); text-decoration: none; font-size: 14px; font-weight: 500; transition: color .2s; }
.nav-links a:hover { color: var(--text); }
.nav-cta { background: linear-gradient(135deg,#1d4ed8,#1e3a8a); color: #fff !important; padding: 9px 20px; border-radius: 50px; font-size: 14px; font-weight: 600; }
.nav-menu-btn { display: none; background: none; border: none; color: var(--text); cursor: pointer; font-size: 22px; }
.mobile-nav {
  display: none; position: fixed; top: 60px; left: 0; right: 0;
  background: rgba(8,8,15,0.98); border-bottom: 0.5px solid var(--border);
  padding: 20px 24px; z-index: 99; flex-direction: column; gap: 16px;
}
.mobile-nav.open { display: flex; }
.mobile-nav a { color: var(--text2); text-decoration: none; font-size: 15px; font-weight: 500; padding: 8px 0; border-bottom: 0.5px solid var(--border); }
.article-hero-banner {
  margin-top: 60px; position: relative; overflow: hidden;
  min-height: 440px; display: flex; align-items: flex-end; background: #08080f;
}
.hero-banner-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hero-banner-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(8,8,15,0.1) 0%, rgba(8,8,15,0.1) 40%, rgba(8,8,15,0.9) 100%);
}
.hero-banner-content {
  position: relative; z-index: 2; max-width: 1100px; margin: 0 auto; width: 100%; padding: 48px 5vw;
}
.article-cat-badge {
  display: inline-flex; align-items: center; gap: 6px; margin-bottom: 16px;
  font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: var(--accent2); border: 0.5px solid rgba(96,165,250,0.3); border-radius: 999px; padding: 5px 14px;
}
.article-cat-badge::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--accent2); display: inline-block; }
.hero-banner-content h1 {
  font-family: var(--font-head); font-size: clamp(28px, 5vw, 58px); font-weight: 800;
  line-height: 1.1; letter-spacing: -.03em; color: #fff; max-width: 600px;
  text-shadow: 0 2px 24px rgba(8,8,15,0.8);
}
.article-meta-bar { background: var(--bg2); border-bottom: 0.5px solid var(--border); padding: 16px 5vw; }
.article-meta-bar-inner {
  max-width: 1100px; margin: 0 auto;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text3); text-decoration: none; transition: color .2s; }
.back-link:hover { color: var(--accent2); }
.article-meta-row { display: flex; gap: 20px; font-size: 13px; color: var(--text3); flex-wrap: wrap; }
.article-body { max-width: 720px; margin: 0 auto; padding: 56px 24px 80px; }
.article-body p { font-size: 16.5px; color: var(--text2); line-height: 1.85; margin-bottom: 28px; }
.article-body h2 { font-family: var(--font-head); font-size: 22px; font-weight: 700; color: var(--text); margin-top: 48px; margin-bottom: 18px; letter-spacing: -.02em; }
.article-body a { color: var(--accent2); text-decoration: none; border-bottom: 0.5px solid rgba(96,165,250,0.3); transition: border-color .2s; }
.article-body a:hover { border-color: var(--accent2); }
.article-divider { border: none; border-top: 0.5px solid var(--border); margin: 48px 0; }
.pullquote { border-left: 2px solid var(--accent2); padding: 4px 24px; margin: 40px 0; }
.pullquote p { font-family: var(--font-head); font-size: 19px; font-weight: 600; color: var(--text); line-height: 1.5; font-style: italic; margin-bottom: 0; }
.article-cta {
  background: linear-gradient(135deg, rgba(29,78,216,0.15), rgba(29,78,216,0.05));
  border: 0.5px solid var(--border2); border-radius: var(--radius); padding: 40px; text-align: center;
}
.article-cta h3 { font-family: var(--font-head); font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 12px; letter-spacing: -.01em; }
.article-cta p { font-size: 15px; color: var(--text2); margin-bottom: 24px; line-height: 1.6; }
.btn-primary {
  background: linear-gradient(135deg, #1d4ed8, #1e3a8a); color: #fff;
  padding: 14px 32px; border-radius: 50px; font-size: 15px; font-weight: 600;
  text-decoration: none; display: inline-block; transition: box-shadow .2s, transform .2s; border: none;
}
.btn-primary:hover { box-shadow: 0 0 24px rgba(29,78,216,0.5); transform: translateY(-1px); }
footer { background: #030308; border-top: 0.5px solid var(--border); padding: 60px 24px 32px; }
.footer-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 48px; }
.footer-brand img { height: 32px; margin-bottom: 16px; }
.footer-brand p { font-size: 14px; color: var(--text3); line-height: 1.6; }
.footer-col h4 { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text3); margin-bottom: 16px; }
.footer-col a { display: block; color: var(--text2); text-decoration: none; font-size: 14px; margin-bottom: 10px; transition: color .2s; }
.footer-col a:hover { color: var(--text); }
.footer-bottom { max-width: 1100px; margin: 0 auto; border-top: 0.5px solid var(--border); padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
.footer-bottom p { font-size: 13px; color: var(--text3); }
.footer-bottom-links { display: flex; gap: 20px; }
.footer-bottom-links a { font-size: 13px; color: var(--text3); text-decoration: none; transition: color .2s; }
.footer-bottom-links a:hover { color: var(--text2); }
@media (max-width: 768px) {
  .nav-links { display: none; }
  .nav-menu-btn { display: block; }
  .article-hero-banner { min-height: 320px; }
  .hero-banner-content h1 { font-size: clamp(26px, 7vw, 38px); }
  .article-body { padding: 36px 20px 60px; }
  .article-cta { padding: 28px 20px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr; } }

/* ADD ANY CUSTOM CARD/COMPONENT STYLES HERE if the article needs them */
</style>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ARTICLE TITLE}}",
  "description": "{{META_DESCRIPTION}}",
  "url": "https://wiseintegrate.com/blog/{{SLUG}}",
  "image": "https://wiseintegrate.com/images/og-image.png",
  "author": { "@type": "Organization", "name": "WiseIntegrate", "url": "https://wiseintegrate.com" },
  "publisher": { "@type": "Organization", "name": "WiseIntegrate", "url": "https://wiseintegrate.com", "logo": { "@type": "ImageObject", "url": "https://wiseintegrate.com/images/logo.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wiseintegrate.com/blog/{{SLUG}}" }
}
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HV1CPFNJB9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-HV1CPFNJB9');
</script>
</head>
<body>

<div class="reading-progress" id="reading-progress"></div>
<div class="mouse-ambient" id="mouse-ambient"></div>
<div class="cursor-glow" id="cursor-glow"></div>

<nav>
  <a href="/" class="nav-logo">
    <img src="/images/logo.png" alt="WiseIntegrate" onerror="this.style.display='none';this.nextSibling.style.display='block'" />
    <span style="display:none;font-family:'Manrope',sans-serif;font-weight:800;font-size:18px;color:#fff">Wise<span style="color:#60a5fa">Integrate</span></span>
  </a>
  <ul class="nav-links">
    <li><a href="/">Home</a></li>
    <li><a href="/#services">Services</a></li>
    <li><a href="/#process">Process</a></li>
    <li><a href="/church">Church</a></li>
    <li><a href="/business">Business</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/blog">Blog</a></li>
    <li><a href="/faq">FAQ</a></li>
    <li><a href="/contact">Contact</a></li>
    <li><a href="/assessment" class="nav-cta">Start Assessment</a></li>
  </ul>
  <button class="nav-menu-btn" aria-label="Open menu">&#9776;</button>
</nav>
<div class="mobile-nav">
  <a href="/">Home</a>
  <a href="/#services">Services</a>
  <a href="/#process">Process</a>
  <a href="/church">Church</a>
  <a href="/business">Business</a>
  <a href="/about">About</a>
  <a href="/blog">Blog</a>
  <a href="/faq">FAQ</a>
  <a href="/contact">Contact</a>
  <a href="/assessment" style="color:var(--accent2);font-weight:700">Start Your Free Assessment</a>
</div>

<!-- HERO BANNER — replace the SVG content below with a relevant illustration -->
<div class="article-hero-banner">
  <svg class="hero-banner-svg" viewBox="0 0 1400 480" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <rect width="1400" height="480" fill="#08080f"/>
    <!-- BACKGROUND GLOW -->
    <radialGradient id="hero-glow" cx="68%" cy="50%" r="52%">
      <stop offset="0%" stop-color="#1d4ed8" stop-opacity="0.40"/>
      <stop offset="45%" stop-color="#1d4ed8" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/>
    </radialGradient>
    <rect width="1400" height="480" fill="url(#hero-glow)"/>
    <!-- GRID LINES -->
    <line x1="0" y1="160" x2="1400" y2="160" stroke="rgba(37,99,235,0.07)" stroke-width="0.5"/>
    <line x1="0" y1="320" x2="1400" y2="320" stroke="rgba(37,99,235,0.07)" stroke-width="0.5"/>
    <!-- ADD YOUR ILLUSTRATION SVG ELEMENTS HERE -->
    <!-- Keep visuals on the right half (x > 700) so the title text on the left remains readable -->
  </svg>
  <div class="hero-banner-overlay"></div>
  <div class="hero-banner-content">
    <div class="article-cat-badge">{{CATEGORY LABEL}}</div>
    <h1>{{ARTICLE TITLE}}</h1>
  </div>
</div>

<!-- META BAR -->
<div class="article-meta-bar">
  <div class="article-meta-bar-inner">
    <a href="/blog" class="back-link">&#8592; All Articles</a>
    <div class="article-meta-row">
      <span>{{X}} min read</span>
      <span>{{CATEGORY LABEL}}</span>
    </div>
  </div>
</div>

<!-- ARTICLE BODY -->
<main class="article-body">

  <p>{{OPENING PARAGRAPH}}</p>

  <!-- ADD BODY CONTENT HERE -->
  <!-- Use <p> for paragraphs, <h2> for section headings -->
  <!-- Use .pullquote for a highlighted quote -->
  <!-- Use custom card components defined in <style> if needed -->

  <hr class="article-divider">

  <div class="article-cta">
    <h3>Not sure where to start?</h3>
    <p>Our free AI Readiness Assessment takes 10 minutes and gives you a clear picture of where your organisation stands and which areas will deliver the greatest return.</p>
    <a href="/assessment" class="btn-primary">Take the Free Assessment</a>
  </div>

</main>

<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="/images/logo.png" alt="WiseIntegrate" onerror="this.style.display='none'">
      <p>AI should serve your mission. Not replace it.</p>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <a href="/church">Church Integration</a>
      <a href="/business">Business Integration</a>
      <a href="/assessment">Readiness Assessment</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="/about">About</a>
      <a href="/blog">Blog</a>
      <a href="/contact">Contact</a>
    </div>
    <div class="footer-col">
      <h4>Legal</h4>
      <a href="/privacy">Privacy Policy</a>
      <a href="/terms">Terms of Use</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&#169; 2026 WiseIntegrate. All rights reserved.</p>
    <div class="footer-bottom-links">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </div>
  </div>
</footer>

<script>
const _glow = document.getElementById('cursor-glow');
const _ambient = document.getElementById('mouse-ambient');
if (_glow && !('ontouchstart' in window) && window.matchMedia('(pointer: fine)').matches) {
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    _glow.style.left = mx + 'px'; _glow.style.top = my + 'px';
    _ambient.style.left = mx + 'px'; _ambient.style.top = my + 'px';
  });
  document.querySelectorAll('a,button,[role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => _glow.classList.add('hovering'));
    el.addEventListener('mouseleave', () => _glow.classList.remove('hovering'));
  });
} else {
  if (_glow) _glow.style.display = 'none';
  if (_ambient) _ambient.style.display = 'none';
}
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (window.scrollY / docH * 100) + '%';
  });
}
const menuBtn = document.querySelector('.nav-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
}
</script>
</body>
</html>
```

---

## Part 4 — SVG hero guidelines

The hero banner is a 1400×480 SVG. Rules:
- Keep all visual elements in the **right half** (x > 700) so the article title on the left is always readable
- Blue colour palette: `#1d4ed8` (dark blue), `#60a5fa` (light blue), `rgba(96,165,250,0.X)` for transparency
- Dark background: `#08080f`
- Illustrate the article topic with simple geometric shapes, icons, or node diagrams
- Subtle animations are welcome: use CSS `@keyframes` and apply via class names
- No clipart style — keep it abstract and geometric

---

## Part 5 — Add a card to `blog/index.html`

Open `blog/index.html`. Find the `<div class="articles-grid">` section. Add the new `<a>` block **immediately after the opening `<div class="articles-grid">` tag** — newest post goes first, at the top. Match this exact format:

```html
      <a href="/blog/{{SLUG}}" class="article-card" data-category="{{church|business}}">
        <span class="article-cat">{{CATEGORY LABEL}}</span>
        <h2>{{ARTICLE TITLE}}</h2>
        <p>{{CARD SUMMARY — 1-2 sentences, matches the article's opening}}</p>
        <div class="article-meta">
          <span>{{X}} min read</span>
        </div>
        <span class="article-arrow">Read article &rarr;</span>
      </a>
```

`data-category` must be exactly `church` or `business` (lowercase) for the filter buttons to work.

---

## Part 6 — Add to `sitemap.xml`

Open `sitemap.xml`. Add this entry inside the `<urlset>` block, in the Blog section:

```xml
  <url>
    <loc>https://wiseintegrate.com/blog/{{SLUG}}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
```

---

## Part 7 — Commit and push

```bash
git add blog/{{SLUG}}/index.html blog/index.html sitemap.xml
git commit -m "Add blog post: {{ARTICLE TITLE}}"
git push
```

Vercel deploys automatically on push to `main`. The post is live within ~30 seconds.

---

## Component reference — optional content blocks

These are ready-to-use components. Add their CSS to the `<style>` block and use the HTML in `<main class="article-body">`.

### Numbered cards (principles, steps, tips)
```css
.cards-stack { display: flex; flex-direction: column; gap: 16px; margin: 32px 0 40px; }
.card-item {
  display: flex; gap: 20px; align-items: flex-start;
  background: var(--bg3); border: 0.5px solid var(--border); border-radius: var(--radius); padding: 24px;
}
.card-num {
  flex-shrink: 0; width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-head); font-size: 14px; font-weight: 800; color: #fff;
}
.card-text h3 { font-family: var(--font-head); font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.card-text p { font-size: 14.5px; color: var(--text2); line-height: 1.7; margin-bottom: 0; }
```
```html
<div class="cards-stack">
  <div class="card-item">
    <div class="card-num">1</div>
    <div class="card-text">
      <h3>Heading</h3>
      <p>Body text.</p>
    </div>
  </div>
</div>
```

### Warning/caution cards (amber theme)
```css
.warn-stack { display: flex; flex-direction: column; gap: 24px; margin: 8px 0 48px; }
.warn-card {
  border: 0.5px solid rgba(251,146,60,0.25); background: rgba(251,146,60,0.08);
  border-radius: var(--radius); padding: 28px 28px 28px 24px; position: relative; overflow: hidden;
}
.warn-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: linear-gradient(to bottom, rgba(251,146,60,0.8), rgba(251,146,60,0.2));
}
.warn-card h3 { font-family: var(--font-head); font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 12px; }
.warn-card p { font-size: 15.5px; color: var(--text2); line-height: 1.8; margin-bottom: 0; }
```
```html
<div class="warn-stack">
  <div class="warn-card">
    <h3>Risk heading</h3>
    <p>Body text.</p>
  </div>
</div>
```

### Pullquote
```html
<div class="pullquote">
  <p>"Quote text here."</p>
</div>
```

---

## Existing posts for reference

| Slug | Category | Style used |
|------|----------|-----------|
| `how-to-introduce-ai-to-church-leadership` | Church | Plain paragraphs |
| `ai-for-admin-free-your-team` | Church | Plain paragraphs |
| `what-is-artificial-intelligence` | Business | Numbered cards |
| `making-ai-work-for-your-organisation` | Business | Numbered cards + pullquote |
| `three-disadvantages-of-ai` | Business | Warning cards |
| `how-ai-powers-small-business` | Business | Icon cards + pullquote |
