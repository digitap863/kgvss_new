"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

import ruralSanitation from "@/assets/projects/ruralSanitation.jpg";
import wasteManagement from "@/assets/projects/wasteManagement.webp";
import waterConservation from "@/assets/projects/waterconservation.png";
import livelihood from "@/assets/projects/livelihood.jpg";

import statue1 from "@/assets/projects/statue1.jpg";
import statue2 from "@/assets/projects/statue2.jpg";
import statue3 from "@/assets/projects/statue3.jpeg";
import statue5 from "@/assets/projects/statue5.jpeg";
import statue6 from "@/assets/projects/statue6.png";

// ─── FEATURED DATA ────────────────────────────────────────────────────────────

const featured = [
  {
    id: "sculpture-works",
    category: "Sculpture Works",
    headline: "Shaping Stone,\nShaping Communities",
    note: "Creative artists crafting permanent public sculptures across Kerala's government institutions.",
    tags: ["Public Art", "Monuments", "Government Institutions"],
    intervalMs: 3800,
    images: [
      { src: statue1,        alt: "Sculpture installation at government institution." },
      { src: statue2,   alt: "Artist team working on a public monument." },
      { src: statue3, alt: "Completed sculpture at public space." },
      { src: statue5, alt: "Completed sculpture at public space." },
      { src: statue6, alt: "Completed sculpture at public space." },
    ],
  }
];

// ─── ACTIVITIES ───────────────────────────────────────────────────────────────

const activities = [

  {
    id: "toilet-construction",
    category: "Sanitation",
    title: "Toilet Construction",
    description: "Building toilets and promoting hygiene practices in rural areas.",
    tags: ["Sanitation", "Health"],
    cover: { src: ruralSanitation, alt: "Toilet construction in rural areas.", position: "68% 48%" },
  },
  {
    id: "waste-management",
    category: "Environment",
    title: "Waste Management",
    description: "Composting and recycling systems for cleaner communities.",
    tags: ["Recycling", "Sustainability"],
    cover: { src: wasteManagement, alt: "Waste management systems.", position: "78% 44%" },
  },
  {
    id: "water-conservation",
    category: "Water",
    title: "Water Conservation",
    description: "Rainwater harvesting for long-term water security.",
    tags: ["Rainwater", "Conservation"],
    cover: { src: waterConservation, alt: "Water conservation practices.", position: "72% 42%" },
  },
  {
    id: "livelihood-promotion",
    category: "Livelihood",
    title: "Livelihood Promotion",
    description: "Agriculture, animal husbandry, and handicrafts for local empowerment.",
    tags: ["Agriculture", "Handicrafts"],
    cover: { src: livelihood, alt: "Livelihood promotion activities.", position: "72% 42%" },
  },

];

// ─── IMAGE SLIDESHOW ──────────────────────────────────────────────────────────

function useSlideshow(images: { src: StaticImageData; alt: string }[], intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setPrev((p) => (p === null ? index : p));
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % images.length);
        setVisible(true);
        setPrev(null);
      }, 500);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs, index]);

  return { index, prev, visible };
}

// ─── FEATURED CARD ────────────────────────────────────────────────────────────

function FeaturedCard({ item, reverse }: { item: typeof featured[0]; reverse: boolean }) {
  const { index, visible } = useSlideshow(item.images, item.intervalMs);

  return (
    <article className={`grid gap-0 overflow-hidden rounded-[2.2rem] border border-[var(--line)] shadow-[var(--shadow-soft)] lg:grid-cols-2 ${reverse ? "" : ""}`}>

      {/* ── Image side ── */}
      <div className={`relative min-h-[24rem] overflow-hidden lg:min-h-[35rem] ${reverse ? "lg:order-2" : ""}`}>
        {item.images.map((img, i) => (
          <Image
            key={i}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
            style={{
              objectPosition: "50% 40%",
              opacity: i === index ? (visible ? 1 : 0) : 0,
              transition: "opacity 600ms ease-in-out",
              zIndex: i === index ? 1 : 0,
            }}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(160deg,rgba(23,18,15,0.18),rgba(23,18,15,0.0))]" />

        {/* Category badge */}
        <div className="absolute left-5 top-5 z-20">
          <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {item.category}
          </span>
        </div>

        {/* Dot indicators */}
        {item.images.length > 1 && (
          <div className="absolute bottom-5 left-5 z-20 flex gap-1.5">
            {item.images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Text side ── */}
      <div className={`flex flex-col justify-center gap-6 bg-[rgba(255,250,244,0.94)] p-7 sm:p-10 lg:p-12 ${reverse ? "lg:order-1" : ""}`}>
        <div className="space-y-4">
          <h2
            className="text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--foreground)]"
            style={{ whiteSpace: "pre-line" }}
          >
            {item.headline}
          </h2>
          <p className="max-w-sm text-base leading-7 text-[var(--muted)]">
            {item.note}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] bg-white/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── ACTIVITY CARD ────────────────────────────────────────────────────────────

function ActivityCard({ item }: { item: typeof activities[0] }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[rgba(255,250,244,0.82)] shadow-[var(--shadow-soft)]">
      <div className="relative h-44 overflow-hidden bg-[var(--accent-soft)]">
        <Image
          src={item.cover.src}
          alt={item.cover.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          style={{ objectPosition: item.cover.position }}
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(23,18,15,0.52))]" />
        <p className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
          {item.category}
        </p>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
        <h3 className="text-base font-semibold tracking-[-0.02em] text-[var(--foreground)] sm:text-lg">
          {item.title}
        </h3>
        <p className="flex-1 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line)] bg-white/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────

export default function ProjectShowcase() {
  return (
    <section id="work" className="page-section scroll-mt-28 pt-12 sm:pt-16">
      <div className="space-y-5">

        {/* Section label */}
        <div className="px-1">
          <span className="section-label">What We Do</span>
        </div>

        {/* Featured — Sculpture & Wall Writing */}
        <div className="space-y-4">
          {featured.map((item, i) => (
            <FeaturedCard key={item.id} item={item} reverse={i % 2 === 1} />
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 px-1 pt-2">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Other Activities
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        {/* Activity grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {activities.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
}
