import { ApiError } from "@/lib/api/errors";
import { connectToDatabase } from "@/lib/db";
import { hasMongoConfig } from "@/lib/env";
import { ProjectModel } from "@/models/Project";
import { serializeDocument, serializeDocuments } from "@/services/serialization";
import type { ProjectInput } from "@/types/project";

const dummyProjects: (ProjectInput & { id: string })[] = [
  {
    id: "project-rural-sanitation",
    title: "Rural sanitation upgrades",
    slug: "rural-sanitation-upgrades",
    description: "Cleaner shared spaces shaped around local use.",
    category: "Sanitation",
    images: ["/_next/static/media/home1.jpg"],
    featured: true,
    location: "Kerala",
    completionDate: new Date("2025-05-01"),
    impactStats: [{ label: "Touchpoints", value: "42" }],
    tags: ["Sanitation", "Field delivery"],
  },
];

export async function listProjects() {
  if (!hasMongoConfig()) {
    return dummyProjects;
  }

  await connectToDatabase();
  const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean(false);

  return serializeDocuments(projects);
}

export async function getProject(identifier: string) {
  if (!hasMongoConfig()) {
    return (
      dummyProjects.find(
        (project) => project.id === identifier || project.slug === identifier,
      ) ?? null
    );
  }

  await connectToDatabase();
  const query = identifier.match(/^[a-f\d]{24}$/i)
    ? { _id: identifier }
    : { slug: identifier };
  const project = await ProjectModel.findOne(query);

  return serializeDocument(project);
}

export async function createProject(input: ProjectInput) {
  if (!hasMongoConfig()) {
    const project = { id: crypto.randomUUID(), ...input };
    dummyProjects.unshift(project);

    return project;
  }

  await connectToDatabase();
  const project = await ProjectModel.create(input);

  return serializeDocument(project);
}

export async function updateProject(id: string, input: ProjectInput) {
  if (!hasMongoConfig()) {
    const index = dummyProjects.findIndex((project) => project.id === id);

    if (index === -1) {
      throw new ApiError("Project not found.", 404);
    }

    dummyProjects[index] = { ...dummyProjects[index], ...input };

    return dummyProjects[index];
  }

  await connectToDatabase();
  const project = await ProjectModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new ApiError("Project not found.", 404);
  }

  return serializeDocument(project);
}

export async function deleteProject(id: string) {
  if (!hasMongoConfig()) {
    const index = dummyProjects.findIndex((project) => project.id === id);

    if (index === -1) {
      throw new ApiError("Project not found.", 404);
    }

    return dummyProjects.splice(index, 1)[0];
  }

  await connectToDatabase();
  const project = await ProjectModel.findByIdAndDelete(id);

  if (!project) {
    throw new ApiError("Project not found.", 404);
  }

  return serializeDocument(project);
}
