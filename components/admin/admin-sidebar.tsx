"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavigation = [
  { label: "Dashboard", href: "/admin" },
  { label: "News & Events", href: "/admin/news-events" },
  { label: "Manage News & Events", href: "/admin/news-events/manage" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Manage Gallery", href: "/admin/gallery/manage" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });
      if (response.ok) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="flex shrink-0 flex-col border-b border-black/10 bg-white px-4 py-4 shadow-sm md:min-h-screen md:w-72 md:border-b-0 md:border-r md:px-5 md:py-6">
      <Link href="/admin" className="text-sm font-semibold uppercase tracking-[0.18em]">
        KGVSS Admin
      </Link>

      <nav className="mt-5 flex gap-2 overflow-x-auto md:mt-8 md:flex-col md:overflow-visible">
        {adminNavigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#15171a] text-white"
                  : "text-[#4a4f58] hover:bg-[#f1f3f7] hover:text-[#15171a]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors md:hidden cursor-pointer"
        >
          Logout
        </button>
      </nav>

      <div className="mt-auto hidden pt-8 md:flex md:flex-col md:gap-2">
        <Link
          href="/"
          className="inline-flex w-full justify-center rounded-md border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-[#4a4f58] shadow-sm hover:text-[#15171a]"
        >
          View site
        </Link>
        <button
          onClick={handleLogout}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

