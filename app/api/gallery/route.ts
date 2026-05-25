import {
  createGalleryController,
  getGalleryController,
} from "@/controllers/gallery.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const GET = asyncHandler(async () => getGalleryController());
export const POST = asyncHandler(async (request) =>
  createGalleryController(request),
);
