import type { ContentBlock } from "./blog";

/**
 * Resource centre / guides content. These long-form, evergreen guides target
 * long-tail search terms and funnel readers to the professional and practice
 * journeys. Each guide reuses the blog `ContentBlock` renderer for consistency.
 *
 * To add a guide, append to `guides` — the index, routes, sitemap and internal
 * links update automatically.
 */

export type GuideAudience = "professionals" | "practices";

export type Guide = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  keyword: string;
  audience: GuideAudience;
  readingTime: number;
  updated: string; // ISO
  body: ContentBlock[];
  // Optional featured image (absolute path from /public, e.g.
  // "/images/guides/my-guide.png"). Used for the OG/Twitter card and the
  // guideSchema JSON-LD; falls back to the site OG image when unset.
  image?: string;
  // Internal linking: related blog post slugs and curated CTAs.
  relatedPosts: string[];
  relatedGuides: string[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-find-dental-locum-work-uk",
    title: "How to Find Dental Locum Work in the UK",
    metaTitle: "Find Dental Locum Work UK",
    description:
      "A step-by-step guide to finding dental locum work in the UK — from getting your compliance in order and choosing an agency to landing your first placement and getting booked consistently.",
    keyword: "how to find dental locum work in the UK",
    audience: "professionals",
    readingTime: 8,
    updated: "2026-06-20",
    relatedPosts: [
      "dental-nurse-locum-jobs-uk-guide",
      "hygienist-locum-work-uk",
      "dental-locum-nursing-explained",
    ],
    relatedGuides: ["benefits-of-working-as-a-dental-locum"],
    body: [
      {
        type: "p",
        text: "Finding dental locum work in the UK is more accessible than ever, with strong demand for dental nurses, hygienists, therapists and dentists across the country. This guide walks you through exactly how to get started and how to keep your diary full.",
      },
      { type: "h2", text: "1. Get your compliance documents in order" },
      {
        type: "p",
        text: "Before you can accept any placement, practices need confidence that you're safe and qualified to work. Gather and keep these up to date:",
      },
      {
        type: "ul",
        items: [
          "Current GDC (General Dental Council) registration",
          "Valid professional indemnity cover",
          "Enhanced DBS check",
          "Immunisation records, including Hepatitis B status",
          "Up-to-date CPD evidence",
          "Proof of identity and right to work in the UK",
        ],
      },
      { type: "h3", text: "Tip: keep a digital folder" },
      {
        type: "p",
        text: "Store scanned copies of every document in one place so you can respond to booking requests instantly. A good agency will help you keep these current.",
      },
      { type: "h2", text: "2. Decide what kind of locum work you want" },
      {
        type: "p",
        text: "Locum work is flexible by design. Think about the days and hours you want, how far you're willing to travel, whether you prefer NHS or private practices, and the specialisms you enjoy. Being clear up front means better-matched placements.",
      },
      { type: "h2", text: "3. Register with a dedicated dental locum agency" },
      {
        type: "p",
        text: "The fastest, most reliable route to consistent work is registering with a specialist dental locum agency. A good agency matches you with suitable practices, handles the booking admin and chases timesheets so you get paid promptly.",
      },
      {
        type: "quote",
        text: "Register once, set your availability and location preferences, and let suitable bookings come to you.",
      },
      { type: "h2", text: "4. Build a reputation for reliability" },
      {
        type: "ul",
        items: [
          "Keep your availability calendar accurate and current",
          "Arrive early, briefed and ready to work a full list",
          "Communicate clearly if plans change",
          "Ask for feedback and repeat bookings",
        ],
      },
      {
        type: "p",
        text: "Practices rebook locums they trust. A strong reputation quickly turns into a steady stream of work — often at the practices you like best.",
      },
      { type: "h2", text: "5. Understand pay and tax" },
      {
        type: "p",
        text: "Locum rates vary by role, experience, location and how urgently cover is needed. Many locums work on a self-employed basis, so speak to an accountant about the right structure, set money aside for tax, and keep clean records of bookings and expenses.",
      },
      { type: "h2", text: "Start finding dental locum work today" },
      {
        type: "p",
        text: "Locum Hands connects dental professionals with practices across the whole of the UK. Register your details and preferences, and our team will help you find placements that fit your life.",
      },
    ],
  },
  {
    slug: "benefits-of-working-as-a-dental-locum",
    title: "The Benefits of Working as a Dental Locum",
    metaTitle: "Benefits of Dental Locum Work",
    description:
      "Thinking about locum work? Discover the real benefits of working as a dental locum in the UK — flexibility, higher earning potential, variety and control over your career.",
    keyword: "benefits of working as a dental locum",
    audience: "professionals",
    readingTime: 6,
    updated: "2026-06-18",
    relatedPosts: ["dental-locum-nursing-explained", "hygienist-locum-work-uk"],
    relatedGuides: ["how-to-find-dental-locum-work-uk"],
    body: [
      {
        type: "p",
        text: "Locum work has transformed how dental professionals build their careers. Whether you're a dental nurse, hygienist, therapist or dentist, going locum offers freedom that a single permanent role rarely matches. Here are the biggest benefits.",
      },
      { type: "h2", text: "1. Genuine flexibility" },
      {
        type: "p",
        text: "You choose the days, hours and locations that suit you. Locum work fits beautifully around parenting, study, another role or simply a better work-life balance. Accept the bookings you want and decline the ones you don't.",
      },
      { type: "h2", text: "2. Strong earning potential" },
      {
        type: "p",
        text: "Locum rates are often higher than permanent equivalents, and short-notice or weekend cover can attract premium rates. With control over how much you work, you can scale your income up or down to suit your goals.",
      },
      { type: "h2", text: "3. Variety and experience" },
      {
        type: "ul",
        items: [
          "Work across different practices, teams and systems",
          "Broaden your skills across NHS and private settings",
          "Discover specialisms and environments you love",
          "Avoid the routine of the same surgery every day",
        ],
      },
      { type: "h2", text: "4. Control over your career" },
      {
        type: "p",
        text: "As a locum you're in the driving seat. You decide where you work, who you work with and how you grow. Many professionals use locum work to road-test practices before committing, or to stay hands-on while reducing their hours.",
      },
      { type: "h2", text: "5. Support without the strings" },
      {
        type: "p",
        text: "With a good agency behind you, you get the support of a team — compliance help, booking admin, prompt payment — without being tied to one employer. It's the best of both worlds.",
      },
      { type: "h2", text: "Ready to enjoy the benefits?" },
      {
        type: "p",
        text: "Register with Locum Hands to find flexible, well-paid dental locum work across the UK, backed by a team that genuinely supports you.",
      },
    ],
  },
  {
    slug: "why-dental-practices-choose-locum-agencies",
    title: "Why Dental Practices Choose Locum Agencies",
    metaTitle: "Why Practices Choose Locum Agencies",
    description:
      "Discover why UK dental practices rely on locum agencies to cover staff shortages — faster cover, guaranteed compliance, reduced admin and protected revenue.",
    keyword: "why dental practices choose locum agencies",
    audience: "practices",
    readingTime: 6,
    updated: "2026-06-16",
    relatedPosts: [
      "how-to-cover-temporary-dental-staff-shortages",
      "uk-dental-staffing-trends-2026",
    ],
    relatedGuides: ["guide-to-temporary-dental-staffing-solutions"],
    body: [
      {
        type: "p",
        text: "When a dental nurse calls in sick or a hygienist goes on leave, every empty appointment is lost revenue and a let-down patient. That's why so many UK dental practices partner with a locum agency. Here's what they gain.",
      },
      { type: "h2", text: "1. Faster cover, even at short notice" },
      {
        type: "p",
        text: "A dedicated agency maintains a pool of available, pre-screened professionals. Instead of scrambling through contacts when someone calls in sick, you make one call and the agency mobilises cover — often the same or next day.",
      },
      { type: "h2", text: "2. Compliance you can trust" },
      {
        type: "p",
        text: "Reputable agencies vet every professional before they set foot in your surgery:",
      },
      {
        type: "ul",
        items: [
          "Verified GDC registration",
          "Current indemnity insurance",
          "Enhanced DBS checks",
          "Immunisation status and references",
        ],
      },
      {
        type: "p",
        text: "That means you welcome locum staff knowing the paperwork is already handled and your patients are safe.",
      },
      { type: "h2", text: "3. Less admin for your team" },
      {
        type: "p",
        text: "Advertising, screening, referencing and timesheet chasing all take time your practice manager doesn't have. An agency absorbs that workload so your team can focus on patients.",
      },
      { type: "h2", text: "4. Protected revenue and continuity" },
      {
        type: "p",
        text: "Keeping your surgeries running means appointments stay booked, patients stay happy and revenue is protected. Reliable cover is one of the simplest ways to build a resilient practice.",
      },
      { type: "h2", text: "5. A real relationship, not a transaction" },
      {
        type: "p",
        text: "The best agencies learn your practice — your software, your culture, your standards — and send people who fit. Over time that relationship makes cover effortless.",
      },
      { type: "h2", text: "Partner with Locum Hands" },
      {
        type: "p",
        text: "Locum Hands supplies vetted, reliable locum nurses, hygienists, therapists and dentists to practices across the UK. Send a booking enquiry and see the difference a dedicated agency makes.",
      },
    ],
  },
  {
    slug: "guide-to-temporary-dental-staffing-solutions",
    title: "A Guide to Temporary Dental Staffing Solutions",
    metaTitle: "Temporary Dental Staffing Guide",
    description:
      "Everything UK dental practices need to know about temporary dental staffing solutions — types of cover, when to use them, how to choose a partner and how to brief locum staff.",
    keyword: "temporary dental staffing solutions",
    audience: "practices",
    readingTime: 7,
    updated: "2026-06-14",
    relatedPosts: [
      "how-to-cover-temporary-dental-staff-shortages",
      "uk-dental-staffing-trends-2026",
    ],
    relatedGuides: ["why-dental-practices-choose-locum-agencies"],
    body: [
      {
        type: "p",
        text: "Temporary dental staffing keeps practices running when the unexpected happens — and helps you plan confidently around the predictable. This guide explains the options and how to get the most from them.",
      },
      { type: "h2", text: "What are temporary dental staffing solutions?" },
      {
        type: "p",
        text: "Temporary staffing means bringing in qualified professionals to cover gaps rather than recruiting permanently. It spans single-day cover through to longer-term placements across every dental role.",
      },
      { type: "h2", text: "When practices use temporary cover" },
      {
        type: "ul",
        items: [
          "Sickness and emergency absence",
          "Annual leave and bank holidays",
          "Maternity, paternity and parental leave",
          "Training days and CPD",
          "Busy periods and seasonal demand",
          "Bridging a gap while recruiting permanently",
        ],
      },
      { type: "h2", text: "Roles you can cover" },
      {
        type: "ul",
        items: [
          "Dental nurses — chairside support for every specialism",
          "Dental hygienists — keep your hygiene book running",
          "Dental therapists — expand capacity and access",
          "Dentists — associate-style locum cover",
        ],
      },
      { type: "h2", text: "How to choose a temporary staffing partner" },
      {
        type: "p",
        text: "Look for genuine UK-wide coverage, rigorous compliance, transparent pricing and a real person to call. The right partner understands your practice and sends people who fit.",
      },
      { type: "h3", text: "Questions worth asking" },
      {
        type: "ul",
        items: [
          "How do you vet and verify your professionals?",
          "How quickly can you provide last-minute cover?",
          "Are your rates transparent with no hidden fees?",
          "Do you cover my location and the roles I need?",
        ],
      },
      { type: "h2", text: "Get the most from your locum" },
      {
        type: "ul",
        items: [
          "Share software, materials and surgery layout in advance",
          "Confirm start time, parking and who to report to",
          "Provide the day's list and any notes they'll need",
          "Give feedback so future cover is even better",
        ],
      },
      { type: "h2", text: "A staffing solution built around you" },
      {
        type: "p",
        text: "Locum Hands provides flexible temporary dental staffing solutions across the UK — from emergency cover to planned placements. Tell us what you need and we'll handle the rest.",
      },
    ],
  },
];

// ---- Helpers -------------------------------------------------------------

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByAudience(audience: GuideAudience): Guide[] {
  return guides.filter((g) => g.audience === audience);
}

export function formatGuideDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
