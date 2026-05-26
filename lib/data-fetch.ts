import {
  contactData,
  featuredProjects,
  homeHeroData,
  siteSettings,
} from "./static-data";

export async function getSiteSettings() {
  return siteSettings;
}

export async function getHomepageContent() {
  return {
    hero: homeHeroData,
    featuredProjects,
    contact: contactData,
  };
}
