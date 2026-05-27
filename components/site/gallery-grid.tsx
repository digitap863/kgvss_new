"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import type { GalleryEntryContent, ManagedEntry } from "@/lib/types";


const INTERVAL_MS = 15000;

function advance(prev: number, itemCount: number) {
  return (prev + 1) % itemCount;
}

type GalleryGridProps = {
  items: ManagedEntry<GalleryEntryContent>[];
};

export default function GalleryGrid({ items }: GalleryGridProps) {
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
    if (!isPlaying || items.length === 0) return;
    timerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((p) => {
          const n = advance(p, items.length);
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
    if (!isPlaying || items.length === 0) return;
    timerRef.current = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setActiveIndex((p) => {
          const n = advance(p, items.length);
          scrollActiveThumbIntoView(n);
          return n;
        });
        setIsFading(false);
        setBarKey((k) => k + 1);
      }, 280);
    }, INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, items.length]);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  const handleThumbClick = (i: number) => { transitionTo(i); setTimeout(restartTimer, 300); };
  const handlePrev = () => { const n = (activeIndex - 1 + items.length) % items.length; transitionTo(n); setTimeout(restartTimer, 300); };
  const handleNext = () => { const n = advance(activeIndex, items.length); transitionTo(n); setTimeout(restartTimer, 300); };
  const togglePlay  = () => {
    setIsPlaying((prev) => {
      if (prev && timerRef.current) clearInterval(timerRef.current);
      return !prev;
    });
  };

  if (items.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--accent-soft)] p-8 text-sm text-[var(--muted)]">
        No gallery items have been published yet.
      </div>
    );
  }

  const active = items[activeIndex] ?? items[0];

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
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
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
            {items.map((img, i) => (
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

