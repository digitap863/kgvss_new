import type { NextRequest } from "next/server";

import { successResponse } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/session";
import {
  createActivity,
  deleteActivity,
  listActivities,
  updateActivity,
} from "@/services/activity.service";
import { validateActivityPayload } from "@/validations/content.validation";

export async function getActivitiesController() {
  return successResponse(await listActivities());
}

export async function createActivityController(request: NextRequest) {
  requireAdmin(request);

  const activity = await createActivity(
    validateActivityPayload(await request.json()),
  );

  return successResponse(activity, { status: 201, message: "Activity created." });
}

export async function updateActivityController(request: NextRequest, id: string) {
  requireAdmin(request);

  const activity = await updateActivity(
    id,
    validateActivityPayload(await request.json()),
  );

  return successResponse(activity, { message: "Activity updated." });
}

export async function deleteActivityController(request: NextRequest, id: string) {
  requireAdmin(request);

  const activity = await deleteActivity(id);

  return successResponse(activity, { message: "Activity deleted." });
}
