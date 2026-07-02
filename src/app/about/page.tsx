import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs, CtaBand, InlineLink, PageHero } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  CheckIcon,
  HeartIcon,
  MapPinIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Locum Hands Ltd is a UK-wide dental locum agency founded by Lizette Hernandez. Discover our story, values and commitment to connecting dental professionals with practices.",
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
    title: "Compliance always",
    text: "Rigorous vetting isn't optional — it's the foundation of safe, professional cover.",
  },
  {
    icon: MapPinIcon,
    title: "Genuinely UK-wide",
    text: "Real reach and local knowledge across England, Scotland, Wales and Northern Ireland.",
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
        description="Locum Hands Ltd is a family-run, UK-wide dental locum agency founded on a simple belief: dental professionals deserve flexible, well-supported work, and practices deserve reliable, fully-vetted cover."
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
              <Eyebrow>Meet the founder</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                {siteConfig.founder.name}
              </h2>
              <p className="mt-1 text-lg font-semibold text-teal-600">
                {siteConfig.founder.role}, {siteConfig.legalName}
              </p>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-600">
                <p>
                  Locum Hands was founded by Lizette Hernandez, who saw first-hand
                  how stressful and time-consuming finding good dental cover could be
                  — for clinicians and practices alike. She set out to build an agency
                  that does things differently: personal, dependable and genuinely on
                  your side.
                </p>
                <p>
                  Lizette brings a deep understanding of the dental sector and a
                  passion for matching talented professionals with the practices that
                  need them. Her vision is an agency where dental nurses, hygienists,
                  therapists and dentists feel supported to build careers on their own
                  terms, and where practices can rely on compliant, high-quality cover
                  whenever they need it.
                </p>
                <p>
                  As a family-run business, Locum Hands is built on relationships, not
                  transactions. That hands-on, human approach runs through everything
                  we do — and it&apos;s why professionals and practices across the UK
                  choose to work with us.
                </p>
              </div>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Deep dental-sector expertise",
                  "A genuinely personal service",
                  "Family-run values, UK-wide reach",
                  "Committed to compliance and care",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-navy-700">
                    <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-navy-50/50">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900">
              A family-run agency built by people who know dentistry
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-navy-600">
              <p>
                Locum Hands began with a frustration shared by professionals and
                practice managers alike: finding good locum cover was harder than it
                should be. Clinicians wanted flexibility without the admin headache.
                Practices wanted reliable, compliant staff without the panic of a
                last-minute gap.
              </p>
              <p>
                So we built an agency to fix exactly that. One that treats clinicians
                as partners rather than line items, that takes compliance seriously,
                and that picks up the phone when you need it. From a single dental
                nurse covering a sick day to ongoing clinical support, we focus on
                getting the match right — every time.
              </p>
              <p>
                Today, Locum Hands connects dental nurses, hygienists, therapists and
                dentists with practices across the United Kingdom. We&apos;re proud to
                help professionals build careers on their own terms, and to keep
                surgeries running so patients get the care they need. New to locum
                work?{" "}
                <InlineLink href="/resources/how-to-find-dental-locum-work-uk">
                  Read our guide to finding dental locum work
                </InlineLink>
              </p>
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
              &ldquo;Our mission is simple: make dental locum work effortless for
              professionals and dependable for practices — across the whole of the
              UK.&rdquo;
            </h2>
            <p className="mt-6 text-navy-100">
              {siteConfig.founder.name}, {siteConfig.founder.role}
            </p>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Let's work together"
        description="Whether you're looking for locum work or need to cover your rota, we'd love to help."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Book locum staff" }}
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
  // public/images/lizette-hernandez.jpg
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
