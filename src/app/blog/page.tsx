import type { Metadata } from "next";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PostCard } from "@/components/blog";
import {
  categories,
  getAllPosts,
  getAllTags,
  tagToSlug,
} from "@/lib/blog";

export const metadata: Metadata = {
  title: "Dental Locum Blog — Guides for Professionals & Practices",
  description:
    "Expert guides on dental nurse locum jobs, hygienist locum work, choosing a dentist locum agency and booking temporary dental staff across the UK.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow>The Locum Hands blog</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Dental locum insights & guides
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              Practical advice for dental nurses, hygienists, therapists and dentists
              seeking locum work, plus staffing insight for UK dental practices.
            </p>
          </div>
          <nav aria-label="Blog categories" className="mt-6 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-700 ring-1 ring-navy-100 hover:text-teal-600"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          {/* Featured */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-12 block overflow-hidden rounded-3xl border border-navy-100 bg-gradient-to-br from-navy-700 to-teal-700 p-8 text-white shadow-sm sm:p-12"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                Featured · {featured.readingTime} min read
              </span>
              <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight group-hover:underline sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-2xl text-navy-100">{featured.description}</p>
              <span className="mt-6 inline-block font-semibold text-teal-200">
                Read the article →
              </span>
            </Link>
          )}

          <div className="grid gap-12 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <div className="grid gap-8 sm:grid-cols-2">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Categories
                </h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/blog/category/${category.slug}`}
                        className="text-navy-600 hover:text-teal-600"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Popular tags
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href={`/blog/tag/${tagToSlug(tag)}`}
                        className="inline-block rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700 hover:bg-teal-50 hover:text-teal-700"
                      >
                        #{tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Ready to take the next step?"
        description="Find flexible locum work or book reliable temporary dental staff with Locum Hands."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Book locum staff" }}
      />
    </>
  );
}
