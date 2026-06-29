import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { PostCard } from "@/components/blog";
import { getAllTags, getPostsByTagSlug, tagToSlug } from "@/lib/blog";

type Params = { tag: string };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}

function tagLabel(tagSlug: string): string | undefined {
  return getAllTags().find((t) => tagToSlug(t) === tagSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  const label = tagLabel(tag);
  if (!label) return { title: "Tag not found" };
  return {
    title: `${label} — Dental Locum Articles`,
    description: `Articles tagged “${label}” from the Locum Hands dental locum blog, covering tips and insight for UK dental professionals and practices.`,
    alternates: { canonical: `/blog/tag/${tag}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  const label = tagLabel(tag);
  if (!label) notFound();

  const tagged = getPostsByTagSlug(tag);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: `#${label}`, url: `/blog/tag/${tag}` },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: `#${label}`, href: `/blog/tag/${tag}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow>Tag</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              #{label}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              Articles tagged &ldquo;{label}&rdquo;.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-20">
          {tagged.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {tagged.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-navy-600">No articles with this tag yet.</p>
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
