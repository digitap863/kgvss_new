import type { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/auth/session";
import { successResponse } from "@/lib/api/response";
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  updateProject,
} from "@/services/project.service";
import { validateProjectPayload } from "@/validations/project.validation";
import { ApiError } from "@/lib/api/errors";

export async function getProjectsController() {
  return successResponse(await listProjects());
}

export async function createProjectController(request: NextRequest) {
  requireAdmin(request);

  const payload = validateProjectPayload(await request.json());
  const project = await createProject(payload);

  return successResponse(project, { status: 201, message: "Project created." });
}

export async function getProjectController(identifier: string) {
  const project = await getProject(identifier);

  if (!project) {
    throw new ApiError("Project not found.", 404);
  }

  return successResponse(project);
}

export async function updateProjectController(
  request: NextRequest,
  id: string,
) {
  requireAdmin(request);

  const payload = validateProjectPayload(await request.json());
  const project = await updateProject(id, payload);

  return successResponse(project, { message: "Project updated." });
}

export async function deleteProjectController(
  request: NextRequest,
  id: string,
) {
  requireAdmin(request);

  const project = await deleteProject(id);

  return successResponse(project, { message: "Project deleted." });
}
