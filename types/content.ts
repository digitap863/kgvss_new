export type PublishStatus = "draft" | "published";

export type GalleryItemInput = {
  title: string;
  imageUrl: string;
  alt: string;
  caption?: string;
  category?: string;
  featured?: boolean;
};

export type AchievementInput = {
  title: string;
  description: string;
  year?: number;
  imageUrl?: string;
  order?: number;
  status?: PublishStatus;
};

export type ActivityInput = {
  title: string;
  slug: string;
  summary: string;
  description?: string;
  date?: string | Date;
  images?: string[];
  location?: string;
  status?: PublishStatus;
};

export type HomepageContentInput = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  aboutSection?: string;
  featuredProjectIds?: string[];
  impactHighlights?: {
    label: string;
    value: string;
  }[];
};
