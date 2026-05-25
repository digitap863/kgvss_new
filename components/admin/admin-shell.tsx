"use client";

import type { AdminSection } from "@/components/admin/admin-types";
import { adminSections } from "@/components/admin/admin-types";

export function AdminHeader({
  adminEmail,
  onLogout,
}: {
  adminEmail: string;
  onLogout: () => void;
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#667267]">
          KGVSS Admin
        </p>
        <h1 className="mt-1 text-3xl font-semibold">Content dashboard</h1>
        <p className="mt-2 text-sm text-[#667267]">{adminEmail}</p>
      </div>
      <button
        onClick={onLogout}
        className="w-fit rounded-md border border-black/15 px-4 py-2 text-sm font-semibold"
      >
        Logout
      </button>
    </header>
  );
}

export function AdminStats({
  stats,
}: {
  stats: { label: string; value: number }[];
}) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-black/10 bg-white p-4"
        >
          <p className="text-sm text-[#667267]">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}

export function AdminTabs({
  active,
  onChange,
}: {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
}) {
  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-black/10 pb-2">
      {adminSections.map((section) => (
        <button
          key={section}
          onClick={() => onChange(section)}
          className={`rounded-md px-3 py-2 text-sm font-semibold capitalize ${
            active === section ? "bg-[#225d38] text-white" : "bg-white"
          }`}
        >
          {section}
        </button>
      ))}
    </nav>
  );
}

export function AdminError({ message }: { message: string }) {
  if (!message) {
    return null;
  }

  return (
    <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </p>
  );
}
