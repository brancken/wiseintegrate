import { adminToken } from "@/lib/admin-auth";
import { callEdge, rpc } from "@/lib/supabase-public";

// Email the AI readiness result to the client (only from the signed-in dashboard).
export async function POST(_req: Request, ctx: RouteContext<"/api/admin/assessments/[id]/snapshot">) {
  const token = await adminToken();
  if (!token) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await ctx.params;
  try {
    await rpc("wi_admin_get", { p_token: token, p_id: id }); // checks the session
  } catch {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }
  const res = await callEdge("send-snapshot", { id });
  const data = await res.json().catch(() => ({}));
  return Response.json(data, { status: res.status });
}
