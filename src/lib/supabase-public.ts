import "server-only";

// The website talks to Supabase with the PUBLIC anon key only (it is meant to be public; the old site published it too).
// All assessment reads and writes go through database functions (supabase/migrations/20261120_secure_functions.sql),
// which check what is allowed, so no secret key is needed for the assessment or the dashboard.
export const SUPABASE_URL = process.env.SUPABASE_URL || "https://ppgecvmyuyuntwnqwcru.supabase.co";
export const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZ2Vjdm15dXl1bnR3bnF3Y3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MzY4MzYsImV4cCI6MjA5NzQxMjgzNn0.sVdfTUM6NvqI7ZrjfdO7JbEit9e3izKhXNZ0-zBmHIs";

const headers = { "Content-Type": "application/json", apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` };

/** Calls a database function (Supabase RPC). Throws with the database's message if it fails. */
export async function rpc<T = unknown>(fn: string, args: Record<string, unknown>): Promise<T> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, { method: "POST", headers, body: JSON.stringify(args), cache: "no-store" });
  const text = await r.text();
  const data = text ? JSON.parse(text) : null;
  if (!r.ok) throw new Error((data && (data.message || data.error)) || `HTTP ${r.status}`);
  return data as T;
}

/** Calls one of our Supabase Edge Functions (generate-report, send-snapshot). */
export function callEdge(name: string, body: unknown) {
  return fetch(`${SUPABASE_URL}/functions/v1/${name}`, { method: "POST", headers, body: JSON.stringify(body), cache: "no-store" });
}
