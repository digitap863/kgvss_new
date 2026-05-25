import { ApiError } from "@/lib/api/errors";
import { connectToDatabase } from "@/lib/db";
import { hasMongoConfig } from "@/lib/env";
import { AchievementModel } from "@/models/Achievement";
import { serializeDocument, serializeDocuments } from "@/services/serialization";
import type { AchievementInput } from "@/types/content";

const dummyAchievements: (AchievementInput & { id: string })[] = [];

export async function listAchievements() {
  if (!hasMongoConfig()) return dummyAchievements;

  await connectToDatabase();
  const achievements = await AchievementModel.find().sort({ order: 1 });

  return serializeDocuments(achievements);
}

export async function createAchievement(input: AchievementInput) {
  if (!hasMongoConfig()) {
    const achievement = { id: crypto.randomUUID(), ...input };
    dummyAchievements.push(achievement);

    return achievement;
  }

  await connectToDatabase();
  const achievement = await AchievementModel.create(input);

  return serializeDocument(achievement);
}

export async function updateAchievement(id: string, input: AchievementInput) {
  if (!hasMongoConfig()) {
    const index = dummyAchievements.findIndex((item) => item.id === id);

    if (index === -1) throw new ApiError("Achievement not found.", 404);
    dummyAchievements[index] = { ...dummyAchievements[index], ...input };

    return dummyAchievements[index];
  }

  await connectToDatabase();
  const achievement = await AchievementModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!achievement) throw new ApiError("Achievement not found.", 404);

  return serializeDocument(achievement);
}

export async function deleteAchievement(id: string) {
  if (!hasMongoConfig()) {
    const index = dummyAchievements.findIndex((item) => item.id === id);

    if (index === -1) throw new ApiError("Achievement not found.", 404);

    return dummyAchievements.splice(index, 1)[0];
  }

  await connectToDatabase();
  const achievement = await AchievementModel.findByIdAndDelete(id);

  if (!achievement) throw new ApiError("Achievement not found.", 404);

  return serializeDocument(achievement);
}
