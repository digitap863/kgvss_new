import Image from "next/image";

import type { ManagedEntry, ProjectEntryContent } from "@/lib/types";

import ruralSanitation from "@/assets/projects/ruralSanitation.jpg";
import wasteManagement from "@/assets/projects/wasteManagement.webp";
import waterConservation from "@/assets/projects/waterconservation.png";
import  livelihood from "@/assets/projects/livelihood.jpg";

const projects: ManagedEntry<ProjectEntryContent>[] = [
  {
    id: "activity-1",
    slug: "toilet-construction",
    order: 1,
    data: {
      label: "Activity",
      category: "Sanitation",
      title: "Toilet Construction",
      location: "Rural Areas",
      summary:
        "Construct toilets and promote proper sanitation practices in rural areas.",
      impact:
        "Improving public health and hygiene standards in communities.",
      metrics: [
        "Infrastructure development",
        "Community health",
        "Sanitation practices",
      ],
      tags: ["Sanitation", "Health", "Infrastructure"],
      cover: {
        src: ruralSanitation,
        alt: "Toilet construction and sanitation in rural areas.",
        className: "object-[68%_48%]",
      },
    },
  },
  {
    id: "activity-2",
    slug: "waste-management",
    order: 2,
    data: {
      label: "Activity",
      category: "Environment",
      title: "Waste Management",
      location: "Community Level",
      summary:
        "Implement waste management systems, including composting and recycling.",
      impact:
        "Creating cleaner and more sustainable living environments.",
      metrics: [
        "Composting systems",
        "Recycling promotion",
        "Waste reduction",
      ],
      tags: ["Waste Management", "Recycling", "Sustainability"],
      cover: {
        src: wasteManagement,
        alt: "Waste management and recycling implementation.",
        className: "object-[78%_44%]",
      },
    },
  },
  {
    id: "activity-3",
    slug: "water-conservation",
    order: 3,
    data: {
      label: "Activity",
      category: "Water Conservation",
      title: "Water Conservation",
      location: "Shared Local Environments",
      summary:
        "Promote water conservation practices, including rainwater harvesting.",
      impact:
        "Ensuring long-term water security and sustainable resource usage.",
      metrics: [
        "Rainwater harvesting",
        "Resource conservation",
        "Water security",
      ],
      tags: ["Water", "Conservation", "Harvesting"],
      cover: {
        src: waterConservation,
        alt: "Water conservation and rainwater harvesting practices.",
        className: "object-[72%_42%]",
      },
    },
  },
  {
    id: "activity-4",
    slug: "livelihood-promotion",
    order: 4,
    data: {
      label: "Activity",
      category: "Livelihood",
      title: "Livelihood Promotion",
      location: "Local Communities",
      summary:
        "Support livelihood promotion activities, including agriculture, animal husbandry, and handicrafts.",
      impact:
        "Empowering individuals and strengthening local economies.",
      metrics: [
        "Agricultural support",
        "Animal husbandry",
        "Handicrafts promotion",
      ],
      tags: ["Agriculture", "Empowerment", "Handicrafts"],
      cover: {
        src: livelihood,
        alt: "Livelihood promotion through agriculture and handicrafts.",
        className: "object-[72%_42%]",
      },
    },
  },
];

export default function ProjectShowcase() {
  return (
    <section id="work" className="page-section scroll-mt-28 pt-12 sm:pt-16">
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
