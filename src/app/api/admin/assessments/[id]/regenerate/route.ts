import { isAdmin } from "@/lib/admin-auth";
import { adminDb, callEdge } from "@/lib/supabase-admin";

// Re-run the AI report for one assessment and save it.
export async function POST(_req: Request, ctx: RouteContext<"/api/admin/assessments/[id]/regenerate">) {
  if (!(await isAdmin())) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await ctx.params;
  const db = adminDb();
  const { data: row, error } = await db.from("ai_assessments").select("*").eq("id", id).single();
  if (error || !row) return Response.json({ error: error?.message || "Not found" }, { status: 404 });
  const res = await callEdge("generate-report", row);
  if (!res.ok) return Response.json({ error: `Report service: HTTP ${res.status}` }, { status: 502 });
  const fn = (await res.json()) as { report?: string; report_data?: unknown };
  if (!fn.report_data) return Response.json({ error: "No report_data in response" }, { status: 502 });
  const patch: Record<string, unknown> = { report_data: fn.report_data };
  if (fn.report) patch.ai_report = fn.report;
  const up = await db.from("ai_assessments").update(patch).eq("id", id);
  if (up.error) return Response.json({ error: up.error.message }, { status: 500 });
  return Response.json({ report: fn.report ?? null, report_data: fn.report_data });
}
