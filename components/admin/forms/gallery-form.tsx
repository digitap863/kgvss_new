"use client";

import { useState } from "react";

import { AdminPanel } from "@/components/admin/admin-panel";
import {
  Checkbox,
  ImageUploadField,
  Input,
} from "@/components/admin/admin-form-controls";
import type { SimpleRecord } from "@/components/admin/admin-types";
import { RecordList } from "@/components/admin/record-list";
import { useAdminApi } from "@/hooks/use-admin-api";

const emptyGallery = {
  title: "",
  imageUrl: "",
  alt: "",
  caption: "",
  category: "",
  featured: false,
};

export function GalleryForm({
  records,
  onChanged,
  onDelete,
}: {
  records: SimpleRecord[];
  onChanged: () => Promise<void>;
  onDelete: (kind: string, id: string) => void;
}) {
  const api = useAdminApi();
  const [form, setForm] = useState(emptyGallery);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.post("/api/gallery", form);
    setForm(emptyGallery);
    await onChanged();
  }

  return (
    <AdminPanel title="Upload gallery item" onSubmit={submit}>
      <Input label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} />
      <ImageUploadField onUploaded={(imageUrl) => setForm({ ...form, imageUrl })} />
      <Input label="Image URL" value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
      <Input label="Alt text" value={form.alt} onChange={(alt) => setForm({ ...form, alt })} />
      <Input label="Caption" value={form.caption} onChange={(caption) => setForm({ ...form, caption })} />
      <Input label="Category" value={form.category} onChange={(category) => setForm({ ...form, category })} />
      <Checkbox label="Featured" checked={form.featured} onChange={(featured) => setForm({ ...form, featured })} />
      {api.error ? <p className="text-sm text-red-700 sm:col-span-2">{api.error}</p> : null}
      <RecordList records={records} kind="gallery" onDelete={onDelete} />
    </AdminPanel>
  );
}
