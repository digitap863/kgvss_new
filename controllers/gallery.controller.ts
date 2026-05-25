import type { NextRequest } from "next/server";

import { successResponse } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/session";
import {
  createGalleryItem,
  deleteGalleryItem,
  listGalleryItems,
  updateGalleryItem,
} from "@/services/gallery.service";
import { validateGalleryItemPayload } from "@/validations/content.validation";

export async function getGalleryController() {
  return successResponse(await listGalleryItems());
}

export async function createGalleryController(request: NextRequest) {
  requireAdmin(request);

  const item = await createGalleryItem(
    validateGalleryItemPayload(await request.json()),
  );

  return successResponse(item, { status: 201, message: "Gallery item created." });
}

export async function updateGalleryController(request: NextRequest, id: string) {
  requireAdmin(request);

  const item = await updateGalleryItem(
    id,
    validateGalleryItemPayload(await request.json()),
  );

  return successResponse(item, { message: "Gallery item updated." });
}

export async function deleteGalleryController(request: NextRequest, id: string) {
  requireAdmin(request);

  const item = await deleteGalleryItem(id);

  return successResponse(item, { message: "Gallery item deleted." });
}
