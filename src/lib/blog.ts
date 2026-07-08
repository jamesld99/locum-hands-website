/**
 * Blog content store. Posts are authored here as structured content blocks so
 * they render as clean, semantic HTML with a proper heading hierarchy. Each post
 * carries a category and tags for taxonomy-based navigation and crawling.
 *
 * To add a post, append to the `posts` array – routes, sitemap entries,
 * category and tag pages update automatically.
 */

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: "for-professionals",
    name: "For Professionals",
    description:
      "Career guides, pay insights and practical advice for dental nurses, hygienists, therapists and dentists looking for locum work across the UK.",
  },
  {
    slug: "for-practices",
    name: "For Practices",
    description:
      "Staffing insight for UK dental practices: how to cover absences, reduce downtime and book reliable temporary dental staff.",
  },
  {
    slug: "industry-insights",
    name: "Industry Insights",
    description:
      "Trends, regulation and data shaping dental locum work and temporary staffing in the United Kingdom.",
  },
];

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string; // used as meta description + excerpt
  keyword: string; // primary target search term
  date: string; // ISO
  updated?: string;
  author: string;
  readingTime: number; // minutes
  categorySlug: string;
  tags: string[];
  body: ContentBlock[];
  // Optional featured image (absolute path from /public, e.g.
  // "/images/posts/my-post.png"). Used for the OG/Twitter card and the
  // articleSchema JSON-LD; falls back to the site OG image when unset.
  image?: string;
};

export const posts: Post[] = [
  {
    slug: "dental-nurse-locum-jobs-uk-guide",
    title: "Dental Nurse Locum Jobs: The Complete UK Guide for 2026",
    metaTitle: "Dental Nurse Locum Jobs UK Guide",
    description:
      "Everything dental nurses need to know about finding locum jobs in the UK — typical pay rates, the GDC requirements, how booking works and how to land your first placement.",
    keyword: "dental nurse locum jobs",
    date: "2026-06-02",
    author: "Locum Hands Team",
    readingTime: 7,
    categorySlug: "for-professionals",
    tags: ["dental nurse", "locum jobs", "pay rates", "GDC", "getting started"],
    body: [
      {
        type: "p",
        text: "Dental nurse locum jobs offer flexibility, variety and the chance to earn competitive day rates while choosing where and when you work. Whether you want to top up your income with occasional shifts or build a full-time locum career, this guide explains how locum dental nursing works across the UK and how to get started with Locum Hands.",
      },
      { type: "h2", text: "What is a dental nurse locum?" },
      {
        type: "p",
        text: "A locum dental nurse is a registered nurse who provides temporary cover for dental practices — filling in for holidays, sickness, maternity leave or sudden gaps in the rota. Instead of being tied to one employer, you take bookings that suit your schedule, often across multiple practices in your area.",
      },
      { type: "h2", text: "Typical dental nurse locum pay rates in the UK" },
      {
        type: "p",
        text: "Locum dental nurse pay varies by region, experience and how urgently cover is needed. As a general guide, hourly rates across the UK typically sit between £14 and £22 per hour, with higher rates common in London, the South East and for last-minute or specialist bookings.",
      },
      {
        type: "ul",
        items: [
          "Newly qualified nurses: usually at the lower end while building experience",
          "Experienced nurses (3+ years): higher rates, especially with implant, oral surgery or sedation experience",
          "Short-notice and weekend cover: often attracts premium rates",
        ],
      },
      { type: "h2", text: "What you need to work as a locum dental nurse" },
      {
        type: "ul",
        items: [
          "Current GDC (General Dental Council) registration",
          "Valid indemnity cover",
          "An up-to-date Hepatitis B status and immunisation record",
          "Enhanced DBS check",
          "Evidence of ongoing CPD",
        ],
      },
      {
        type: "p",
        text: "When you register with Locum Hands we help you keep these documents organised so you are ready to accept bookings quickly and compliantly.",
      },
      { type: "h2", text: "How to find dental nurse locum jobs near you" },
      {
        type: "p",
        text: "The fastest route to consistent work is registering with a dedicated dental locum agency. A good agency matches you with practices that fit your location preferences, handles the booking admin, and chases timesheets so you can focus on patients.",
      },
      {
        type: "quote",
        text: "Register once, set your availability and location preferences, and let suitable bookings come to you.",
      },
      { type: "h2", text: "Start your locum dental nursing career" },
      {
        type: "p",
        text: "If you're ready to find dental nurse locum jobs that fit around your life, register with Locum Hands today. It's free to join, and our team supports you from your first placement onwards.",
      },
    ],
  },
  {
    slug: "hygienist-locum-work-uk",
    title: "Hygienist Locum Work in the UK: Flexibility, Pay and Getting Booked",
    metaTitle: "Hygienist Locum Work UK Guide",
    description:
      "A practical guide to hygienist locum work in the UK — how dental hygienists find flexible placements, what rates to expect and how to maximise your booked days.",
    keyword: "hygienist locum work",
    date: "2026-05-20",
    author: "Locum Hands Team",
    readingTime: 6,
    categorySlug: "for-professionals",
    tags: ["dental hygienist", "locum work", "pay rates", "flexibility"],
    body: [
      {
        type: "p",
        text: "Hygienist locum work is one of the most flexible ways to practise in UK dentistry. With strong demand for dental hygienists and therapists, locum placements let you choose your days, work across multiple practices and command competitive rates.",
      },
      { type: "h2", text: "Why hygienists choose locum work" },
      {
        type: "ul",
        items: [
          "Control over your schedule and the days you work",
          "Variety across NHS and private practices",
          "Often higher effective earnings than a single fixed role",
          "A great fit alongside parenting, study or another role",
        ],
      },
      { type: "h2", text: "Hygienist locum rates in the UK" },
      {
        type: "p",
        text: "Dental hygienist locum rates are typically quoted per hour or per session. Across the UK, hourly rates commonly range from £30 to £45+, influenced by location, private vs NHS work, and how established your patient throughput is. London and the South East generally sit at the higher end.",
      },
      { type: "h2", text: "Getting booked consistently" },
      {
        type: "p",
        text: "Consistency comes from being easy to book: keep your availability up to date, maintain your compliance documents, and be clear about the geographic area you cover. Practices value hygienists who communicate well and arrive ready to deliver a full book of patients.",
      },
      { type: "h3", text: "Compliance essentials" },
      {
        type: "ul",
        items: [
          "GDC registration as a dental hygienist (or hygienist-therapist)",
          "Indemnity insurance appropriate to your scope of practice",
          "Immunisation and DBS documentation",
          "CPD records demonstrating ongoing learning",
        ],
      },
      { type: "h2", text: "Find hygienist locum work with Locum Hands" },
      {
        type: "p",
        text: "Locum Hands connects hygienists and therapists with practices across the UK that need cover. Register your availability and preferences, and we'll match you with placements that fit.",
      },
    ],
  },
  {
    slug: "choosing-a-dentist-locum-agency-uk",
    title: "How to Choose a Dentist Locum Agency in the UK",
    metaTitle: "Choose a Dentist Locum Agency UK",
    description:
      "What to look for in a dentist locum agency in the UK — compliance support, fair rates, reliable bookings and genuine local knowledge across England, Scotland, Wales and Northern Ireland.",
    keyword: "dentist locum agency UK",
    date: "2026-05-06",
    author: "Locum Hands Team",
    readingTime: 6,
    categorySlug: "for-professionals",
    tags: ["dentist", "locum agency", "UK", "compliance", "choosing an agency"],
    body: [
      {
        type: "p",
        text: "Choosing the right dentist locum agency in the UK can be the difference between sporadic, poorly-matched shifts and a steady stream of well-paid placements near you. Here's what to look for before you register.",
      },
      { type: "h2", text: "1. Genuine UK-wide coverage" },
      {
        type: "p",
        text: "A strong agency places dentists across England, Scotland, Wales and Northern Ireland, with real knowledge of local practices. UK-wide reach means more options when you want to travel, relocate or pick up cover further afield.",
      },
      { type: "h2", text: "2. Compliance done properly" },
      {
        type: "p",
        text: "Good agencies make compliance straightforward — GDC registration, indemnity, DBS, immunisation and references — and keep your documents current so you never miss a booking on a technicality.",
      },
      { type: "h2", text: "3. Fair, transparent rates" },
      {
        type: "p",
        text: "You should always know what you'll be paid and when. Avoid agencies with hidden deductions or vague timesheet processes. Transparent, prompt payment is a hallmark of a quality dentist locum agency.",
      },
      { type: "h2", text: "4. Bookings that actually fit" },
      {
        type: "ul",
        items: [
          "Placements matched to your location preferences",
          "Clear information about each practice and patient base",
          "A real person to call when plans change",
        ],
      },
      { type: "h2", text: "Why dentists choose Locum Hands" },
      {
        type: "p",
        text: "Locum Hands combines UK-wide coverage with hands-on support and transparent rates. We treat clinicians as partners, not numbers — so you can focus on dentistry while we handle the rest.",
      },
    ],
  },
  {
    slug: "how-to-cover-temporary-dental-staff-shortages",
    title: "Temporary Dental Staff: How Practices Cover Shortages Without Downtime",
    metaTitle: "Cover Dental Staff Shortages UK",
    description:
      "A practical playbook for dental practices on sourcing temporary dental staff fast — from planning around predictable gaps to booking last-minute locum cover that protects revenue.",
    keyword: "temporary dental staff",
    date: "2026-04-22",
    author: "Locum Hands Team",
    readingTime: 7,
    categorySlug: "for-practices",
    tags: ["temporary staff", "practice management", "rota", "cover", "revenue"],
    body: [
      {
        type: "p",
        text: "An empty surgery is expensive. When a nurse calls in sick or a hygienist goes on leave, every cancelled appointment is lost revenue and a frustrated patient. Reliable temporary dental staff keep your practice running — here's how to source them without the stress.",
      },
      { type: "h2", text: "Plan around predictable gaps" },
      {
        type: "p",
        text: "Holidays, maternity leave and training days are foreseeable. Mapping these on your rota a few weeks ahead lets you book temporary cover early, secure your preferred locums and avoid premium last-minute rates.",
      },
      { type: "h2", text: "Have a fast route for last-minute cover" },
      {
        type: "p",
        text: "Sickness is unpredictable. The practices that cope best have a trusted agency on speed dial — one that can mobilise vetted, compliant staff at short notice so the day's list still runs.",
      },
      { type: "h2", text: "Insist on compliance before the door opens" },
      {
        type: "ul",
        items: [
          "Verified GDC registration",
          "Up-to-date indemnity, DBS and immunisation records",
          "References and relevant experience for the role",
        ],
      },
      {
        type: "p",
        text: "With Locum Hands, every professional is pre-screened, so you can welcome temporary staff knowing the paperwork is already handled.",
      },
      { type: "h2", text: "Brief your locum for a smooth day" },
      {
        type: "ul",
        items: [
          "Share software, materials and surgery layout in advance",
          "Confirm start time, parking and who to report to",
          "Provide the day's list and any patient notes they'll need",
        ],
      },
      { type: "h2", text: "Book temporary dental staff with Locum Hands" },
      {
        type: "p",
        text: "Tell us what you need and when. We match your practice with screened locum nurses, hygienists, therapists and dentists across the UK — fast. Send a booking enquiry and we'll do the rest.",
      },
    ],
  },
  {
    slug: "dental-locum-nursing-explained",
    title: "Dental Locum Nursing Explained: Is It Right for You?",
    metaTitle: "Dental Locum Nursing Explained",
    description:
      "Thinking about dental locum nursing? Learn the pros and cons, how pay and tax work, and the steps to move from a permanent role to flexible locum dental nursing in the UK.",
    keyword: "dental locum nursing",
    date: "2026-04-08",
    author: "Locum Hands Team",
    readingTime: 6,
    categorySlug: "for-professionals",
    tags: ["dental nurse", "locum nursing", "career", "tax", "flexibility"],
    body: [
      {
        type: "p",
        text: "Dental locum nursing means working temporary placements rather than a single permanent job. It can transform your work-life balance — but it isn't for everyone. Here's an honest look at what to expect.",
      },
      { type: "h2", text: "The upsides of locum dental nursing" },
      {
        type: "ul",
        items: [
          "Flexibility to choose your days and locations",
          "Exposure to different practices, teams and specialisms",
          "Often higher day rates than permanent equivalents",
          "Freedom to scale your hours up or down",
        ],
      },
      { type: "h2", text: "The trade-offs to weigh up" },
      {
        type: "ul",
        items: [
          "Income can vary week to week",
          "You manage your own compliance and CPD",
          "Fewer traditional employment benefits like paid holiday",
        ],
      },
      { type: "h2", text: "How pay and tax work" },
      {
        type: "p",
        text: "Many locum nurses work as self-employed or via an agency arrangement. It's worth speaking to an accountant about the right structure for you, setting aside money for tax, and keeping clean records of your bookings and expenses.",
      },
      { type: "h2", text: "Moving from permanent to locum" },
      {
        type: "p",
        text: "Start by registering with a reputable agency, getting your documents in order and setting realistic availability. Many nurses begin with occasional shifts alongside a permanent role before going fully locum.",
      },
      { type: "h2", text: "Ready to try dental locum nursing?" },
      {
        type: "p",
        text: "Locum Hands makes the move simple. Register your details, tell us your preferences, and we'll help you find placements that fit your life.",
      },
    ],
  },
  {
    slug: "uk-dental-staffing-trends-2026",
    title: "UK Dental Staffing in 2026: Trends Shaping Locum Demand",
    metaTitle: "UK Dental Staffing Trends 2026",
    description:
      "An overview of the forces driving UK dental staffing in 2026 — workforce shortages, rising demand for flexible locums and what it means for practices and professionals alike.",
    keyword: "dental locum",
    date: "2026-03-18",
    author: "Locum Hands Team",
    readingTime: 5,
    categorySlug: "industry-insights",
    tags: ["industry", "trends", "workforce", "demand", "2026"],
    body: [
      {
        type: "p",
        text: "The UK dental sector continues to navigate workforce pressure, shifting patient demand and evolving working preferences. For both practices and professionals, locum work sits right at the centre of how the industry adapts.",
      },
      { type: "h2", text: "Demand for flexibility keeps rising" },
      {
        type: "p",
        text: "Clinicians increasingly value control over how they work. Locum and flexible arrangements let dental nurses, hygienists and dentists design careers around their lives — and practices benefit from a wider pool of available talent.",
      },
      { type: "h2", text: "Workforce gaps make reliable cover essential" },
      {
        type: "p",
        text: "With recruitment and retention a persistent challenge, the ability to book trusted temporary staff quickly has become a core part of running a resilient practice.",
      },
      { type: "h2", text: "Technology is streamlining matching" },
      {
        type: "p",
        text: "Modern agencies use better data and matching to connect the right professional with the right placement faster — reducing downtime for practices and idle days for locums.",
      },
      { type: "h2", text: "What it means for you" },
      {
        type: "p",
        text: "Whether you're a professional seeking flexible work or a practice protecting your rota, partnering with a dedicated dental locum agency like Locum Hands is the most reliable way to stay ahead.",
      },
    ],
  },
];

// ---- Helpers -------------------------------------------------------------

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getPostsByCategory(slug: string): Post[] {
  return getAllPosts().filter((p) => p.categorySlug === slug);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function tagToSlug(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getPostsByTagSlug(tagSlug: string): Post[] {
  return getAllPosts().filter((p) => p.tags.some((t) => tagToSlug(t) === tagSlug));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      let score = p.categorySlug === post.categorySlug ? 2 : 0;
      score += p.tags.filter((t) => post.tags.includes(t)).length;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
