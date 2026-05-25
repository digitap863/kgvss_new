import {
  createAchievementController,
  getAchievementsController,
} from "@/controllers/achievement.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const GET = asyncHandler(async () => getAchievementsController());
export const POST = asyncHandler(async (request) =>
  createAchievementController(request),
);
