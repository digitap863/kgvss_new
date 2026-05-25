"use client";

import { useCallback, useState } from "react";

type ApiResponse<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: { message: string; details?: unknown } };

async function requestJson<T>(url: string, init?: RequestInit) {
  const response = await fetch(url, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
  const body = (await response.json()) as ApiResponse<T>;

  if (!body.success) {
    throw new Error(body.error.message);
  }

  return body.data;
}

export function useAdminApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const run = useCallback(async <T,>(operation: () => Promise<T>) => {
    setLoading(true);
    setError("");

    try {
      return await operation();
    } catch (caught) {
      const message =
        caught instanceof Error ? caught.message : "Request failed.";
      setError(message);
      throw caught;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    get: <T,>(url: string) => run(() => requestJson<T>(url)),
    post: <T,>(url: string, body: unknown) =>
      run(() =>
        requestJson<T>(url, { method: "POST", body: JSON.stringify(body) }),
      ),
    patch: <T,>(url: string, body: unknown) =>
      run(() =>
        requestJson<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
      ),
    put: <T,>(url: string, body: unknown) =>
      run(() =>
        requestJson<T>(url, { method: "PUT", body: JSON.stringify(body) }),
      ),
    delete: <T,>(url: string) =>
      run(() => requestJson<T>(url, { method: "DELETE" })),
  };
}
