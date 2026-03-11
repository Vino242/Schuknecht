import { cookies } from "next/headers";
import crypto from "crypto";

// In-memory session store (resets on server restart — fine for single-admin use)
const sessions = new Map<string, { createdAt: number }>();

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours in seconds

export function createSession(): string {
  const token = crypto.randomUUID();
  sessions.set(token, { createdAt: Date.now() });
  // Clean up expired sessions
  for (const [key, val] of sessions) {
    if (Date.now() - val.createdAt > SESSION_MAX_AGE * 1000) {
      sessions.delete(key);
    }
  }
  return token;
}

export function destroySession(token: string) {
  sessions.delete(token);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const session = sessions.get(token);
  if (!session) return false;

  // Check expiry
  if (Date.now() - session.createdAt > SESSION_MAX_AGE * 1000) {
    sessions.delete(token);
    return false;
  }

  return true;
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
