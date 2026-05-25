// import type { Metadata } from "next";
// import Image from "next/image";

// import GalleryGrid from "@/components/site/gallery-grid";
// import { getHomepageContent } from "@/lib/data-fetch";

// export const metadata: Metadata = {
//   title: "Gallery",
//   description:
//     "Browse the KGVSS project gallery through real field visuals, completed works, and community activity.",
// };

// export default async function GalleryPage() {
//   const homepage = await getHomepageContent();
//   const feature = homepage.gallery[0];

//   return (
//     <div className="pb-10 sm:pb-14">
//       <section className="page-section pt-36 sm:pt-40">
//         <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
//           <div className="space-y-5">
//             <span className="section-label">Gallery</span>
//             <h1 className="hero-title max-w-2xl text-balance text-[clamp(2.9rem,5.4vw,5.1rem)] leading-[0.98] text-[var(--foreground)]">
//               A simple visual archive of real work, field presence, and completed outcomes.
//             </h1>
//             <p className="max-w-xl text-pretty text-lg leading-8 text-[var(--muted)]">
//               This page keeps the focus on imagery so the work feels immediate, easy to browse, and grounded in real places.
//             </p>
//           </div>

//           <div className="relative min-h-[18rem] overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--accent-soft)] sm:min-h-[24rem]">
//             <Image
//               src={feature.data.image.src}
//               alt={feature.data.image.alt}
//               fill
//               priority
//               className={`object-cover ${feature.data.image.className ?? ""}`}
//               sizes="(min-width: 1024px) 48rem, 100vw"
//             />
//             <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,15,0.02),rgba(23,18,15,0.45))]" />
//           </div>
//         </div>
//       </section>

//       <section className="page-section pt-16 sm:pt-20">
//         <GalleryGrid images={homepage.gallery} />
//       </section>
//     </div>
//   );
// }
