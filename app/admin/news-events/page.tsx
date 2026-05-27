import { NewsEventForm } from "@/components/admin/news-event-form";

export default function AdminNewsEventsPage() {
  return (
    <section className="max-w-4xl space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#667085]">
          News & Events
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#15171a] sm:text-4xl">
          Add news or event
        </h1>
      </div>

      <NewsEventForm />
    </section>
  );
}
