import logo from "@/assets/logo/logo.jpg";
import home1 from "@/assets/home/home1.jpg";
import home3 from "@/assets/home/home3.jpg";
import home4 from "@/assets/home/home4.jpg";
import home5 from "@/assets/home/home5.jpg";
import galleryPic10 from "@/assets/gallery/pic10.jpg";
import galleryPic18 from "@/assets/home/Banner1.png";
import galleryPic25 from "@/assets/gallery/pic25.jpg";
import galleryPic35 from "@/assets/gallery/pic35.jpg";

import type {
  ContactContent,
  GalleryEntryContent,
  HeroContent,
  ManagedEntry,
  NewsEventContent,
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
  location: "Raj Bhavan Palace, Temple West Gate, Near Kalikotta Palace, Thiripunithura, Ernakulam, Kerala, Pin : 682301",
  email: "info@kgvss-kerala.org",
  phone: "+91 90373 57215",
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

export const newsEvents: ManagedEntry<NewsEventContent>[] = [
  {
    id: "event-community-sanitation-review",
    slug: "community-sanitation-review",
    order: 1,
    featured: true,
    data: {
      type: "Event",
      date: "June 2026",
      title: "Community sanitation review and awareness session",
      description:
        "KGVSS teams joined local representatives and residents for a practical review of sanitation access, upkeep needs, and hygiene awareness. The session focused on daily use, shared responsibility, and the small maintenance habits that keep public facilities dignified after handover.",
      image: {
        src: galleryPic10,
        alt: "Community members gathered for a field awareness session.",
        className: "object-[52%_42%]",
      },
    },
  },
  {
    id: "news-water-conservation-field-visit",
    slug: "water-conservation-field-visit",
    order: 2,
    data: {
      type: "News",
      date: "May 2026",
      title: "കേരള ഹൈക്കോടതിയിൽ ഗാന്ധി പ്രതിമ അനാവരണം ചെയ്തു",
      description:
        `

കൊച്ചി: കേരള ഹൈക്കോടതിയിൽ മഹാത്മാന്ധിയുടെ പ്രതിമ സ്ഥാപിച്ചു. ഹൈക്കോടതി അങ്കണത്തിൽ സ്ഥാപിച്ച ഗാന്ധി പ്രതിമ ചീഫ് ജസ്റ്റീസ് ആഷിഷ് ജിതേന്ദ്ര ദേശായി അനാവരണം ചെയ്തു.

പ്രശസ്ത ശില്പി ചേരാസ് രവിദാസ് ആണ് ഗാന്ധിപ്രതിമ തയ്യാറാക്കിയത്. പ്രത്യേകം തയ്യാറാക്കിയ പീഠത്തിൽ നാലര അടി ഉയരമുള്ള പ്രതിമയാണ് സ്ഥാപിച്ചിരിക്കുന്നത്.ഗാന്ധി പ്രതിമ രൂപകൽപ്പന ചെയ്ത ചേരാസ് രവിദാസിനെ ചീഫ് ജസ്റ്റീസ് അനുമോദിച്ചു. `,
      image: {
        src: galleryPic18,
        alt: "Field documentation from a water conservation site visit.",
        className: "object-[60%_46%]",
      },
    },
  },
  {
    id: "event-rural-development-handover",
    slug: "rural-development-handover",
    order: 3,
    data: {
      type: "Event",
      date: "April 2026",
      title: "Rural development handover brings project partners together",
      description:
        "A local handover gathering brought project workers, community members, and partner representatives together to mark completion of a rural development activity. The event emphasized clear documentation, public visibility, and continued local stewardship.",
      image: {
        src: galleryPic25,
        alt: "Public handover gathering for a rural development activity.",
        className: "object-[50%_45%]",
      },
    },
  },
  {
    id: "news-public-space-documentation",
    slug: "public-space-documentation",
    order: 4,
    data: {
      type: "News",
      date: "March 2026",
      title: "Project archive updated with public space documentation",
      description:
        "New image records have been added to the project archive, showing public space improvements, completed installations, and field review moments. These updates make the work easier to browse and help future planning start from visible evidence.",
      image: {
        src: galleryPic35,
        alt: "Completed public space documented for the project archive.",
        className: "object-[58%_44%]",
      },
    },
  },
];

export const galleryEntries: ManagedEntry<GalleryEntryContent>[] = [
  {
    id: "admin-gallery-community-session",
    slug: "community-session",
    order: 1,
    data: {
      title: "Community session",
      note: "A field gathering documented for the public visual archive.",
      image: {
        src: galleryPic10,
        alt: "Community members gathered for a field session.",
        className: "object-[52%_42%]",
      },
    },
  },
  {
    id: "admin-gallery-field-documentation",
    slug: "field-documentation",
    order: 2,
    data: {
      title: "Field documentation",
      note: "Site documentation captured during project review.",
      image: {
        src: galleryPic18,
        alt: "Field documentation image.",
        className: "object-[60%_46%]",
      },
    },
  },
  {
    id: "admin-gallery-public-handover",
    slug: "public-handover",
    order: 3,
    data: {
      title: "Public handover",
      note: "A handover moment from rural development activity.",
      image: {
        src: galleryPic25,
        alt: "Public handover gathering.",
        className: "object-[50%_45%]",
      },
    },
  },
  {
    id: "admin-gallery-community-space",
    slug: "community-space",
    order: 4,
    data: {
      title: "Community space",
      note: "Completed public space recorded for the archive.",
      image: {
        src: galleryPic35,
        alt: "Completed public space.",
        className: "object-[58%_44%]",
      },
    },
  },
];
