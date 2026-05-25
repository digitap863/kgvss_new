import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import { ApiError } from "@/lib/api/errors";
import { createAdminToken, verifyAdminToken } from "@/lib/auth/jwt";
import { env } from "@/lib/env";

export function getTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return request.cookies.get(env.adminCookieName)?.value;
}

export function requireAdmin(request: NextRequest) {
  const token = getTokenFromRequest(request);
  const payload = token ? verifyAdminToken(token) : null;

  if (!payload) {
    throw new ApiError("Unauthorized.", 401);
  }

  return payload;
}

export async function setAdminSessionCookie(admin: { id: string; email: string }) {
  const token = createAdminToken({
    sub: admin.id,
    email: admin.email,
    role: "admin",
  });
  const cookieStore = await cookies();

  cookieStore.set(env.adminCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.nodeEnv === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.delete(env.adminCookieName);
}
