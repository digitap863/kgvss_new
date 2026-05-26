"use client";

import Image from "next/image";
import statue2 from "@/assets/projects/statue2.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="page-section scroll-mt-28 pt-12 sm:pt-16">
      <div className="space-y-6">
        
        {/* ── Section Label ── */}
        <div className="px-1">
          <span className="section-label">About Us</span>
        </div>

        {/* ── Flagship Unified Split Card ── */}
        <article className="grid gap-0 overflow-hidden rounded-[2.2rem] border border-[var(--line)] shadow-[var(--shadow-soft)] lg:grid-cols-2 bg-[rgba(255,250,244,0.94)]">
          
          {/* Left Column: Image side */}
          <div className="relative min-h-[24rem] overflow-hidden lg:min-h-[38rem]">
            <Image
              src={statue2}
              alt="Master craftsmen at the society's studio network"
              fill
              className="object-cover"
              style={{ objectPosition: "50% 40%" }}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
            />
            {/* Overlay matching the home page image slots */}
            <div className="absolute inset-0 z-10 bg-[linear-gradient(160deg,rgba(23,18,15,0.18),rgba(23,18,15,0.0))]" />
            
            {/* Image caption badge */}
            <div className="absolute bottom-6 left-6 z-20 max-w-sm text-white space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                Grounded Civic Impact
              </p>
              <p className="text-sm font-medium leading-relaxed text-white/90">
                Partnering with Local Self Government Institutions across Kerala to implement vital community infrastructure projects.
              </p>
            </div>
          </div>

          {/* Right Column: Exact official copy text */}
          <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 lg:p-12">
            
            {/* Main Header & Copy Block */}
            <div className="space-y-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                Established 2000
              </span>
              <h2 className="text-[clamp(1.8rem,3.5vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--foreground)] font-sans">
                Kerala Rural Development<br />Sanitation Society No: 383
              </h2>

              {/* Founder Dedication Accent Row */}
              <div className="flex items-center gap-3 border-l-2 border-[var(--accent)] pl-4 py-1 bg-[var(--accent-soft)] rounded-r-xl">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-strong)]">
                    Founder
                  </p>
                  <p className="text-sm font-semibold text-[var(--foreground)] font-sans">
                    Mr. K. Raveendranath (Late)
                  </p>
                </div>
              </div>
              
              {/* Core Description (using exact provided copy) */}
              <div className="space-y-4 pt-1 text-sm sm:text-base leading-relaxed font-sans">
                <p className="text-[var(--foreground)] font-medium">
                  Kerala Rural Development Sanitation Society No: 383 is an organization established in the year 2000 and is headquartered in Vazhakode, Mullurkara Panchayat, Thrissur District. The main activities of the Society are construction of latrines for the needy, construction of rainwater tanks, well rings and drainages.
                </p>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  The Society has been instrumental in conducting awareness campaigns across the state as part of the ODF project for the State Sanitation Mission. We have been key in the state government&apos;s projects &apos;Aa Swas Public Toilet&apos;, &apos;Malina Mukta Nadu&apos; implemented by the Malappuram Municipality and Mass Action For Plastic Waste Free Campaign (MAP) implemented by the Kozhikode District Administration. 
                </p>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Furthermore, the society was instrumental in working with famous magician Gopinath Muthukad in creating the &apos;Magic Planet&apos; museum at Kinfrapark. KGVSS is currently carrying out such activities in various Local Self Government Institutions in Kerala.
                </p>
              </div>
            </div>

            {/* Flat, Cardless Highlights Summary Grid */}
            <div className="grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
              
              {/* Highlight 1: Core Activities */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-strong)] font-sans flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Core Activities
                </h3>
                <p className="text-xs leading-relaxed text-[var(--muted)] font-sans">
                  Construction of latrines for the needy, rainwater tanks, well rings, and municipal drainages.
                </p>
              </div>

              {/* Highlight 2: State Initiatives */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-strong)] font-sans flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  Key Campaigns
                </h3>
                <p className="text-xs leading-relaxed text-[var(--muted)] font-sans">
                  ODF State campaigns, Aa Swas, Malina Mukta Nadu, MAP waste-free drives, and Magic Planet museum.
                </p>
              </div>

            </div>

          </div>

        </article>
      </div>
    </section>
  );
}
