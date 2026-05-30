import type { Metadata } from "next";

import ContactSheet from "@/components/site/contact-sheet";
import ContactForm from "@/components/site/contact-form";
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
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 xl:gap-24">
          {/* Left: Text content */}
          <div className="max-w-xl space-y-5 lg:flex-1">
            <span className="section-label">Contact</span>
            <h1 className="hero-title text-balance text-[clamp(2.9rem,5.4vw,5rem)] leading-[0.98] text-[var(--foreground)]">
             Say hello. We mean it.
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)]">
              Projects, documentation, field visits, partnerships — whatever brought 
  you here, we'd love to hear it. Fill in the form and we'll be in touch soon.
            </p>
          </div>

          {/* Right: Contact form */}
          <div className="mt-10 lg:mt-0 lg:flex-1">
            <ContactForm   />
          </div>
        </div>
      </section>

      <ContactSheet settings={settings} />
    </div>
  );
}