import { meController } from "@/controllers/auth.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const GET = asyncHandler(async (request) => meController(request));
