import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  HeartIcon,
  MapPinIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = buildPageMetadata({
  title: "Meet Liset Hernandez",
  description:
    "Meet Liset Hernandez, a locum dental nurse and the founder of Locum Hands Ltd, a UK-wide dental locum agency.",
  path: "/about",
});

const values = [
  {
    icon: HeartIcon,
    title: "People first",
    text: "Behind every booking is a clinician and a patient. We never lose sight of that.",
  },
  {
    icon: ShieldIcon,
    title: "Clear about what's needed",
    text: "We'll explain which documents a placement needs. Requirements vary, and we don't pretend every check is already done.",
  },
  {
    icon: MapPinIcon,
    title: "Genuinely UK-wide",
    text: "We work across England, Scotland, Wales and Northern Ireland. The Plymouth address is our registered office.",
  },
  {
    icon: UsersIcon,
    title: "Partnership, not transactions",
    text: "We build lasting relationships with professionals and practices alike.",
  },
];

// Detect at build time whether a real founder photo has been added; if not,
// we render a polished branded placeholder so the page always looks complete.
function founderPhotoExists(): boolean {
  try {
    return fs.existsSync(
      path.join(process.cwd(), "public", siteConfig.founder.photo),
    );
  } catch {
    return false;
  }
}

export default function AboutPage() {
  const hasPhoto = founderPhotoExists();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About Locum Hands"
        title="Putting the right dental hands in the right place"
        description="Locum Hands Ltd is a UK-wide dental locum agency founded by Liset Hernandez, a locum dental nurse. We introduce professionals and practices, and nothing is booked until the details are agreed."
      >
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ]}
          />
        </div>
      </PageHero>

      {/* Founder */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <FounderPortrait hasPhoto={hasPhoto} />
            </div>
            <div className="lg:col-span-3">
              <Eyebrow>Meet Liset</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                Meet Liset
              </h2>
              <p className="mt-1 text-lg font-semibold text-teal-600">
                {siteConfig.founder.name}, locum dental nurse and founder
              </p>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-600">
                <p>Hi, I&apos;m Liset. I&apos;m a mum, a locum dental nurse and the founder of Locum Hands.</p>
                <p>
                  I grew up in Cuba and moved to England on my own. I had to learn a new
                  language and find my feet in a new country. It took me a while to build
                  my confidence, and I&apos;m proud of what I&apos;ve built since then. Outside of
                  dentistry, I love cooking Cuban food.
                </p>
                <p>
                  Being a mum has made me appreciate how much it means to have work that
                  fits around your life. I still work as a locum dental nurse, and I know
                  how much I value being able to pick up the phone and talk things through
                  with someone who understands the job. That&apos;s the kind of support I want
                  people to feel when they get in touch with Locum Hands.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Our values
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm text-navy-600">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission band */}
      <section className="bg-navy-50/50">
        <Container className="py-16 sm:py-24">
          <div className="rounded-3xl bg-gradient-to-br from-navy-700 to-teal-700 p-10 text-center text-white sm:p-16">
            <h2 className="mx-auto max-w-3xl text-2xl font-bold sm:text-3xl">
              Flexible locum work for professionals, and cover you can talk through
              before anything is booked.
            </h2>
            <p className="mt-6 flex flex-wrap justify-center gap-4 text-base font-semibold">
              <Link href="/professionals#register" className="underline">
                Find locum work
              </Link>
              <Link href="/practices#enquiry" className="underline">
                Enquire about cover
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's work together"
        description="Whether you're looking for locum work or need to cover your rota, we'd love to help."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Enquire about cover" }}
      />
    </>
  );
}

function FounderPortrait({ hasPhoto }: { hasPhoto: boolean }) {
  if (hasPhoto) {
    return (
      <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl shadow-xl ring-1 ring-navy-100">
        <Image
          src={siteConfig.founder.photo}
          alt={`${siteConfig.founder.name}, ${siteConfig.founder.role} of ${siteConfig.legalName}`}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
    );
  }

  // Branded placeholder shown until a real headshot is added at
  // public/images/liset-hernandez.jpg
  const initials = siteConfig.founder.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="mx-auto flex aspect-[4/5] w-full max-w-sm flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-navy-700 to-teal-600 text-white shadow-xl ring-1 ring-navy-100">
      <span
        aria-hidden="true"
        className="flex h-28 w-28 items-center justify-center rounded-full bg-white/15 text-4xl font-bold tracking-wide ring-2 ring-white/30"
      >
        {initials}
      </span>
      <p className="mt-6 text-lg font-semibold">{siteConfig.founder.name}</p>
      <p className="text-sm text-navy-100">{siteConfig.founder.role}</p>
    </div>
  );
}
