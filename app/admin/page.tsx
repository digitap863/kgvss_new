import { redirect } from "next/navigation";

import AdminDashboard from "@/components/admin/admin-dashboard";
import { getCurrentAdmin } from "@/lib/auth/current-admin";
import { listAchievements } from "@/services/achievement.service";
import { listActivities } from "@/services/activity.service";
import { listGalleryItems } from "@/services/gallery.service";
import { getHomepageContentRecord } from "@/services/homepage.service";
import { listProjects } from "@/services/project.service";

export default async function AdminPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  const [projects, gallery, achievements, activities, homepage] =
    await Promise.all([
      listProjects(),
      listGalleryItems(),
      listAchievements(),
      listActivities(),
      getHomepageContentRecord(),
    ]);

  return (
    <AdminDashboard
      adminEmail={admin.email}
      initialData={{
        projects,
        gallery,
        achievements,
        activities,
        homepage,
      }}
    />
  );
}
