"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAdminApi } from "@/hooks/use-admin-api";

type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  featured: boolean;
};

type SimpleRecord = {
  id: string;
  title: string;
};

type HomepageRecord = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  aboutSection?: string;
};

const emptyProject = {
  title: "",
  slug: "",
  description: "",
  category: "",
  images: "",
  featured: false,
  location: "",
  completionDate: "",
  tags: "",
  impactLabel: "",
  impactValue: "",
};

const emptyGallery = {
  title: "",
  imageUrl: "",
  alt: "",
  caption: "",
  category: "",
  featured: false,
};

const emptyAchievement = {
  title: "",
  description: "",
  year: "",
  imageUrl: "",
  order: "0",
  status: "published",
};

const emptyActivity = {
  title: "",
  slug: "",
  summary: "",
  description: "",
  date: "",
  images: "",
  location: "",
  status: "published",
};

type AdminDashboardData = {
  projects: ProjectRecord[];
  gallery: SimpleRecord[];
  achievements: SimpleRecord[];
  activities: SimpleRecord[];
  homepage: HomepageRecord;
};

export default function AdminDashboard({
  adminEmail,
  initialData,
}: {
  adminEmail: string;
  initialData: AdminDashboardData;
}) {
  const router = useRouter();
  const api = useAdminApi();
  const [active, setActive] = useState("projects");
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
  const [homepage, setHomepage] = useState<HomepageRecord>({
    heroTitle: initialData.homepage.heroTitle ?? "",
    heroSubtitle: initialData.homepage.heroSubtitle ?? "",
    heroImage: initialData.homepage.heroImage ?? "",
    aboutSection: initialData.homepage.aboutSection ?? "",
  });
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [galleryForm, setGalleryForm] = useState(emptyGallery);
  const [achievementForm, setAchievementForm] = useState(emptyAchievement);
  const [activityForm, setActivityForm] = useState(emptyActivity);

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
    setHomepage({
      heroTitle: homepageData.heroTitle ?? "",
      heroSubtitle: homepageData.heroSubtitle ?? "",
      heroImage: homepageData.heroImage ?? "",
      aboutSection: homepageData.aboutSection ?? "",
    });
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function submitProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/projects", {
      title: projectForm.title,
      slug: projectForm.slug,
      description: projectForm.description,
      category: projectForm.category,
      images: projectForm.images.split(",").map((item) => item.trim()).filter(Boolean),
      featured: projectForm.featured,
      location: projectForm.location,
      completionDate: projectForm.completionDate || undefined,
      tags: projectForm.tags.split(",").map((item) => item.trim()).filter(Boolean),
      impactStats:
        projectForm.impactLabel && projectForm.impactValue
          ? [{ label: projectForm.impactLabel, value: projectForm.impactValue }]
          : [],
    });
    setProjectForm(emptyProject);
    await refreshData();
  }

  async function submitGallery(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/gallery", galleryForm);
    setGalleryForm(emptyGallery);
    await refreshData();
  }

  async function submitAchievement(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/achievements", {
      ...achievementForm,
      year: achievementForm.year ? Number(achievementForm.year) : undefined,
      order: Number(achievementForm.order),
    });
    setAchievementForm(emptyAchievement);
    await refreshData();
  }

  async function submitActivity(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/activities", {
      ...activityForm,
      images: activityForm.images.split(",").map((item) => item.trim()).filter(Boolean),
      date: activityForm.date || undefined,
    });
    setActivityForm(emptyActivity);
    await refreshData();
  }

  async function submitHomepage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.put("/api/homepage", {
      ...homepage,
      featuredProjectIds: [],
      impactHighlights: [],
    });
    await refreshData();
  }

  async function deleteRecord(kind: string, id: string) {
    await api.delete(`/api/${kind}/${id}`);
    await refreshData();
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#667267]">
            KGVSS Admin
          </p>
          <h1 className="mt-1 text-3xl font-semibold">Content dashboard</h1>
          <p className="mt-2 text-sm text-[#667267]">{adminEmail}</p>
        </div>
        <button
          onClick={logout}
          className="w-fit rounded-md border border-black/15 px-4 py-2 text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-black/10 bg-white p-4">
            <p className="text-sm text-[#667267]">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>

      <nav className="flex gap-2 overflow-x-auto border-b border-black/10 pb-2">
        {["projects", "gallery", "homepage", "achievements", "activities"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`rounded-md px-3 py-2 text-sm font-semibold capitalize ${
                active === item ? "bg-[#225d38] text-white" : "bg-white"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </nav>

      {api.error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {api.error}
        </p>
      ) : null}

      {active === "projects" ? (
        <AdminPanel title="Add project" onSubmit={submitProject}>
          <Input label="Title" value={projectForm.title} onChange={(title) => setProjectForm({ ...projectForm, title })} />
          <Input label="Slug" value={projectForm.slug} onChange={(slug) => setProjectForm({ ...projectForm, slug })} />
          <Input label="Category" value={projectForm.category} onChange={(category) => setProjectForm({ ...projectForm, category })} />
          <Input label="Location" value={projectForm.location} onChange={(location) => setProjectForm({ ...projectForm, location })} />
          <Textarea label="Description" value={projectForm.description} onChange={(description) => setProjectForm({ ...projectForm, description })} />
          <Input label="Image URLs, comma separated" value={projectForm.images} onChange={(images) => setProjectForm({ ...projectForm, images })} />
          <Input label="Tags, comma separated" value={projectForm.tags} onChange={(tags) => setProjectForm({ ...projectForm, tags })} />
          <Input label="Completion date" type="date" value={projectForm.completionDate} onChange={(completionDate) => setProjectForm({ ...projectForm, completionDate })} />
          <Input label="Impact label" value={projectForm.impactLabel} onChange={(impactLabel) => setProjectForm({ ...projectForm, impactLabel })} />
          <Input label="Impact value" value={projectForm.impactValue} onChange={(impactValue) => setProjectForm({ ...projectForm, impactValue })} />
          <Checkbox label="Featured" checked={projectForm.featured} onChange={(featured) => setProjectForm({ ...projectForm, featured })} />
          <RecordList records={projects} kind="projects" onDelete={deleteRecord} />
        </AdminPanel>
      ) : null}

      {active === "gallery" ? (
        <AdminPanel title="Upload gallery item" onSubmit={submitGallery}>
          <Input label="Title" value={galleryForm.title} onChange={(title) => setGalleryForm({ ...galleryForm, title })} />
          <ImageUploadField onUploaded={(imageUrl) => setGalleryForm({ ...galleryForm, imageUrl })} />
          <Input label="Image URL" value={galleryForm.imageUrl} onChange={(imageUrl) => setGalleryForm({ ...galleryForm, imageUrl })} />
          <Input label="Alt text" value={galleryForm.alt} onChange={(alt) => setGalleryForm({ ...galleryForm, alt })} />
          <Input label="Caption" value={galleryForm.caption} onChange={(caption) => setGalleryForm({ ...galleryForm, caption })} />
          <Input label="Category" value={galleryForm.category} onChange={(category) => setGalleryForm({ ...galleryForm, category })} />
          <Checkbox label="Featured" checked={galleryForm.featured} onChange={(featured) => setGalleryForm({ ...galleryForm, featured })} />
          <RecordList records={gallery} kind="gallery" onDelete={deleteRecord} />
        </AdminPanel>
      ) : null}

      {active === "homepage" ? (
        <AdminPanel title="Manage homepage" onSubmit={submitHomepage}>
          <Input label="Hero title" value={homepage.heroTitle} onChange={(heroTitle) => setHomepage({ ...homepage, heroTitle })} />
          <Textarea label="Hero subtitle" value={homepage.heroSubtitle} onChange={(heroSubtitle) => setHomepage({ ...homepage, heroSubtitle })} />
          <Input label="Hero image URL" value={homepage.heroImage ?? ""} onChange={(heroImage) => setHomepage({ ...homepage, heroImage })} />
          <Textarea label="About section" value={homepage.aboutSection ?? ""} onChange={(aboutSection) => setHomepage({ ...homepage, aboutSection })} />
        </AdminPanel>
      ) : null}

      {active === "achievements" ? (
        <AdminPanel title="Manage achievements" onSubmit={submitAchievement}>
          <Input label="Title" value={achievementForm.title} onChange={(title) => setAchievementForm({ ...achievementForm, title })} />
          <Textarea label="Description" value={achievementForm.description} onChange={(description) => setAchievementForm({ ...achievementForm, description })} />
          <Input label="Year" value={achievementForm.year} onChange={(year) => setAchievementForm({ ...achievementForm, year })} />
          <Input label="Image URL" value={achievementForm.imageUrl} onChange={(imageUrl) => setAchievementForm({ ...achievementForm, imageUrl })} />
          <Input label="Order" value={achievementForm.order} onChange={(order) => setAchievementForm({ ...achievementForm, order })} />
          <RecordList records={achievements} kind="achievements" onDelete={deleteRecord} />
        </AdminPanel>
      ) : null}

      {active === "activities" ? (
        <AdminPanel title="Manage activities" onSubmit={submitActivity}>
          <Input label="Title" value={activityForm.title} onChange={(title) => setActivityForm({ ...activityForm, title })} />
          <Input label="Slug" value={activityForm.slug} onChange={(slug) => setActivityForm({ ...activityForm, slug })} />
          <Input label="Location" value={activityForm.location} onChange={(location) => setActivityForm({ ...activityForm, location })} />
          <Input label="Date" type="date" value={activityForm.date} onChange={(date) => setActivityForm({ ...activityForm, date })} />
          <Textarea label="Summary" value={activityForm.summary} onChange={(summary) => setActivityForm({ ...activityForm, summary })} />
          <Textarea label="Description" value={activityForm.description} onChange={(description) => setActivityForm({ ...activityForm, description })} />
          <Input label="Image URLs, comma separated" value={activityForm.images} onChange={(images) => setActivityForm({ ...activityForm, images })} />
          <RecordList records={activities} kind="activities" onDelete={deleteRecord} />
        </AdminPanel>
      ) : null}
    </main>
  );
}

function AdminPanel({
  title,
  children,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 sm:grid-cols-2"
      >
        <h2 className="text-xl font-semibold sm:col-span-2">{title}</h2>
        {children}
        <button className="rounded-md bg-[#225d38] px-4 py-2.5 text-sm font-semibold text-white sm:col-span-2">
          Save
        </button>
      </form>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-black/15 px-3 py-2 outline-none focus:border-[#225d38]"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium sm:col-span-2">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-28 w-full rounded-md border border-black/15 px-3 py-2 outline-none focus:border-[#225d38]"
      />
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      {label}
    </label>
  );
}

function RecordList({
  records,
  kind,
  onDelete,
}: {
  records: SimpleRecord[];
  kind: string;
  onDelete: (kind: string, id: string) => void;
}) {
  return (
    <aside className="rounded-lg border border-black/10 bg-[#fbfcf8] p-4 sm:col-span-2">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#667267]">
        Existing
      </h3>
      <div className="grid gap-2">
        {records.length ? (
          records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2"
            >
              <span className="text-sm font-medium">{record.title}</span>
              <button
                type="button"
                onClick={() => onDelete(kind, record.id)}
                className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#667267]">No records yet.</p>
        )}
      </div>
    </aside>
  );
}

function ImageUploadField({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [pending, setPending] = useState(false);

  async function upload(file: File) {
    setPending(true);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();
    setPending(false);

    if (body.success) {
      onUploaded(body.data.url);
    }
  }

  return (
    <label className="block text-sm font-medium">
      Upload image
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload(file).catch(() => setPending(false));
        }}
        className="mt-2 w-full rounded-md border border-black/15 px-3 py-2 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-[#225d38] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
      />
      {pending ? (
        <span className="mt-2 block text-xs text-[#667267]">Uploading...</span>
      ) : null}
    </label>
  );
}
