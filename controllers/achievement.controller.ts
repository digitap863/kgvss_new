import type { NextRequest } from "next/server";

import { successResponse } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/session";
import {
  createAchievement,
  deleteAchievement,
  listAchievements,
  updateAchievement,
} from "@/services/achievement.service";
import { validateAchievementPayload } from "@/validations/content.validation";

export async function getAchievementsController() {
  return successResponse(await listAchievements());
}

export async function createAchievementController(request: NextRequest) {
  requireAdmin(request);

  const achievement = await createAchievement(
    validateAchievementPayload(await request.json()),
  );

  return successResponse(achievement, {
    status: 201,
    message: "Achievement created.",
  });
}

export async function updateAchievementController(
  request: NextRequest,
  id: string,
) {
  requireAdmin(request);

  const achievement = await updateAchievement(
    id,
    validateAchievementPayload(await request.json()),
  );

  return successResponse(achievement, { message: "Achievement updated." });
}

export async function deleteAchievementController(
  request: NextRequest,
  id: string,
) {
  requireAdmin(request);

  const achievement = await deleteAchievement(id);

  return successResponse(achievement, { message: "Achievement deleted." });
}
