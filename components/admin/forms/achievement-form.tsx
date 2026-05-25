"use client";

import { useState } from "react";

import { AdminPanel } from "@/components/admin/admin-panel";
import { Input, Textarea } from "@/components/admin/admin-form-controls";
import type { SimpleRecord } from "@/components/admin/admin-types";
import { RecordList } from "@/components/admin/record-list";
import { useAdminApi } from "@/hooks/use-admin-api";

const emptyAchievement = {
  title: "",
  description: "",
  year: "",
  imageUrl: "",
  order: "0",
  status: "published",
};

export function AchievementForm({
  records,
  onChanged,
  onDelete,
}: {
  records: SimpleRecord[];
  onChanged: () => Promise<void>;
  onDelete: (kind: string, id: string) => void;
}) {
  const api = useAdminApi();
  const [form, setForm] = useState(emptyAchievement);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/achievements", {
      ...form,
      year: form.year ? Number(form.year) : undefined,
      order: Number(form.order),
    });
    setForm(emptyAchievement);
    await onChanged();
  }

  return (
    <AdminPanel title="Manage achievements" onSubmit={submit}>
      <Input label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
      <Textarea label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} />
      <Input label="Year" value={form.year} onChange={(year) => setForm({ ...form, year })} />
      <Input label="Image URL" value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
      <Input label="Order" value={form.order} onChange={(order) => setForm({ ...form, order })} />
      {api.error ? <p className="text-sm text-red-700 sm:col-span-2">{api.error}</p> : null}
      <RecordList records={records} kind="achievements" onDelete={onDelete} />
    </AdminPanel>
  );
}
