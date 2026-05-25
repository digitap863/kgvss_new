import type {
  ActivityInput,
  AchievementInput,
  GalleryItemInput,
  HomepageContentInput,
} from "@/types/content";
import {
  assertObject,
  readBoolean,
  readDate,
  readNumber,
  readStatus,
  readString,
  readStringArray,
} from "@/validations/common";

export function validateGalleryItemPayload(payload: unknown): GalleryItemInput {
  const object = assertObject(payload);

  return {
    title: readString(object, "title", { required: true }),
    imageUrl: readString(object, "imageUrl", { required: true }),
    alt: readString(object, "alt", { required: true }),
    caption: readString(object, "caption"),
    category: readString(object, "category"),
    featured: readBoolean(object, "featured"),
  };
}

export function validateAchievementPayload(payload: unknown): AchievementInput {
  const object = assertObject(payload);

  return {
    title: readString(object, "title", { required: true }),
    description: readString(object, "description", { required: true }),
    year: readNumber(object, "year"),
    imageUrl: readString(object, "imageUrl"),
    order: readNumber(object, "order"),
    status: readStatus(object),
  };
}

export function validateActivityPayload(payload: unknown): ActivityInput {
  const object = assertObject(payload);

  return {
    title: readString(object, "title", { required: true }),
    slug: readString(object, "slug", { required: true }),
    summary: readString(object, "summary", { required: true }),
    description: readString(object, "description"),
    date: readDate(object, "date"),
    images: readStringArray(object, "images"),
    location: readString(object, "location"),
    status: readStatus(object),
  };
}

export function validateHomepageContentPayload(
  payload: unknown,
): HomepageContentInput {
  const object = assertObject(payload);
  const impactHighlights = Array.isArray(object.impactHighlights)
    ? object.impactHighlights.map((item) => {
        const stat = assertObject(item, "impactHighlights item");

        return {
          label: readString(stat, "label", { required: true }),
          value: readString(stat, "value", { required: true }),
        };
      })
    : [];

  return {
    heroTitle: readString(object, "heroTitle", { required: true }),
    heroSubtitle: readString(object, "heroSubtitle", { required: true }),
    heroImage: readString(object, "heroImage"),
    aboutSection: readString(object, "aboutSection"),
    featuredProjectIds: readStringArray(object, "featuredProjectIds"),
    impactHighlights,
  };
}
