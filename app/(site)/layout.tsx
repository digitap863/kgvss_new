import SiteFooter from "@/components/site/footer";
import SiteHeader from "@/components/site/navabar";
import { getSiteSettings } from "@/lib/data-fetch";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <SiteHeader settings={siteSettings} />
      <main className="flex min-h-screen flex-col">{children}</main>
      <SiteFooter settings={siteSettings} />
    </>
  );
}
