// import type { Metadata } from "next";
// import Image from "next/image";

// import { getHomepageContent, getSiteSettings } from "@/lib/data-fetch";

// export const metadata: Metadata = {
//   title: "About",
//   description:
//     "Learn how KGVSS approaches sanitation, water conservation, and field implementation work across Kerala.",
// };

// export default async function AboutPage() {
//   const homepage = await getHomepageContent();
//   const settings = await getSiteSettings();
//   const leadProject = homepage.featuredProjects[0];

//   return (
//     <div className="pb-10 sm:pb-14">
//       <section className="page-section pt-36 sm:pt-40">
//         <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
//           <div className="space-y-5">
//             <span className="section-label">About</span>
//             <h1 className="hero-title max-w-2xl text-balance text-[clamp(2.9rem,5.4vw,5.1rem)] leading-[0.98] text-[var(--foreground)]">
//               KGVSS focuses on work people can clearly see, use, and understand.
//             </h1>
//             <p className="max-w-xl text-pretty text-lg leading-8 text-[var(--muted)]">
//               {settings.longDescription}
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="rounded-[1.7rem] border border-[var(--line)] bg-[rgba(255,251,245,0.8)] p-5 sm:p-6">
//               <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
//                 Focus
//               </p>
//               <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">
//                 Rural sanitation, water conservation, field reviews, and completed community-facing work.
//               </p>
//             </div>
//             <div className="rounded-[1.7rem] border border-[var(--line)] bg-[rgba(255,251,245,0.8)] p-5 sm:p-6">
//               <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
//                 Approach
//               </p>
//               <p className="mt-3 text-lg leading-8 text-[var(--foreground)]">
//                 Stay close to the site, document real progress, and keep outcomes useful after completion.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="page-section pt-16 sm:pt-20">
//         <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
//           <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--accent-soft)] sm:min-h-[28rem]">
//             <Image
//               src={leadProject.data.cover.src}
//               alt={leadProject.data.cover.alt}
//               fill
//               priority
//               className={`object-cover ${leadProject.data.cover.className ?? ""}`}
//               sizes="(min-width: 1024px) 52rem, 100vw"
//             />
//             <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.04),rgba(23,18,15,0.6))]" />
//             <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
//               <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/68">
//                 Featured work
//               </p>
//               <p className="mt-2 max-w-lg text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
//                 {leadProject.data.title}
//               </p>
//             </div>
//           </div>

//           <div className="grid gap-4">
//             {homepage.storyStages.map((stage) => (
//               <article
//                 key={stage.id}
//                 className="rounded-[1.7rem] border border-[var(--line)] bg-[rgba(255,251,245,0.8)] p-5 sm:p-6"
//               >
//                 <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
//                   {stage.data.label}
//                 </p>
//                 <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
//                   {stage.data.title}
//                 </h2>
//                 <p className="mt-3 text-base leading-7 text-[var(--muted)]">
//                   {stage.data.note}
//                 </p>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="page-section pt-16 sm:pt-20">
//         <div className="grid gap-px overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[var(--line)] md:grid-cols-3">
//           {homepage.impactStats.map((stat) => (
//             <div key={stat.id} className="bg-[rgba(255,251,245,0.9)] p-6 sm:p-7">
//               <p className="text-3xl font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-4xl">
//                 {stat.data.value}
//               </p>
//               <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
//                 {stat.data.label}
//               </p>
//               <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{stat.data.note}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }
