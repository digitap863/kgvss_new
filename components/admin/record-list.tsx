"use client";

import type { SimpleRecord } from "@/components/admin/admin-types";

export function RecordList({
  records,
  kind,
  onDelete,
}: {
  records: SimpleRecord[];
  kind: string;
  onDelete: (kind: string, id: string) => void;
}) {
  return (
    <aside className="rounded-lg border border-black/10 bg-[#fbfcf8] p-4 sm:col-span-2">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#667267]">
        Existing
      </h3>
      <div className="grid gap-2">
        {records.length ? (
          records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between gap-3 rounded-md bg-white px-3 py-2"
            >
              <span className="text-sm font-medium">{record.title}</span>
              <button
                type="button"
                onClick={() => onDelete(kind, record.id)}
                className="rounded-md border border-black/10 px-2 py-1 text-xs font-semibold text-red-700"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#667267]">No records yet.</p>
        )}
      </div>
    </aside>
  );
}
