import ContactSheet from "@/components/site/contact-sheet";
import GalleryGrid from "@/components/site/gallery-grid";
import HomeHero from "@/components/site/home-hero";
import ImpactStory from "@/components/site/impact-story";
import ProjectShowcase from "@/components/site/project-showcase";
import { getHomepageContent, getSiteSettings } from "@/lib/cms";

export default async function Home() {
  const homepage = await getHomepageContent();
  const settings = await getSiteSettings();

  return (
    <div className="pb-10 sm:pb-14">
      <HomeHero hero={homepage.hero} stats={homepage.impactStats} />
      <ProjectShowcase projects={homepage.featuredProjects} />
      <ImpactStory
        stages={homepage.storyStages}
        stats={homepage.impactStats}
        achievements={homepage.achievements}
      />
      <section id="gallery" className="page-section scroll-mt-28 pt-24 sm:pt-28">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <span className="section-label">Gallery</span>
            <h2 className="hero-title text-balance text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
              Fewer explanations. More visual evidence of real work in real places.
            </h2>
          </div>
          <p className="max-w-lg text-base leading-8 text-[var(--muted)]">
            The gallery stays lightweight and open-ended so the archive can grow easily as
            future admin-managed project records are added.
          </p>
        </div>
        <GalleryGrid images={homepage.gallery} />
      </section>
      <ContactSheet contact={homepage.contact} settings={settings} />
    </div>
  );
}
