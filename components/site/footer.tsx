import Link from "next/link";

import ButtonLink from "@/components/site/button-link";
import type { SiteSettings } from "@/lib/types";

type SiteFooterProps = {
  settings: SiteSettings;
};

const footerContact = {
  registration: "Society No: 383/96/TCR/KERALA",
  summary:
    "Kerala Grama Vikasana Sanitation Society works with Local Self Government Institutions across Kerala on sanitation, public infrastructure, civic installations, awareness campaigns, and community welfare projects.",
  topics: [
    "Panchayat Infrastructure",
    "Public Memorials",
    "Rural Sanitation",
    "CSR Partnerships",
  ],
  emails: ["info@keralagvssociety.com", "secretarykgvss@gmail.com"],
  phones: [
    "+91 90373 57215",
  ],
  offices: [
    {
      title: "Central Region Office",
      lines: [
        "Raj Bhavan Palace, Temple West Gate,",
        "Near Kalikotta Palace, Thiripunithura,",
        "Ernakulam, Kerala, Pin : 682301",
      ],
    },
  ],
};

export default function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[linear-gradient(180deg,rgba(250,245,239,0.72),rgba(235,226,216,0.72))]">
      <div className="mx-auto max-w-[var(--container-width)] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-5">
            <span className="section-label">{settings.siteName}</span>
            <h2 className="hero-title max-w-2xl text-balance text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">
              {settings.fullName}
            </h2>
            <p className="max-w-xl text-base leading-8 text-[var(--muted)]">
              {footerContact.summary}
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
              {footerContact.registration}
            </p>
            <div className="flex flex-wrap gap-2">
              {footerContact.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-[var(--line)] bg-white/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]"
                >
                  {topic}
                </span>
              ))}
            </div>
            <ButtonLink href="/contact" variant="secondary">
              Reach out directly
            </ButtonLink>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted-soft)]">
                Explore
              </p>
              <ul className="mt-4 space-y-3">
                {settings.footerNavigation.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent-strong)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted-soft)]">
                Contact
              </p>
              <div className="space-y-1">
                {footerContact.emails.map((email) => (
                  <Link
                    key={email}
                    href={`mailto:${email}`}
                    className="block text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent-strong)]"
                  >
                    {email}
                  </Link>
                ))}
              </div>
              <div className="space-y-1 pt-2">
                {footerContact.phones.map((phone) => (
                  <Link
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="block text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent-strong)]"
                  >
                    {phone}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="grid gap-6 border-t border-[var(--line)] pt-8 sm:grid-cols-2 lg:col-span-2">
            {footerContact.offices.map((office) => (
              <address key={office.title} className="not-italic">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted-soft)]">
                  {office.title}
                </p>
                <div className="mt-3 space-y-1 text-base leading-7 text-[var(--foreground)]">
                  {office.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </address>
            ))}
          </div> */}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <p>Serving Local Self Government Institutions across Kerala.</p>
        </div>
      </div>
    </footer>
  );
}
