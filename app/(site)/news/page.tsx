import type { Metadata } from "next";

import NewsEventsBoard from "@/components/site/news-events-board";
import { getNewsEvents } from "@/lib/data-fetch";
import { siteMeta } from "@/lib/static-data";

export const metadata: Metadata = {
  title: "News & Events",
  description: `Latest news and event updates from ${siteMeta.fullName}.`,
};

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const newsEvents = await getNewsEvents();

  return (
    <div className="pb-10 sm:pb-14">
      <section className="page-section pt-36 sm:pt-40">
        {/* <div className="mb-8 flex flex-col gap-5 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <span className="section-label">News & Events</span>
            <h1 className="hero-title text-balance text-[clamp(2.8rem,5.2vw,5rem)] leading-[0.98] text-[var(--foreground)]">
              Field updates, gatherings, and project moments in one place.
            </h1>
          </div>
          <p className="max-w-md text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
            Browse the titles first. Open any item to read the full update with its image and description.
          </p>
        </div> */}

        <NewsEventsBoard items={newsEvents} />
      </section>
    </div>
  );
}
