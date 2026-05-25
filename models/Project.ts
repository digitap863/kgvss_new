import { model, models, Schema, type InferSchemaType } from "mongoose";

const ImpactStatSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true, trim: true },
    images: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false, index: true },
    location: { type: String, required: true, trim: true },
    completionDate: { type: Date },
    impactStats: [ImpactStatSchema],
    tags: [{ type: String, trim: true, index: true }],
  },
  { timestamps: true },
);

ProjectSchema.index({ title: "text", description: "text", category: "text" });

export type ProjectDocument = InferSchemaType<typeof ProjectSchema> & {
  _id: string;
};

export const ProjectModel =
  models.Project || model("Project", ProjectSchema);
