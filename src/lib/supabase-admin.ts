import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only Supabase access with the secret service-role key (Vercel env SUPABASE_SERVICE_ROLE_KEY).
// The browser never sees this key; the public anon key no longer has any access to assessment data.
export const SUPABASE_URL = process.env.SUPABASE_URL || "https://ppgecvmyuyuntwnqwcru.supabase.co";

function serviceKey() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  return key;
}

export function adminDb() {
  return createClient(SUPABASE_URL, serviceKey(), { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Calls one of our Supabase Edge Functions with the service key. */
export async function callEdge(name: string, body: unknown) {
  const key = serviceKey();
  return fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify(body),
  });
}

// Columns the public assessment form may write. Anything else in a submission is ignored.
export const ASSESSMENT_FIELDS: string[] = [
  "name", "role", "organisation", "email", "phone", "location", "org_type", "org_size", "staff_count", "ai_usage", "prompt_reason",
  "d1_leadership", "d2_data", "d3_literacy", "d4_governance", "d5_usage", "d6_departments", "d7_security", "d8_budget",
  "total_score", "maturity_stage",
  ...Array.from({ length: 45 }, (_, i) => `q${i + 1}`),
];
