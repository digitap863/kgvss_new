import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

export const galleryStatuses = ["draft", "published"] as const;

const gallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
      trim: true,
    },
    imageAlt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    status: {
      type: String,
      enum: galleryStatuses,
      default: "published",
      index: true,
    },
  },
  {
    collection: "gallery_items",
    timestamps: true,
  },
);

gallerySchema.index({ status: 1, createdAt: -1 });

export type GalleryDocument = InferSchemaType<typeof gallerySchema>;

export const GalleryModel =
  (models.Gallery as Model<GalleryDocument> | undefined) ??
  model<GalleryDocument>("Gallery", gallerySchema);
