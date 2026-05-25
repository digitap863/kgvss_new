"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  AdminError,
  AdminHeader,
  AdminStats,
  AdminTabs,
} from "@/components/admin/admin-shell";
import type {
  AdminDashboardData,
  AdminSection,
  HomepageRecord,
  ProjectRecord,
  SimpleRecord,
} from "@/components/admin/admin-types";
import { AchievementForm } from "@/components/admin/forms/achievement-form";
import { ActivityForm } from "@/components/admin/forms/activity-form";
import { GalleryForm } from "@/components/admin/forms/gallery-form";
import { HomepageForm } from "@/components/admin/forms/homepage-form";
import { ProjectForm } from "@/components/admin/forms/project-form";
import { useAdminApi } from "@/hooks/use-admin-api";

export default function AdminDashboard({
  adminEmail,
  initialData,
}: {
  adminEmail: string;
  initialData: AdminDashboardData;
}) {
  const router = useRouter();
  const api = useAdminApi();
  const [active, setActive] = useState<AdminSection>("projects");
  const [projects, setProjects] = useState<ProjectRecord[]>(
    initialData.projects,
  );
  const [gallery, setGallery] = useState<SimpleRecord[]>(initialData.gallery);
  const [achievements, setAchievements] = useState<SimpleRecord[]>(
    initialData.achievements,
  );
  const [activities, setActivities] = useState<SimpleRecord[]>(
    initialData.activities,
  );
  const [homepage, setHomepage] = useState<HomepageRecord>(
    initialData.homepage,
  );

  const stats = useMemo(
    () => [
      { label: "Projects", value: projects.length },
      { label: "Gallery", value: gallery.length },
      { label: "Achievements", value: achievements.length },
      { label: "Activities", value: activities.length },
    ],
    [activities.length, achievements.length, gallery.length, projects.length],
  );

  async function refreshData() {
    const [projectData, galleryData, achievementData, activityData, homepageData] =
      await Promise.all([
        api.get<ProjectRecord[]>("/api/projects"),
        api.get<SimpleRecord[]>("/api/gallery"),
        api.get<SimpleRecord[]>("/api/achievements"),
        api.get<SimpleRecord[]>("/api/activities"),
        api.get<HomepageRecord>("/api/homepage"),
      ]);

    setProjects(projectData);
    setGallery(galleryData);
    setAchievements(achievementData);
    setActivities(activityData);
    setHomepage(homepageData);
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function deleteRecord(kind: string, id: string) {
    await api.delete(`/api/${kind}/${id}`);
    await refreshData();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
      <AdminHeader adminEmail={adminEmail} onLogout={logout} />
      <AdminStats stats={stats} />
      <AdminTabs active={active} onChange={setActive} />
      <AdminError message={api.error} />

      {active === "projects" ? (
        <ProjectForm
          records={projects}
          onChanged={refreshData}
          onDelete={deleteRecord}
        />
      ) : null}

      {active === "gallery" ? (
        <GalleryForm
          records={gallery}
          onChanged={refreshData}
          onDelete={deleteRecord}
        />
      ) : null}

      {active === "homepage" ? (
        <HomepageForm initialContent={homepage} onChanged={refreshData} />
      ) : null}

      {active === "achievements" ? (
        <AchievementForm
          records={achievements}
          onChanged={refreshData}
          onDelete={deleteRecord}
        />
      ) : null}

      {active === "activities" ? (
        <ActivityForm
          records={activities}
          onChanged={refreshData}
          onDelete={deleteRecord}
        />
      ) : null}
    </main>
  );
}
