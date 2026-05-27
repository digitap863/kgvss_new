import Link from "next/link";

import { ManageGalleryList } from "@/components/admin/manage-gallery-list";

export const dynamic = "force-dynamic";

export default async function ManageGalleryPage() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#667085]">
            Manage Gallery
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#15171a] sm:text-4xl">
            Gallery items
          </h1>
        </div>
        <Link
          href="/admin/gallery"
          className="inline-flex w-fit rounded-md bg-[#15171a] px-4 py-2.5 text-sm font-semibold text-white hover:bg-black"
        >
          Add new
        </Link>
      </div>

      <ManageGalleryList />
    </section>
  );
}
