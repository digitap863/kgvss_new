import type { Metadata } from "next";

import GalleryGrid from "@/components/site/gallery-grid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the KGVSS project gallery through real field visuals, completed works, and community activity.",
};

export default function GalleryPage() {
  return (
    <div className="pb-10 sm:pb-14">
      <section className="page-section pt-36 sm:pt-40">
        <div className="space-y-5 max-w-3xl">
          <span className="section-label">Gallery</span>
          <h1 className="hero-title text-balance text-[clamp(2.9rem,5.4vw,5.1rem)] leading-[0.98] text-[var(--foreground)]">
            A simple visual archive of real work, field presence, and completed outcomes.
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-8 text-[var(--muted)]">
            This page keeps the focus on imagery so the work feels immediate, easy to browse, and grounded in real places.
          </p>
        </div>
      </section>

      <section className="page-section pt-16 sm:pt-20">
        <GalleryGrid />
      </section>
    </div>
  );
}
