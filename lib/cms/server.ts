import { randomUUID } from "node:crypto";

import { getDefaultAssetReference, isCmsAssetKey, resolveAsset } from "@/lib/cms/assets";
import { defaultContentStore } from "@/lib/cms/mock-data";
import { createCmsContentRepository } from "@/lib/cms/repository";
import type {
  AchievementContentRecord,
  AdminContentPayload,
  CmsAssetKey,
  CmsAssetReference,
  ContactContent,
  ContentStore,
  GalleryEntryContentRecord,
  HeroContentRecord,
  HomepageContent,
  HomepageContentRecord,
  ImpactStatContent,
  ManagedEntry,
  ProjectEntryContentRecord,
  PublicContentPayload,
  SiteNavigationItem,
  SiteSettings,
  SiteSettingsRecord,
  StoryStageContentRecord,
} from "@/lib/cms/types";
import { getAssetCatalog } from "@/lib/cms/assets";

const cmsContentRepository = createCmsContentRepository();

function cleanString(value: unknown, fallback = "") {
  return typeof value === "string" ? value.trim() : fallback;
}

function cleanStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => cleanString(item))
    .filter(Boolean);
}

function cleanBoolean(value: unknown, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

function cleanNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeAssetReference(
  value: unknown,
  fallbackAssetId: CmsAssetKey,
): CmsAssetReference {
  const candidate = typeof value === "object" && value !== null ? value : {};
  const assetId = "assetId" in candidate && typeof candidate.assetId === "string" && isCmsAssetKey(candidate.assetId)
    ? candidate.assetId
    : fallbackAssetId;

  const fallbackReference = getDefaultAssetReference(assetId);

  return {
    assetId,
    alt: cleanString("alt" in candidate ? candidate.alt : undefined, fallbackReference.alt),
    className: cleanString("className" in candidate ? candidate.className : undefined),
  };
}

function normalizeNavigationItems(value: unknown, fallback: SiteNavigationItem[]) {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const candidate = typeof item === "object" && item !== null ? item : {};

    return {
      id: cleanString("id" in candidate ? candidate.id : undefined, `nav-${index + 1}`),
      label: cleanString("label" in candidate ? candidate.label : undefined, `Link ${index + 1}`),
      href: cleanString("href" in candidate ? candidate.href : undefined, "/"),
    };
  });
}

function normalizeManagedEntries<T>(
  value: unknown,
  fallback: ManagedEntry<T>[],
  normalizeData: (entryData: unknown, fallbackData: T) => T,
): ManagedEntry<T>[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((entry, index) => {
    const candidate = typeof entry === "object" && entry !== null ? entry : {};
    const fallbackEntry = fallback[index] ?? fallback[0];

    return {
      id: cleanString("id" in candidate ? candidate.id : undefined, randomUUID()),
      slug: cleanString("slug" in candidate ? candidate.slug : undefined, `entry-${index + 1}`),
      status:
        "status" in candidate && candidate.status === "draft"
          ? "draft"
          : "published",
      order: cleanNumber("order" in candidate ? candidate.order : undefined, index + 1),
      featured: cleanBoolean(
        "featured" in candidate ? candidate.featured : undefined,
        Boolean(fallbackEntry?.featured),
      ),
      data: normalizeData(
        "data" in candidate ? candidate.data : undefined,
        fallbackEntry?.data ?? fallback[0].data,
      ),
    };
  });
}

function normalizeProjectData(
  value: unknown,
  fallback: ProjectEntryContentRecord,
): ProjectEntryContentRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    label: cleanString("label" in candidate ? candidate.label : undefined, fallback.label),
    category: cleanString(
      "category" in candidate ? candidate.category : undefined,
      fallback.category,
    ),
    title: cleanString("title" in candidate ? candidate.title : undefined, fallback.title),
    location: cleanString(
      "location" in candidate ? candidate.location : undefined,
      fallback.location,
    ),
    summary: cleanString(
      "summary" in candidate ? candidate.summary : undefined,
      fallback.summary,
    ),
    impact: cleanString("impact" in candidate ? candidate.impact : undefined, fallback.impact),
    metrics: cleanStringArray("metrics" in candidate ? candidate.metrics : undefined),
    tags: cleanStringArray("tags" in candidate ? candidate.tags : undefined),
    cover: normalizeAssetReference(
      "cover" in candidate ? candidate.cover : undefined,
      fallback.cover.assetId,
    ),
  };
}

function normalizeStoryStageData(
  value: unknown,
  fallback: StoryStageContentRecord,
): StoryStageContentRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    label: cleanString("label" in candidate ? candidate.label : undefined, fallback.label),
    title: cleanString("title" in candidate ? candidate.title : undefined, fallback.title),
    note: cleanString("note" in candidate ? candidate.note : undefined, fallback.note),
    metric: cleanString("metric" in candidate ? candidate.metric : undefined, fallback.metric),
    image: normalizeAssetReference(
      "image" in candidate ? candidate.image : undefined,
      fallback.image.assetId,
    ),
  };
}

function normalizeImpactStatData(
  value: unknown,
  fallback: ImpactStatContent,
): ImpactStatContent {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    value: cleanString("value" in candidate ? candidate.value : undefined, fallback.value),
    label: cleanString("label" in candidate ? candidate.label : undefined, fallback.label),
    note: cleanString("note" in candidate ? candidate.note : undefined, fallback.note),
  };
}

function normalizeAchievementData(
  value: unknown,
  fallback: AchievementContentRecord,
): AchievementContentRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    label: cleanString("label" in candidate ? candidate.label : undefined, fallback.label),
    title: cleanString("title" in candidate ? candidate.title : undefined, fallback.title),
    note: cleanString("note" in candidate ? candidate.note : undefined, fallback.note),
    image: normalizeAssetReference(
      "image" in candidate ? candidate.image : undefined,
      fallback.image.assetId,
    ),
  };
}

function normalizeGalleryData(
  value: unknown,
  fallback: GalleryEntryContentRecord,
): GalleryEntryContentRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    title: cleanString("title" in candidate ? candidate.title : undefined, fallback.title),
    note: cleanString("note" in candidate ? candidate.note : undefined, fallback.note),
    image: normalizeAssetReference(
      "image" in candidate ? candidate.image : undefined,
      fallback.image.assetId,
    ),
  };
}

function normalizeContactData(value: unknown, fallback: ContactContent): ContactContent {
  const candidate = typeof value === "object" && value !== null ? value : {};
  const actionCandidate =
    "primaryAction" in candidate &&
    typeof candidate.primaryAction === "object" &&
    candidate.primaryAction !== null
      ? candidate.primaryAction
      : {};

  return {
    label: cleanString("label" in candidate ? candidate.label : undefined, fallback.label),
    title: cleanString("title" in candidate ? candidate.title : undefined, fallback.title),
    body: cleanString("body" in candidate ? candidate.body : undefined, fallback.body),
    topics: cleanStringArray("topics" in candidate ? candidate.topics : undefined),
    primaryAction: {
      label: cleanString(
        "label" in actionCandidate ? actionCandidate.label : undefined,
        fallback.primaryAction.label,
      ),
      href: cleanString(
        "href" in actionCandidate ? actionCandidate.href : undefined,
        fallback.primaryAction.href,
      ),
    },
  };
}

function normalizeHeroData(value: unknown, fallback: HeroContentRecord): HeroContentRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};
  const collageCandidate = "collage" in candidate ? candidate.collage : undefined;
  const primaryAction =
    "primaryAction" in candidate &&
    typeof candidate.primaryAction === "object" &&
    candidate.primaryAction !== null
      ? candidate.primaryAction
      : {};
  const secondaryAction =
    "secondaryAction" in candidate &&
    typeof candidate.secondaryAction === "object" &&
    candidate.secondaryAction !== null
      ? candidate.secondaryAction
      : {};

  return {
    label: cleanString("label" in candidate ? candidate.label : undefined, fallback.label),
    headline: cleanString(
      "headline" in candidate ? candidate.headline : undefined,
      fallback.headline,
    ),
    body: cleanString("body" in candidate ? candidate.body : undefined, fallback.body),
    themes: cleanStringArray("themes" in candidate ? candidate.themes : undefined),
    primaryAction: {
      label: cleanString(
        "label" in primaryAction ? primaryAction.label : undefined,
        fallback.primaryAction.label,
      ),
      href: cleanString(
        "href" in primaryAction ? primaryAction.href : undefined,
        fallback.primaryAction.href,
      ),
    },
    secondaryAction: {
      label: cleanString(
        "label" in secondaryAction ? secondaryAction.label : undefined,
        fallback.secondaryAction.label,
      ),
      href: cleanString(
        "href" in secondaryAction ? secondaryAction.href : undefined,
        fallback.secondaryAction.href,
      ),
    },
    collage: Array.isArray(collageCandidate)
      ? collageCandidate.map((assetRef, index) =>
          normalizeAssetReference(
            assetRef,
            fallback.collage[index]?.assetId ?? fallback.collage[0].assetId,
          ),
        )
      : fallback.collage,
  };
}

function normalizeSiteSettings(
  value: unknown,
  fallback: SiteSettingsRecord,
): SiteSettingsRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    siteName: cleanString(
      "siteName" in candidate ? candidate.siteName : undefined,
      fallback.siteName,
    ),
    fullName: cleanString(
      "fullName" in candidate ? candidate.fullName : undefined,
      fallback.fullName,
    ),
    description: cleanString(
      "description" in candidate ? candidate.description : undefined,
      fallback.description,
    ),
    longDescription: cleanString(
      "longDescription" in candidate ? candidate.longDescription : undefined,
      fallback.longDescription,
    ),
    location: cleanString(
      "location" in candidate ? candidate.location : undefined,
      fallback.location,
    ),
    email: cleanString("email" in candidate ? candidate.email : undefined, fallback.email),
    phone: cleanString("phone" in candidate ? candidate.phone : undefined, fallback.phone),
    logo: normalizeAssetReference(
      "logo" in candidate ? candidate.logo : undefined,
      fallback.logo.assetId,
    ),
    primaryNavigation: normalizeNavigationItems(
      "primaryNavigation" in candidate ? candidate.primaryNavigation : undefined,
      fallback.primaryNavigation,
    ),
    footerNavigation: normalizeNavigationItems(
      "footerNavigation" in candidate ? candidate.footerNavigation : undefined,
      fallback.footerNavigation,
    ),
  };
}

function normalizeHomepage(
  value: unknown,
  fallback: HomepageContentRecord,
): HomepageContentRecord {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    hero: normalizeHeroData("hero" in candidate ? candidate.hero : undefined, fallback.hero),
    projects: normalizeManagedEntries(
      "projects" in candidate ? candidate.projects : undefined,
      fallback.projects,
      normalizeProjectData,
    ),
    storyStages: normalizeManagedEntries(
      "storyStages" in candidate ? candidate.storyStages : undefined,
      fallback.storyStages,
      normalizeStoryStageData,
    ),
    impactStats: normalizeManagedEntries(
      "impactStats" in candidate ? candidate.impactStats : undefined,
      fallback.impactStats,
      normalizeImpactStatData,
    ),
    achievements: normalizeManagedEntries(
      "achievements" in candidate ? candidate.achievements : undefined,
      fallback.achievements,
      normalizeAchievementData,
    ),
    gallery: normalizeManagedEntries(
      "gallery" in candidate ? candidate.gallery : undefined,
      fallback.gallery,
      normalizeGalleryData,
    ),
    contact: normalizeContactData(
      "contact" in candidate ? candidate.contact : undefined,
      fallback.contact,
    ),
  };
}

export function normalizeContentStore(value: unknown): ContentStore {
  const candidate = typeof value === "object" && value !== null ? value : {};

  return {
    updatedAt: cleanString(
      "updatedAt" in candidate ? candidate.updatedAt : undefined,
      defaultContentStore.updatedAt,
    ),
    siteSettings: normalizeSiteSettings(
      "siteSettings" in candidate ? candidate.siteSettings : undefined,
      defaultContentStore.siteSettings,
    ),
    homepage: normalizeHomepage(
      "homepage" in candidate ? candidate.homepage : undefined,
      defaultContentStore.homepage,
    ),
  };
}

function sortPublished<T>(entries: ManagedEntry<T>[]) {
  return entries
    .filter((entry) => entry.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function resolveSiteSettings(record: SiteSettingsRecord): SiteSettings {
  return {
    ...record,
    logo: resolveAsset(record.logo),
  };
}

export function resolveHomepageContent(record: HomepageContentRecord): HomepageContent {
  return {
    hero: {
      ...record.hero,
      collage: record.hero.collage.map(resolveAsset),
    },
    featuredProjects: sortPublished(record.projects)
      .filter((entry) => entry.featured)
      .map((entry) => ({
        ...entry,
        data: {
          ...entry.data,
          cover: resolveAsset(entry.data.cover),
        },
      })),
    storyStages: sortPublished(record.storyStages).map((entry) => ({
      ...entry,
      data: {
        ...entry.data,
        image: resolveAsset(entry.data.image),
      },
    })),
    impactStats: sortPublished(record.impactStats),
    achievements: sortPublished(record.achievements).map((entry) => ({
      ...entry,
      data: {
        ...entry.data,
        image: resolveAsset(entry.data.image),
      },
    })),
    gallery: sortPublished(record.gallery).map((entry) => ({
      ...entry,
      data: {
        ...entry.data,
        image: resolveAsset(entry.data.image),
      },
    })),
    contact: record.contact,
  };
}

export async function readContentStore(): Promise<ContentStore> {
  return normalizeContentStore(await cmsContentRepository.read());
}

export async function writeContentStore(input: ContentStore): Promise<ContentStore> {
  const normalized = normalizeContentStore({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  await cmsContentRepository.write(normalized);

  return normalized;
}

export async function readPublicContentPayload(): Promise<PublicContentPayload> {
  const content = await readContentStore();

  return {
    siteSettings: resolveSiteSettings(content.siteSettings),
    homepage: resolveHomepageContent(content.homepage),
    updatedAt: content.updatedAt,
  };
}

export async function readAdminContentPayload(): Promise<AdminContentPayload> {
  const content = await readContentStore();

  return {
    content,
    assets: getAssetCatalog(),
  };
}
