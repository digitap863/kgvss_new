import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
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
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        {children}
          <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
