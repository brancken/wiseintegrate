import { adminToken } from "@/lib/admin-auth";
import { callEdge, rpc } from "@/lib/supabase-public";

// Re-run the AI report for one assessment and save it.
export async function POST(_req: Request, ctx: RouteContext<"/api/admin/assessments/[id]/regenerate">) {
  const token = await adminToken();
  if (!token) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    const row = await rpc<Record<string, unknown> | null>("wi_admin_get", { p_token: token, p_id: id });
    if (!row || !row.id) return Response.json({ error: "Not found" }, { status: 404 });
    const res = await callEdge("generate-report", row);
    if (!res.ok) return Response.json({ error: `Report service: HTTP ${res.status}` }, { status: 502 });
    const fn = (await res.json()) as { report?: string; report_data?: unknown };
    if (!fn.report_data) return Response.json({ error: "No report_data in response" }, { status: 502 });
    await rpc("wi_admin_save_report", { p_token: token, p_id: id, p_report: fn.report ?? null, p_data: fn.report_data });
    return Response.json({ report: fn.report ?? null, report_data: fn.report_data });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}
