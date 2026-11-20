import { isAdmin } from "@/lib/admin-auth";
import { adminDb } from "@/lib/supabase-admin";

// All assessments, newest first (signed-in dashboard only).
export async function GET() {
  if (!(await isAdmin())) return Response.json({ error: "Not signed in" }, { status: 401 });
  const { data, error } = await adminDb().from("ai_assessments").select("*").order("submitted_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { headers: { "Cache-Control": "no-store" } });
}
