/**
 * Central site configuration. Update contact details and the production URL here
 * and they propagate across metadata, schema markup, the header and the footer.
 */

export const siteConfig = {
  name: "Locum Hands Ltd",
  shortName: "Locum Hands",
  legalName: "Locum Hands Limited",
  description:
    "Locum Hands Ltd is a UK-wide dental locum agency connecting dental nurses, hygienists and dentists with dental practices that need reliable temporary staff.",
  // Update to the live domain before deploying to Vercel.
  url: "https://www.locumhands.co.uk",
  locale: "en_GB",
  email: "hello@locumhands.co.uk",
  phone: "+44 7949 282054",
  phoneDisplay: "07949 282054",
  // Postal/registered address is used for LocalBusiness schema.
  address: {
    streetAddress: "71-75 Shelton Street",
    addressLocality: "London",
    addressRegion: "Greater London",
    postalCode: "WC2H 9JQ",
    addressCountry: "GB",
  },
  areaServed: "United Kingdom",
  geo: {
    latitude: 51.5142,
    longitude: -0.1252,
  },
  openingHours: "Mo-Fr 08:00-18:00",
  foundingYear: "2024",
  founder: {
    name: "Lizette Hernandez",
    role: "Owner & Founder",
    photo: "/images/lizette-hernandez.png",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/locum-hands",
    facebook: "https://www.facebook.com/locumhands",
  },
} as const;

export type NavItem = {
  href: string;
  label: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { href: "/professionals", label: "For Professionals", description: "Find dental locum work across the UK" },
  { href: "/practices", label: "For Practices", description: "Book trusted temporary dental staff" },
  { href: "/about", label: "About", description: "The Locum Hands story" },
  { href: "/resources", label: "Resources", description: "Guides for dental locums and practices" },
  { href: "/blog", label: "Blog", description: "News and tips for dental locums and practices" },
  { href: "/faqs", label: "FAQs", description: "Answers for professionals and practices" },
  { href: "/contact", label: "Contact", description: "Talk to our team" },
];

export const footerNav = {
  professionals: [
    { href: "/professionals", label: "Join as a professional" },
    { href: "/professionals#benefits", label: "Why join Locum Hands" },
    { href: "/resources/how-to-find-dental-locum-work-uk", label: "Find dental locum work" },
    { href: "/blog/category/for-professionals", label: "Locum career guides" },
    { href: "/faqs#professionals", label: "Professional FAQs" },
  ],
  practices: [
    { href: "/practices", label: "Book locum staff" },
    { href: "/practices#how-it-works", label: "How it works" },
    { href: "/resources/guide-to-temporary-dental-staffing-solutions", label: "Temporary staffing guide" },
    { href: "/blog/category/for-practices", label: "Staffing insights" },
    { href: "/faqs#practices", label: "Practice FAQs" },
  ],
  company: [
    { href: "/about", label: "About us" },
    { href: "/resources", label: "Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/faqs", label: "FAQs" },
  ],
};
