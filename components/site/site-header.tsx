"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ButtonLink from "@/components/site/button-link";
import type { SiteSettings } from "@/lib/cms";

type SiteHeaderProps = {
  settings: SiteSettings;
};

export default function SiteHeader({ settings }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-[var(--container-width)]">
        <div
          className={`pointer-events-auto rounded-[1.65rem] border border-[var(--line)] transition-all duration-300 ${
            isScrolled
              ? "bg-[rgba(255,251,246,0.9)] shadow-[var(--shadow-soft)] backdrop-blur-xl"
              : "bg-[rgba(255,251,246,0.7)] backdrop-blur-lg"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex min-w-0 items-center gap-3 rounded-full pr-2 transition-opacity hover:opacity-80"
              aria-label={`${settings.siteName} home`}
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-white">
                <Image
                  src={settings.logo.src}
                  alt={settings.logo.alt}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                  {settings.siteName}
                </p>
                <p className="hidden truncate text-sm text-[var(--muted)] sm:block">
                  Rural work in view
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {settings.primaryNavigation.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors duration-300 hover:bg-white/80 hover:text-[var(--foreground)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href="/contact"
                variant="primary"
                className="hidden sm:inline-flex"
              >
                Connect
              </ButtonLink>

              <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/70 text-[var(--foreground)] transition-colors hover:bg-white lg:hidden"
                aria-controls="mobile-navigation"
                aria-expanded={isOpen}
                aria-label="Toggle navigation"
              >
                <span className="flex w-5 flex-col gap-1.5">
                  <span
                    className={`h-0.5 rounded-full bg-current transition-transform duration-300 ${
                      isOpen ? "translate-y-2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 rounded-full bg-current transition-opacity duration-300 ${
                      isOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`h-0.5 rounded-full bg-current transition-transform duration-300 ${
                      isOpen ? "-translate-y-2 -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <div
            id="mobile-navigation"
            className={`overflow-hidden transition-[max-height,opacity] duration-300 lg:hidden ${
              isOpen ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-[var(--line)] px-4 py-4 sm:px-5">
              <nav className="flex flex-col gap-1" aria-label="Mobile">
                {settings.primaryNavigation.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="rounded-[1.1rem] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-white/70"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[var(--accent-strong)] px-6 py-3 text-sm font-semibold tracking-[-0.02em] text-white shadow-[0_18px_40px_rgba(60,38,28,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-96"
              >
                <span>Connect</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M4.167 10h11.666M10.833 4.167 15.833 10l-5 5.833"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
