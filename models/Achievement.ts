import { model, models, Schema, type InferSchemaType } from "mongoose";

const AchievementSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    year: { type: Number },
    imageUrl: { type: String, trim: true },
    order: { type: Number, default: 0, index: true },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
      index: true,
    },
  },
  { timestamps: true },
);

export type AchievementDocument = InferSchemaType<typeof AchievementSchema> & {
  _id: string;
};

export const AchievementModel =
  models.Achievement || model("Achievement", AchievementSchema);
