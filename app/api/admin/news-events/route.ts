import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { connectMongoose, hasMongoConfig } from "@/lib/mongoose";
import { createSlug } from "@/lib/slug";
import { NewsEventModel } from "@/models";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasMongoConfig()) {
    return Response.json({ items: [] });
  }

  await connectMongoose();

  const items = await NewsEventModel.find()
    .sort({ date: -1, createdAt: -1 })
    .lean();

  return Response.json({
    items: items.map((item) => ({
      id: String(item._id),
      type: item.type,
      title: item.title,
      slug: item.slug,
      date: item.date,
      description: item.description,
      imageUrl: item.imageUrl,
      cloudinaryPublicId: item.cloudinaryPublicId,
      imageAlt: item.imageAlt,
      featured: item.featured,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })),
  });
}

export async function POST(request: Request) {
  try {
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
      !imageAlt ||
      !(image instanceof File) ||
      image.size === 0
    ) {
      return Response.json(
        { message: "Type, title, date, description, alt text, and image are required." },
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

    await connectMongoose();

    const baseSlug = createSlug(title);
    const slug = await getUniqueNewsEventSlug(baseSlug);
    const uploadedImage = await uploadImageToCloudinary(
      image,
      "kgvss/news-events",
    );

    const item = await NewsEventModel.create({
      type,
      title,
      slug,
      date,
      description,
      imageUrl: uploadedImage.secure_url,
      cloudinaryPublicId: uploadedImage.public_id,
      imageAlt,
      featured,
      status,
    });

    return Response.json({ item }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create news/event item.";

    return Response.json({ message }, { status: 500 });
  }
}

async function getUniqueNewsEventSlug(baseSlug: string) {
  const fallbackSlug = baseSlug || "news-event";
  let slug = fallbackSlug;
  let suffix = 1;

  while (await NewsEventModel.exists({ slug })) {
    suffix += 1;
    slug = `${fallbackSlug}-${suffix}`;
  }

  return slug;
}
