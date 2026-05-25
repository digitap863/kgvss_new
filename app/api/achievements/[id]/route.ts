import {
  deleteAchievementController,
  updateAchievementController,
} from "@/controllers/achievement.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const PATCH = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return updateAchievementController(request, id);
});

export const DELETE = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return deleteAchievementController(request, id);
});
