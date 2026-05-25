import { model, models, Schema, type InferSchemaType } from "mongoose";

const AdminUserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

export type AdminUserDocument = InferSchemaType<typeof AdminUserSchema> & {
  _id: string;
};

export const AdminUserModel =
  models.AdminUser || model("AdminUser", AdminUserSchema);
