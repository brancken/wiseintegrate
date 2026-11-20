import "server-only";
import { cookies } from "next/headers";
import { rpc } from "./supabase-public";

// Consultant dashboard sign-in. The password is checked by the database (function wi_admin_login), which hands back
// a 12-hour session token; the token sits in an http-only cookie the page's own scripts cannot read.
const COOKIE = "wi_admin";

export async function signIn(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const token = await rpc<string | null>("wi_admin_login", { p_pass: password });
    if (!token) return { ok: false, error: "Incorrect password." };
    (await cookies()).set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 12 * 3600 });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Sign-in failed." };
  }
}

export async function signOut() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await rpc("wi_admin_logout", { p_token: token }).catch(() => {});
  jar.delete(COOKIE);
}

/** The session token, or null when not signed in. */
export async function adminToken() {
  return (await cookies()).get(COOKIE)?.value ?? null;
}
