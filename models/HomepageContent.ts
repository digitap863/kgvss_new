import { model, models, Schema, Types, type InferSchemaType } from "mongoose";

const ImpactHighlightSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const HomepageContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "default" },
    heroTitle: { type: String, required: true, trim: true },
    heroSubtitle: { type: String, required: true, trim: true },
    heroImage: { type: String, trim: true },
    aboutSection: { type: String, trim: true },
    featuredProjectIds: [{ type: Types.ObjectId, ref: "Project" }],
    impactHighlights: [ImpactHighlightSchema],
  },
  { timestamps: true },
);

export type HomepageContentDocument = InferSchemaType<
  typeof HomepageContentSchema
> & {
  _id: string;
};

export const HomepageContentModel =
  models.HomepageContent ||
  model("HomepageContent", HomepageContentSchema);
