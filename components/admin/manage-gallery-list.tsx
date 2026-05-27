"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";

type GalleryAdminItem = {
  id: string;
  title: string;
  slug: string;
  note: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  status: "draft" | "published";
};

export function ManageGalleryList() {
  const [items, setItems] = useState<GalleryAdminItem[]>([]);
  const [editingItem, setEditingItem] = useState<GalleryAdminItem | null>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  async function loadItems() {
    setIsLoading(true);
    const response = await fetch("/api/admin/gallery", { cache: "no-store" });
    const data = (await response.json().catch(() => ({ items: [] }))) as {
      items?: GalleryAdminItem[];
    };
    setItems(data.items ?? []);
    setIsLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function deleteItem(item: GalleryAdminItem) {
    if (!window.confirm(`Delete "${item.title}"?`)) {
      return;
    }

    const response = await fetch(`/api/admin/gallery/${item.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage("Gallery item deleted.");
      await loadItems();
      return;
    }

    const data = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    setMessage(data?.message ?? "Could not delete gallery item.");
  }

  async function updateItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    const form = event.currentTarget;
    setIsSaving(true);
    setMessage("");

    const response = await fetch(`/api/admin/gallery/${editingItem.id}`, {
      method: "PATCH",
      body: new FormData(form),
    });

    if (response.ok) {
      setEditingItem(null);
      setMessage("Gallery item updated.");
      await loadItems();
    } else {
      const data = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;
      setMessage(data?.message ?? "Could not update gallery item.");
    }

    setIsSaving(false);
  }

  if (isLoading) {
    return <p className="text-sm text-[#667085]">Loading gallery items...</p>;
  }

  return (
    <>
      <p className="min-h-5 text-sm text-[#667085]" aria-live="polite">
        {message}
      </p>

      {items.length === 0 ? (
        <div className="rounded-lg border border-black/10 bg-white p-6 text-sm text-[#667085]">
          No gallery items found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-[#eef0f4]">
                <Image
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 18rem, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eef0f4] px-2.5 py-1 text-xs font-semibold text-[#344054]">
                      {item.status}
                    </span>
                    {item.category ? (
                      <span className="rounded-full bg-[#eef0f4] px-2.5 py-1 text-xs font-semibold text-[#344054]">
                        {item.category}
                      </span>
                    ) : null}
                  </div>
                  <h2 className="text-base font-semibold tracking-[-0.02em] text-[#15171a]">
                    {item.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#667085]">
                    {item.note}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="flex-1 rounded-md border border-black/10 px-3 py-2 text-sm font-medium text-[#344054] hover:bg-[#f1f3f7]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void deleteItem(item)}
                    className="flex-1 rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
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
                  Edit Gallery
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
                <label
                  htmlFor="gallery-edit-title"
                  className="text-sm font-medium text-[#344054]"
                >
                  Title
                </label>
                <input
                  id="gallery-edit-title"
                  name="title"
                  type="text"
                  required
                  defaultValue={editingItem.title}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="gallery-edit-note"
                  className="text-sm font-medium text-[#344054]"
                >
                  Note
                </label>
                <textarea
                  id="gallery-edit-note"
                  name="note"
                  rows={4}
                  defaultValue={editingItem.note}
                  className="resize-y rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm leading-6 outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="gallery-edit-image-alt"
                  className="text-sm font-medium text-[#344054]"
                >
                  Image alt text
                </label>
                <input
                  id="gallery-edit-image-alt"
                  name="imageAlt"
                  type="text"
                  required
                  defaultValue={editingItem.imageAlt}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="gallery-edit-category"
                  className="text-sm font-medium text-[#344054]"
                >
                  Category
                </label>
                <input
                  id="gallery-edit-category"
                  name="category"
                  type="text"
                  defaultValue={editingItem.category}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="gallery-edit-status"
                  className="text-sm font-medium text-[#344054]"
                >
                  Status
                </label>
                <select
                  id="gallery-edit-status"
                  name="status"
                  defaultValue={editingItem.status}
                  className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="gallery-edit-image"
                  className="text-sm font-medium text-[#344054]"
                >
                  Replace image
                </label>
                <input
                  id="gallery-edit-image"
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
