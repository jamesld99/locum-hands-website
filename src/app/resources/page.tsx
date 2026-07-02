import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand, InlineLink } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { getGuidesByAudience, type Guide } from "@/lib/guides";

export const metadata: Metadata = buildPageMetadata({
  title: "Dental Locum Guides",
  description:
    "Free guides for dental professionals and practices: finding locum work in the UK, benefits of locum work, why practices choose agencies and staffing solutions.",
  path: "/resources",
});

export default function ResourcesPage() {
  const professionalGuides = getGuidesByAudience("professionals");
  const practiceGuides = getGuidesByAudience("practices");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow>Resource centre</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Guides for dental locums and practices
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              Practical, in-depth guides to help dental professionals build flexible
              careers and help UK practices solve their staffing challenges. Free to
              read, written by people who know dentistry.{" "}
              <InlineLink href="/blog">Read shorter articles on our blog</InlineLink>.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          <GuideGroup
            id="for-professionals"
            eyebrow="For professionals"
            title="Build your dental locum career"
            description="Everything you need to find work, get booked and make the most of locum life."
            guides={professionalGuides}
          />

          <div className="mt-16">
            <GuideGroup
              id="for-practices"
              eyebrow="For practices"
              title="Solve your staffing challenges"
              description="How UK dental practices cover gaps, choose a partner and keep surgeries running."
              guides={practiceGuides}
            />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Put these guides into action"
        description="Find flexible locum work or book reliable temporary dental staff with Locum Hands."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Book locum staff" }}
      />
    </>
  );
}

function GuideGroup({
  id,
  eyebrow,
  title,
  description,
  guides,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  guides: Guide[];
}) {
  return (
    <div id={id} className="scroll-mt-24">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-navy-600">{description}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
              Guide · {guide.readingTime} min read
            </span>
            <h3 className="mt-3 text-xl font-bold text-navy-900">
              <Link href={`/resources/${guide.slug}`} className="hover:text-teal-700">
                {guide.title}
              </Link>
            </h3>
            <p className="mt-2 flex-1 text-sm text-navy-600">{guide.description}</p>
            <div className="mt-4">
              <InlineLink href={`/resources/${guide.slug}`}>Read guide</InlineLink>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
