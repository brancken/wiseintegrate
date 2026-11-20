// Uploads the course ZIP files to the PRIVATE Supabase storage bucket "course-downloads".
// Buyers get them only through short-lived signed links on their purchase page (never public, never in GitHub).
//
//   node --env-file=.env.local scripts/upload-downloads.mjs
//
// Needs SUPABASE_SERVICE_ROLE_KEY in .env.local (Supabase dashboard > Project Settings > API keys > secret key).
// Re-run after the course package changes (make-course-pages.py rebuilds the ZIPs in legacy/c).
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const URL_ = process.env.SUPABASE_URL || "https://ppgecvmyuyuntwnqwcru.supabase.co";
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!KEY) { console.error("Put SUPABASE_SERVICE_ROLE_KEY=... in .env.local first."); process.exit(1); }
const db = createClient(URL_, KEY, { auth: { persistSession: false } });
const BUCKET = "course-downloads";

const SRC = path.resolve("legacy/c");
const FILES = {
  "htmaw-course-1.zip": "XKC6EIp3zWeU9UJc",
  "htmaw-course-2.zip": "npXxMmcI88Iz4Cx4",
  "htmaw-course-3.zip": "5BfeRrpyIfMW7b15",
  "htmaw-package.zip": "g1xyIZuF4gHclYFx",
};

const { data: buckets } = await db.storage.listBuckets();
if (!buckets?.some((b) => b.name === BUCKET)) {
  const { error } = await db.storage.createBucket(BUCKET, { public: false, fileSizeLimit: "50MB" });
  if (error) throw error;
  console.log("Created private bucket", BUCKET);
}

for (const [name, folder] of Object.entries(FILES)) {
  const dir = path.join(SRC, folder);
  const zip = fs.readdirSync(dir).find((f) => f.endsWith(".zip"));
  if (!zip) { console.log("  missing ZIP in", dir); continue; }
  const body = fs.readFileSync(path.join(dir, zip));
  const { error } = await db.storage.from(BUCKET).upload(name, body, { upsert: true, contentType: "application/zip" });
  console.log(error ? `  ${name}: FAILED ${error.message}` : `  ${name}: uploaded (${(body.length / 1048576).toFixed(1)} MB) from "${zip}"`);
}
