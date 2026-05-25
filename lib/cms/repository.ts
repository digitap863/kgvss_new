import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultContentStore } from "@/lib/cms/mock-data";
import type { ContentStore } from "@/lib/cms/types";

const CMS_DATA_DIRECTORY = path.join(process.cwd(), "data");
const CMS_DATA_PATH = path.join(CMS_DATA_DIRECTORY, "cms-content.json");

const MONGODB_CMS_COLLECTION = process.env.MONGODB_CMS_COLLECTION ?? "cms_content";
const MONGODB_CMS_DOCUMENT_ID = process.env.MONGODB_CMS_DOCUMENT_ID ?? "site-content";

type MongoDataApiConfig = {
  url: string;
  apiKey: string;
  dataSource: string;
  database: string;
  collection: string;
};

function getMongoDataApiConfig(): MongoDataApiConfig | null {
  const url = process.env.MONGODB_DATA_API_URL;
  const apiKey = process.env.MONGODB_DATA_API_KEY;
  const dataSource = process.env.MONGODB_DATA_SOURCE;
  const database = process.env.MONGODB_DATABASE;

  if (!url || !apiKey || !dataSource || !database) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    apiKey,
    dataSource,
    database,
    collection: MONGODB_CMS_COLLECTION,
  };
}

async function ensureLocalContentStoreFile() {
  await mkdir(CMS_DATA_DIRECTORY, { recursive: true });

  try {
    await readFile(CMS_DATA_PATH, "utf8");
  } catch {
    await writeFile(
      CMS_DATA_PATH,
      JSON.stringify(defaultContentStore, null, 2),
      "utf8",
    );
  }
}

async function postMongoAction<TResponse>(
  config: MongoDataApiConfig,
  action: "findOne" | "replaceOne",
  body: Record<string, unknown>,
): Promise<TResponse> {
  const response = await fetch(`${config.url}/action/${action}`, {
    method: "POST",
    headers: {
      "api-key": config.apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      dataSource: config.dataSource,
      database: config.database,
      collection: config.collection,
      ...body,
    }),
  });

  if (!response.ok) {
    throw new Error(`MongoDB Data API ${action} failed with ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

function stripMongoId(document: unknown): unknown {
  if (!document || typeof document !== "object") {
    return document;
  }

  const { _id, ...content } = document as Record<string, unknown>;
  void _id;

  return content;
}

export interface CmsContentRepository {
  read(): Promise<unknown>;
  write(input: ContentStore): Promise<unknown>;
}

class LocalJsonCmsContentRepository implements CmsContentRepository {
  async read() {
    await ensureLocalContentStoreFile();
    const raw = await readFile(CMS_DATA_PATH, "utf8");

    return JSON.parse(raw) as unknown;
  }

  async write(input: ContentStore) {
    await ensureLocalContentStoreFile();
    await writeFile(CMS_DATA_PATH, JSON.stringify(input, null, 2), "utf8");

    return input;
  }
}

class MongoDataApiCmsContentRepository implements CmsContentRepository {
  constructor(private readonly config: MongoDataApiConfig) {}

  async read() {
    const response = await postMongoAction<{ document?: unknown }>(
      this.config,
      "findOne",
      {
        filter: { _id: MONGODB_CMS_DOCUMENT_ID },
      },
    );

    return stripMongoId(response.document) ?? defaultContentStore;
  }

  async write(input: ContentStore) {
    await postMongoAction(
      this.config,
      "replaceOne",
      {
        filter: { _id: MONGODB_CMS_DOCUMENT_ID },
        replacement: {
          _id: MONGODB_CMS_DOCUMENT_ID,
          ...input,
        },
        upsert: true,
      },
    );

    return input;
  }
}

export function createCmsContentRepository(): CmsContentRepository {
  const mongoConfig = getMongoDataApiConfig();

  if (mongoConfig) {
    return new MongoDataApiCmsContentRepository(mongoConfig);
  }

  return new LocalJsonCmsContentRepository();
}
