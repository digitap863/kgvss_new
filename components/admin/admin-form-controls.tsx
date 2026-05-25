"use client";

import { useState } from "react";

export function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-black/15 px-3 py-2 outline-none focus:border-[#225d38]"
      />
    </label>
  );
}

export function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm font-medium sm:col-span-2">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 min-h-28 w-full rounded-md border border-black/15 px-3 py-2 outline-none focus:border-[#225d38]"
      />
    </label>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <input
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      {label}
    </label>
  );
}

export function ImageUploadField({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [pending, setPending] = useState(false);

  async function upload(file: File) {
    setPending(true);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    const body = await response.json();
    setPending(false);

    if (body.success) {
      onUploaded(body.data.url);
    }
  }

  return (
    <label className="block text-sm font-medium">
      Upload image
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) upload(file).catch(() => setPending(false));
        }}
        className="mt-2 w-full rounded-md border border-black/15 px-3 py-2 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-[#225d38] file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
      />
      {pending ? (
        <span className="mt-2 block text-xs text-[#667267]">Uploading...</span>
      ) : null}
    </label>
  );
}
