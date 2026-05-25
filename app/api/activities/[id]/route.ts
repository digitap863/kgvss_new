import {
  deleteActivityController,
  updateActivityController,
} from "@/controllers/activity.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const PATCH = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return updateActivityController(request, id);
});

export const DELETE = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return deleteActivityController(request, id);
});
