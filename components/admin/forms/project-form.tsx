"use client";

import { useState } from "react";

import { AdminPanel } from "@/components/admin/admin-panel";
import {
  Checkbox,
  Input,
  Textarea,
} from "@/components/admin/admin-form-controls";
import type { ProjectRecord } from "@/components/admin/admin-types";
import { RecordList } from "@/components/admin/record-list";
import { useAdminApi } from "@/hooks/use-admin-api";

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

export function ProjectForm({
  records,
  onChanged,
  onDelete,
}: {
  records: ProjectRecord[];
  onChanged: () => Promise<void>;
  onDelete: (kind: string, id: string) => void;
}) {
  const api = useAdminApi();
  const [form, setForm] = useState(emptyProject);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/projects", {
      title: form.title,
      slug: form.slug,
      description: form.description,
      category: form.category,
      images: form.images.split(",").map((item) => item.trim()).filter(Boolean),
      featured: form.featured,
      location: form.location,
      completionDate: form.completionDate || undefined,
      tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean),
      impactStats:
        form.impactLabel && form.impactValue
          ? [{ label: form.impactLabel, value: form.impactValue }]
          : [],
    });
    setForm(emptyProject);
    await onChanged();
  }

  return (
    <AdminPanel title="Add project" onSubmit={submit}>
      <Input label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
      <Input label="Slug" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
      <Input label="Category" value={form.category} onChange={(category) => setForm({ ...form, category })} />
      <Input label="Location" value={form.location} onChange={(location) => setForm({ ...form, location })} />
      <Textarea label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} />
      <Input label="Image URLs, comma separated" value={form.images} onChange={(images) => setForm({ ...form, images })} />
      <Input label="Tags, comma separated" value={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
      <Input label="Completion date" type="date" value={form.completionDate} onChange={(completionDate) => setForm({ ...form, completionDate })} />
      <Input label="Impact label" value={form.impactLabel} onChange={(impactLabel) => setForm({ ...form, impactLabel })} />
      <Input label="Impact value" value={form.impactValue} onChange={(impactValue) => setForm({ ...form, impactValue })} />
      <Checkbox label="Featured" checked={form.featured} onChange={(featured) => setForm({ ...form, featured })} />
      {api.error ? <p className="text-sm text-red-700 sm:col-span-2">{api.error}</p> : null}
      <RecordList records={records} kind="projects" onDelete={onDelete} />
    </AdminPanel>
  );
}
