import { asyncHandler } from "@/lib/api/async-handler";
import {
  deleteProjectController,
  getProjectController,
  updateProjectController,
} from "@/controllers/project.controller";

export const GET = asyncHandler(async (_request, context) => {
  const { id } = await context.params;

  return getProjectController(id);
});

export const PATCH = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return updateProjectController(request, id);
});

export const DELETE = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return deleteProjectController(request, id);
});
