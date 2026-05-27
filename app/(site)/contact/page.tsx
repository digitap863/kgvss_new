import type { Metadata } from "next";

import ContactSheet from "@/components/site/contact-sheet";
import { getSiteSettings } from "@/lib/data-fetch";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact KGVSS for project conversations, documentation requests, field visits, and future collaboration.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="pb-10 sm:pb-14">
      <section className="page-section pt-36 sm:pt-40">
        <div className="max-w-3xl space-y-5">
          <span className="section-label">Contact</span>
          <h1 className="hero-title text-balance text-[clamp(2.9rem,5.4vw,5rem)] leading-[0.98] text-[var(--foreground)]">
            Reach out without digging through a complex website.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)]">
            If you want to talk about a project, ask for documentation, or plan a visit, this page keeps the next step direct and clear.
          </p>
        </div>
      </section>

      <ContactSheet settings={settings} />
    </div>
  );
}
