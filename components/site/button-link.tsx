import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variantClasses: Record<NonNullable<ButtonLinkProps["variant"]>, string> = {
  primary:
    "bg-[var(--accent-strong)] text-white shadow-[0_18px_40px_rgba(60,38,28,0.16)] hover:-translate-y-0.5 hover:opacity-96",
  secondary:
    "border border-[var(--line-strong)] bg-white/72 text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:bg-white",
  ghost:
    "text-[var(--foreground)] hover:bg-white/72 hover:text-[var(--accent-strong)]",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold tracking-[-0.02em] transition-all duration-300 ${variantClasses[variant]} ${className}`}
    >
      <span>{children}</span>
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
  );
}
