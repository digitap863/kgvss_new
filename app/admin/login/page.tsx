import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/lib/auth/current-admin";
import AdminLoginForm from "@/components/admin/admin-login-form";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  return <AdminLoginForm />;
}
