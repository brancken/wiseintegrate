import { isAdmin } from "@/lib/admin-auth";
import { adminDb } from "@/lib/supabase-admin";

// Save consultant notes on one assessment.
export async function PATCH(req: Request, ctx: RouteContext<"/api/admin/assessments/[id]">) {
  if (!(await isAdmin())) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { id } = await ctx.params;
  const { consultant_notes } = (await req.json().catch(() => ({}))) as { consultant_notes?: string };
  const { error } = await adminDb().from("ai_assessments").update({ consultant_notes: String(consultant_notes ?? "") }).eq("id", id);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
