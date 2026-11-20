import { adminToken } from "@/lib/admin-auth";
import { rpc } from "@/lib/supabase-public";

// Save consultant notes on one assessment.
export async function PATCH(req: Request, ctx: RouteContext<"/api/admin/assessments/[id]">) {
  const token = await adminToken();
  if (!token) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await ctx.params;
  const { consultant_notes } = (await req.json().catch(() => ({}))) as { consultant_notes?: string };
  try {
    await rpc("wi_admin_set_notes", { p_token: token, p_id: id, p_notes: String(consultant_notes ?? "") });
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}
