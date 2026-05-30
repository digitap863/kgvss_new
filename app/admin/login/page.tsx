"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Welcome back! Redirecting...");
        // Force fully reload/redirect to ensure middleware captures the new cookies immediately
        window.location.href = "/admin";
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f8fb] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-black/5 bg-white p-8 shadow-xl sm:p-10 transition-all hover:shadow-2xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#667085]">
            Secure Access
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#15171a]">
            KGVSS Admin
          </h2>
          <p className="mt-2 text-sm text-[#667085]">
            Sign in to manage news, events, and gallery content.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4a4f58]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#15171a] shadow-sm transition-colors placeholder:text-gray-400 focus:border-[#15171a] focus:outline-none focus:ring-1 focus:ring-[#15171a]"
                placeholder="admin@kgvss.org"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#4a4f58]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-[#15171a] shadow-sm transition-colors placeholder:text-gray-400 focus:border-[#15171a] focus:outline-none focus:ring-1 focus:ring-[#15171a]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-lg bg-[#15171a] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#2b2f35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15171a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
