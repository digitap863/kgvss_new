"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@kgvss.local");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const body = await response.json();

    setPending(false);

    if (!body.success) {
      setError(body.error.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-black/10 bg-white p-6 shadow-sm"
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#667267]">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold">Sign in</h1>
        </div>
        <label className="mb-4 block text-sm font-medium">
          Email
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-md border border-black/15 px-3 py-2 outline-none focus:border-[#225d38]"
            type="email"
          />
        </label>
        <label className="mb-4 block text-sm font-medium">
          Password
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border border-black/15 px-3 py-2 outline-none focus:border-[#225d38]"
            type="password"
          />
        </label>
        {error ? <p className="mb-4 text-sm text-red-700">{error}</p> : null}
        <button
          disabled={pending}
          className="w-full rounded-md bg-[#225d38] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {pending ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
