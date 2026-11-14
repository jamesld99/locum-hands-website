import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand, InlineLink } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PracticeForm } from "@/components/forms/PracticeForm";
import { buildPageMetadata } from "@/lib/seo";
import {
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = buildPageMetadata({
  title: "Temporary Dental Staff and Cover",
  description:
    "Enquire about temporary dental staff and booking cover with Locum Hands. Tell us the role and dates. Sending an enquiry does not confirm a booking.",
  path: "/practices",
});

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
                Temporary dental staff and cover for your practice
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-navy-600">
                Locum Hands helps UK practices find temporary dental nurses, hygienists,
                therapists and dentists. Tell us the dates you have in mind, including
                any that are still tentative. An enquiry is a request to check cover,
                not a confirmed booking.
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
                  "Nurses, hygienists, therapists and dentists",
                  "Planned dates and tentative dates are both welcome",
                  "An enquiry does not confirm a booking",
                  "The booking fee and the locum's rate are confirmed before you book",
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
              { icon: SparkleIcon, title: "We check", text: "We look at the role, the place and the dates, then tell you what may be possible." },
              { icon: ShieldIcon, title: "We explain the documents", text: "We'll say which checks apply before anyone is booked. Requirements vary." },
              { icon: UsersIcon, title: "You decide", text: "We confirm the locum's rate and the booking fee before you book." },
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
                  ["Dental Nurses", "Chairside cover. Places we can talk about include Devon and Cornwall, Southampton, Lancashire and Glasgow."],
                  ["Dental Hygienists", "Hygiene cover. Places we can talk about include Hull, London, Glasgow and Edinburgh."],
                  ["Dental Therapists", "Therapy cover, often in the same areas as hygienists, including Oxfordshire and Fife."],
                  ["Dentists", "Locum dentist cover. Places we can talk about include Sutton and wider London."],
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
                Need cover at short notice?
              </h3>
              <p className="mt-3 text-navy-600">
                Tell us the date, even if it is tomorrow. We&apos;ll check who may be
                free. We can&apos;t promise same-day cover, and sending an enquiry
                does not confirm a booking.
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

      <section id="areas" className="scroll-mt-24 bg-white">
        <Container className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Areas we cover</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">
              UK coverage, checked for your dates
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Locum Hands works with dental practices across England, Scotland, Wales
              and Northern Ireland. Places we can talk about include Devon and
              Cornwall, Southampton, Lancashire, Glasgow and London. Ask about any
              other part of the UK and we&apos;ll check who may be free. We don&apos;t
              keep a public office in every town, and we don&apos;t promise that a
              particular day is free.
            </p>
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
                Share the role, the dates and the hours. You can list more than one
                date, or say that the cover is still tentative. We&apos;ll tell you
                whether we can help. Sending the form does not confirm a booking.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-navy-700">
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  We confirm the locum&apos;s rate and the booking fee before you book.
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                  Your details are checked, then emailed to Locum Hands so we can reply.
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
        title="Need to check cover?"
        description="Tell us the role and the dates. We'll say whether we can help. An enquiry is not a booking."
        primary={{ href: "#enquiry", label: "Send a booking enquiry" }}
        secondary={{ href: "/faqs#practices", label: "Read practice FAQs" }}
      />
    </>
  );
}
