import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// The consultant dashboard login. The password lives only in Vercel (env ADMIN_PASSWORD), never in the page.
// A signed, http-only cookie keeps the consultant signed in for 12 hours.
const COOKIE = "wi_admin";
const HOURS = 12;

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_PASSWORD is not set");
  return s;
}
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

export function passwordMatches(input: string) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || !input) return false;
  const a = createHmac("sha256", "pw").update(input).digest();
  const b = createHmac("sha256", "pw").update(real).digest();
  return timingSafeEqual(a, b);
}

export async function startSession() {
  const exp = String(Date.now() + HOURS * 3600_000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: HOURS * 3600,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  const v = (await cookies()).get(COOKIE)?.value;
  if (!v) return false;
  const [exp, mac] = v.split(".");
  if (!exp || !mac || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return mac.length === good.length && timingSafeEqual(Buffer.from(mac), Buffer.from(good));
}

// A brake on password guessing: after 5 wrong tries from one address, wait 15 minutes.
const tries = new Map<string, { n: number; until: number }>();
export function lockedOut(ip: string) {
  const t = tries.get(ip);
  return Boolean(t && t.until > Date.now());
}
export function recordFailure(ip: string) {
  const t = tries.get(ip) ?? { n: 0, until: 0 };
  t.n += 1;
  if (t.n >= 5) {
    t.until = Date.now() + 15 * 60_000;
    t.n = 0;
  }
  tries.set(ip, t);
}
export function clearFailures(ip: string) {
  tries.delete(ip);
}
