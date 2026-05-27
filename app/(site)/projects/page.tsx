import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="pb-10 sm:pb-14">
      <section className="page-section pt-36 sm:pt-40">
        <div className="max-w-3xl space-y-5">
          <span className="section-label">Projects</span>
          <h1 className="hero-title text-balance text-[clamp(2.9rem,5.4vw,5rem)] leading-[0.98] text-[var(--foreground)]">
            Our work is now collected on the homepage.
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-8 text-[var(--muted)]">
            The featured project section keeps the site static, focused, and easy to browse.
          </p>
          <Link
            href="/#work"
            className="inline-flex rounded-full bg-[var(--accent-strong)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(60,38,28,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-96"
          >
            View featured work
          </Link>
        </div>
      </section>
    </div>
  );
}
