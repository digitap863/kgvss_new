import type { StaticImageData } from "next/image";

export type ActionLink = {
  label: string;
  href: string;
};

export type ImageAsset = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
};

export type SiteNavigationItem = {
  id: string;
  label: string;
  href: string;
};

export type SiteSettings = {
  siteName: string;
  fullName: string;
  description: string;
  longDescription: string;
  location: string;
  email: string;
  phone: string;
  logo: ImageAsset;
  primaryNavigation: SiteNavigationItem[];
  footerNavigation: SiteNavigationItem[];
};

export type HeroContent = {
  label: string;
  headline: string;
  body: string;
  themes: string[];
  primaryAction: ActionLink;
  secondaryAction: ActionLink;
  collage: ImageAsset[];
};

export type ContactContent = {
  label: string;
  title: string;
  body: string;
  topics: string[];
  primaryAction: ActionLink;
};

export type ImpactStatContent = {
  value: string;
  label: string;
  note: string;
};

export type ProjectEntryContent = {
  label: string;
  category: string;
  title: string;
  location: string;
  summary: string;
  impact: string;
  metrics: string[];
  tags: string[];
  cover: ImageAsset;
};

export type StoryStageContent = {
  label: string;
  title: string;
  note: string;
  metric: string;
  image: ImageAsset;
};

export type AchievementContent = {
  label: string;
  title: string;
  note: string;
  image: ImageAsset;
};

export type GalleryEntryContent = {
  title: string;
  note: string;
  image: ImageAsset;
};

export type ManagedEntry<T> = {
  id: string;
  slug: string;
  order: number;
  featured?: boolean;
  data: T;
};
