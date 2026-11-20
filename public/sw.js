/* WiseIntegrate service worker: the app opens fast and works offline for public pages.
   It never saves anything private: no /api, no account, course, dashboard or tool pages. */
const VERSION = "wi-v2";
const PRECACHE = ["/", "/shop", "/churches", "/business", "/services", "/contact", "/offline", "/brand/logo.webp", "/icons/icon-192.png"];
const PRIVATE = /^\/(api|account|learn|login|admin|dashboard|tools|report-summary|report-guide|assessment|purchase)(\/|$)/;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || PRIVATE.test(url.pathname)) return;

  // Pages: network first, then the saved copy, then the offline page.
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("/offline"))),
    );
    return;
  }

  // Build files have unique names: cache first.
  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; })),
    );
    return;
  }

  // Images, fonts and icons: saved copy straight away, fresh copy in the background.
  if (/\.(woff2|png|jpg|jpeg|webp|svg|ico)$/.test(url.pathname)) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const fresh = fetch(req).then((res) => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; });
        return hit || fresh;
      }),
    );
  }
});
