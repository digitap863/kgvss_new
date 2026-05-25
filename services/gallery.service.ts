import { ApiError } from "@/lib/api/errors";
import { connectToDatabase } from "@/lib/db";
import { hasMongoConfig } from "@/lib/env";
import { GalleryItemModel } from "@/models/GalleryItem";
import { serializeDocument, serializeDocuments } from "@/services/serialization";
import type { GalleryItemInput } from "@/types/content";

const dummyGallery: (GalleryItemInput & { id: string })[] = [];

export async function listGalleryItems() {
  if (!hasMongoConfig()) {
    return dummyGallery;
  }

  await connectToDatabase();
  const items = await GalleryItemModel.find().sort({ createdAt: -1 });

  return serializeDocuments(items);
}

export async function createGalleryItem(input: GalleryItemInput) {
  if (!hasMongoConfig()) {
    const item = { id: crypto.randomUUID(), ...input };
    dummyGallery.unshift(item);

    return item;
  }

  await connectToDatabase();
  const item = await GalleryItemModel.create(input);

  return serializeDocument(item);
}

export async function updateGalleryItem(id: string, input: GalleryItemInput) {
  if (!hasMongoConfig()) {
    const index = dummyGallery.findIndex((item) => item.id === id);

    if (index === -1) throw new ApiError("Gallery item not found.", 404);
    dummyGallery[index] = { ...dummyGallery[index], ...input };

    return dummyGallery[index];
  }

  await connectToDatabase();
  const item = await GalleryItemModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!item) throw new ApiError("Gallery item not found.", 404);

  return serializeDocument(item);
}

export async function deleteGalleryItem(id: string) {
  if (!hasMongoConfig()) {
    const index = dummyGallery.findIndex((item) => item.id === id);

    if (index === -1) throw new ApiError("Gallery item not found.", 404);

    return dummyGallery.splice(index, 1)[0];
  }

  await connectToDatabase();
  const item = await GalleryItemModel.findByIdAndDelete(id);

  if (!item) throw new ApiError("Gallery item not found.", 404);

  return serializeDocument(item);
}
