import logo from "@/assets/logo/logo.jpg";
import home1 from "@/assets/home/home1.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";
import home5 from "@/assets/home/home5.jpg";

import type {
  ContactContent,
  HeroContent,
  ManagedEntry,
  ProjectEntryContent,
  SiteSettings,
} from "./types";

export const siteSettings: SiteSettings = {
  siteName: "KGVSS",
  fullName: "Kerala Grama Vikasana Sanitation Society",
  description:
    "A homepage-first showcase for rural sanitation, water conservation, and field implementation work.",
  longDescription:
    "KGVSS works across rural sanitation, water conservation, field coordination, and community-facing implementation in Kerala. The digital experience is designed as a calm visual showcase so the work feels tangible, not buried under institutional clutter.",
  location: "Thiruvananthapuram, Kerala, India",
  email: "info@kgvss-kerala.org",
  phone: "+91 471 2345678",
  logo: {
    src: logo,
    alt: "KGVSS logo with Gandhian portrait and circular wordmark.",
  },
  primaryNavigation: [
    { id: "home", label: "Home", href: "/" },
    { id: "news", label: "News & Events", href: "/news" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  footerNavigation: [
    { id: "home", label: "Home", href: "/" },
    { id: "news", label: "News & Events", href: "/news" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
};

export const siteMeta = {
  name: siteSettings.siteName,
  fullName: siteSettings.fullName,
  description: siteSettings.description,
  longDescription: siteSettings.longDescription,
  location: siteSettings.location,
  email: siteSettings.email,
  phone: siteSettings.phone,
};

export const homeHeroData: HeroContent = {
  label: "Rural work, shown clearly",
  headline: "KERALA GRAMA VIKASANA SANITATION SOCIETY",
  body: "Dedicated to improving sanitation and environmental sustainability through community-focused initiatives in rural Kerala",
  themes: ["Projects", "Field work", "Community impact"],
  primaryAction: {
    label: "See featured work",
    href: "/#work",
  },
  secondaryAction: {
    label: "Open gallery",
    href: "/gallery",
  },
  collage: [
    {
      src: home5,
      alt: "Project archive collage combining ceremonies, Gandhi memorial imagery, and field documentation.",
      className: "object-[70%_48%]",
    },
    {
      src: home4,
      alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
      className: "object-[78%_44%]",
    },
    {
      src: home3,
      alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
      className: "object-[72%_42%]",
    },
  ],
};

export const contactData: ContactContent = {
  label: "Contact",
  title: "Keep the next step simple: explore the work, then reach out directly.",
  body: "For project conversations, documentation requests, or future collaboration, the contact experience stays deliberately lightweight and human.",
  topics: [
    "Project showcases",
    "Field visits",
    "Impact documentation",
    "Partnership conversations",
  ],
  primaryAction: {
    label: "Email KGVSS",
    href: "mailto:info@kgvss-kerala.org",
  },
};

export const featuredProjects: ManagedEntry<ProjectEntryContent>[] = [
  {
    id: "project-rural-sanitation",
    slug: "rural-sanitation-upgrades",
    order: 1,
    featured: true,
    data: {
      label: "Featured project",
      category: "Sanitation works",
      title: "Rural sanitation upgrades shaped around local use and long-term upkeep.",
      location: "Village clusters and shared-use public touchpoints",
      summary:
        "The focus is practical delivery: cleaner access, more dignified shared spaces, and layouts that communities can continue to use and maintain.",
      impact:
        "What matters most is the shift from one-time intervention to visible, repeatable daily use.",
      metrics: [
        "42 implementation touchpoints",
        "8 panchayat-led follow-ups",
        "Documented handover moments",
      ],
      tags: ["Sanitation", "Field delivery", "Community use"],
      cover: {
        src: home1,
        alt: "Collage of community gathering, public unveiling moments, and memorial installations.",
        className: "object-[68%_48%]",
      },
    },
  },
  {
    id: "project-water-conservation",
    slug: "water-conservation-and-source-care",
    order: 2,
    featured: true,
    data: {
      label: "Featured project",
      category: "Water conservation",
      title:
        "Water-focused initiatives that connect site care, public space, and local stewardship.",
      location:
        "Community grounds, recharge-sensitive areas, and shared local environments",
      summary:
        "These initiatives are framed through implementation visuals, review visits, and completed site conditions so the work reads as lived infrastructure rather than abstract reporting.",
      impact:
        "The archive highlights how water conservation work depends on place-making, maintenance, and public ownership.",
      metrics: [
        "5 active visual archives",
        "Source-care site reviews",
        "Landscape-led interventions",
      ],
      tags: ["Water", "Stewardship", "Site review"],
      cover: {
        src: home4,
        alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
        className: "object-[78%_44%]",
      },
    },
  },
  {
    id: "project-field-implementation",
    slug: "field-implementation-and-follow-up",
    order: 3,
    featured: true,
    data: {
      label: "Featured project",
      category: "Rural development activities",
      title:
        "Field reviews, walkthroughs, and public handovers that keep implementation grounded.",
      location: "On-site across Kerala",
      summary:
        "The strongest outcomes come from staying close to the work: assessing, coordinating, adjusting, and returning after completion.",
      impact:
        "This is where project quality becomes trust. People can see who showed up and what changed.",
      metrics: [
        "Regular site walkthroughs",
        "Completion-day visibility",
        "Archive-ready documentation",
      ],
      tags: ["Field work", "Rural development", "Follow-up"],
      cover: {
        src: home3,
        alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
        className: "object-[72%_42%]",
      },
    },
  },
];






