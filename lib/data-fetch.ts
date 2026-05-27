import {
  contactData,
  featuredProjects,
  homeHeroData,
  siteSettings,
} from "./static-data";
import { connectMongoose, hasMongoConfig } from "./mongoose";
import { GalleryModel, NewsEventModel } from "@/models";
import type { GalleryEntryContent, ManagedEntry, NewsEventContent } from "./types";

export async function getSiteSettings() {
  return siteSettings;
}

export async function getHomepageContent() {
  return {
    hero: homeHeroData,
    featuredProjects,
    contact: contactData,
  };
}

export async function getNewsEvents() {
  if (!hasMongoConfig()) {
    return [];
  }

  await connectMongoose();

  const items = await NewsEventModel.find({ status: "published" })
    .sort({ date: -1, createdAt: -1 })
    .lean();

  return items.map((item): ManagedEntry<NewsEventContent> => {
    const date = new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
    }).format(item.date);

    return {
      id: String(item._id),
      slug: item.slug,
      order: 0,
      featured: item.featured,
      data: {
        type: item.type,
        date,
        title: item.title,
        description: item.description,
        image: {
          src: item.imageUrl,
          alt: item.imageAlt,
        },
      },
    };
  });
}

export async function getGalleryEntries() {
  if (!hasMongoConfig()) {
    return [];
  }

  await connectMongoose();

  const items = await GalleryModel.find({ status: "published" })
    .sort({ createdAt: -1 })
    .lean();

  return items.map((item): ManagedEntry<GalleryEntryContent> => ({
    id: String(item._id),
    slug: item.slug,
    order: 0,
    data: {
      title: item.title,
      note: item.note,
      image: {
        src: item.imageUrl,
        alt: item.imageAlt,
      },
    },
  }));
}
