// Tells Bing (and so Copilot and ChatGPT search), Yandex, Naver, Seznam and Yep that pages changed.
// Run AFTER a deploy is live, with Dr. Brancken's approval:  node scripts/indexnow.mjs   (all pages)  or  node scripts/indexnow.mjs /shop /blog/new-post
const KEY = "b07acb9f858b033e2f0882af0ce902c3"; // matches public/b07acb9f858b033e2f0882af0ce902c3.txt
const HOST = "www.wiseintegrate.com";
let paths = process.argv.slice(2);
if (!paths.length) {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}
const urlList = paths.map((p) => `https://${HOST}${p}`);
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} pages`);
