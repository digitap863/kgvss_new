import { asyncHandler } from "@/lib/api/async-handler";
import {
  createProjectController,
  getProjectsController,
} from "@/controllers/project.controller";

export const GET = asyncHandler(async () => getProjectsController());
export const POST = asyncHandler(async (request) =>
  createProjectController(request),
);
