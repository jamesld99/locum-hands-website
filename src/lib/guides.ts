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
    metaTitle: "How to Find Dental Locum Work",
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
        text: "This guide is the practical starting point for every dental profession. It is not the dental-nurse decision piece, and it is not the practice guide to types of cover. If you are a dental nurse, you may also want the dental nurse locum jobs guide. If you are still weighing up whether locum work suits you, read the benefits guide.",
      },
      { type: "h2", text: "1. Get your compliance documents in order" },
      {
        type: "p",
        text: "Before you can accept any placement, practices need confidence that you're safe and qualified to work. Gather and keep these up to date:",
      },
      {
        type: "ul",
        items: [
          "GDC registration before you practise, where the role requires it. See the [GDC's key facts about registration](https://www.gdc-uk.org/registration/join-the-register/key-facts-about-registration)",
          "Professional indemnity",
          "The disclosure check that applies where you work: an enhanced DBS in England and Wales, PVG in Scotland, or AccessNI in Northern Ireland, where the role is eligible. The [BDA sets out the difference](https://www.bda.org/advice/patient-care-and-practice-safety/safeguarding-dental-patients/criminal-record-checks/)",
          "Hepatitis B evidence where a placement requires it",
          "CPD where it is requested, such as basic life support, medical emergencies, infection control and safeguarding",
          "Photo ID",
        ],
      },
      { type: "h3", text: "Tip: keep a digital folder" },
      {
        type: "p",
        text: "Keep your own copies somewhere you can find them. Locum Hands does not ask you to upload them on the registration form. We'll explain how to share anything a placement needs.",
      },
      { type: "h2", text: "2. Decide what kind of locum work you want" },
      {
        type: "p",
        text: "Locum work is flexible by design. Think about the days and hours you want, how far you're willing to travel, whether you prefer NHS or private practices, and the specialisms you enjoy. Being clear up front means better-matched placements.",
      },
      { type: "h2", text: "3. Register with a dedicated dental locum agency" },
      {
        type: "p",
        text: "Registering with a specialist dental locum agency is one way to hear about work. A good agency talks through the role, the place and the rate before you decide. It cannot promise a full diary.",
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
        text: "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking. Many locums work on a self-employed basis, so speak to an accountant about the right structure, set money aside for tax, and keep clean records of bookings and expenses.",
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
      "Thinking about locum work? Discover the real benefits of working as a dental locum in the UK — flexibility, variety and control over your days.",
    keyword: "benefits of working as a dental locum",
    audience: "professionals",
    readingTime: 6,
    updated: "2026-06-18",
    relatedPosts: ["dental-locum-nursing-explained", "hygienist-locum-work-uk"],
    relatedGuides: ["how-to-find-dental-locum-work-uk"],
    body: [
      {
        type: "p",
        text: "This page is about whether locum work suits you. The step-by-step version, including documents and how to register, is the guide to finding dental locum work. Dental nurses who want the trade-offs of that role can also read Dental locum nursing explained.",
      },
      { type: "h2", text: "1. Genuine flexibility" },
      {
        type: "p",
        text: "You choose the days, hours and locations that suit you. Locum work fits beautifully around parenting, study, another role or simply a better work-life balance. Accept the bookings you want and decline the ones you don't.",
      },
      { type: "h2", text: "2. A rate you agree before you accept" },
      {
        type: "p",
        text: "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking. With control over how much you work, you can scale your days up or down.",
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
        text: "Register with Locum Hands to find flexible dental locum work across the UK, with a team you can actually talk to.",
      },
    ],
  },
  {
    slug: "why-dental-practices-choose-locum-agencies",
    title: "Why Dental Practices Choose Locum Agencies",
    metaTitle: "Why Practices Choose Locum Agencies",
    description:
      "Why a dental practice might use a locum agency: one place to ask about cover, a conversation about documents, and less of the search. This is not a promise of same-day staff.",
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
        text: "An agency gives you one place to ask. Tell them the date, including a short-notice date, and they can check who may be free. That is not the same as same-day or next-day cover, and it does not confirm a booking.",
      },
      { type: "h2", text: "2. Compliance you can trust" },
      {
        type: "p",
        text: "Before someone practises, a practice needs to be clear about the documents that apply. These commonly include:",
      },
      {
        type: "ul",
        items: [
          "GDC registration before the person practises",
          "Professional indemnity",
          "The disclosure check that applies: enhanced DBS in England and Wales, PVG in Scotland, or AccessNI in Northern Ireland, where the role is eligible",
          "Hepatitis B evidence where the placement requires it",
        ],
      },
      {
        type: "p",
        text: "Locum Hands explains how to share those documents securely. The enquiry form does not collect them, and a booking waits until the details are agreed.",
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
        text: "Locum Hands introduces locum nurses, hygienists, therapists and dentists to practices across the UK. Send a booking enquiry and we'll check the dates. That enquiry does not confirm a booking.",
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
        text: "This guide is about the kinds of temporary cover a practice might use, and how to brief someone on the day. The companion article on covering shortages is the shorter planning piece. Neither page promises that a particular day can be filled.",
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
          "Will you confirm the locum's rate and the booking fee before we book?",
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
