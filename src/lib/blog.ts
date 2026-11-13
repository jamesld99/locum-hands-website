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
      "Staffing insight for UK dental practices: how to plan around absences and enquire about temporary dental cover.",
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
      "Everything dental nurses need to know about finding locum jobs in the UK — how pay is agreed, the GDC requirements, how booking works and how to land your first placement.",
    keyword: "dental nurse locum jobs",
    date: "2026-06-02",
    author: "Liset Hernandez",
    readingTime: 7,
    categorySlug: "for-professionals",
    tags: ["dental nurse", "locum jobs", "pay rates", "GDC", "getting started"],
    body: [
      {
        type: "p",
        text: "This is the practical guide for dental nurses: what the role involves, how pay is agreed, and what to have ready. If you are still deciding whether locum nursing suits you, read Dental locum nursing explained. If you are a hygienist, therapist or dentist, start with the guide to finding dental locum work.",
      },
      { type: "h2", text: "What is a dental nurse locum?" },
      {
        type: "p",
        text: "A locum dental nurse is a registered nurse who provides temporary cover for dental practices — filling in for holidays, sickness, maternity leave or sudden gaps in the rota. Instead of being tied to one employer, you take bookings that suit your schedule, often across multiple practices in your area.",
      },
      { type: "h2", text: "How dental nurse locum pay is agreed" },
      {
        type: "p",
        text: "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking.",
      },
      { type: "h2", text: "What you need to work as a locum dental nurse" },
      {
        type: "ul",
        items: [
          "GDC registration before you practise. Dentists and dental care professionals must be on the register. See the [GDC's key facts about registration](https://www.gdc-uk.org/registration/join-the-register/key-facts-about-registration)",
          "Professional indemnity",
          "The disclosure check that applies where you work: an enhanced DBS in England and Wales, PVG in Scotland, or AccessNI in Northern Ireland, where the role is eligible. The [BDA explains the difference](https://www.bda.org/advice/patient-care-and-practice-safety/safeguarding-dental-patients/criminal-record-checks/)",
          "Hepatitis B evidence where the placement requires it, including before exposure-prone procedures",
          "CPD where it is requested, such as basic life support, medical emergencies, infection control and safeguarding",
        ],
      },
      {
        type: "p",
        text: "Requirements vary by role and placement. The Locum Hands form does not ask you to upload documents or answer medical questions. After you register, we'll explain how to share anything that is needed. Practices also ask about dental nurse cover in places such as Plymouth and Devon, Southampton, Preston and Lancashire, and Glasgow. That is not a promise of work there.",
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
      "A practical guide to hygienist locum work in the UK — how dental hygienists find flexible placements, how pay is agreed and how to get booked.",
    keyword: "hygienist locum work",
    date: "2026-05-20",
    author: "Locum Hands Team",
    readingTime: 6,
    categorySlug: "for-professionals",
    tags: ["dental hygienist", "locum work", "pay rates", "flexibility"],
    body: [
      {
        type: "p",
        text: "Hygienist locum work is one of the most flexible ways to practise in UK dentistry. Locum placements let you choose your days and work across more than one practice.",
      },
      { type: "h2", text: "Why hygienists choose locum work" },
      {
        type: "ul",
        items: [
          "Control over your schedule and the days you work",
          "Variety across NHS and private practices",
          "You agree the rate before you accept a booking",
          "A great fit alongside parenting, study or another role",
        ],
      },
      { type: "h2", text: "How hygienist locum pay is agreed" },
      {
        type: "p",
        text: "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking.",
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
          "The relevant disclosure check where it applies, and hepatitis B evidence where a placement requires it",
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
      "What to look for in a dentist locum agency in the UK: clear documents, a rate you can see before you accept, and someone you can phone.",
    keyword: "dentist locum agency UK",
    date: "2026-05-06",
    author: "Locum Hands Team",
    readingTime: 6,
    categorySlug: "for-professionals",
    tags: ["dentist", "locum agency", "UK", "compliance", "choosing an agency"],
    body: [
      {
        type: "p",
        text: "Choosing the right dentist locum agency in the UK can be the difference between poorly matched shifts and placements that fit how you want to work. Here's what to look for before you register.",
      },
      { type: "h2", text: "1. Genuine UK-wide coverage" },
      {
        type: "p",
        text: "A strong agency places dentists across England, Scotland, Wales and Northern Ireland, with real knowledge of local practices. UK-wide reach means more options when you want to travel, relocate or pick up cover further afield.",
      },
      { type: "h2", text: "2. Compliance done properly" },
      {
        type: "p",
        text: "A useful agency explains what a placement is likely to need: GDC registration before you practise, indemnity, the disclosure check used in that part of the UK, and hepatitis B evidence where it is required. Nobody can promise you will never miss a booking.",
      },
      { type: "h2", text: "3. A rate you can see before you accept" },
      {
        type: "p",
        text: "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking.",
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
        text: "Locum Hands combines UK-wide coverage with hands-on support. You'll know the agreed rate before you accept a booking, and you can focus on dentistry while we help with the arrangements.",
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
        text: "Holidays, maternity leave and training days are foreseeable. Mapping these on your rota a few weeks ahead gives you more time to ask about temporary cover.",
      },
      { type: "h2", text: "Have a fast route for last-minute cover" },
      {
        type: "p",
        text: "Sickness is unpredictable. It helps to know who you will call, and to send the date even if it is short notice. An agency can check who may be free. It cannot promise that the day's list will still run.",
      },
      { type: "h2", text: "Insist on compliance before the door opens" },
      {
        type: "ul",
        items: [
          "GDC registration, checked against the public register before someone practises",
          "Professional indemnity",
          "The disclosure check that applies: enhanced DBS in England and Wales, PVG in Scotland, or AccessNI in Northern Ireland, where the role is eligible",
          "Hepatitis B evidence where the placement requires it",
        ],
      },
      {
        type: "p",
        text: "Locum Hands does not collect those documents on the website form. We'll explain how to share them securely, and we won't book someone until the details are agreed. Dentist cover is most often discussed around Sutton and wider London. Hygienist and therapist cover comes up around Hull, London, Glasgow and Edinburgh. Availability still has to be checked for each date.",
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
        text: "Tell us the role, the place and the dates. Sending a booking enquiry does not confirm a booking. We'll look at what may be possible and confirm the rate and the fee before you book.",
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
    author: "Liset Hernandez",
    readingTime: 6,
    categorySlug: "for-professionals",
    tags: ["dental nurse", "locum nursing", "career", "tax", "flexibility"],
    body: [
      {
        type: "p",
        text: "This article is about whether locum dental nursing suits you: the flexibility, the trade-offs and the tax questions. I'm Liset, a locum dental nurse, and this is the decision I would talk through before the practical checklist. For documents, pay and how to register, use the dental nurse locum jobs guide.",
      },
      { type: "h2", text: "The upsides of locum dental nursing" },
      {
        type: "ul",
        items: [
          "Flexibility to choose your days and locations",
          "Exposure to different practices, teams and specialisms",
          "You agree the rate before you accept a booking",
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
      { type: "h2", text: "Practices still need a way to ask about cover" },
      {
        type: "p",
        text: "Recruitment and retention remain difficult for many practices. Temporary cover is one way to ask about a gap. It is not a guarantee that a particular day can be filled.",
      },
      { type: "h2", text: "A phone call still does the work" },
      {
        type: "p",
        text: "Some agencies use software to keep notes and availability. The useful part is still a conversation about the role, the place and the dates, especially when plans change.",
      },
      { type: "h2", text: "What it means for you" },
      {
        type: "p",
        text: "If you want locum work, register and say where you can travel. If you need cover, send the dates and treat the reply as a check, not a booking. Locum Hands will confirm the rate and the fee before anything is agreed.",
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
