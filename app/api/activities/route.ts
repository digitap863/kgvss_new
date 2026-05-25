import {
  createActivityController,
  getActivitiesController,
} from "@/controllers/activity.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const GET = asyncHandler(async () => getActivitiesController());
export const POST = asyncHandler(async (request) =>
  createActivityController(request),
);
