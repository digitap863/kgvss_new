import type { ContentStore } from "@/lib/cms/types";

export const defaultContentStore: ContentStore = {
  updatedAt: "2026-05-25T12:00:00.000Z",
  siteSettings: {
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
      assetId: "logo",
      alt: "KGVSS logo with Gandhian portrait and circular wordmark.",
    },
    primaryNavigation: [
      { id: "home", label: "Home", href: "/" },
      { id: "gallery", label: "Gallery", href: "/gallery" },
      { id: "about", label: "About", href: "/about" },
      { id: "contact", label: "Contact", href: "/contact" },
    ],
    footerNavigation: [
      { id: "home", label: "Home", href: "/" },
      { id: "work", label: "Work", href: "/#work" },
      { id: "gallery", label: "Gallery", href: "/gallery" },
      { id: "about", label: "About", href: "/about" },
      { id: "contact", label: "Contact", href: "/contact" },
    ],
  },
  homepage: {
    hero: {
      label: "Rural work, shown clearly",
      headline:
        "See KGVSS work across sanitation, water conservation, and field implementation in Kerala.",
      body:
        "This homepage brings the most important work together in one place so people can understand what was done, where it happened, and the kind of impact it created.",
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
          assetId: "archive-5",
          alt: "Project archive collage combining ceremonies, Gandhi memorial imagery, and field documentation.",
          className: "object-[70%_48%]",
        },
        {
          assetId: "archive-4",
          alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
          className: "object-[78%_44%]",
        },
        {
          assetId: "archive-3",
          alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
          className: "object-[72%_42%]",
        },
      ],
    },
    projects: [
      {
        id: "project-rural-sanitation",
        slug: "rural-sanitation-upgrades",
        status: "published",
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
            assetId: "archive-1",
            alt: "Collage of community gathering, public unveiling moments, and memorial installations.",
            className: "object-[68%_48%]",
          },
        },
      },
      {
        id: "project-water-conservation",
        slug: "water-conservation-and-source-care",
        status: "published",
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
            assetId: "archive-4",
            alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
            className: "object-[78%_44%]",
          },
        },
      },
      {
        id: "project-field-implementation",
        slug: "field-implementation-and-follow-up",
        status: "published",
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
            assetId: "archive-3",
            alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
            className: "object-[72%_42%]",
          },
        },
      },
    ],
    storyStages: [
      {
        id: "story-need",
        slug: "shared-need",
        status: "published",
        order: 1,
        data: {
          label: "Before",
          title:
            "Shared needs are identified through the site, not from a distant dashboard.",
          note:
            "The process begins by reading local conditions, public use, and maintenance reality before any solution is shaped.",
          metric: "Ground-level listening first",
          image: {
            assetId: "archive-4",
            alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
            className: "object-[78%_44%]",
          },
        },
      },
      {
        id: "story-field",
        slug: "field-implementation",
        status: "published",
        order: 2,
        data: {
          label: "In the field",
          title:
            "Walkthroughs, reviews, and implementation checks keep the work responsive.",
          note:
            "Progress is visible through people, visits, and site movement rather than heavy process language.",
          metric: "Field-led coordination",
          image: {
            assetId: "archive-3",
            alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
            className: "object-[72%_42%]",
          },
        },
      },
      {
        id: "story-completion",
        slug: "completed-initiative",
        status: "published",
        order: 3,
        data: {
          label: "After",
          title:
            "Completed initiatives become part of everyday community memory and use.",
          note:
            "Public handovers, finished spaces, and repeat visits help a project remain legible after completion.",
          metric: "Visible completed outcomes",
          image: {
            assetId: "archive-2",
            alt: "Collage of portrait busts and completed public landmarks in community settings.",
            className: "object-[75%_46%]",
          },
        },
      },
    ],
    impactStats: [
      {
        id: "impact-1",
        slug: "implementation-footprint",
        status: "published",
        order: 1,
        data: {
          value: "15+",
          label: "years of documented work",
          note:
            "A long-running body of field activity and completed initiatives across Kerala.",
        },
      },
      {
        id: "impact-2",
        slug: "archive-sets",
        status: "published",
        order: 2,
        data: {
          value: "5",
          label: "core visual archives",
          note:
            "Enough structure to tell the story through real local assets instead of placeholders.",
        },
      },
      {
        id: "impact-3",
        slug: "field-model",
        status: "published",
        order: 3,
        data: {
          value: "Field-led",
          label: "delivery approach",
          note:
            "Listening, coordination, site visits, and public handovers remain central.",
        },
      },
    ],
    achievements: [
      {
        id: "achievement-1",
        slug: "completed-community-initiatives",
        status: "published",
        order: 1,
        data: {
          label: "Achievement",
          title:
            "Completed initiatives are presented as usable public outcomes, not just completed reports.",
          note:
            "The archive keeps attention on what communities can actually see, revisit, and benefit from.",
          image: {
            assetId: "archive-1",
            alt: "Collage of community gathering, public unveiling moments, and memorial installations.",
            className: "object-[68%_48%]",
          },
        },
      },
      {
        id: "achievement-2",
        slug: "visual-documentation",
        status: "published",
        order: 2,
        data: {
          label: "Achievement",
          title:
            "Project documentation is treated as part of impact, helping the work stay understandable over time.",
          note:
            "That makes the platform ready for admin-managed growth: more projects, more galleries, and cleaner long-term storytelling.",
          image: {
            assetId: "archive-5",
            alt: "Project archive collage combining ceremonies, Gandhi memorial imagery, and field documentation.",
            className: "object-[70%_48%]",
          },
        },
      },
    ],
    gallery: [
      {
        id: "gallery-1",
        slug: "community-handover",
        status: "published",
        order: 1,
        data: {
          title: "Community handover",
          note:
            "Gatherings and completion moments that make implementation publicly visible.",
          image: {
            assetId: "archive-1",
            alt: "Collage of community gathering, public unveiling moments, and memorial installations.",
            className: "object-[68%_48%]",
          },
        },
      },
      {
        id: "gallery-2",
        slug: "completed-landmark",
        status: "published",
        order: 2,
        data: {
          title: "Completed landmark",
          note: "Finished sites that anchor long-term identity and local recognition.",
          image: {
            assetId: "archive-2",
            alt: "Collage of portrait busts and completed public landmarks in community settings.",
            className: "object-[75%_46%]",
          },
        },
      },
      {
        id: "gallery-3",
        slug: "field-review",
        status: "published",
        order: 3,
        data: {
          title: "Field review",
          note: "On-site coordination and implementation follow-through.",
          image: {
            assetId: "archive-3",
            alt: "Collage of field walkthroughs, implementation reviews, and completed installation moments.",
            className: "object-[72%_42%]",
          },
        },
      },
      {
        id: "gallery-4",
        slug: "public-environment",
        status: "published",
        order: 4,
        data: {
          title: "Public environment",
          note: "Landscaped settings and shared places that support community use.",
          image: {
            assetId: "archive-4",
            alt: "Collage of landscaped visitor spaces, community grounds, and finished public environments.",
            className: "object-[78%_44%]",
          },
        },
      },
      {
        id: "gallery-5",
        slug: "archive-collage",
        status: "published",
        order: 5,
        data: {
          title: "Archive collage",
          note:
            "A single view of project memory, field effort, and completed outcomes.",
          image: {
            assetId: "archive-5",
            alt: "Project archive collage combining ceremonies, Gandhi memorial imagery, and field documentation.",
            className: "object-[70%_48%]",
          },
        },
      },
    ],
    contact: {
      label: "Contact",
      title: "Keep the next step simple: explore the work, then reach out directly.",
      body:
        "For project conversations, documentation requests, or future collaboration, the contact experience stays deliberately lightweight and human.",
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
    },
  },
};
