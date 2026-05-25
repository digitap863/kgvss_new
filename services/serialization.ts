export function serializeDocument<T>(document: T) {
  if (!document) {
    return document;
  }

  if (
    typeof document === "object" &&
    "toObject" in document &&
    typeof document.toObject === "function"
  ) {
    const object = document.toObject({
      versionKey: false,
      flattenObjectIds: true,
    }) as Record<string, unknown>;

    object.id = String(object._id);
    delete object._id;

    return object;
  }

  return document;
}

export function serializeDocuments<T>(documents: T[]) {
  return documents.map((document) => serializeDocument(document));
}
