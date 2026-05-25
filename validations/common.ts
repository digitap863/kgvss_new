import { ApiError } from "@/lib/api/errors";

export type ValidationResult<T> = {
  data: T;
};

export function assertObject(value: unknown, label = "Payload") {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new ApiError(`${label} must be an object.`, 400);
  }

  return value as Record<string, unknown>;
}

export function readString(
  object: Record<string, unknown>,
  key: string,
  options: { required?: boolean; fallback?: string } = {},
) {
  const value = object[key];

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  if (options.required) {
    throw new ApiError(`${key} is required.`, 400);
  }

  return options.fallback ?? "";
}

export function readBoolean(
  object: Record<string, unknown>,
  key: string,
  fallback = false,
) {
  return typeof object[key] === "boolean" ? object[key] : fallback;
}

export function readNumber(
  object: Record<string, unknown>,
  key: string,
): number | undefined {
  const value = object[key];

  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return undefined;
}

export function readStringArray(object: Record<string, unknown>, key: string) {
  const value = object[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string").map(
    (item) => item.trim(),
  );
}

export function readDate(
  object: Record<string, unknown>,
  key: string,
): Date | undefined {
  const value = object[key];

  if (!value) {
    return undefined;
  }

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    throw new ApiError(`${key} must be a valid date.`, 400);
  }

  return date;
}

export function readStatus(object: Record<string, unknown>, key = "status") {
  const value = object[key];

  return value === "draft" ? "draft" : "published";
}
