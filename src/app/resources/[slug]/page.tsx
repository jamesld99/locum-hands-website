import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, guideSchema } from "@/lib/schema";
import { PostBody } from "@/components/blog";
import {
  formatGuideDate,
  getGuideBySlug,
  guides,
} from "@/lib/guides";
import { getPostBySlug } from "@/lib/blog";
import { ArrowRightIcon } from "@/components/icons";

type Params = { slug: string };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };

  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.keyword],
    alternates: { canonical: `/resources/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `/resources/${guide.slug}`,
      modifiedTime: guide.updated,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const audienceLabel =
    guide.audience === "practices" ? "For practices" : "For professionals";

  const relatedPosts = guide.relatedPosts
    .map((s) => getPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedGuides = guide.relatedGuides
    .map((s) => getGuideBySlug(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const primaryCta =
    guide.audience === "practices"
      ? { href: "/practices#enquiry", label: "Send a booking enquiry" }
      : { href: "/professionals#register", label: "Register as a professional" };

  return (
    <>
      <JsonLd
        data={[
          guideSchema({
            title: guide.title,
            description: guide.description,
            slug: guide.slug,
            updated: guide.updated,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Resources", url: "/resources" },
            { name: guide.title, url: `/resources/${guide.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Resources", href: "/resources" },
              { name: guide.title, href: `/resources/${guide.slug}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Link
              href={`/resources#${guide.audience === "practices" ? "for-practices" : "for-professionals"}`}
              className="text-sm font-semibold uppercase tracking-wider text-teal-600 hover:text-teal-700"
            >
              {audienceLabel}
            </Link>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-navy-900 sm:text-5xl">
              {guide.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-500">
              <span>{guide.readingTime} min read</span>
              <span aria-hidden="true">•</span>
              <span>Updated {formatGuideDate(guide.updated)}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Article */}
            <article className="lg:col-span-2">
              <p className="text-xl font-medium leading-relaxed text-navy-800">
                {guide.description}
              </p>
              <hr className="my-8 border-navy-100" />
              <PostBody blocks={guide.body} />

              <div className="mt-10 rounded-2xl bg-navy-50 p-6">
                <p className="text-navy-700">
                  <strong className="text-navy-900">Ready to take the next step?</strong>{" "}
                  <Link href={primaryCta.href} className="font-semibold text-teal-600 hover:text-teal-700">
                    {primaryCta.label}
                  </Link>{" "}
                  with Locum Hands.
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Next steps
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li>
                    <Link href={primaryCta.href} className="inline-flex items-center gap-1 font-semibold text-teal-600 hover:text-teal-700">
                      {primaryCta.label} <ArrowRightIcon />
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-navy-600 hover:text-teal-600">
                      Talk to our team
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="text-navy-600 hover:text-teal-600">
                      Read the FAQs
                    </Link>
                  </li>
                </ul>
              </div>

              {relatedGuides.length > 0 && (
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                    Related guides
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {relatedGuides.map((g) => (
                      <li key={g.slug}>
                        <Link href={`/resources/${g.slug}`} className="font-semibold text-navy-800 hover:text-teal-600">
                          {g.title}
                        </Link>
                        <p className="mt-1 text-xs text-navy-500">{g.readingTime} min read</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                    Related articles
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {relatedPosts.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="font-semibold text-navy-800 hover:text-teal-600">
                          {p.title}
                        </Link>
                        <p className="mt-1 text-xs text-navy-500">{p.readingTime} min read</p>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/blog"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-600 hover:text-teal-700"
                  >
                    Visit the blog <ArrowRightIcon />
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Find work or book staff today"
        description="Locum Hands connects dental professionals and practices across the United Kingdom."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Book locum staff" }}
      />
    </>
  );
}
