import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

const contact = {
  label: "Contact",
  title: "Partner with KGVSS for public sanitation, infrastructure, and civic installations.",
  body: "For Grama Panchayat tenders, public square structural execution, or local corporate social responsibility (CSR) project coordination, our office stays readily accessible.",
  topics: [
    "Panchayat Infrastructure Tenders",
    "Public Memorials & Statue Sculpting",
    "Rural Cleanliness Awareness Drives",
    "Corporate CSR Partnerships",
  ],
  primaryAction: {
    label: "Email KGVSS Office",
    href: "mailto:info@keralagvssociety.com",
  },
  emails: [
    "info@keralagvssociety.com",
    "secretarykgvss@gmail.com",
  ],
  phones: [
    "+91 90373 57215"
  ],
  addresses: [
    {
      title: "Central Region Office",
      lines: [
        "Kerala Grama Vikasana Sanitation Society",
        "Raj Bhavan Palace,",
        "Temple West Gate,",
        "Near Kalikotta Palace, Thiripunithura,",
        "Ernakulam, Kerala, Pin : 682301"
      ]
    }
  ],
  associatedPartner: {
    title: "Cheraas India Branding (CIB) & Sculptures",
    email: "cheraasinda@gmail.com",
    address: [
      "42/2905, Near Vennala Co-operative Bank Head Office",
      "Arakadavu Road, Vennala P.O.",
      "Cochin, Kerala - 682028"
    ]
  }
};


type ContactSheetProps = {
  settings: SiteSettings;
};

export default function ContactSheet({ settings: _settings }: ContactSheetProps) {
  return (
    <section
      id="contact"
      className="page-section scroll-mt-28 pt-12 sm:pt-16"
      aria-label={`${_settings.siteName} contact information`}
    >
      <div className="overflow-hidden rounded-[2.4rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(104,64,48,0.96),rgba(45,39,36,0.92))] px-6 py-8 text-white shadow-[var(--shadow-soft)] sm:px-8 sm:py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">

          {/* Left: heading, description, topics */}
          <div className="space-y-5">
            <span className="section-label !border-white/12 !bg-white/10 !text-white/72">
              {contact.label}
            </span>
            <h2 className="hero-title max-w-3xl text-balance text-4xl leading-tight text-white sm:text-5xl">
              {contact.title}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-white/78">{contact.body}</p>

            <div className="flex flex-wrap gap-3">
              {contact.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm text-white/86"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Right: addresses + phones + emails */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            {/* Address */}
            <div className="text-sm leading-6 text-white/80">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                {contact.addresses[0].title}
              </p>
              <div className="space-y-1">
                {contact.addresses[0].lines.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Phone
              </p>
              <div className="flex flex-col gap-1">
                {contact.phones?.map((phone) => (
                  <Link
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {phone}
                  </Link>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Email
              </p>
              <div className="flex flex-col gap-1">
                {contact.emails?.map((email) => (
                  <Link
                    key={email}
                    href={`mailto:${email}`}
                    className="text-sm text-white/90 hover:text-white transition-colors"
                  >
                    {email}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
