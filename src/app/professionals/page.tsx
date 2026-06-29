import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand, InlineLink } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ProfessionalForm } from "@/components/forms/ProfessionalForm";
import {
  CalendarIcon,
  CheckIcon,
  HeartIcon,
  MapPinIcon,
  ShieldIcon,
  WalletIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "For Dental Professionals — Find Locum Work Across the UK",
  description:
    "Register with Locum Hands to find dental nurse locum jobs, hygienist locum work and dentist placements across the UK. Flexible hours, competitive pay and full compliance support.",
  alternates: { canonical: "/professionals" },
  openGraph: {
    title: "Find Dental Locum Work Across the UK | Locum Hands",
    description:
      "Flexible dental locum work for nurses, hygienists, therapists and dentists. Register free and choose where and when you work.",
    url: "/professionals",
  },
};

const benefits = [
  {
    icon: CalendarIcon,
    title: "Total flexibility",
    text: "You choose your days, hours and locations. Accept the bookings that suit you and decline the ones that don't.",
  },
  {
    icon: WalletIcon,
    title: "Competitive, transparent pay",
    text: "Know exactly what you'll earn, with fair rates and no hidden deductions — plus premiums for short-notice cover.",
  },
  {
    icon: ShieldIcon,
    title: "Compliance made easy",
    text: "We help keep your GDC registration, indemnity, DBS and immunisation records organised so you're always ready.",
  },
  {
    icon: MapPinIcon,
    title: "Work near you, UK-wide",
    text: "Set your location preferences and get matched with placements close to home — or further afield if you fancy it.",
  },
  {
    icon: HeartIcon,
    title: "Real human support",
    text: "A friendly team that knows your name and has your back, from your first placement onwards.",
  },
  {
    icon: CheckIcon,
    title: "Free to join",
    text: "It's completely free for professionals. We're paid by the practices that book you.",
  },
];

export default function ProfessionalsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "For Professionals", url: "/professionals" },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "For Professionals", href: "/professionals" },
            ]}
          />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>For dental professionals</Eyebrow>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
                Find dental locum work that fits your life
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-600">
                Whether you&apos;re a dental nurse, hygienist, therapist or dentist,
                Locum Hands helps you find flexible locum placements across the UK.
                Register once, set your availability, and let suitable work come to
                you.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-navy-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium ring-1 ring-navy-100">
                  <CheckIcon className="h-4 w-4 text-teal-500" /> Free to join
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium ring-1 ring-navy-100">
                  <CheckIcon className="h-4 w-4 text-teal-500" /> UK-wide placements
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 font-medium ring-1 ring-navy-100">
                  <CheckIcon className="h-4 w-4 text-teal-500" /> You stay in control
                </span>
              </div>
            </div>
            <div className="rounded-3xl bg-navy-700 p-8 text-white shadow-xl">
              <h2 className="text-xl font-bold">Roles we place</h2>
              <ul className="mt-4 space-y-3">
                {[
                  ["Dental Nurses", "From newly qualified to highly experienced"],
                  ["Dental Hygienists", "NHS and private placements"],
                  ["Dental Therapists", "Make the most of your full scope"],
                  ["Dentists", "Associate-style locum cover, UK-wide"],
                ].map(([role, sub]) => (
                  <li key={role} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 h-5 w-5 flex-none text-teal-300" />
                    <span>
                      <span className="font-semibold">{role}</span>
                      <span className="block text-sm text-navy-200">{sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-navy-200">
                Curious about pay and getting started?{" "}
                <InlineLink href="/blog/dental-nurse-locum-jobs-uk-guide">
                  Read our locum guide
                </InlineLink>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section id="benefits" className="scroll-mt-24 bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Why join Locum Hands</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              The benefits of locum work, made simple
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-navy-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Registration form */}
      <section id="register" className="scroll-mt-24 bg-navy-50/50">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Eyebrow>Register your interest</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">
                Join in minutes
              </h2>
              <p className="mt-4 text-navy-600">
                Fill in your details and our team will verify your information and be
                in touch about suitable bookings. It&apos;s free, and you&apos;re never
                under any obligation to accept a placement.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-navy-700">
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  We&apos;ll only use your details to match you with locum work.
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  Your data is validated and stored securely.
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  Prefer to talk first? <InlineLink href="/contact">Contact us</InlineLink>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
                <ProfessionalForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Got questions before you register?"
        description="Browse our FAQs for professionals or get in touch with the team — we're happy to help."
        primary={{ href: "/faqs#professionals", label: "Read professional FAQs" }}
        secondary={{ href: "/contact", label: "Contact us" }}
      />
    </>
  );
}
