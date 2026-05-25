import { defaultContentStore } from "@/lib/cms/mock-data";
import {
  readAdminContentPayload,
  readContentStore,
  readPublicContentPayload,
  writeContentStore,
} from "@/lib/cms/server";
import type {
  CmsContentSource,
  ContentStore,
} from "@/lib/cms/types";

class ApiCmsContentSource implements CmsContentSource {
  async getSiteSettings() {
    const payload = await readPublicContentPayload();

    return payload.siteSettings;
  }

  async getHomepageContent() {
    const payload = await readPublicContentPayload();

    return payload.homepage;
  }

  async getContentStore() {
    return readContentStore();
  }

  async getAdminContent() {
    return readAdminContentPayload();
  }

  async saveContentStore(input: ContentStore) {
    return writeContentStore(input);
  }
}

const cmsSource = new ApiCmsContentSource();

export const siteMeta = {
  name: defaultContentStore.siteSettings.siteName,
  fullName: defaultContentStore.siteSettings.fullName,
  description: defaultContentStore.siteSettings.description,
  longDescription: defaultContentStore.siteSettings.longDescription,
  location: defaultContentStore.siteSettings.location,
  email: defaultContentStore.siteSettings.email,
  phone: defaultContentStore.siteSettings.phone,
};

export const siteSettings = defaultContentStore.siteSettings;
export * from "@/lib/cms/api-client";
export type * from "@/lib/cms/types";

export async function getSiteSettings() {
  return cmsSource.getSiteSettings();
}

export async function getHomepageContent() {
  return cmsSource.getHomepageContent();
}

export async function getContentStore() {
  return cmsSource.getContentStore();
}

export async function getAdminContent() {
  return cmsSource.getAdminContent();
}

export async function saveContentStore(input: ContentStore) {
  return cmsSource.saveContentStore(input);
}
