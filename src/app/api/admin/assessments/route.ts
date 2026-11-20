import { adminToken } from "@/lib/admin-auth";
import { rpc } from "@/lib/supabase-public";

// All assessments, newest first (signed-in dashboard only; the database checks the session).
export async function GET() {
  const token = await adminToken();
  if (!token) return Response.json({ error: "Not signed in" }, { status: 401 });
  try {
    const rows = await rpc("wi_admin_list", { p_token: token });
    return Response.json(rows, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }
}
