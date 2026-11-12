import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  createSessionToken,
} from "@/lib/admin-token";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!(await checkPassword(body?.password))) {
    // Bremst Rateversuche, ohne beim Vertippen zu stören
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return response;
}
