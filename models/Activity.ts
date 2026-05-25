import { model, models, Schema, type InferSchemaType } from "mongoose";

const ActivitySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    summary: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date },
    images: [{ type: String, trim: true }],
    location: { type: String, trim: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
  },
  { timestamps: true },
);

ActivitySchema.index({ title: "text", summary: "text", description: "text" });

export type ActivityDocument = InferSchemaType<typeof ActivitySchema> & {
  _id: string;
};

export const ActivityModel = models.Activity || model("Activity", ActivitySchema);
