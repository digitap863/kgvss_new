import {
  contactData,
  featuredProjects,
  gallery,
  homeHeroData,
  impactStats,
  siteSettings,
  storyStages,
} from "./static-data";

export async function getSiteSettings() {
  return siteSettings;
}

export async function getHomepageContent() {
  return {
    hero: homeHeroData,
    featuredProjects,
    storyStages,
    impactStats,
    gallery,
    contact: contactData,
  };
}
