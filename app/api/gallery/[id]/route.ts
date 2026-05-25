import {
  deleteGalleryController,
  updateGalleryController,
} from "@/controllers/gallery.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const PATCH = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return updateGalleryController(request, id);
});

export const DELETE = asyncHandler(async (request, context) => {
  const { id } = await context.params;

  return deleteGalleryController(request, id);
});
