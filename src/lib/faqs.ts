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
          "We welcome dental nurses, dental hygienists, dental therapists, dentists and other dental roles from across the UK. What you need depends on the role and the placement. That often includes GDC registration where it applies, professional indemnity, the relevant disclosure check (an enhanced DBS, PVG in Scotland or AccessNI in Northern Ireland), photo ID, qualifications, and hepatitis B evidence or CPD where a placement asks for them.",
      },
      {
        question: "How quickly can I start getting locum bookings?",
        answer:
          "After you register, we'll talk to you about the documents a placement needs. We can't promise how soon a booking will come up. It depends on your role, where you want to work and what practices are asking for.",
      },
      {
        question: "How much do locum dental professionals earn?",
        answer:
          "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking.",
      },
      {
        question: "Can I choose where and when I work?",
        answer:
          "Yes. You set your availability and location preferences when you register, and you're always free to accept or decline any booking. Locum work is built around your schedule.",
      },
      {
        question: "Do you help with compliance and paperwork?",
        answer:
          "We can tell you what a placement is likely to need, and we'll contact you about sharing documents securely. The website doesn't ask you to upload files or answer medical questions.",
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
          "Send a booking enquiry with the role, the practice location, the dates and the hours. We'll look at what may be possible and confirm the locum's rate and the booking fee before you book. Sending the form does not confirm a booking.",
      },
      {
        question: "How fast can you provide cover?",
        answer:
          "Tell us the dates, including any that are still tentative. We'll check who may be free. We can't guarantee same-day or next-day cover, and sending an enquiry does not confirm a booking.",
      },
      {
        question: "What documents do you ask for?",
        answer:
          "It depends on the role and the placement. Dentists and dental care professionals must be registered with the General Dental Council before they practise. We also talk through professional indemnity, the relevant disclosure check (an enhanced DBS in England and Wales, PVG in Scotland or AccessNI in Northern Ireland, where it applies), photo ID, and hepatitis B evidence or CPD where a placement asks for them. We'll explain how to share any required documents securely after you get in touch. We don't collect those documents on the website form.",
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
          "The dental practice pays a fixed Locum Hands booking fee once per booked day. The fee is £40 per day for a dental nurse or hygienist and £60 per day for a dentist. This is separate from the locum's agreed rate. We confirm both amounts before you book.",
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
          "Locum Hands Ltd is a UK-wide dental locum agency. Our registered office is Flat A, 615 Wolseley Road, Plymouth, PL5 1JJ. That address is the registered office, not a public walk-in branch. We work with professionals and practices across England, Scotland, Wales and Northern Ireland.",
      },
      {
        question: "How is my data handled?",
        answer:
          "Details sent through the forms are stored so we can respond, and a notification is prepared for hello@locumhands.co.uk. Please read the privacy notice. The lawful basis, how long enquiry records are kept, and which staff can open them still need to be confirmed by Locum Hands.",
      },
      {
        question: "How do I get in touch?",
        answer:
          "Call 07949 282054, email hello@locumhands.co.uk, or use the contact form. We can't promise a reply by a set time. If you need to add something to an enquiry you have already sent, quote the reference so we don't create a second one.",
      },
    ],
  },
];

export function allFaqs(): Faq[] {
  return faqGroups.flatMap((g) => g.faqs);
}
