import { signOut } from "@/lib/admin-auth";

export async function POST() {
  await signOut();
  return Response.json({ ok: true });
}
