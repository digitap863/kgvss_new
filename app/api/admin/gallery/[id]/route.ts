import { Types } from "mongoose";

import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { connectMongoose } from "@/lib/mongoose";
import { createSlug } from "@/lib/slug";
import { GalleryModel } from "@/models";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: RouteParams) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid gallery item id." }, { status: 400 });
    }

    await connectMongoose();

    const item = await GalleryModel.findById(id);

    if (!item) {
      return Response.json({ message: "Gallery item not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const imageAlt = String(formData.get("imageAlt") ?? title).trim();
    const category = String(formData.get("category") ?? "").trim();
    const status = String(formData.get("status") ?? "published");
    const image = formData.get("image");

    if (!title || !imageAlt) {
      return Response.json(
        { message: "Title and image alt text are required." },
        { status: 400 },
      );
    }

    if (status !== "draft" && status !== "published") {
      return Response.json({ message: "Invalid status." }, { status: 400 });
    }

    item.title = title;
    item.slug = await getUniqueGallerySlug(createSlug(title), id);
    item.note = note;
    item.imageAlt = imageAlt;
    item.category = category;
    item.status = status;

    if (image instanceof File && image.size > 0) {
      const oldPublicId = item.cloudinaryPublicId;
      const uploadedImage = await uploadImageToCloudinary(image, "kgvss/gallery");

      item.imageUrl = uploadedImage.secure_url;
      item.cloudinaryPublicId = uploadedImage.public_id;

      await deleteImageFromCloudinary(oldPublicId);
    }

    await item.save();

    return Response.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update gallery item.";

    return Response.json({ message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteParams) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid gallery item id." }, { status: 400 });
    }

    await connectMongoose();

    const item = await GalleryModel.findByIdAndDelete(id);

    if (!item) {
      return Response.json({ message: "Gallery item not found." }, { status: 404 });
    }

    await deleteImageFromCloudinary(item.cloudinaryPublicId);

    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete gallery item.";

    return Response.json({ message }, { status: 500 });
  }
}

async function getUniqueGallerySlug(baseSlug: string, currentId: string) {
  const fallbackSlug = baseSlug || "gallery-item";
  let slug = fallbackSlug;
  let suffix = 1;

  while (await GalleryModel.exists({ slug, _id: { $ne: currentId } })) {
    suffix += 1;
    slug = `${fallbackSlug}-${suffix}`;
  }

  return slug;
}
