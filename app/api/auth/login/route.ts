import { loginController } from "@/controllers/auth.controller";
import { asyncHandler } from "@/lib/api/async-handler";

export const POST = asyncHandler(async (request) => loginController(request));
