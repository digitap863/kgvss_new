export type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  featured: boolean;
};

export type SimpleRecord = {
  id: string;
  title: string;
};

export type HomepageRecord = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  aboutSection?: string;
};

export type AdminDashboardData = {
  projects: ProjectRecord[];
  gallery: SimpleRecord[];
  achievements: SimpleRecord[];
  activities: SimpleRecord[];
  homepage: HomepageRecord;
};

export type AdminSection =
  | "projects"
  | "gallery"
  | "homepage"
  | "achievements"
  | "activities";

export const adminSections: AdminSection[] = [
  "projects",
  "gallery",
  "homepage",
  "achievements",
  "activities",
];
