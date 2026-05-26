import type { Metadata } from "next";
import AboutSection from "@/components/site/about-section";

export const metadata: Metadata = {
  title: "About | KGVSS",
  description:
    "Learn about Kerala Grama Vikasana Sanitation Society (KGVSS), our pioneering monumental sculpture division, civic portfolios, and operational hubs.",
};

export default function AboutPage() {
  return (
    <div className="pb-10 sm:pb-14 pt-20">
      <AboutSection />
    </div>
  );
}
