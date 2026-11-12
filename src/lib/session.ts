import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./admin-token";

export { SESSION_COOKIE, SESSION_MAX_AGE } from "./admin-token";

/** Für API-Routen: ist die Anfrage von einem angemeldeten Admin? */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}
