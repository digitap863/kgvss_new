import {
  getHomepageController,
  updateHomepageController,
} from "@/controllers/homepage.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const GET = asyncHandler(async () => getHomepageController());
export const PUT = asyncHandler(async (request) =>
  updateHomepageController(request),
);
