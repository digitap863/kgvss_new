"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useState, useEffect } from "react";

import ButtonLink from "@/components/site/button-link";

import home1 from "@/assets/home/home1.jpg";
import home2 from "@/assets/home/home2.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";

// ─── ALL IMAGES IN ORDER ──────────────────────────────────────────────────────
// The conveyor belt cycles through this list continuously.
// Each tick: slot1 → slot2 → slot3, and the next image enters slot1.

const allImages = [
  { src: home1, alt: "Public awareness installation and community mural project site." },
  { src: home4, alt: "Completed Gandhi Statue memorial landscape at Edappally." },
  { src: home2, alt: "Official project handover ceremony with Grama Panchayat representatives." },
  { src: home3, alt: "Community gathering at Panchayat event." },
];

const INTERVAL_MS = 3500; // how long each image stays before shifting

// ─────────────────────────────────────────────────────────────────────────────

const hero = {
  label: "Panchayat-led public infrastructure and community welfare.",
  headline: "KERALA GRAMA VIKASANA SANITATION SOCIETY",
  body: "Partnering with state local self-governments to deliver vital community spaces, regional sanitation initiatives, and historical monuments that enrich public life across Kerala.",
  themes: ["Rural Sanitation", "Public Art & Monuments", "Panchayat Collaborations"],
  primaryAction: { label: "Explore Public Projects", href: "#projects" },
  secondaryAction: { label: "View Structural Gallery", href: "#gallery" },
};

const stats = [
  { id: "impact-1", value: "Statewide", label: "panchayat network" },
  { id: "impact-2", value: "CSR-Backed", label: "delivery model" },
  { id: "impact-3", value: "Community", label: "awareness projects" },
];

// ─── Single slot with crossfade ───────────────────────────────────────────────

interface SlotProps {
  img: { src: StaticImageData; alt: string };
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
}

function Slot({ img, priority = false, objectPosition = "50% 50%", sizes = "100vw" }: SlotProps) {
  // Track previous image so we can crossfade
  const [displayed, setDisplayed] = useState(img);
  const [incoming, setIncoming] = useState<typeof img | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (img.src === displayed.src) return;
    const raf = requestAnimationFrame(() => {
      setIncoming(img);
      setFading(false);
      requestAnimationFrame(() => {
        setFading(true);
      });
    });
    // After transition finishes, swap displayed and clear incoming
    const timer = setTimeout(() => {
      setDisplayed(img);
      setIncoming(null);
      setFading(false);
    }, 700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [displayed.src, img]);

  return (
    <>
      {/* Base layer — current displayed image */}
      <Image
        src={displayed.src}
        alt={displayed.alt}
        fill
        priority={priority}
        className="object-cover"
        style={{ objectPosition, zIndex: 0 }}
        sizes={sizes}
      />
      {/* Incoming layer — crossfades in */}
      {incoming && (
        <Image
          src={incoming.src}
          alt={incoming.alt}
          fill
          className="object-cover"
          style={{
            objectPosition,
            zIndex: 1,
            opacity: fading ? 1 : 0,
            transition: "opacity 650ms ease-in-out",
          }}
          sizes={sizes}
        />
      )}
    </>
  );
}

// ─── HomeHero ─────────────────────────────────────────────────────────────────

export default function HomeHero() {
  const [offset, setOffset] = useState(0);
  const n = allImages.length;

  useEffect(() => {
    const id = setInterval(() => {
      setOffset((prev) => (prev + 1) % n);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [n]);

  const slot1 = allImages[offset % n];

  return (
    <section className="page-section pt-20 sm:pt-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(255,251,245,0.92),rgba(244,234,223,0.78))] px-4 py-4 shadow-[var(--shadow-soft)] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <div className="ambient-grid opacity-40" />
        <div className="relative grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">

          {/* ── Left: text panel ── */}
          <div className="flex min-h-[22rem] flex-col justify-between rounded-[2rem] bg-[rgba(255,250,244,0.72)] p-5 sm:p-7 lg:min-h-[34rem] lg:p-8">
            <div className="space-y-5">
              <span className="section-label">{hero.label}</span>
              <h1 className="hero-title max-w-2xl text-balance text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[0.96] text-[var(--foreground)]">
                {hero.headline}
              </h1>
              <p className="max-w-lg text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
                {hero.body}
              </p>
            </div>

            <div className="space-y-5 pt-6">
              <div className="flex flex-wrap gap-3">
                {hero.themes.map((theme) => (
                  <span
                    key={theme}
                    className="rounded-full border border-[var(--line)] bg-white/76 px-3.5 py-1.5 text-sm text-[var(--foreground)]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={hero.primaryAction.href}>{hero.primaryAction.label}</ButtonLink>
                <ButtonLink href={hero.secondaryAction.href} variant="secondary">
                  {hero.secondaryAction.label}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* ── Right: media panel ── */}
          <div className="grid gap-4 lg:grid-rows-[1fr_auto]">

            {/* Slot 1 */}
            <div className="relative min-h-[22rem] overflow-hidden rounded-[1.8rem] border border-[rgba(255,255,255,0.6)] bg-[var(--accent-soft)] lg:min-h-0">
              <Slot img={slot1} priority objectPosition="60% 40%" sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(23,18,15,0.08),rgba(23,18,15,0.6))]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-5">
               
                {/* <p className="mt-2 max-w-sm text-base font-semibold tracking-[-0.03em] sm:text-xl">
                  Real implementation, public moments, and completed work in one frame.
                </p> */}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-[rgba(255,251,245,0.94)] px-4 py-4 sm:px-5 sm:py-5">
                  <p className="text-xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-2xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
