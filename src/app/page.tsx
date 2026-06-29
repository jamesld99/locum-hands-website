import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { CtaBand, InlineLink } from "@/components/sections";
import {
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  HeartIcon,
  MapPinIcon,
  ShieldIcon,
  SparkleIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/icons";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "UK Dental Locum Agency | Nurses, Hygienists & Dentists",
  description:
    "Locum Hands Ltd connects dental nurses, hygienists and dentists with practices across the UK. Find flexible locum work or book reliable, fully-vetted temporary dental staff fast.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 via-navy-700 to-teal-700">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-300 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-navy-400 blur-3xl" />
        </div>
        <Container className="relative py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-teal-100 ring-1 ring-inset ring-white/20">
                <MapPinIcon className="h-4 w-4" />
                UK-wide dental locum agency
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                The right dental hands, <span className="text-teal-300">exactly when you need them.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
                Locum Hands connects dental nurses, hygienists, therapists and
                dentists with practices across the United Kingdom. Flexible work for
                professionals, reliable cover for practices.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/professionals#register" variant="primary">
                  Find locum work
                </ButtonLink>
                <ButtonLink
                  href="/practices#enquiry"
                  variant="outline"
                  className="!border-white/30 !bg-white/10 !text-white hover:!bg-white/20"
                >
                  Book locum staff
                </ButtonLink>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
                <Stat value="UK-wide" label="Coverage" />
                <Stat value="4 roles" label="Nurses to dentists" />
                <Stat value="Fast" label="Cover, even last-minute" />
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-navy-900/40">
                <Image
                  src="/images/locum-hands-logo.png"
                  alt="Locum Hands Ltd — supplying dental locums across the UK"
                  width={420}
                  height={420}
                  className="mx-auto h-auto w-full max-w-xs object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust strip */}
      <section className="border-b border-navy-100 bg-white">
        <Container className="py-8">
          <ul className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {[
              { icon: ShieldIcon, text: "Fully vetted & compliant" },
              { icon: ClockIcon, text: "Rapid, reliable cover" },
              { icon: WalletIcon, text: "Fair, transparent rates" },
              { icon: HeartIcon, text: "Genuine, human support" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex flex-col items-center gap-2 text-navy-700">
                <Icon className="h-7 w-7 text-teal-500" />
                <span className="text-sm font-semibold">{text}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Two audiences */}
      <section className="bg-navy-50/50">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>One agency, two great fits</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Whether you provide care or need cover, we&apos;ve got you
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <AudienceCard
              tag="For professionals"
              title="Find flexible dental locum work"
              description="Choose where and when you work, earn competitive rates and let us handle the admin. Perfect for dental nurses, hygienists, therapists and dentists."
              points={[
                "Work that fits around your life",
                "Competitive, transparent pay",
                "Compliance support, sorted",
                "Placements near you, UK-wide",
              ]}
              cta={{ href: "/professionals#register", label: "Register as a professional" }}
              accent="teal"
            />
            <AudienceCard
              tag="For practices"
              title="Book trusted temporary dental staff"
              description="Cover holidays, sickness and sudden gaps with pre-screened locums. Planned cover or last-minute emergencies — we keep your surgery running."
              points={[
                "Vetted, compliant professionals",
                "Fast cover, even at short notice",
                "Nurses, hygienists, therapists & dentists",
                "No downtime, no lost revenue",
              ]}
              cta={{ href: "/practices#enquiry", label: "Send a booking enquiry" }}
              accent="navy"
            />
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
              Simple, fast and reliable
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Three straightforward steps to flexible work or dependable cover.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            <Step
              n={1}
              icon={UsersIcon}
              title="Tell us what you need"
              text="Register as a professional with your preferences, or send a booking enquiry as a practice. It takes minutes."
            />
            <Step
              n={2}
              icon={SparkleIcon}
              title="We match you"
              text="We pair the right pre-screened professional with the right placement, based on role, location and availability."
            />
            <Step
              n={3}
              icon={CalendarIcon}
              title="Get to work"
              text="Confirm the details and you're set. We handle the admin so professionals and practices can focus on patients."
            />
          </ol>
        </Container>
      </section>

      {/* Why Locum Hands */}
      <section className="bg-navy-50/50">
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Why Locum Hands</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                A dental locum agency that actually cares
              </h2>
              <p className="mt-4 text-lg text-navy-600">
                We treat clinicians and practices as partners, not numbers. That
                means honest rates, real human support and a relentless focus on
                getting the match right.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "UK-wide coverage across England, Scotland, Wales and Northern Ireland",
                  "Every professional pre-screened for GDC registration, indemnity and DBS",
                  "Transparent rates with no hidden deductions",
                  "A dedicated team you can actually reach",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span className="text-navy-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <InlineLink href="/about">Read the Locum Hands story</InlineLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureTile icon={ShieldIcon} title="Compliance first" text="GDC, indemnity, DBS and immunisation checks as standard." />
              <FeatureTile icon={ClockIcon} title="Fast response" text="Last-minute sickness? We move quickly to cover your list." />
              <FeatureTile icon={MapPinIcon} title="Local knowledge" text="Real understanding of practices and locums in your area." />
              <FeatureTile icon={HeartIcon} title="People-first" text="Supportive, straightforward and always on your side." />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog preview */}
      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>From the blog</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
                Guides for dental locums and practices
              </h2>
            </div>
            <InlineLink href="/blog">View all articles</InlineLink>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-600">
                  {formatDate(post.date)} · {post.readingTime} min read
                </span>
                <h3 className="mt-3 text-lg font-bold text-navy-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-teal-700">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-navy-600">{post.description}</p>
                <div className="mt-4">
                  <InlineLink href={`/blog/${post.slug}`}>Read article</InlineLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title="Ready to get started?"
        description="Join the UK dental community that puts the right hands in the right place. Register for work or book staff in minutes."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Book locum staff" }}
      />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold text-white">{value}</dt>
      <dd className="mt-1 text-sm text-navy-200">{label}</dd>
    </div>
  );
}

function AudienceCard({
  tag,
  title,
  description,
  points,
  cta,
  accent,
}: {
  tag: string;
  title: string;
  description: string;
  points: string[];
  cta: { href: string; label: string };
  accent: "teal" | "navy";
}) {
  const ring = accent === "teal" ? "ring-teal-200" : "ring-navy-200";
  const badge =
    accent === "teal" ? "bg-teal-100 text-teal-800" : "bg-navy-100 text-navy-800";
  return (
    <div className={`flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ${ring}`}>
      <span className={`inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badge}`}>
        {tag}
      </span>
      <h3 className="mt-4 text-2xl font-bold text-navy-900">{title}</h3>
      <p className="mt-3 text-navy-600">{description}</p>
      <ul className="mt-6 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-teal-500" />
            <span className="text-navy-700">{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <ButtonLink href={cta.href} variant={accent === "teal" ? "primary" : "secondary"}>
          {cta.label}
        </ButtonLink>
      </div>
    </div>
  );
}

function Step({
  n,
  icon: Icon,
  title,
  text,
}: {
  n: number;
  icon: (p: { className?: string }) => React.ReactElement;
  title: string;
  text: string;
}) {
  return (
    <li className="relative rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-teal-500 text-lg font-bold text-white">
          {n}
        </span>
        <Icon className="h-7 w-7 text-navy-400" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-navy-900">{title}</h3>
      <p className="mt-2 text-navy-600">{text}</p>
    </li>
  );
}

function FeatureTile({
  icon: Icon,
  title,
  text,
}: {
  icon: (p: { className?: string }) => React.ReactElement;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
      <Icon className="h-8 w-8 text-teal-500" />
      <h3 className="mt-4 font-bold text-navy-900">{title}</h3>
      <p className="mt-1 text-sm text-navy-600">{text}</p>
    </div>
  );
}
