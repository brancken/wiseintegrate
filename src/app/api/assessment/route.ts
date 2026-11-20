import { adminDb, callEdge, ASSESSMENT_FIELDS } from "@/lib/supabase-admin";

// The public AI Readiness Assessment is saved here (server side), so the browser never needs database access.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return Response.json({ error: "Bad request" }, { status: 400 });
  if (body.website) return Response.json({ ok: true }); // honeypot: bots fill hidden fields
  const row: Record<string, unknown> = {};
  for (const k of ASSESSMENT_FIELDS) {
    if (k in body) row[k] = typeof body[k] === "string" ? String(body[k]).slice(0, 2000) : body[k];
  }
  if (!row.name) return Response.json({ error: "Name is required" }, { status: 400 });

  const db = adminDb();
  const { data: saved, error } = await db.from("ai_assessments").insert(row).select("id").single();
  if (error || !saved) return Response.json({ error: error?.message || "Could not save" }, { status: 500 });

  // The AI report is made straight away; if it fails, the dashboard can make it later.
  try {
    const res = await callEdge("generate-report", row);
    if (res.ok) {
      const fn = (await res.json()) as { report?: string; report_data?: unknown };
      const patch: Record<string, unknown> = {};
      if (fn.report) patch.ai_report = fn.report;
      if (fn.report_data) patch.report_data = fn.report_data;
      if (Object.keys(patch).length) await db.from("ai_assessments").update(patch).eq("id", saved.id);
    }
  } catch {
    // report can be generated later from the dashboard
  }

  return Response.json({ id: saved.id });
}
