export default function AdminPage() {
  return (
    <section className="flex flex-1 items-center">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#667085]">
          Dashboard
        </p>
        <h1 className="text-4xl font-semibold tracking-[-0.03em] text-[#15171a] sm:text-5xl">
          Welcome to KGVSS admin.
        </h1>
        <p className="text-base leading-7 text-[#667085] sm:text-lg">
          Use the sidebar to manage News & Events and Gallery content.
        </p>
      </div>
    </section>
  );
}
