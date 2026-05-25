import { ApiError } from "@/lib/api/errors";
import { connectToDatabase } from "@/lib/db";
import { hasMongoConfig } from "@/lib/env";
import { ActivityModel } from "@/models/Activity";
import { serializeDocument, serializeDocuments } from "@/services/serialization";
import type { ActivityInput } from "@/types/content";

const dummyActivities: (ActivityInput & { id: string })[] = [];

export async function listActivities() {
  if (!hasMongoConfig()) return dummyActivities;

  await connectToDatabase();
  const activities = await ActivityModel.find().sort({ date: -1, createdAt: -1 });

  return serializeDocuments(activities);
}

export async function createActivity(input: ActivityInput) {
  if (!hasMongoConfig()) {
    const activity = { id: crypto.randomUUID(), ...input };
    dummyActivities.unshift(activity);

    return activity;
  }

  await connectToDatabase();
  const activity = await ActivityModel.create(input);

  return serializeDocument(activity);
}

export async function updateActivity(id: string, input: ActivityInput) {
  if (!hasMongoConfig()) {
    const index = dummyActivities.findIndex((item) => item.id === id);

    if (index === -1) throw new ApiError("Activity not found.", 404);
    dummyActivities[index] = { ...dummyActivities[index], ...input };

    return dummyActivities[index];
  }

  await connectToDatabase();
  const activity = await ActivityModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!activity) throw new ApiError("Activity not found.", 404);

  return serializeDocument(activity);
}

export async function deleteActivity(id: string) {
  if (!hasMongoConfig()) {
    const index = dummyActivities.findIndex((item) => item.id === id);

    if (index === -1) throw new ApiError("Activity not found.", 404);

    return dummyActivities.splice(index, 1)[0];
  }

  await connectToDatabase();
  const activity = await ActivityModel.findByIdAndDelete(id);

  if (!activity) throw new ApiError("Activity not found.", 404);

  return serializeDocument(activity);
}
