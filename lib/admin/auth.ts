import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { addHours } from "date-fns";
import { getDb, resetExpiredSessions, type AdminSessionRecord, type AdminUserRecord } from "@/lib/db";

const SESSION_DURATION_HOURS = Number(process.env.ADMIN_SESSION_TTL || 24);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getAdminUsersCount() {
  const db = getDb();
  const row = db.prepare("SELECT COUNT(*) as count FROM admin_users").get() as { count: number };
  return row.count;
}

export function findAdminByEmail(email: string) {
  const db = getDb();
  const user = db
    .prepare("SELECT * FROM admin_users WHERE email = ?")
    .get(normalizeEmail(email)) as AdminUserRecord | undefined;
  return user ?? null;
}

export function createAdminUser(email: string, password: string) {
  const db = getDb();
  const normalizedEmail = normalizeEmail(email);

  const existing = findAdminByEmail(normalizedEmail);
  if (existing) {
    throw new Error("Un utente con questa email esiste già.");
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const statement = db.prepare(
    "INSERT INTO admin_users (email, password_hash) VALUES (?, ?)"
  );
  const result = statement.run(normalizedEmail, passwordHash);
  return db
    .prepare("SELECT * FROM admin_users WHERE id = ?")
    .get(result.lastInsertRowid) as AdminUserRecord;
}

export function verifyCredentials(email: string, password: string) {
  const user = findAdminByEmail(email);
  if (!user) {
    return null;
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  if (!valid) {
    return null;
  }

  return user;
}

export function createAdminSession(userId: number) {
  resetExpiredSessions();

  const token = randomUUID();
  const expiresAt = addHours(new Date(), SESSION_DURATION_HOURS);
  const db = getDb();
  db.prepare(
    "INSERT INTO admin_sessions (user_id, token, expires_at) VALUES (?, ?, ?)"
  ).run(userId, token, expiresAt.toISOString());

  return token;
}

export function getSessionByToken(token: string): AdminSessionRecord | null {
  resetExpiredSessions();
  const db = getDb();
  const session = db
    .prepare("SELECT * FROM admin_sessions WHERE token = ?")
    .get(token) as AdminSessionRecord | undefined;
  return session ?? null;
}

export function getAdminBySessionToken(token: string) {
  const session = getSessionByToken(token);
  if (!session) {
    return null;
  }

  const db = getDb();
  const user = db
    .prepare("SELECT * FROM admin_users WHERE id = ?")
    .get(session.user_id) as AdminUserRecord | undefined;
  return user ?? null;
}

export function destroySession(token: string) {
  const db = getDb();
  db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
}
