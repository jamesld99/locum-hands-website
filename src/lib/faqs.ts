export type Faq = { question: string; answer: string };

export type FaqGroup = {
  id: string;
  title: string;
  faqs: Faq[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "professionals",
    title: "For dental professionals",
    faqs: [
      {
        question: "What does it cost to register with Locum Hands?",
        answer:
          "Nothing. It is completely free for dental nurses, hygienists, therapists and dentists to register and find locum work through Locum Hands. We are paid by the practices that book you.",
      },
      {
        question: "Who can register as a locum with Locum Hands?",
        answer:
          "We welcome GDC-registered dental nurses, dental hygienists, dental therapists and dentists across the UK. You'll need current GDC registration, valid indemnity, an enhanced DBS, immunisation records and up-to-date CPD.",
      },
      {
        question: "How quickly can I start getting locum bookings?",
        answer:
          "Once you have registered and we have verified your compliance documents, you can start receiving suitable bookings straight away — often within a few days, depending on demand in your area and your availability.",
      },
      {
        question: "How much do locum dental professionals earn?",
        answer:
          "Rates depend on your role, experience, location and how urgently cover is needed. As a guide, locum dental nurses typically earn £14–£22 per hour and hygienists £30–£45+ per hour, with higher rates common in London and the South East and for short-notice cover.",
      },
      {
        question: "Can I choose where and when I work?",
        answer:
          "Yes. You set your availability and location preferences when you register, and you're always free to accept or decline any booking. Locum work is built around your schedule.",
      },
      {
        question: "Do you help with compliance and paperwork?",
        answer:
          "Absolutely. Our team helps you keep your GDC registration, indemnity, DBS and immunisation records organised so you're always ready to accept bookings compliantly.",
      },
    ],
  },
  {
    id: "practices",
    title: "For dental practices",
    faqs: [
      {
        question: "How do I book temporary dental staff?",
        answer:
          "Send us a booking enquiry with the role you need, your location, the dates and how long cover is required. We'll match you with screened, compliant professionals and confirm the details with you quickly.",
      },
      {
        question: "How fast can you provide cover?",
        answer:
          "We handle both planned cover and last-minute emergencies. For urgent sickness cover we work to mobilise vetted staff as quickly as possible — often the same or next day where availability allows.",
      },
      {
        question: "Are your locums fully vetted and compliant?",
        answer:
          "Yes. Every professional we place is pre-screened for GDC registration, indemnity, DBS, immunisation status and references, so you can welcome them knowing the paperwork is handled.",
      },
      {
        question: "Which roles can you cover?",
        answer:
          "We supply locum dental nurses, dental hygienists, dental therapists and dentists to practices across the whole of the UK, for both NHS and private settings.",
      },
      {
        question: "Do you cover my area?",
        answer:
          "We are a UK-wide agency placing professionals across England, Scotland, Wales and Northern Ireland. Get in touch with your location and we'll confirm availability.",
      },
      {
        question: "How does pricing work for practices?",
        answer:
          "Pricing depends on the role, location and notice period. We're transparent about rates with no hidden fees — contact us for a clear quote tailored to your booking.",
      },
    ],
  },
  {
    id: "general",
    title: "General questions",
    faqs: [
      {
        question: "Where is Locum Hands based and what areas do you serve?",
        answer:
          "Locum Hands Ltd is a UK-wide dental locum agency. While we're registered in London, we connect professionals and practices right across the United Kingdom.",
      },
      {
        question: "How is my data handled?",
        answer:
          "We take data protection seriously. Information you submit through our forms is validated, stored securely and used only to provide our locum matching service in line with UK GDPR. See our privacy practices or contact us for details.",
      },
      {
        question: "How do I get in touch?",
        answer:
          "You can call us, email hello@locumhands.co.uk, or use the contact form on our website. We aim to respond to all enquiries within one working day.",
      },
    ],
  },
];

export function allFaqs(): Faq[] {
  return faqGroups.flatMap((g) => g.faqs);
}
