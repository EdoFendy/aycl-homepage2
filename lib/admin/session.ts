import { cookies } from "next/headers";
import { destroySession, getAdminBySessionToken, getSessionByToken } from "@/lib/admin/auth";

const COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || "admin_session";

export function getSessionTokenFromCookie() {
  return cookies().get(COOKIE_NAME)?.value ?? null;
}

export function setSessionCookie(token: string) {
  const session = getSessionByToken(token);
  if (!session) {
    throw new Error("Sessione non trovata.");
  }

  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(session.expires_at),
  });
}

export function clearSessionCookie() {
  const cookieJar = cookies();
  const token = cookieJar.get(COOKIE_NAME)?.value;
  if (token) {
    destroySession(token);
  }
  cookieJar.delete(COOKIE_NAME);
}

export function getCurrentAdmin() {
  const token = getSessionTokenFromCookie();
  if (!token) {
    return null;
  }
  return getAdminBySessionToken(token);
}
