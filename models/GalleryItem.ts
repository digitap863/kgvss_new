import { model, models, Schema, type InferSchemaType } from "mongoose";

const GalleryItemSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    imageUrl: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    caption: { type: String, trim: true },
    category: { type: String, trim: true, index: true },
    featured: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type GalleryItemDocument = InferSchemaType<typeof GalleryItemSchema> & {
  _id: string;
};

export const GalleryItemModel =
  models.GalleryItem || model("GalleryItem", GalleryItemSchema);
