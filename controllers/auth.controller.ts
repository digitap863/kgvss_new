import type { NextRequest } from "next/server";

import {
  clearAdminSessionCookie,
  requireAdmin,
  setAdminSessionCookie,
} from "@/lib/auth/session";
import { successResponse } from "@/lib/api/response";
import { authenticateAdmin } from "@/services/auth.service";
import { validateLoginPayload } from "@/validations/auth.validation";

export async function loginController(request: NextRequest) {
  const credentials = validateLoginPayload(await request.json());
  const admin = await authenticateAdmin(credentials.email, credentials.password);
  const token = await setAdminSessionCookie(admin);

  return successResponse(
    { admin, token },
    { message: "Logged in successfully." },
  );
}

export async function logoutController() {
  await clearAdminSessionCookie();

  return successResponse(null, { message: "Logged out successfully." });
}

export async function meController(request: NextRequest) {
  const admin = requireAdmin(request);

  return successResponse(admin);
}
