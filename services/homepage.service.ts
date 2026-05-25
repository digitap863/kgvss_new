import { connectToDatabase } from "@/lib/db";
import { hasMongoConfig } from "@/lib/env";
import { HomepageContentModel } from "@/models/HomepageContent";
import { serializeDocument } from "@/services/serialization";
import type { HomepageContentInput } from "@/types/content";

const dummyHomepageContent: HomepageContentInput & { id: string; key: string } = {
  id: "homepage-default",
  key: "default",
  heroTitle: "KGVSS rural development work",
  heroSubtitle: "A clean backend-ready homepage content record.",
  heroImage: "",
  aboutSection: "Use the admin panel to manage homepage sections.",
  featuredProjectIds: [],
  impactHighlights: [],
};

export async function getHomepageContentRecord() {
  if (!hasMongoConfig()) return dummyHomepageContent;

  await connectToDatabase();
  const content =
    (await HomepageContentModel.findOne({ key: "default" })) ??
    (await HomepageContentModel.create(dummyHomepageContent));

  return serializeDocument(content);
}

export async function updateHomepageContent(input: HomepageContentInput) {
  if (!hasMongoConfig()) {
    Object.assign(dummyHomepageContent, input);

    return dummyHomepageContent;
  }

  await connectToDatabase();
  const content = await HomepageContentModel.findOneAndUpdate(
    { key: "default" },
    { ...input, key: "default" },
    { new: true, upsert: true, runValidators: true },
  );

  return serializeDocument(content);
}
