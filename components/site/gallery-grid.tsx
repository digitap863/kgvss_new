"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import type { GalleryEntryContent, ManagedEntry } from "@/lib/types";

// import home1 from "@/assets/home/home1.jpg";
// import home2 from "@/assets/home/home2.jpg";
// import home3 from "@/assets/home/home3.jpg";
// import home4 from "@/assets/home/home4.jpg";
// import home5 from "@/assets/home/home5.jpg";
import img1 from "@/assets/gallery/pic1.jpg";
import img2 from "@/assets/gallery/pic2.jpg";
import img3 from "@/assets/gallery/pic3.jpg";
import img4 from "@/assets/gallery/pic4.jpg";
import img5 from "@/assets/gallery/pic5.jpg";
import img6 from "@/assets/gallery/pic6.jpg";
import img7 from "@/assets/gallery/pic7.jpg";
import img8 from "@/assets/gallery/pic8.jpg";
import img9 from "@/assets/gallery/pic9.jpg";
import img10 from "@/assets/gallery/pic10.jpg";
import img11 from "@/assets/gallery/pic11.jpg";
import img12 from "@/assets/gallery/pic12.jpg";
import img13 from "@/assets/gallery/pic13.jpg";
import img14 from "@/assets/gallery/pic14.jpg";
import img15 from "@/assets/gallery/pic15.jpg";
import img16 from "@/assets/gallery/pic16.jpg";
import img17 from "@/assets/gallery/pic17.jpg";
import img18 from "@/assets/gallery/pic18.jpg";
import img19 from "@/assets/gallery/pic19.jpg";
import img20 from "@/assets/gallery/pic20.jpg";
import img21 from "@/assets/gallery/pic21.jpg";
import img22 from "@/assets/gallery/pic22.jpg";
import img23 from "@/assets/gallery/pic23.jpg";
import img24 from "@/assets/gallery/pic24.jpg";
import img25 from "@/assets/gallery/pic25.jpg";
import img26 from "@/assets/gallery/pic26.jpg";
import img27 from "@/assets/gallery/pic27.jpg";
import img28 from "@/assets/gallery/pic28.jpg";
import img29 from "@/assets/gallery/pic29.jpg";
import img30 from "@/assets/gallery/pic30.jpg";
import img31 from "@/assets/gallery/pic31.jpg";
import img32 from "@/assets/gallery/pic32.jpg";
import img33 from "@/assets/gallery/pic33.jpg";
import img34 from "@/assets/gallery/pic34.jpg";
import img35 from "@/assets/gallery/pic35.jpg";
import img36 from "@/assets/gallery/pic36.jpg";

const images: ManagedEntry<GalleryEntryContent>[] = [
  {
    id: "gallery-1",
    slug: "community-handover",
    order: 1,
    data: {
      title: "Community handover",
      note: "Gatherings and completion moments that make implementation publicly visible.",
      image: {
        src: img1,
        alt: "Community gathering and public unveiling moments.",
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
        src: img2,
        alt: "Portrait busts and completed public landmarks.",
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
        src: img3,
        alt: "Field walkthroughs and implementation reviews.",
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
        src: img4,
        alt: "Landscaped visitor spaces and community grounds.",
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
        src: img5,
        alt: "Project archive collage with ceremonies and field documentation.",
        className: "object-[70%_48%]",
      },
    },
  },
  {
    id: "gallery-6",
    slug: "groundbreaking",
    order: 6,
    data: {
      title: "Groundbreaking ceremony",
      note: "Inaugural moments marking the start of construction.",
      image: {
        src: img6,
        alt: "Groundbreaking ceremony.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-7",
    slug: "site-survey",
    order: 7,
    data: {
      title: "Site survey",
      note: "Early assessment walks across the project terrain.",
      image: {
        src: img7,
        alt: "Site survey walk.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-8",
    slug: "foundation",
    order: 8,
    data: {
      title: "Foundation laying",
      note: "Structural milestones captured before completion.",
      image: {
        src: img8,
        alt: "Foundation laying.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-9",
    slug: "workshop",
    order: 9,
    data: {
      title: "Community workshop",
      note: "Participatory sessions shaping design decisions.",
      image: {
        src: img9,
        alt: "Community workshop.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-10",
    slug: "concept",
    order: 10,
    data: {
      title: "Concept presentation",
      note: "Design proposals shared with stakeholders.",
      image: {
        src: img10,
        alt: "Concept presentation.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-11",
    slug: "materials",
    order: 11,
    data: {
      title: "Materials selection",
      note: "Texture and palette decisions for the built environment.",
      image: {
        src: img11,
        alt: "Materials selection.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-12",
    slug: "signage",
    order: 12,
    data: {
      title: "Signage installation",
      note: "Wayfinding elements placed across the site.",
      image: {
        src: img12,
        alt: "Signage installation.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-13",
    slug: "lighting",
    order: 13,
    data: {
      title: "Lighting design",
      note: "Evening ambiance tested during implementation.",
      image: {
        src: img13,
        alt: "Lighting design.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-14",
    slug: "planting",
    order: 14,
    data: {
      title: "Planting programme",
      note: "Native species arranged across the landscape.",
      image: {
        src: img14,
        alt: "Planting programme.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-15",
    slug: "water",
    order: 15,
    data: {
      title: "Water feature",
      note: "Reflective elements integrated into open spaces.",
      image: {
        src: img15,
        alt: "Water feature.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-16",
    slug: "memorial",
    order: 16,
    data: {
      title: "Memorial dedication",
      note: "Formal ceremonies marking the completed tribute.",
      image: {
        src: img16,
        alt: "Memorial dedication.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-17",
    slug: "youth",
    order: 17,
    data: {
      title: "Youth engagement",
      note: "Activities connecting the next generation to the space.",
      image: {
        src: img17,
        alt: "Youth engagement.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-18",
    slug: "media",
    order: 18,
    data: {
      title: "Media documentation",
      note: "Press walkthroughs and broadcast coverage.",
      image: {
        src: img18,
        alt: "Media documentation.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-19",
    slug: "stakeholder",
    order: 19,
    data: {
      title: "Stakeholder handover",
      note: "Formal transfer of stewardship to community bodies.",
      image: {
        src: img19,
        alt: "Stakeholder handover.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-20",
    slug: "maintenance",
    order: 20,
    data: {
      title: "Long-term maintenance",
      note: "Ongoing care protocols established post-opening.",
      image: {
        src: img20,
        alt: "Long-term maintenance.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-21",
    slug: "anniversary",
    order: 21,
    data: {
      title: "Anniversary gathering",
      note: "Annual community reunions at the completed site.",
      image: {
        src: img21,
        alt: "Anniversary gathering.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-22",
    slug: "night-event",
    order: 22,
    data: {
      title: "Night event",
      note: "Evening activations showing the space after dark.",
      image: {
        src: img22,
        alt: "Night event.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-23",
    slug: "heritage-restoration",
    order: 23,
    data: {
      title: "Heritage restoration",
      note: "Careful preservation work carried out on historic structures.",
      image: {
        src: img23,
        alt: "Heritage restoration process.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-24",
    slug: "visitor-space",
    order: 24,
    data: {
      title: "Visitor space",
      note: "Open and welcoming areas designed for public interaction.",
      image: {
        src: img24,
        alt: "Visitor gathering area.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-25",
    slug: "cultural-programme",
    order: 25,
    data: {
      title: "Cultural programme",
      note: "Events and performances activating the shared public space.",
      image: {
        src: img25,
        alt: "Cultural programme event.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-26",
    slug: "design-detail",
    order: 26,
    data: {
      title: "Design detail",
      note: "Close-up moments highlighting craftsmanship and materiality.",
      image: {
        src: img26,
        alt: "Architectural design detail.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-27",
    slug: "pathway-development",
    order: 27,
    data: {
      title: "Pathway development",
      note: "Accessible circulation routes integrated into the environment.",
      image: {
        src: img27,
        alt: "Pathway construction and development.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-28",
    slug: "green-space",
    order: 28,
    data: {
      title: "Green space",
      note: "Natural planting areas enhancing the ecological setting.",
      image: {
        src: img28,
        alt: "Green landscaped environment.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-29",
    slug: "site-progress",
    order: 29,
    data: {
      title: "Site progress",
      note: "Ongoing construction and development milestones documented.",
      image: {
        src: img29,
        alt: "Construction progress on site.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-30",
    slug: "community-meet",
    order: 30,
    data: {
      title: "Community meet",
      note: "Open discussions and planning sessions with residents.",
      image: {
        src: img30,
        alt: "Community discussion gathering.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-31",
    slug: "educational-tour",
    order: 31,
    data: {
      title: "Educational tour",
      note: "Student and visitor walkthroughs across the completed project.",
      image: {
        src: img31,
        alt: "Educational site tour.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-32",
    slug: "public-art",
    order: 32,
    data: {
      title: "Public art",
      note: "Creative installations enriching the cultural identity of the site.",
      image: {
        src: img32,
        alt: "Public art installation.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-33",
    slug: "ceremonial-lighting",
    order: 33,
    data: {
      title: "Ceremonial lighting",
      note: "Special lighting arrangements during public celebrations.",
      image: {
        src: img33,
        alt: "Ceremonial lighting setup.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-34",
    slug: "project-review",
    order: 34,
    data: {
      title: "Project review",
      note: "Final inspections and quality evaluation sessions.",
      image: {
        src: img34,
        alt: "Project review meeting.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-35",
    slug: "community-space",
    order: 35,
    data: {
      title: "Community space",
      note: "Shared environments supporting social interaction and engagement.",
      image: {
        src: img35,
        alt: "Open community gathering space.",
        className: "object-center",
      },
    },
  },
  {
    id: "gallery-36",
    slug: "final-showcase",
    order: 36,
    data: {
      title: "Final showcase",
      note: "Completed project highlights presented to the public.",
      image: {
        src: img36,
        alt: "Final showcase and presentation event.",
        className: "object-center",
      },
    },
  },
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
