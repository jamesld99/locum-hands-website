import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand, InlineLink } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PracticeForm } from "@/components/forms/PracticeForm";
import {
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "For Dental Practices — Book Temporary Dental Staff",
  description:
    "Book reliable, fully-vetted temporary dental staff with Locum Hands. Cover sickness, holidays and gaps with locum nurses, hygienists, therapists and dentists across the UK.",
  alternates: { canonical: "/practices" },
  openGraph: {
    title: "Book Temporary Dental Staff Across the UK | Locum Hands",
    description:
      "Fast, reliable locum cover for UK dental practices. Pre-screened nurses, hygienists, therapists and dentists for planned or last-minute cover.",
    url: "/practices",
  },
};

export default function PracticesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "For Practices", url: "/practices" },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-navy-50 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "For Practices", href: "/practices" },
            ]}
          />
          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow>For dental practices</Eyebrow>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
                Book trusted temporary dental staff, fast
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-600">
                Don&apos;t let an empty surgery cost you. Locum Hands supplies
                pre-screened locum nurses, hygienists, therapists and dentists to
                practices across the UK — for planned cover and last-minute
                emergencies alike.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#enquiry"
                  className="inline-flex items-center justify-center rounded-lg bg-navy-700 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-800"
                >
                  Send a booking enquiry
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border border-navy-200 bg-white px-5 py-3 text-base font-semibold text-navy-700 transition-colors hover:bg-navy-50"
                >
                  See how it works
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-teal-700 p-8 text-white shadow-xl">
              <h2 className="text-xl font-bold">Why practices choose us</h2>
              <ul className="mt-4 space-y-3">
                {[
                  "Every locum pre-screened and compliant",
                  "Rapid response for last-minute sickness",
                  "Nurses, hygienists, therapists & dentists",
                  "Transparent pricing, no hidden fees",
                  "A real person to call, every time",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon className="mt-1 h-5 w-5 flex-none text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Cover your rota in four steps
            </h2>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: PhoneIcon, title: "Tell us your needs", text: "Send a booking enquiry with the role, location, dates and duration." },
              { icon: SparkleIcon, title: "We match", text: "We identify available, pre-screened professionals who fit your requirements." },
              { icon: ShieldIcon, title: "We confirm", text: "We verify compliance and confirm the booking and details with you." },
              { icon: UsersIcon, title: "They arrive ready", text: "Your locum turns up briefed and ready to deliver a full day's care." },
            ].map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-700 font-bold text-white">
                    {i + 1}
                  </span>
                  <Icon className="h-6 w-6 text-teal-500" />
                </div>
                <h3 className="mt-4 font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm text-navy-600">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Roles + reassurance */}
      <section className="bg-navy-50/50">
        <Container className="py-16 sm:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Roles we cover</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">
                The right hands for every gap
              </h2>
              <p className="mt-4 text-navy-600">
                From a single day&apos;s nurse cover to ongoing clinical support, we
                supply the full range of dental roles.
              </p>
              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Dental Nurses", "Chairside support for every specialism"],
                  ["Dental Hygienists", "Keep your hygiene book running"],
                  ["Dental Therapists", "Maximise capacity and access"],
                  ["Dentists", "Associate-style locum cover"],
                ].map(([role, sub]) => (
                  <div key={role} className="rounded-xl border border-navy-100 bg-white p-4">
                    <dt className="font-bold text-navy-900">{role}</dt>
                    <dd className="mt-1 text-sm text-navy-600">{sub}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-sm">
              <ClockIcon className="h-10 w-10 text-teal-500" />
              <h3 className="mt-4 text-2xl font-bold text-navy-900">
                Last-minute cover? We&apos;re ready.
              </h3>
              <p className="mt-3 text-navy-600">
                Sickness doesn&apos;t give notice. When you need cover today or
                tomorrow, we move fast to mobilise vetted staff so your list still
                runs and your patients are looked after.
              </p>
              <p className="mt-4 text-navy-600">
                Want to plan ahead? Read our guide on{" "}
                <InlineLink href="/blog/how-to-cover-temporary-dental-staff-shortages">
                  covering staff shortages without downtime
                </InlineLink>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="scroll-mt-24 bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Eyebrow>Booking enquiry</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">
                Tell us what you need
              </h2>
              <p className="mt-4 text-navy-600">
                Share your requirements and we&apos;ll come back to you quickly with
                available, fully-vetted locum staff. For urgent cover, mention the
                date and we&apos;ll prioritise your request.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-navy-700">
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  No obligation — get a quote and availability first.
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  Your details are validated and stored securely.
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  Need to talk now? <InlineLink href="/contact">Contact the team</InlineLink>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
                <PracticeForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Need cover you can count on?"
        description="Join the UK practices that trust Locum Hands to keep their surgeries running. Send an enquiry today."
        primary={{ href: "#enquiry", label: "Send a booking enquiry" }}
        secondary={{ href: "/faqs#practices", label: "Read practice FAQs" }}
      />
    </>
  );
}
