import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { connectMongoose, hasMongoConfig } from "@/lib/mongoose";
import { createSlug } from "@/lib/slug";
import { GalleryModel } from "@/models";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasMongoConfig()) {
    return Response.json({ items: [] });
  }

  await connectMongoose();

  const items = await GalleryModel.find()
    .sort({ createdAt: -1 })
    .lean();

  return Response.json({
    items: items.map((item) => ({
      id: String(item._id),
      title: item.title,
      slug: item.slug,
      note: item.note,
      imageUrl: item.imageUrl,
      cloudinaryPublicId: item.cloudinaryPublicId,
      imageAlt: item.imageAlt,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = String(formData.get("title") ?? "").trim();
    const note = String(formData.get("note") ?? "").trim();
    const imageAlt = String(formData.get("imageAlt") ?? title).trim();
    const status = String(formData.get("status") ?? "published");
    const image = formData.get("image");

    if (!title || !imageAlt || !(image instanceof File) || image.size === 0) {
      return Response.json(
        { message: "Title, image alt text, and image are required." },
        { status: 400 },
      );
    }

    if (status !== "draft" && status !== "published") {
      return Response.json({ message: "Invalid status." }, { status: 400 });
    }

    await connectMongoose();

    const baseSlug = createSlug(title);
    const slug = await getUniqueGallerySlug(baseSlug);
    const uploadedImage = await uploadImageToCloudinary(image, "kgvss/gallery");

    const item = await GalleryModel.create({
      title,
      slug,
      note,
      imageUrl: uploadedImage.secure_url,
      cloudinaryPublicId: uploadedImage.public_id,
      imageAlt,
      status,
    });

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create gallery item.";

    return Response.json({ message }, { status: 500 });
  }
}

async function getUniqueGallerySlug(baseSlug: string) {
  const fallbackSlug = baseSlug || "gallery-item";
  let slug = fallbackSlug;
  let suffix = 1;

  while (await GalleryModel.exists({ slug })) {
    suffix += 1;
    slug = `${fallbackSlug}-${suffix}`;
  }

  return slug;
}
