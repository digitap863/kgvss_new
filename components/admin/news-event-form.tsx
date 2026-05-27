"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function NewsEventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSubmitting(true);

    const loadingToast = toast.loading("Saving news/event item...");

    try {
      const response = await fetch("/api/admin/news-events", {
        method: "POST",
        body: new FormData(form),
      });

      if (response.ok) {
        form.reset();

        toast.success("News/event item saved successfully.", {
          id: loadingToast,
        });
      } else {
        const data = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;

        toast.error(
          data?.message ?? "Could not save news/event item.",
          {
            id: loadingToast,
          }
        );
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
          htmlFor="news-type"
          className="text-sm font-medium text-[#344054]"
        >
          Type
        </label>

        <select
          id="news-type"
          name="type"
          required
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        >
          <option value="News">News</option>
          <option value="Event">Event</option>
        </select>
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="news-title"
          className="text-sm font-medium text-[#344054]"
        >
          Title
        </label>

        <input
          id="news-title"
          name="title"
          type="text"
          required
          placeholder="Enter title"
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="news-date"
          className="text-sm font-medium text-[#344054]"
        >
          Date
        </label>

        <input
          id="news-date"
          name="date"
          type="date"
          required
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="news-description"
          className="text-sm font-medium text-[#344054]"
        >
          Description
        </label>

        <textarea
          id="news-description"
          name="description"
          rows={7}
          required
          placeholder="Write the update"
          className="resize-y rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm leading-6 outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="news-image-alt"
          className="text-sm font-medium text-[#344054]"
        >
          Image alt text
        </label>

        <input
          id="news-image-alt"
          name="imageAlt"
          type="text"
          required
          placeholder="Describe the image"
          className="rounded-md border border-black/10 bg-white px-3.5 py-3 text-sm outline-none ring-[#15171a]/15 focus:ring-4"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="news-status"
          className="text-sm font-medium text-[#344054]"
        >
          Status
        </label>

        <select
          id="news-status"
          name="status"
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
          className="h-4 w-4 rounded border-black/20"
        />
        Featured
      </label>

      <div className="grid gap-2">
        <label
          htmlFor="news-image"
          className="text-sm font-medium text-[#344054]"
        >
          Image
        </label>

        <input
          id="news-image"
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
          {isSubmitting ? "Saving..." : "Save news or event"}
        </button>
      </div>
    </form>
  );
}