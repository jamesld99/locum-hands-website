import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildNotFoundMetadata, buildPageMetadata } from "@/lib/seo";
import { PostBody, TagList } from "@/components/blog";
import {
  formatDate,
  getCategoryBySlug,
  getPostBySlug,
  getRelatedPosts,
  posts,
} from "@/lib/blog";
import { ArrowRightIcon } from "@/components/icons";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return buildNotFoundMetadata("Article not found");

  return buildPageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    keywords: post.tags,
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
    authors: [post.author],
    tags: post.tags,
    ...(post.image && {
      image: { url: post.image, alt: post.title },
    }),
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const category = getCategoryBySlug(post.categorySlug);
  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            slug: post.slug,
            date: post.date,
            updated: post.updated,
            author: post.author,
            image: post.image,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            ...(category
              ? [{ name: category.name, url: `/blog/category/${category.slug}` }]
              : []),
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              ...(category
                ? [{ name: category.name, href: `/blog/category/${category.slug}` }]
                : []),
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            {category && (
              <Link
                href={`/blog/category/${category.slug}`}
                className="text-sm font-semibold uppercase tracking-wider text-teal-600 hover:text-teal-700"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-navy-900 sm:text-5xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-navy-500">
              <span>By {post.author}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime} min read</span>
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
                {post.description}
              </p>
              <hr className="my-8 border-navy-100" />
              <PostBody blocks={post.body} />

              <div className="mt-12 border-t border-navy-100 pt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Tags
                </h2>
                <div className="mt-3">
                  <TagList tags={post.tags} />
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-navy-50 p-6">
                <p className="text-navy-700">
                  <strong className="text-navy-900">Ready to act on this?</strong>{" "}
                  {post.categorySlug === "for-practices" ? (
                    <>
                      Send a{" "}
                      <Link href="/practices#enquiry" className="font-semibold text-teal-600 hover:text-teal-700">
                        booking enquiry
                      </Link>{" "}
                      and we&apos;ll find you reliable cover.
                    </>
                  ) : (
                    <>
                      <Link href="/professionals#register" className="font-semibold text-teal-600 hover:text-teal-700">
                        Register with Locum Hands
                      </Link>{" "}
                      to find flexible locum work across the UK.
                    </>
                  )}
                </p>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {related.length > 0 && (
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                    Related articles
                  </h2>
                  <ul className="mt-4 space-y-4">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="font-semibold text-navy-800 hover:text-teal-600">
                          {p.title}
                        </Link>
                        <p className="mt-1 text-xs text-navy-500">
                          {formatDate(p.date)} · {p.readingTime} min read
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Helpful guides
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {post.categorySlug === "for-practices" ? (
                    <>
                      <SidebarLink href="/resources/guide-to-temporary-dental-staffing-solutions">
                        Guide to temporary dental staffing
                      </SidebarLink>
                      <SidebarLink href="/resources/why-dental-practices-choose-locum-agencies">
                        Why practices choose locum agencies
                      </SidebarLink>
                    </>
                  ) : (
                    <>
                      <SidebarLink href="/resources/how-to-find-dental-locum-work-uk">
                        How to find dental locum work
                      </SidebarLink>
                      <SidebarLink href="/resources/benefits-of-working-as-a-dental-locum">
                        Benefits of working as a locum
                      </SidebarLink>
                    </>
                  )}
                  <SidebarLink href="/faqs">Read the FAQs</SidebarLink>
                </ul>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-navy-700 to-teal-700 p-6 text-white shadow-sm">
                <h2 className="text-lg font-bold">
                  {post.categorySlug === "for-practices"
                    ? "Need cover?"
                    : "Looking for work?"}
                </h2>
                <p className="mt-2 text-sm text-navy-100">
                  {post.categorySlug === "for-practices"
                    ? "Book reliable, vetted locum staff across the UK."
                    : "Find flexible dental locum work that fits your life."}
                </p>
                <Link
                  href={
                    post.categorySlug === "for-practices"
                      ? "/practices#enquiry"
                      : "/professionals#register"
                  }
                  className="mt-4 inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-800 hover:bg-navy-50"
                >
                  {post.categorySlug === "for-practices"
                    ? "Send an enquiry"
                    : "Register now"}
                  <ArrowRightIcon />
                </Link>
              </div>
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

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="text-navy-600 hover:text-teal-600">
        {children}
      </Link>
    </li>
  );
}
