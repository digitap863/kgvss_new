"use client";

import { useState } from "react";
import Image from "next/image";

import type { GalleryEntryContent, ManagedEntry } from "@/lib/types";

import home1 from "@/assets/home/home1.jpg";
import home2 from "@/assets/home/home2.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";
import home5 from "@/assets/home/home5.jpg";

const images: ManagedEntry<GalleryEntryContent>[] = [
  {
    id: "gallery-1",
    slug: "community-handover",
    order: 1,
    data: {
      title: "Community handover",
      note: "Gatherings and completion moments that make implementation publicly visible.",
      image: {
        src: home1,
        alt: "Collage of community gathering, public unveiling moments, and memorial installations.",
        className: "object-[68%_48%]",
      },
    },
  },
  {
    id: "gallery-2",
    slug: "completed-landmark",
    order: 2,
    data: {
      title: "Completed landmark",
      note: "Finished sites that anchor long-term identity and local recognition.",
      image: {
        src: home2,
        alt: "Collage of portrait busts and completed public landmarks in community settings.",
        className: "object-[75%_46%]",
      },
    },
  },
  {
    id: "gallery-3",
    slug: "field-review",
    order: 3,
    data: {
      title: "Field review",
      note: "On-site coordination and implementation follow-through.",
      image: {
        src: home3,
        alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
        className: "object-[72%_42%]",
      },
    },
  },
  {
    id: "gallery-4",
    slug: "public-environment",
    order: 4,
    data: {
      title: "Public environment",
      note: "Landscaped settings and shared places that support community use.",
      image: {
        src: home4,
        alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
        className: "object-[78%_44%]",
      },
    },
  },
  {
    id: "gallery-5",
    slug: "archive-collage",
    order: 5,
    data: {
      title: "Archive collage",
      note: "A single view of project memory, field effort, and completed outcomes.",
      image: {
        src: home5,
        alt: "Project archive collage combining ceremonies, Gandhi memorial imagery, and field documentation.",
        className: "object-[70%_48%]",
      },
    },
  },
];

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[22rem_20rem]">
        {images.map((image, index) => {
          const layoutClassName =
            index === 0
              ? "lg:col-span-7 lg:row-span-2"
              : index === 1
                ? "lg:col-span-5"
                : index === 2
                  ? "lg:col-span-3"
                  : index === 3
                    ? "lg:col-span-4"
                    : "lg:col-span-5";

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-[var(--line)] bg-[var(--accent-soft)] text-left ${layoutClassName}`}
            >
              <Image
                src={image.data.image.src}
                alt={image.data.image.alt}
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${image.data.image.className ?? ""}`}
                sizes="(min-width: 1024px) 40rem, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,24,20,0.04),rgba(29,24,20,0.78))]" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-lg font-semibold tracking-[-0.03em] text-white">
                  {image.data.title}
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/76">
                  {image.data.note}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(18,16,14,0.84)] p-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(24,21,18,0.82)] shadow-[0_30px_120px_rgba(0,0,0,0.32)]"
            onClick={(event) => event.stopPropagation()}
            role="presentation"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/30 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-black/50"
            >
              Close
            </button>
            <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
              <div className="relative min-h-[50vh]">
                <Image
                  src={selectedImage.data.image.src}
                  alt={selectedImage.data.image.alt}
                  fill
                  className={`object-contain p-4 sm:p-6 ${selectedImage.data.image.className ?? ""}`}
                  sizes="(min-width: 1024px) 70vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-end gap-4 p-6 text-white sm:p-8">
                <span className="section-label !border-white/14 !bg-white/10 !text-white/70">
                  Visual archive
                </span>
                <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  {selectedImage.data.title}
                </h3>
                <p className="text-sm leading-7 text-white/72 sm:text-base">
                  {selectedImage.data.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
