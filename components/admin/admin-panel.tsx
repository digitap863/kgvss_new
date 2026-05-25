"use client";

export function AdminPanel({
  title,
  children,
  onSubmit,
}: {
  title: string;
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 sm:grid-cols-2"
      >
        <h2 className="text-xl font-semibold sm:col-span-2">{title}</h2>
        {children}
        <button className="rounded-md bg-[#225d38] px-4 py-2.5 text-sm font-semibold text-white sm:col-span-2">
          Save
        </button>
      </form>
    </section>
  );
}
