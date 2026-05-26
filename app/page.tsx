import AboutSection from "@/components/site/about-section";
import ContactSheet from "@/components/site/contact-sheet";
import GalleryGrid from "@/components/site/gallery-grid";
import HomeHero from "@/components/site/home-hero";
import ProjectShowcase from "@/components/site/project-showcase";
import { getSiteSettings } from "@/lib/data-fetch";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <div className="pb-10 sm:pb-14">
      <HomeHero />
      <AboutSection />
      <ProjectShowcase />
      <section id="gallery" className="page-section scroll-mt-28 pt-12 sm:pt-16">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="section-label">Gallery</span>
            <h2 className="hero-title text-balance text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
              Fewer explanations. More visual evidence of real work in real places.
            </h2>
          </div>
        </div>
        <GalleryGrid />
      </section>
      <ContactSheet settings={settings} />
    </div>
  );
}
