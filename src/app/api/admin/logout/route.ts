import { NextResponse } from "next/server";
import { getSessionToken, destroySession, SESSION_COOKIE } from "@/lib/session";

export async function POST() {
  const token = await getSessionToken();
  if (token) destroySession(token);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
  return response;
}
