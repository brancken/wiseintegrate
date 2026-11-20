import { isAdmin } from "@/lib/admin-auth";
import { callEdge } from "@/lib/supabase-admin";

// Email the AI readiness result to the client (only from the signed-in dashboard).
export async function POST(_req: Request, ctx: RouteContext<"/api/admin/assessments/[id]/snapshot">) {
  if (!(await isAdmin())) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await ctx.params;
  const res = await callEdge("send-snapshot", { id });
  const data = await res.json().catch(() => ({}));
  return Response.json(data, { status: res.status });
}
