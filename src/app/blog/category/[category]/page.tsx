import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PostCard } from "@/components/blog";
import { buildNotFoundMetadata, buildPageMetadata } from "@/lib/seo";
import {
  categories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/blog";

type Params = { category: string };

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return buildNotFoundMetadata("Category not found");
  return buildPageMetadata({
    title: `${cat.name} Blog`,
    description: cat.description,
    path: `/blog/category/${cat.slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const categoryPosts = getPostsByCategory(cat.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: cat.name, url: `/blog/category/${cat.slug}` },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: cat.name, href: `/blog/category/${cat.slug}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow>Category</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              {cat.name}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              {cat.description}
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          {categoryPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categoryPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-navy-600">No articles in this category yet.</p>
          )}
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
