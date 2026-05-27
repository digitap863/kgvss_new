"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

type NewsEventAdminItem = {
  id: string;
  type: "News" | "Event";
  title: string;
  slug: string;
  date: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  status: "draft" | "published";
};

function toDateInputValue(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

function toDisplayDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function ManageNewsEventList() {
  const [items, setItems] = useState<NewsEventAdminItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsEventAdminItem | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  async function loadItems() {
    setIsLoading(true);
    const response = await fetch("/api/admin/news-events", { cache: "no-store" });
    const data = (await response.json().catch(() => ({ items: [] }))) as {
      items?: NewsEventAdminItem[];
    };
    setItems(data.items ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function deleteItem(item: NewsEventAdminItem) {
    if (!window.confirm(`Delete "${item.title}"?`)) {
      return;
    }

    const response = await fetch(`/api/admin/news-events/${item.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage("News/event item deleted.");
      await loadItems();
      return;
    }

    const data = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    setMessage(data?.message ?? "Could not delete news/event item.");
  }

  async function updateItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    const form = event.currentTarget;
    setIsSaving(true);
    setMessage("");

    const response = await fetch(`/api/admin/news-events/${editingItem.id}`, {
      method: "PATCH",
      body: new FormData(form),
    });

    if (response.ok) {
      setEditingItem(null);
      setMessage("News/event item updated.");
      await loadItems();
    } else {
      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      setMessage(data?.message ?? "Could not update news/event item.");
    }

    setIsSaving(false);
  }

  if (isLoading) {
    return <p className="text-sm text-[#667085]">Loading news/event items...</p>;
  }

  return (
    <>
      <p className="min-h-5 text-sm text-[#667085]" aria-live="polite">
        {message}
      </p>

      {items.length === 0 ? (
        <div className="rounded-lg border border-black/10 bg-white p-6 text-sm text-[#667085]">
          No news/event items found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm">
          <div className="grid gap-0">
            {items.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 border-b border-black/10 p-4 last:border-b-0 md:grid-cols-[8rem_1fr_auto] md:items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#eef0f4]">
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="8rem"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eef0f4] px-2.5 py-1 text-xs font-semibold text-[#344054]">
                      {item.type}
                    </span>
                    <span className="rounded-full bg-[#eef0f4] px-2.5 py-1 text-xs font-semibold text-[#344054]">
                      {item.status}
                    </span>
                    {item.featured ? (
                      <span className="rounded-full bg-[#eef0f4] px-2.5 py-1 text-xs font-semibold text-[#344054]">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-[#15171a]">
                    {item.title}
                  </h2>
                  <p className="text-sm text-[#667085]">{toDisplayDate(item.date)}</p>
                  <p className="line-clamp-2 text-sm leading-6 text-[#667085]">
                    {item.description}
                  </p>
                </div>
                <div className="flex gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="rounded-md border border-black/10 px-3 py-2 text-sm font-medium text-[#344054] hover:bg-[#f1f3f7]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteItem(item)}
                    className="rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {editingItem ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <form
            onSubmit={updateItem}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-xl sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#667085]">
                  Edit News & Event
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-[#15171a]">
                  {editingItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="rounded-md border border-black/10 px-3 py-2 text-sm font-medium text-[#344054]"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="news-edit-type" className="text-sm font-medium text-[#344054]">
                  Type
                </label>
                <select
                  id="news-edit-type"
                  name="type"
                  defaultValue={editingItem.type}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                >
                  <option value="News">News</option>
                  <option value="Event">Event</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="news-edit-title" className="text-sm font-medium text-[#344054]">
                  Title
                </label>
                <input
                  id="news-edit-title"
                  name="title"
                  type="text"
                  required
                  defaultValue={editingItem.title}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="news-edit-date" className="text-sm font-medium text-[#344054]">
                  Date
                </label>
                <input
                  id="news-edit-date"
                  name="date"
                  type="date"
                  required
                  defaultValue={toDateInputValue(editingItem.date)}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="news-edit-description" className="text-sm font-medium text-[#344054]">
                  Description
                </label>
                <textarea
                  id="news-edit-description"
                  name="description"
                  rows={7}
                  required
                  defaultValue={editingItem.description}
                  className="resize-y rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm leading-6 outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="news-edit-image-alt" className="text-sm font-medium text-[#344054]">
                  Image alt text
                </label>
                <input
                  id="news-edit-image-alt"
                  name="imageAlt"
                  type="text"
                  required
                  defaultValue={editingItem.imageAlt}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="news-edit-status" className="text-sm font-medium text-[#344054]">
                  Status
                </label>
                <select
                  id="news-edit-status"
                  name="status"
                  defaultValue={editingItem.status}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <label className="flex items-center gap-3 text-sm font-medium text-[#344054]">
                <input
                  name="featured"
                  type="checkbox"
                  defaultChecked={editingItem.featured}
                  className="h-4 w-4 rounded border-black/20"
                />
                Featured
              </label>

              <div className="grid gap-2">
                <label htmlFor="news-edit-image" className="text-sm font-medium text-[#344054]">
                  Replace image
                </label>
                <input
                  id="news-edit-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#15171a] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-black/10 pt-5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-semibold text-[#344054]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-md bg-[#15171a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-[#667085]"
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
