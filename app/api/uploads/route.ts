import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";

import { ApiError } from "@/lib/api/errors";
import { asyncHandler } from "@/lib/api/async-handler";
import { successResponse } from "@/lib/api/response";
import { requireAdmin } from "@/lib/auth/session";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const POST = asyncHandler(async (request: NextRequest) => {
  requireAdmin(request);

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new ApiError("Image file is required.", 400);
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    throw new ApiError("Only JPG, PNG, and WEBP images are allowed.", 400);
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ApiError("Image must be 5MB or smaller.", 400);
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `${randomUUID()}.${extension}`;
  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDirectory, fileName);

  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()));

  return successResponse(
    { url: `/uploads/${fileName}` },
    { status: 201, message: "Image uploaded." },
  );
});
