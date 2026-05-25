"use client";

import { useState } from "react";

import { AdminPanel } from "@/components/admin/admin-panel";
import { Input, Textarea } from "@/components/admin/admin-form-controls";
import type { SimpleRecord } from "@/components/admin/admin-types";
import { RecordList } from "@/components/admin/record-list";
import { useAdminApi } from "@/hooks/use-admin-api";

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

export function ActivityForm({
  records,
  onChanged,
  onDelete,
}: {
  records: SimpleRecord[];
  onChanged: () => Promise<void>;
  onDelete: (kind: string, id: string) => void;
}) {
  const api = useAdminApi();
  const [form, setForm] = useState(emptyActivity);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/activities", {
      ...form,
      images: form.images.split(",").map((item) => item.trim()).filter(Boolean),
      date: form.date || undefined,
    });
    setForm(emptyActivity);
    await onChanged();
  }

  return (
    <AdminPanel title="Manage activities" onSubmit={submit}>
      <Input label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
      <Input label="Slug" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
      <Input label="Location" value={form.location} onChange={(location) => setForm({ ...form, location })} />
      <Input label="Date" type="date" value={form.date} onChange={(date) => setForm({ ...form, date })} />
      <Textarea label="Summary" value={form.summary} onChange={(summary) => setForm({ ...form, summary })} />
      <Textarea label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} />
      <Input label="Image URLs, comma separated" value={form.images} onChange={(images) => setForm({ ...form, images })} />
      {api.error ? <p className="text-sm text-red-700 sm:col-span-2">{api.error}</p> : null}
      <RecordList records={records} kind="activities" onDelete={onDelete} />
    </AdminPanel>
  );
}
