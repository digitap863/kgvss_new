import type { ProjectInput } from "@/types/project";
import {
  assertObject,
  readBoolean,
  readDate,
  readString,
  readStringArray,
} from "@/validations/common";

export function validateProjectPayload(payload: unknown): ProjectInput {
  const object = assertObject(payload);
  const impactStats = Array.isArray(object.impactStats)
    ? object.impactStats.map((item) => {
        const stat = assertObject(item, "impactStats item");

        return {
          label: readString(stat, "label", { required: true }),
          value: readString(stat, "value", { required: true }),
        };
      })
    : [];

  return {
    title: readString(object, "title", { required: true }),
    slug: readString(object, "slug", { required: true }),
    description: readString(object, "description", { required: true }),
    category: readString(object, "category", { required: true }),
    images: readStringArray(object, "images"),
    featured: readBoolean(object, "featured"),
    location: readString(object, "location", { required: true }),
    completionDate: readDate(object, "completionDate"),
    impactStats,
    tags: readStringArray(object, "tags"),
  };
}
