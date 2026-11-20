import { callEdge, rpc } from "@/lib/supabase-public";

// The public AI Readiness Assessment is saved here through a database function (no direct table access).
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== "object") return Response.json({ error: "Bad request" }, { status: 400 });
  if (body.website) return Response.json({ ok: true }); // honeypot: bots fill hidden fields
  if (!String(body.name ?? "").trim()) return Response.json({ error: "Name is required" }, { status: 400 });

  let id: string;
  try {
    id = await rpc<string>("wi_submit_assessment", { p: body });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Could not save" }, { status: 500 });
  }

  // The AI report is made straight away; if it fails, the dashboard can make it later.
  try {
    const res = await callEdge("generate-report", body);
    if (res.ok) {
      const fn = (await res.json()) as { report?: string; report_data?: unknown };
      if (fn.report || fn.report_data) await rpc("wi_save_first_report", { p_id: id, p_report: fn.report ?? null, p_data: fn.report_data ?? null });
    }
  } catch {
    // report can be generated later from the dashboard
  }

  return Response.json({ id });
}
