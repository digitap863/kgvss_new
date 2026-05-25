import Image from "next/image";

import ButtonLink from "@/components/site/button-link";
import type { HeroContent, ManagedEntry, ImpactStatContent } from "@/lib/types";

import home1 from "@/assets/home/home1.jpg";
import home2 from "@/assets/home/home2.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";

const hero = {
  label: "Panchayat-led public infrastructure and community welfare.",
  headline: "KERALA GRAMA VIKASANA SANITATION SOCIETY",
  body: "Partnering with state local self-governments to deliver vital community spaces, regional sanitation initiatives, and historical monuments that enrich public life across Kerala.",
  themes: ["Rural Sanitation", "Public Art & Monuments", "Panchayat Collaborations"],
  primaryAction: {
    label: "Explore Public Projects",
    href: "#projects",
  },
  secondaryAction: {
    label: "View Structural Gallery",
    href: "#gallery",
  },
  collage: [
    {
      src: home1,
      alt: "Public awareness installation and community mural project site.",
      className: "object-[60%_40%]",
    },
    {
      src: home4,
      alt: "Completed Gandhi Statue memorial landscape at Edappally.",
      className: "object-[40%_60%]",
    },
    {
      src: home2,
      alt: "Official project handover ceremony with Grama Panchayat representatives.",
      className: "object-[50%_50%]",
    },
  ],
};


const stats = [
  {
    id: "impact-1",
    data: {
      value: "Statewide",
      label: "panchayat network",
      note: "Collaborating with local self-government institutions across several districts of Kerala to execute public work tenders.",
    },
  },
  {
    id: "impact-2",
    data: {
      value: "CSR-Backed",
      label: "delivery model",
      note: "Successfully managing large-scale cultural and civic projects funded by major corporate entities like Cochin Shipyard.",
    },
  },
  {
    id: "impact-3",
    data: {
      value: "Community",
      label: "awareness projects",
      note: "Integrating public sanitation awareness with local artistry, including prison-wall social murals and public square upgrades.",
    },
  },
];


export default function HomeHero() {
  return (
    <section className="page-section pt-20 sm:pt-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[var(--line)] bg-[linear-gradient(160deg,rgba(255,251,245,0.92),rgba(244,234,223,0.78))] px-4 py-4 shadow-[var(--shadow-soft)] sm:px-6 sm:py-6 lg:px-7 lg:py-7">
        <div className="ambient-grid opacity-40" />
        <div className="relative grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
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

          <div className="grid gap-4 lg:grid-cols-[0.94fr_1.06fr] lg:grid-rows-[15rem_8rem_8rem]">
            <div className="relative min-h-[16rem] overflow-hidden rounded-[1.8rem] border border-[rgba(255,255,255,0.6)] bg-[var(--accent-soft)] lg:row-span-3">
              <Image
                src={hero.collage[0].src}
                alt={hero.collage[0].alt}
                fill
                priority
                className={`object-cover ${hero.collage[0].className ?? ""}`}
                sizes="(min-width: 1024px) 34rem, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.08),rgba(23,18,15,0.6))]" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">
                  Main visual
                </p>
                <p className="mt-2 max-w-sm text-base font-semibold tracking-[-0.03em] sm:text-xl">
                  Real implementation, public moments, and completed work in one frame.
                </p>
              </div>
            </div>

            <div className="relative min-h-[9rem] overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.6)] bg-[var(--accent-soft)]">
              <Image
                src={hero.collage[1].src}
                alt={hero.collage[1].alt}
                fill
                className={`object-cover ${hero.collage[1].className ?? ""}`}
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.02),rgba(23,18,15,0.35))]" />
            </div>

            <div className="relative min-h-[9rem] overflow-hidden rounded-[1.5rem] border border-[rgba(255,255,255,0.6)] bg-[var(--accent-soft)]">
              <Image
                src={hero.collage[2].src}
                alt={hero.collage[2].alt}
                fill
                className={`object-cover ${hero.collage[2].className ?? ""}`}
                sizes="(min-width: 1024px) 22rem, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.02),rgba(23,18,15,0.35))]" />
            </div>

            <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:col-span-2">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-[rgba(255,251,245,0.94)] px-4 py-4 sm:px-5 sm:py-5"
                >
                  <p className="text-xl font-semibold tracking-[-0.05em] text-[var(--foreground)] sm:text-2xl">
                    {stat.data.value}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                    {stat.data.label}
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
