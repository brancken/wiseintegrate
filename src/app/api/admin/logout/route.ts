import { endSession } from "@/lib/admin-auth";

export async function POST() {
  await endSession();
  return Response.json({ ok: true });
}
