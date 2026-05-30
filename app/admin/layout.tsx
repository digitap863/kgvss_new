import type { Metadata } from "next";

import { headers } from "next/headers";
import AdminSidebar from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Admin",
  description: "KGVSS admin workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-[#15171a] md:flex">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col px-5 py-6 sm:px-8 lg:px-10">
        {children}
      </div>
    </main>
  );
}
