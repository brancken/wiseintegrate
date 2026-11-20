import { signIn } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  const res = await signIn(String(password ?? ""));
  return res.ok ? Response.json({ ok: true }) : Response.json({ error: res.error }, { status: 401 });
}
