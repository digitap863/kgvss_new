import Link from "next/link";

import ButtonLink from "@/components/site/button-link";
import type { ContactContent, SiteSettings } from "@/lib/cms";

type ContactSheetProps = {
  contact: ContactContent;
  settings: SiteSettings;
};

export default function ContactSheet({ contact, settings }: ContactSheetProps) {
  return (
    <section id="contact" className="page-section scroll-mt-28 pt-24 sm:pt-28">
      <div className="overflow-hidden rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(104,64,48,0.96),rgba(45,39,36,0.92))] px-6 py-8 text-white shadow-[var(--shadow-soft)] sm:px-8 sm:py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="space-y-5">
            <span className="section-label !border-white/12 !bg-white/10 !text-white/72">
              {contact.label}
            </span>
            <h2 className="hero-title max-w-3xl text-balance text-4xl leading-tight text-white sm:text-5xl">
              {contact.title}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-white/78">{contact.body}</p>

            <div className="flex flex-wrap gap-3">
              {contact.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/86"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-[2rem] border border-white/12 bg-white/8 p-5 sm:p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/58">
                Email
              </p>
              <Link
                href={`mailto:${settings.email}`}
                className="mt-2 inline-block text-2xl font-semibold tracking-[-0.04em] text-white hover:text-white/80"
              >
                {settings.email}
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/58">
                Phone
              </p>
              <Link
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="mt-2 inline-block text-2xl font-semibold tracking-[-0.04em] text-white hover:text-white/80"
              >
                {settings.phone}
              </Link>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/58">
                Location
              </p>
              <p className="mt-2 text-base leading-7 text-white/76">{settings.location}</p>
            </div>

            <div className="pt-2">
              <ButtonLink
                href={contact.primaryAction.href}
                variant="secondary"
                className="w-fit border-white/12 bg-white/10 text-white hover:bg-white/16"
              >
                {contact.primaryAction.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
