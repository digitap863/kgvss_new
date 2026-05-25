import type { StaticImageData } from "next/image";

export type ManagedStatus = "draft" | "published";

export type CmsAssetKey =
  | "logo"
  | "archive-1"
  | "archive-2"
  | "archive-3"
  | "archive-4"
  | "archive-5";

export type CmsAction = {
  label: string;
  href: string;
};

export type CmsAssetReference = {
  assetId: CmsAssetKey;
  alt: string;
  className?: string;
};

export type CmsImageAsset = {
  id: CmsAssetKey;
  src: StaticImageData;
  alt: string;
  className?: string;
};

export type AdminAssetOption = {
  id: CmsAssetKey;
  label: string;
  alt: string;
  previewSrc: string;
  width: number;
  height: number;
};

export type ManagedEntry<T> = {
  id: string;
  slug: string;
  status: ManagedStatus;
  order: number;
  featured?: boolean;
  data: T;
};

export type SiteNavigationItem = {
  id: string;
  label: string;
  href: string;
};

type SiteSettingsBase<TLogo> = {
  siteName: string;
  fullName: string;
  description: string;
  longDescription: string;
  location: string;
  email: string;
  phone: string;
  logo: TLogo;
  primaryNavigation: SiteNavigationItem[];
  footerNavigation: SiteNavigationItem[];
};

type HeroContentBase<TImage> = {
  label: string;
  headline: string;
  body: string;
  themes: string[];
  primaryAction: CmsAction;
  secondaryAction: CmsAction;
  collage: TImage[];
};

type ProjectEntryContentBase<TImage> = {
  label: string;
  category: string;
  title: string;
  location: string;
  summary: string;
  impact: string;
  metrics: string[];
  tags: string[];
  cover: TImage;
};

type StoryStageContentBase<TImage> = {
  label: string;
  title: string;
  note: string;
  metric: string;
  image: TImage;
};

type AchievementContentBase<TImage> = {
  label: string;
  title: string;
  note: string;
  image: TImage;
};

type GalleryEntryContentBase<TImage> = {
  title: string;
  note: string;
  image: TImage;
};

export type ImpactStatContent = {
  value: string;
  label: string;
  note: string;
};

export type ContactContent = {
  label: string;
  title: string;
  body: string;
  topics: string[];
  primaryAction: CmsAction;
};

export type SiteSettingsRecord = SiteSettingsBase<CmsAssetReference>;
export type SiteSettings = SiteSettingsBase<CmsImageAsset>;

export type HeroContentRecord = HeroContentBase<CmsAssetReference>;
export type HeroContent = HeroContentBase<CmsImageAsset>;

export type ProjectEntryContentRecord = ProjectEntryContentBase<CmsAssetReference>;
export type ProjectEntryContent = ProjectEntryContentBase<CmsImageAsset>;

export type StoryStageContentRecord = StoryStageContentBase<CmsAssetReference>;
export type StoryStageContent = StoryStageContentBase<CmsImageAsset>;

export type AchievementContentRecord = AchievementContentBase<CmsAssetReference>;
export type AchievementContent = AchievementContentBase<CmsImageAsset>;

export type GalleryEntryContentRecord = GalleryEntryContentBase<CmsAssetReference>;
export type GalleryEntryContent = GalleryEntryContentBase<CmsImageAsset>;

export type HomepageContentRecord = {
  hero: HeroContentRecord;
  projects: ManagedEntry<ProjectEntryContentRecord>[];
  storyStages: ManagedEntry<StoryStageContentRecord>[];
  impactStats: ManagedEntry<ImpactStatContent>[];
  achievements: ManagedEntry<AchievementContentRecord>[];
  gallery: ManagedEntry<GalleryEntryContentRecord>[];
  contact: ContactContent;
};

export type HomepageContent = {
  hero: HeroContent;
  featuredProjects: ManagedEntry<ProjectEntryContent>[];
  storyStages: ManagedEntry<StoryStageContent>[];
  impactStats: ManagedEntry<ImpactStatContent>[];
  achievements: ManagedEntry<AchievementContent>[];
  gallery: ManagedEntry<GalleryEntryContent>[];
  contact: ContactContent;
};

export type ContentStore = {
  updatedAt: string;
  siteSettings: SiteSettingsRecord;
  homepage: HomepageContentRecord;
};

export type PublicContentPayload = {
  siteSettings: SiteSettings;
  homepage: HomepageContent;
  updatedAt: string;
};

export type AdminContentPayload = {
  content: ContentStore;
  assets: AdminAssetOption[];
};

export interface CmsContentSource {
  getSiteSettings(): Promise<SiteSettings>;
  getHomepageContent(): Promise<HomepageContent>;
  getContentStore(): Promise<ContentStore>;
  getAdminContent(): Promise<AdminContentPayload>;
  saveContentStore(input: ContentStore): Promise<ContentStore>;
}
