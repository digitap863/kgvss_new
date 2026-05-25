import Image from "next/image";

import type {
  AchievementContent,
  ImpactStatContent,
  ManagedEntry,
  StoryStageContent,
} from "@/lib/cms";

type ImpactStoryProps = {
  stages: ManagedEntry<StoryStageContent>[];
  stats: ManagedEntry<ImpactStatContent>[];
  achievements: ManagedEntry<AchievementContent>[];
};

export default function ImpactStory({
  stages,
  stats,
  achievements,
}: ImpactStoryProps) {
  return (
    <section id="impact" className="page-section scroll-mt-28 pt-24 sm:pt-28">
      <div className="space-y-5">
        <div className="grid gap-5 lg:grid-cols-3">
          {stages.map((stage) => (
            <article
              key={stage.id}
              className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--accent-soft)] shadow-[var(--shadow-soft)]"
            >
              <Image
                src={stage.data.image.src}
                alt={stage.data.image.alt}
                fill
                className={`object-cover ${stage.data.image.className ?? ""}`}
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.08),rgba(23,18,15,0.72))]" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/66">
                  {stage.data.label}
                </p>
                <h2 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  {stage.data.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/78 sm:text-base">
                  {stage.data.note}
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                  {stage.data.metric}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-[rgba(255,250,244,0.92)] p-6 sm:p-7">
                <p className="text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
                  {stat.data.value}
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                  {stat.data.label}
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{stat.data.note}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {achievements.map((achievement) => (
              <article
                key={achievement.id}
                className="relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--accent-soft)]"
              >
                <Image
                  src={achievement.data.image.src}
                  alt={achievement.data.image.alt}
                  fill
                  className={`object-cover ${achievement.data.image.className ?? ""}`}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.03),rgba(23,18,15,0.72))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">
                    {achievement.data.label}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                    {achievement.data.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/78 sm:text-base">
                    {achievement.data.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
