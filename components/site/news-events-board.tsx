"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { ManagedEntry, NewsEventContent } from "@/lib/types";

type NewsEventsBoardProps = {
  items: ManagedEntry<NewsEventContent>[];
};

export default function NewsEventsBoard({ items }: NewsEventsBoardProps) {
  const [activeItem, setActiveItem] = useState<ManagedEntry<NewsEventContent> | null>(
    null,
  );

  useEffect(() => {
    if (!activeItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem]);

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--line)] border-dashed bg-[rgba(255,250,244,0.4)] p-16 text-center shadow-[var(--shadow-soft)]">
        <svg
          className="h-12 w-12 text-[var(--muted)] opacity-60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
          No Updates Available
        </h3>
        <p className="mt-2 max-w-md text-pretty text-sm leading-6 text-[var(--muted)]">
          There are no news or event updates published at the moment. Please check back later for updates on our field activities.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveItem(item)}
            className="group overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-[rgba(255,250,244,0.84)] text-left shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1 focus-visible:-translate-y-1"
          >
            <span className="relative block aspect-[4/3] overflow-hidden bg-[var(--accent-soft)]">
              <Image
                src={item.data.image.src}
                alt={item.data.image.alt}
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-[1.05] ${item.data.image.className ?? ""}`}
                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(23,18,15,0.58))]" />
              <span className="absolute left-4 top-4 rounded-full bg-white/18 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                {item.data.type}
              </span>
              <span className="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/82">
                {item.data.date}
              </span>
            </span>
            <span className="block p-5">
              <span className="block text-lg font-semibold leading-6 tracking-[-0.02em] text-[var(--foreground)]">
                {item.data.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(29,25,22,0.58)] px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-event-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setActiveItem(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.6rem] border border-white/40 bg-[var(--surface-strong)] shadow-[0_32px_90px_rgba(20,14,11,0.26)]">
            <div className="relative min-h-[15rem] overflow-hidden bg-[var(--foreground)] sm:min-h-[22rem]">
              <Image
                src={activeItem.data.image.src}
                alt={activeItem.data.image.alt}
                fill
                priority
                className="object-contain"
                sizes="(min-width: 1024px) 56rem, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.04),rgba(23,18,15,0.56))]" />
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/18 text-lg font-semibold text-white backdrop-blur-md hover:bg-white/28"
                aria-label="Close news event details"
              >
                x
              </button>
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/18 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {activeItem.data.type}
                </span>
                <span className="rounded-full bg-white/18 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {activeItem.data.date}
                </span>
              </div>
            </div>
            <div className="space-y-5 p-6 sm:p-8 lg:p-10">
              <h2
                id="news-event-title"
                className="text-balance text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--foreground)] sm:text-4xl"
              >
                {activeItem.data.title}
              </h2>
              <p className="max-w-3xl text-pretty text-base leading-8 text-[var(--muted)] sm:text-lg">
                {activeItem.data.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
