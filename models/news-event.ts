import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

export const newsEventTypes = ["News", "Event"] as const;
export const newsEventStatuses = ["draft", "published"] as const;

const newsEventSchema = new Schema(
  {
    type: {
      type: String,
      enum: newsEventTypes,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 220,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
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
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: newsEventStatuses,
      default: "published",
      index: true,
    },
  },
  {
    collection: "news_events",
    timestamps: true,
  },
);

newsEventSchema.index({ status: 1, featured: -1, date: -1 });

export type NewsEventDocument = InferSchemaType<typeof newsEventSchema>;

export const NewsEventModel =
  (models.NewsEvent as Model<NewsEventDocument> | undefined) ??
  model<NewsEventDocument>("NewsEvent", newsEventSchema);
