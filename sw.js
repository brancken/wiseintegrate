// sw.js — WiseIntegrate Service Worker
// Cache-first for assets, network-first for HTML pages

const CACHE_NAME   = 'wiseintegrate-v2';
const STATIC_CACHE = 'wiseintegrate-static-v2';

// Files to pre-cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/reset.css',
  '/css/main.css',
  '/css/components.css',
  '/css/animations.css',
  '/js/cursor.js',
  '/js/nav.js',
  '/js/pwa.js',
  '/js/animations.js',
  '/js/form.js',
  '/manifest.json',
  '/images/icon-192.png',
  '/images/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=Inter:wght@400;500&display=swap'
];

// ── Install ──────────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activate ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== STATIC_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// ── Fetch ─────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and cross-origin API requests (Supabase etc.)
  if (request.method !== 'GET') return;
  if (url.hostname.includes('supabase.co')) return;
  if (url.hostname.includes('fonts.gstatic.com')) {
    // Cache fonts forever
    event.respondWith(cacheFirst(request));
    return;
  }

  // HTML pages — network first, fall back to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Assets — cache first
  event.respondWith(cacheFirst(request));
});

// ── Strategies ───────────────────────────────────────────
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || await caches.match('/') || new Response('Offline');
  }
}
