import { GalleryForm } from "@/components/admin/gallery-form";

export default function AdminGalleryPage() {
  return (
    <section className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#667085]">
          Gallery
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#15171a] sm:text-4xl">
          Add gallery image
        </h1>
      </div>

      <GalleryForm />
    </section>
  );
}
