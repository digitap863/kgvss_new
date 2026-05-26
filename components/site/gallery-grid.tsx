"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import type { GalleryEntryContent, ManagedEntry } from "@/lib/types";

import home1 from "@/assets/home/home1.jpg";
import home2 from "@/assets/home/home2.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";
import home5 from "@/assets/home/home5.jpg";

const images: ManagedEntry<GalleryEntryContent>[] = [
  { id: "gallery-1", slug: "community-handover", order: 1, data: { title: "Community handover", note: "Gatherings and completion moments that make implementation publicly visible.", image: { src: home1, alt: "Community gathering and public unveiling moments.", className: "object-[68%_48%]" } } },
  { id: "gallery-2", slug: "completed-landmark", order: 2, data: { title: "Completed landmark", note: "Finished sites that anchor long-term identity and local recognition.", image: { src: home2, alt: "Portrait busts and completed public landmarks.", className: "object-[75%_46%]" } } },
  { id: "gallery-3", slug: "field-review", order: 3, data: { title: "Field review", note: "On-site coordination and implementation follow-through.", image: { src: home3, alt: "Field walkthroughs and implementation reviews.", className: "object-[72%_42%]" } } },
  { id: "gallery-4", slug: "public-environment", order: 4, data: { title: "Public environment", note: "Landscaped settings and shared places that support community use.", image: { src: home4, alt: "Landscaped visitor spaces and community grounds.", className: "object-[78%_44%]" } } },
  { id: "gallery-5", slug: "archive-collage", order: 5, data: { title: "Archive collage", note: "A single view of project memory, field effort, and completed outcomes.", image: { src: home5, alt: "Project archive collage with ceremonies and field documentation.", className: "object-[70%_48%]" } } },
  { id: "gallery-6", slug: "groundbreaking", order: 6, data: { title: "Groundbreaking ceremony", note: "Inaugural moments marking the start of construction.", image: { src: home1, alt: "Groundbreaking ceremony.", className: "object-center" } } },
  { id: "gallery-7", slug: "site-survey", order: 7, data: { title: "Site survey", note: "Early assessment walks across the project terrain.", image: { src: home2, alt: "Site survey walk.", className: "object-center" } } },
  { id: "gallery-8", slug: "foundation", order: 8, data: { title: "Foundation laying", note: "Structural milestones captured before completion.", image: { src: home3, alt: "Foundation laying.", className: "object-center" } } },
  { id: "gallery-9", slug: "workshop", order: 9, data: { title: "Community workshop", note: "Participatory sessions shaping design decisions.", image: { src: home4, alt: "Community workshop.", className: "object-center" } } },
  { id: "gallery-10", slug: "concept", order: 10, data: { title: "Concept presentation", note: "Design proposals shared with stakeholders.", image: { src: home5, alt: "Concept presentation.", className: "object-center" } } },
  { id: "gallery-11", slug: "materials", order: 11, data: { title: "Materials selection", note: "Texture and palette decisions for the built environment.", image: { src: home1, alt: "Materials selection.", className: "object-center" } } },
  { id: "gallery-12", slug: "signage", order: 12, data: { title: "Signage installation", note: "Wayfinding elements placed across the site.", image: { src: home2, alt: "Signage installation.", className: "object-center" } } },
  { id: "gallery-13", slug: "lighting", order: 13, data: { title: "Lighting design", note: "Evening ambiance tested during implementation.", image: { src: home3, alt: "Lighting design.", className: "object-center" } } },
  { id: "gallery-14", slug: "planting", order: 14, data: { title: "Planting programme", note: "Native species arranged across the landscape.", image: { src: home4, alt: "Planting programme.", className: "object-center" } } },
  { id: "gallery-15", slug: "water", order: 15, data: { title: "Water feature", note: "Reflective elements integrated into open spaces.", image: { src: home5, alt: "Water feature.", className: "object-center" } } },
  { id: "gallery-16", slug: "memorial", order: 16, data: { title: "Memorial dedication", note: "Formal ceremonies marking the completed tribute.", image: { src: home1, alt: "Memorial dedication.", className: "object-center" } } },
  { id: "gallery-17", slug: "youth", order: 17, data: { title: "Youth engagement", note: "Activities connecting the next generation to the space.", image: { src: home2, alt: "Youth engagement.", className: "object-center" } } },
  { id: "gallery-18", slug: "media", order: 18, data: { title: "Media documentation", note: "Press walkthroughs and broadcast coverage.", image: { src: home3, alt: "Media documentation.", className: "object-center" } } },
  { id: "gallery-19", slug: "stakeholder", order: 19, data: { title: "Stakeholder handover", note: "Formal transfer of stewardship to community bodies.", image: { src: home4, alt: "Stakeholder handover.", className: "object-center" } } },
  { id: "gallery-20", slug: "maintenance", order: 20, data: { title: "Long-term maintenance", note: "Ongoing care protocols established post-opening.", image: { src: home5, alt: "Long-term maintenance.", className: "object-center" } } },
  { id: "gallery-21", slug: "anniversary", order: 21, data: { title: "Anniversary gathering", note: "Annual community reunions at the completed site.", image: { src: home1, alt: "Anniversary gathering.", className: "object-center" } } },
  { id: "gallery-22", slug: "night-event", order: 22, data: { title: "Night event", note: "Evening activations showing the space after dark.", image: { src: home2, alt: "Night event.", className: "object-center" } } },
];

const INTERVAL_MS = 15000;

function advance(prev: number) {
  return (prev + 1) % images.length;
}

export default function GalleryGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [barKey, setBarKey] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollActiveThumbIntoView = (index: number) => {
    const galleryBox = galleryRef.current?.getBoundingClientRect();

    if (
      !galleryBox ||
      galleryBox.bottom < 0 ||
      galleryBox.top > window.innerHeight
    ) {
      return;
    }

    thumbRefs.current[index]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  };

  // ── shared transition helper ──────────────────────────────────────────────
  const transitionTo = (next: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(next);
      setIsFading(false);
      setBarKey((k) => k + 1);
      scrollActiveThumbIntoView(next);
    }, 280);
  };

  // ── restart interval after any manual nav ────────────────────────────────
  const restartTimer = () => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((p) => {
          const n = advance(p);
          scrollActiveThumbIntoView(n);
          return n;
        });
        setIsFading(false);
        setBarKey((k) => k + 1);
      }, 280);
    }, INTERVAL_MS);
  };

  // ── auto-advance ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((p) => {
          const n = advance(p);
          scrollActiveThumbIntoView(n);
          return n;
        });
        setIsFading(false);
        setBarKey((k) => k + 1);
      }, 280);
    }, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying]);

  const handleThumbClick = (i: number) => { transitionTo(i); setTimeout(restartTimer, 300); };
  const handlePrev = () => { const n = (activeIndex - 1 + images.length) % images.length; transitionTo(n); setTimeout(restartTimer, 300); };
  const handleNext = () => { const n = advance(activeIndex); transitionTo(n); setTimeout(restartTimer, 300); };
  const togglePlay  = () => {
    setIsPlaying((prev) => {
      if (prev && timerRef.current) clearInterval(timerRef.current);
      return !prev;
    });
  };

  const active = images[activeIndex];

  return (
    <>
      {/* ── Layout: stacked on mobile, side-by-side from md ── */}
      <div ref={galleryRef} className="flex flex-col gap-4 md:flex-row md:h-[520px]">

        {/* ── Main featured panel ── */}
        <div className="relative w-full h-[52vw] min-h-[260px] md:h-auto md:w-[42%] lg:w-[45%] xl:w-[480px] flex-none rounded-[1.5rem] overflow-hidden border border-[var(--line)] bg-[var(--accent-soft)]">

          <Image
            src={active.data.image.src}
            alt={active.data.image.alt}
            fill
            priority
            className={[
              "object-cover transition-all duration-300",
              active.data.image.className ?? "",
              isFading ? "opacity-0 scale-[1.04]" : "opacity-100 scale-100",
            ].join(" ")}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 480px"
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,14,10,0.04)_0%,rgba(18,14,10,0.78)_100%)]" />

          {/* Progress bar */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
              <div
                key={barKey}
                className="h-full bg-white/80"
                style={{ animation: `galleryProgress ${INTERVAL_MS}ms linear forwards` }}
              />
            </div>
          )}

          {/* Controls — top right */}
          <div className="absolute top-3 right-3 flex gap-1.5">
            <button type="button" onClick={handlePrev} aria-label="Previous"
              className="w-7 h-7 rounded-full bg-black/35 border border-white/15 text-white flex items-center justify-center hover:bg-black/55 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L4 6l3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}
              className="w-7 h-7 rounded-full bg-black/35 border border-white/15 text-white flex items-center justify-center hover:bg-black/55 transition-colors">
              {isPlaying
                ? <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><rect x="0" y="0" width="3.5" height="12" rx="1"/><rect x="6.5" y="0" width="3.5" height="12" rx="1"/></svg>
                : <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor"><path d="M1 1l9 5-9 5V1z"/></svg>}
            </button>
            <button type="button" onClick={handleNext} aria-label="Next"
              className="w-7 h-7 rounded-full bg-black/35 border border-white/15 text-white flex items-center justify-center hover:bg-black/55 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8 6l-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>

          {/* Counter — top left */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/35 border border-white/15 text-white text-[11px] font-medium tabular-nums">
            {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>

          {/* Meta — bottom */}
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full border border-white/18 bg-white/10 text-white/65 text-[10px] font-medium uppercase tracking-widest">
              Visual archive
            </span>
            <p className="text-base sm:text-[17px] font-semibold tracking-[-0.03em] text-white leading-snug mb-1.5">
              {active.data.title}
            </p>
            <p className="text-[12px] sm:text-[13px] leading-[1.55] text-white/62 line-clamp-2">
              {active.data.note}
            </p>
          </div>
        </div>

        {/* ── Thumbnail grid ── */}
        {/*
          Mobile  : horizontal scroll strip (single row)
          sm      : 4-col wrap grid, max-height + scroll
          md+     : vertical scroll, fills remaining height
        */}
        <div className="
          flex-1 min-w-0
          flex gap-2 overflow-x-auto overflow-y-hidden pb-1
          sm:grid sm:grid-cols-4 sm:gap-2 sm:overflow-x-hidden sm:overflow-y-auto sm:max-h-[320px] sm:pb-0
          md:block md:overflow-y-auto md:overflow-x-hidden md:max-h-none md:h-full
          [scrollbar-width:thin] [scrollbar-color:var(--line)_transparent]
          [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--line)]
          [&::-webkit-scrollbar-track]:bg-transparent
        ">
          {/* inner grid — needed so mobile flex items and desktop grid share the same markup */}
          <div className="
            flex gap-2 shrink-0
            sm:contents
            md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-2 md:pr-0.5
          ">
            {images.map((img, i) => (
              <button
                key={img.id}
                ref={(el) => { thumbRefs.current[i] = el; }}
                type="button"
                onClick={() => handleThumbClick(i)}
                aria-label={`View ${img.data.title}`}
                aria-current={i === activeIndex ? "true" : undefined}
                className={[
                  // base
                  "group relative shrink-0 w-20 h-20 sm:w-auto sm:h-auto sm:aspect-square",
                  "rounded-xl overflow-hidden border transition-all duration-200",
                  i === activeIndex
                    ? "border-white ring-2 ring-white/25 scale-[1.03]"
                    : "border-[var(--line)] hover:border-white/50 hover:scale-[1.02]",
                ].join(" ")}
              >
                <Image
                  src={img.data.image.src}
                  alt={img.data.image.alt}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${img.data.image.className ?? ""}`}
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 25vw, 120px"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(18,14,10,0.68)_100%)]" />

                <span className="absolute top-1.5 left-1.5 text-[9px] font-semibold text-white/75 bg-black/38 rounded px-1.5 py-0.5 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {i === activeIndex && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white" />
                )}

                <p className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5 text-[9px] font-medium text-white/90 leading-tight line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {img.data.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes galleryProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </>
  );
}
