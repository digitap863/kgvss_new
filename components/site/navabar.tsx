"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ButtonLink from "@/components/site/button-link";
import type { SiteSettings } from "@/lib/types";

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
                {/* <p className="hidden truncate text-sm text-[var(--muted)] sm:block">
                  Rural work in view
                </p> */}
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
  href="https://wa.me/+919037357215"
  variant="primary"
  className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap"
>
  {/* <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="h-5 w-5 fill-current"
  >
    <path d="M16.001 3C8.82 3 3 8.82 3 16c0 2.54.74 5.02 2.14 7.14L3 29l5.99-2.09A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.67c-2.14 0-4.24-.57-6.08-1.66l-.43-.25-3.56 1.24 1.19-3.67-.28-.38A10.6 10.6 0 1 1 16 26.67Zm5.82-7.95c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1.01 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.56-1.57-.95-.85-1.59-1.9-1.78-2.22-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.34-.26-.63-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.68.77.25 1.47.21 2.02.13.62-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" />
  </svg> */}

  <span>Connect</span>
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
