import "server-only";
import { adminDb } from "./supabase-admin";
import { DOWNLOAD_BUCKET, downloads } from "@/config/products";

/** Short-lived private download links (1 hour) for what a buyer paid for. Links are made fresh each visit. */
export async function signedDownloads(productIds: string[]) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  const db = adminDb();
  const out: { label: string; url: string | null }[] = [];
  for (const id of productIds) {
    for (const f of downloads[id]?.files ?? []) {
      const { data } = await db.storage.from(DOWNLOAD_BUCKET).createSignedUrl(f.path, 3600, { download: f.download });
      out.push({ label: f.label, url: data?.signedUrl ?? null });
    }
  }
  return out;
}
