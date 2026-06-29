import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { allFaqs, faqGroups } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "FAQs — Dental Locum Questions Answered",
  description:
    "Frequently asked questions about Locum Hands for dental professionals and practices: registration, pay, compliance, booking temporary dental staff and more.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "FAQs", url: "/faqs" },
          ]),
          faqSchema(allFaqs()),
        ]}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "FAQs", href: "/faqs" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow>Frequently asked questions</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Your questions, answered
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              Everything dental professionals and practices ask us most. Can&apos;t
              find what you&apos;re looking for?{" "}
              <Link href="/contact" className="font-semibold text-teal-600 hover:text-teal-700">
                Get in touch
              </Link>
              .
            </p>
            <nav aria-label="FAQ sections" className="mt-6 flex flex-wrap gap-3">
              {faqGroups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-700 ring-1 ring-navy-100 hover:text-teal-600"
                >
                  {group.title}
                </a>
              ))}
            </nav>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl space-y-16">
            {faqGroups.map((group) => (
              <div key={group.id} id={group.id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-navy-900">{group.title}</h2>
                <div className="mt-6 divide-y divide-navy-100 rounded-2xl border border-navy-100 bg-white">
                  {group.faqs.map((faq) => (
                    <details key={faq.question} className="group p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-navy-900">
                        <span>{faq.question}</span>
                        <span
                          aria-hidden="true"
                          className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-teal-50 text-teal-600 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-navy-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Still have questions?"
        description="Our friendly team is happy to help dental professionals and practices alike."
        primary={{ href: "/contact", label: "Contact us" }}
        secondary={{ href: "/blog", label: "Read the blog" }}
      />
    </>
  );
}
