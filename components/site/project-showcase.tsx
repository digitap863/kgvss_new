import Image from "next/image";

import type { ManagedEntry, ProjectEntryContent } from "@/lib/cms";

type ProjectShowcaseProps = {
  projects: ManagedEntry<ProjectEntryContent>[];
};

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <section id="work" className="page-section scroll-mt-28 pt-24 sm:pt-28">
      <div className="space-y-7">
        {projects.map((project, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={project.id}
              className="grid gap-4 rounded-[2.4rem] border border-[var(--line)] bg-[rgba(255,250,244,0.72)] p-4 shadow-[var(--shadow-soft)] sm:p-5 lg:grid-cols-12 lg:items-end lg:p-6"
            >
              <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] bg-[var(--accent-soft)] sm:min-h-[28rem]">
                  <Image
                    src={project.data.cover.src}
                    alt={project.data.cover.alt}
                    fill
                    className={`object-cover transition-transform duration-700 hover:scale-[1.02] ${project.data.cover.className ?? ""}`}
                    sizes="(min-width: 1024px) 52rem, 100vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.03),rgba(23,18,15,0.62))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                      {project.data.category}
                    </p>
                    <p className="mt-2 max-w-lg text-base leading-7 text-white/82 sm:text-lg">
                      {project.data.impact}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`space-y-5 px-2 py-2 sm:px-3 lg:col-span-5 lg:px-5 ${reverse ? "lg:order-1" : ""}`}>
                <span className="section-label">{project.data.label}</span>
                <div className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                    {project.data.location}
                  </p>
                  <h2 className="hero-title text-balance text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">
                    {project.data.title}
                  </h2>
                  <p className="max-w-xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg">
                    {project.data.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--line)] bg-white/74 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {project.data.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-[1.35rem] border border-[var(--line)] bg-[rgba(255,255,255,0.72)] px-4 py-4 text-sm leading-6 text-[var(--foreground)]"
                    >
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
