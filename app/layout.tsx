import type { Metadata } from "next";

import "./globals.css";
import SiteFooter from "@/components/site/footer";
import SiteHeader from "@/components/site/navabar";
import { getSiteSettings } from "@/lib/data-fetch";
import { siteMeta } from "@/lib/static-data";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <SiteHeader settings={siteSettings} />
        <main className="flex min-h-screen flex-col">{children}</main>
        <SiteFooter settings={siteSettings} />
      </body>
    </html>
  );
}
