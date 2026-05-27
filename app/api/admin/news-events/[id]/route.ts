import { Types } from "mongoose";

import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";
import { connectMongoose } from "@/lib/mongoose";
import { createSlug } from "@/lib/slug";
import { NewsEventModel } from "@/models";

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
      return Response.json({ message: "Invalid news/event item id." }, { status: 400 });
    }

    await connectMongoose();

    const item = await NewsEventModel.findById(id);

    if (!item) {
      return Response.json({ message: "News/event item not found." }, { status: 404 });
    }

    const formData = await request.formData();
    const type = String(formData.get("type") ?? "");
    const title = String(formData.get("title") ?? "").trim();
    const dateValue = String(formData.get("date") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const imageAlt = String(formData.get("imageAlt") ?? title).trim();
    const status = String(formData.get("status") ?? "published");
    const featured = formData.get("featured") === "on";
    const image = formData.get("image");

    if (
      (type !== "News" && type !== "Event") ||
      !title ||
      !dateValue ||
      !description ||
      !imageAlt
    ) {
      return Response.json(
        { message: "Type, title, date, description, and alt text are required." },
        { status: 400 },
      );
    }

    if (status !== "draft" && status !== "published") {
      return Response.json({ message: "Invalid status." }, { status: 400 });
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return Response.json({ message: "Invalid date." }, { status: 400 });
    }

    item.type = type;
    item.title = title;
    item.slug = await getUniqueNewsEventSlug(createSlug(title), id);
    item.date = date;
    item.description = description;
    item.imageAlt = imageAlt;
    item.featured = featured;
    item.status = status;

    if (image instanceof File && image.size > 0) {
      const oldPublicId = item.cloudinaryPublicId;
      const uploadedImage = await uploadImageToCloudinary(
        image,
        "kgvss/news-events",
      );

      item.imageUrl = uploadedImage.secure_url;
      item.cloudinaryPublicId = uploadedImage.public_id;

      await deleteImageFromCloudinary(oldPublicId);
    }

    await item.save();

    return Response.json({ item });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update news/event item.";

    return Response.json({ message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteParams) {
  try {
    const { id } = await context.params;

    if (!Types.ObjectId.isValid(id)) {
      return Response.json({ message: "Invalid news/event item id." }, { status: 400 });
    }

    await connectMongoose();

    const item = await NewsEventModel.findByIdAndDelete(id);

    if (!item) {
      return Response.json({ message: "News/event item not found." }, { status: 404 });
    }

    await deleteImageFromCloudinary(item.cloudinaryPublicId);

    return Response.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete news/event item.";

    return Response.json({ message }, { status: 500 });
  }
}

async function getUniqueNewsEventSlug(baseSlug: string, currentId: string) {
  const fallbackSlug = baseSlug || "news-event";
  let slug = fallbackSlug;
  let suffix = 1;

  while (await NewsEventModel.exists({ slug, _id: { $ne: currentId } })) {
    suffix += 1;
    slug = `${fallbackSlug}-${suffix}`;
  }

  return slug;
}
