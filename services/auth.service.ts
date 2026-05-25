import { ApiError } from "@/lib/api/errors";
import { verifyPassword } from "@/lib/auth/password";
import { connectToDatabase } from "@/lib/db";
import { hasMongoConfig } from "@/lib/env";
import { AdminUserModel } from "@/models/AdminUser";
import type { AdminSession } from "@/types/admin";

const fallbackAdmin = {
  id: "fallback-admin",
  name: process.env.ADMIN_NAME ?? "KGVSS Admin",
  email: process.env.ADMIN_EMAIL ?? "admin@kgvss.local",
  password: process.env.ADMIN_PASSWORD ?? "admin123",
};

export async function authenticateAdmin(
  email: string,
  password: string,
): Promise<AdminSession> {
  if (!hasMongoConfig()) {
    if (email === fallbackAdmin.email && password === fallbackAdmin.password) {
      return { ...fallbackAdmin, role: "admin" };
    }

    throw new ApiError("Invalid credentials.", 401);
  }

  await connectToDatabase();
  const admin = await AdminUserModel.findOne({ email, active: true });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    throw new ApiError("Invalid credentials.", 401);
  }

  return {
    id: String(admin._id),
    name: admin.name,
    email: admin.email,
    role: "admin",
  };
}
