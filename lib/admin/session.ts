import { cookies } from "next/headers";
import { destroySession, getAdminBySessionToken, getSessionByToken } from "@/lib/admin/auth";

const COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || "admin_session";

export async function getSessionTokenFromCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function setSessionCookie(token: string) {
  const session = getSessionByToken(token);
  if (!session) {
    throw new Error("Sessione non trovata.");
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(session.expires_at),
  });
}

export async function clearSessionCookie() {
  const cookieJar = await cookies();
  const token = cookieJar.get(COOKIE_NAME)?.value;
  if (token) {
    destroySession(token);
  }
  cookieJar.delete(COOKIE_NAME);
}

export async function getCurrentAdmin() {
  const token = await getSessionTokenFromCookie();
  if (!token) {
    return null;
  }
  return getAdminBySessionToken(token);
}
