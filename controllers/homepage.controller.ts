import type { NextRequest } from "next/server";

import { successResponse } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/session";
import {
  getHomepageContentRecord,
  updateHomepageContent,
} from "@/services/homepage.service";
import { validateHomepageContentPayload } from "@/validations/content.validation";

export async function getHomepageController() {
  return successResponse(await getHomepageContentRecord());
}

export async function updateHomepageController(request: NextRequest) {
  requireAdmin(request);

  const content = await updateHomepageContent(
    validateHomepageContentPayload(await request.json()),
  );

  return successResponse(content, { message: "Homepage content updated." });
}
