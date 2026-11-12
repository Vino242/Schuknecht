/**
 * Signierte Admin-Sitzung. Das Cookie enthält Ablaufzeit + HMAC-Signatur;
 * der Schlüssel wird aus ADMIN_PASSWORD abgeleitet. Ohne Passwort lässt sich
 * kein gültiges Cookie bauen. Wird das Passwort geändert, sind alle Logins
 * ungültig.
 *
 * Nur Web Crypto, damit Middleware (Edge) und API-Routen (Node) es teilen.
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 24 Stunden

const enc = new TextEncoder();

async function signingKey() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  const raw = await crypto.subtle.digest("SHA-256", enc.encode(`schuknecht-admin|${pw}`));
  return crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, [
    "sign",
    "verify",
  ]);
}

function toB64url(buf: ArrayBuffer) {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64url(s: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(s)) return null;
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

/** Passwortvergleich in konstanter Zeit */
export async function checkPassword(input: unknown) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || typeof input !== "string" || !input) return false;
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(input)),
    crypto.subtle.digest("SHA-256", enc.encode(pw)),
  ]);
  const x = new Uint8Array(a);
  const y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export async function createSessionToken() {
  const key = await signingKey();
  if (!key) throw new Error("ADMIN_PASSWORD fehlt");
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(exp));
  return `${exp}.${toB64url(sig)}`;
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) * 1000 < Date.now()) return false;
  const key = await signingKey();
  const bytes = fromB64url(sig);
  if (!key || !bytes) return false;
  return crypto.subtle.verify("HMAC", key, bytes, enc.encode(exp));
}
