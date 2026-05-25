import Link from "next/link";

import ButtonLink from "@/components/site/button-link";
import type { SiteSettings } from "@/lib/cms";

type SiteFooterProps = {
  settings: SiteSettings;
};

export default function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[linear-gradient(180deg,rgba(250,245,239,0.72),rgba(235,226,216,0.72))]">
      <div className="mx-auto max-w-[var(--container-width)] px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-5">
            <span className="section-label">{settings.siteName}</span>
            <h2 className="hero-title max-w-2xl text-balance text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">
              A lighter website experience built around visible work, grounded impact, and real local assets.
            </h2>
            <p className="max-w-xl text-base leading-8 text-[var(--muted)]">
              {settings.longDescription}
            </p>
            <ButtonLink href="/contact" variant="secondary">
              Reach out directly
            </ButtonLink>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
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
              <p className="text-base leading-7 text-[var(--foreground)]">{settings.location}</p>
              <Link
                href={`mailto:${settings.email}`}
                className="block text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent-strong)]"
              >
                {settings.email}
              </Link>
              <Link
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="block text-base text-[var(--foreground)] transition-colors hover:text-[var(--accent-strong)]"
              >
                {settings.phone}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <p>Homepage-first, CMS-ready, and built for future admin-managed growth.</p>
        </div>
      </div>
    </footer>
  );
}
