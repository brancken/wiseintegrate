import { passwordMatches, startSession, lockedOut, recordFailure, clearFailures } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (lockedOut(ip)) return Response.json({ error: "Too many tries. Please wait 15 minutes." }, { status: 429 });
  const { password } = (await req.json().catch(() => ({}))) as { password?: string };
  await new Promise((r) => setTimeout(r, 400)); // slows down guessing
  if (!passwordMatches(String(password ?? ""))) {
    recordFailure(ip);
    return Response.json({ error: "Incorrect password." }, { status: 401 });
  }
  clearFailures(ip);
  await startSession();
  return Response.json({ ok: true });
}
