// components/site/contact-form.tsx
"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ settings }: { settings?: any } = {}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormState("submitting");

    // Replace with your actual form submission logic (e.g. API route, Resend, Formspree)
    await new Promise((res) => setTimeout(res, 1500));

    setFormState("success");
  };

  if (formState === "success") {
    return (
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--foreground)]">
          <svg
            className="h-5 w-5 text-[var(--background)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[var(--foreground)]">
          Enquiry received
        </h3>
        <p className="text-sm leading-6 text-[var(--muted)]">
          Thank you for reaching out. We'll get back to you within 2–3 working
          days.
        </p>
        <button
          onClick={() => {
            setFormState("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-2 w-fit text-sm text-[var(--foreground)] underline underline-offset-4 hover:opacity-60 transition-opacity"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
      <p className="mb-6 text-xs uppercase tracking-widest text-[var(--muted)]">
        Enquiry Form
      </p>

      <div className="space-y-4">
        {/* Name + Email row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-[var(--muted)]"
            >
              Full Name <span className="text-[var(--foreground)]">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--foreground)] focus:ring-0"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-xs font-medium text-[var(--muted)]"
            >
              Email <span className="text-[var(--foreground)]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--foreground)] focus:ring-0"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label
            htmlFor="subject"
            className="block text-xs font-medium text-[var(--muted)]"
          >
            Subject <span className="text-[var(--foreground)]">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--foreground)] outline-none transition focus:border-[var(--foreground)] focus:ring-0"
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="project">Project Discussion</option>
            <option value="documentation">Documentation Request</option>
            <option value="visit">Field Visit</option>
            <option value="collaboration">Collaboration</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label
            htmlFor="message"
            className="block text-xs font-medium text-[var(--muted)]"
          >
            Message <span className="text-[var(--foreground)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us what you have in mind…"
            className="w-full resize-none rounded-lg border border-[var(--border)] bg-transparent px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition focus:border-[var(--foreground)] focus:ring-0"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={
            formState === "submitting" ||
            !form.name ||
            !form.email ||
            !form.subject ||
            !form.message
          }
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {formState === "submitting" ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Sending…
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>

        {formState === "error" && (
          <p className="text-center text-xs text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}