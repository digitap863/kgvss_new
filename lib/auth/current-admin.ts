import { cookies } from "next/headers";

import { verifyAdminToken } from "@/lib/auth/jwt";
import { env } from "@/lib/env";

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(env.adminCookieName)?.value;

  return token ? verifyAdminToken(token) : null;
}
