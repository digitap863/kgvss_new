import type {
  AdminContentPayload,
  ContentStore,
  PublicContentPayload,
} from "@/lib/cms/types";

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`CMS API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchPublicContent(baseUrl = "") {
  const response = await fetch(`${baseUrl}/api/cms/public`, {
    cache: "no-store",
  });

  return readJson<PublicContentPayload>(response);
}

export async function fetchAdminContent(baseUrl = "") {
  const response = await fetch(`${baseUrl}/api/cms/admin`, {
    cache: "no-store",
  });

  return readJson<AdminContentPayload>(response);
}

export async function fetchContentStore(baseUrl = "") {
  const response = await fetch(`${baseUrl}/api/cms`, {
    cache: "no-store",
  });

  return readJson<ContentStore>(response);
}

export async function updateContentStore(input: ContentStore, baseUrl = "") {
  const response = await fetch(`${baseUrl}/api/cms`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });

  return readJson<ContentStore>(response);
}
