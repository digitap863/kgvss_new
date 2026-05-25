"use client";

import { useState } from "react";

import { AdminPanel } from "@/components/admin/admin-panel";
import { Input, Textarea } from "@/components/admin/admin-form-controls";
import type { HomepageRecord } from "@/components/admin/admin-types";
import { useAdminApi } from "@/hooks/use-admin-api";

export function HomepageForm({
  initialContent,
  onChanged,
}: {
  initialContent: HomepageRecord;
  onChanged: () => Promise<void>;
}) {
  const api = useAdminApi();
  const [form, setForm] = useState<HomepageRecord>({
    heroTitle: initialContent.heroTitle ?? "",
    heroSubtitle: initialContent.heroSubtitle ?? "",
    heroImage: initialContent.heroImage ?? "",
    aboutSection: initialContent.aboutSection ?? "",
  });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await api.put("/api/homepage", {
      ...form,
      featuredProjectIds: [],
      impactHighlights: [],
    });
    await onChanged();
  }

  return (
    <AdminPanel title="Manage homepage" onSubmit={submit}>
      <Input label="Hero title" value={form.heroTitle} onChange={(heroTitle) => setForm({ ...form, heroTitle })} />
      <Textarea label="Hero subtitle" value={form.heroSubtitle} onChange={(heroSubtitle) => setForm({ ...form, heroSubtitle })} />
      <Input label="Hero image URL" value={form.heroImage ?? ""} onChange={(heroImage) => setForm({ ...form, heroImage })} />
      <Textarea label="About section" value={form.aboutSection ?? ""} onChange={(aboutSection) => setForm({ ...form, aboutSection })} />
      {api.error ? <p className="text-sm text-red-700 sm:col-span-2">{api.error}</p> : null}
    </AdminPanel>
  );
}
