"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function GalleryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSubmitting(true);

    const loadingToast = toast.loading("Saving gallery item...");

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();

        toast.success("Gallery item saved successfully.", {
          id: loadingToast,
        });
      } else {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;

        toast.error(data?.message ?? "Could not save gallery item.", {
          id: loadingToast,
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        id: loadingToast,
      });

      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-2">
        <label
          htmlFor="gallery-title"
          className="text-sm font-medium text-[#344054]"
        >
          Title
        </label>

        <input
          id="gallery-title"
          name="title"
          type="text"
          required
          placeholder="Enter gallery title"
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="gallery-note"
          className="text-sm font-medium text-[#344054]"
        >
          Note
        </label>

        <textarea
          id="gallery-note"
          name="note"
          rows={4}
          placeholder="Short caption or context"
          className="resize-y rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm leading-6 outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="gallery-image-alt"
          className="text-sm font-medium text-[#344054]"
        >
          Image alt text
        </label>

        <input
          id="gallery-image-alt"
          name="imageAlt"
          type="text"
          required
          placeholder="Describe the image"
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      {/* <div className="grid gap-2">
        <label
          htmlFor="gallery-category"
          className="text-sm font-medium text-[#344054]"
        >
          Category
        </label>

        <input
          id="gallery-category"
          name="category"
          type="text"
          placeholder="Optional category"
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div> */}

      <div className="grid gap-2">
        <label
          htmlFor="gallery-status"
          className="text-sm font-medium text-[#344054]"
        >
          Status
        </label>

        <select
          id="gallery-status"
          name="status"
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="gallery-image"
          className="text-sm font-medium text-[#344054]"
        >
          Image
        </label>

        <input
          id="gallery-image"
          name="image"
          type="file"
          accept="image/*"
          required
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#15171a] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
        />
      </div>

      <div className="flex justify-end border-t border-black/10 pt-5">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-[#15171a] px-5 py-3 text-sm font-semibold text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-[#667085]"
        >
          {isSubmitting ? "Saving..." : "Save gallery item"}
        </button>
      </div>
    </form>
  );
}