import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import SiteFooter from "@/components/site/site-footer";
import SiteHeader from "@/components/site/site-header";
import { getSiteSettings } from "@/lib/data-fetch";
import { siteMeta } from "@/lib/static-data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteMeta.name} | Rural work in view`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.longDescription,
  keywords: [
    "KGVSS",
    "Kerala",
    "rural sanitation",
    "water conservation",
    "rural development",
    "project showcase",
    "field activities",
  ],
  openGraph: {
    title: `${siteMeta.name} | Rural work in view`,
    description: siteMeta.longDescription,
    type: "website",
    locale: "en_IN",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SiteHeader settings={siteSettings} />
        <main className="flex min-h-screen flex-col">{children}</main>
        <SiteFooter settings={siteSettings} />
      </body>
    </html>
  );
}
