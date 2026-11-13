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
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "UK Dental Locum Agency and Recruitment",
  description:
    "Locum Hands is a UK dental locum agency and recruitment service for dental nurses, hygienists, therapists and dentists, and for practices booking temporary cover.",
  path: "/",
});

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-800 via-navy-700 to-teal-700">
        <Container className="py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-teal-100 ring-1 ring-inset ring-white/20">
                <MapPinIcon className="h-4 w-4" />
                UK dental locum agency and recruitment
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                A UK dental locum agency for the days you need cover.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100">
                Locum Hands introduces dental nurses, hygienists, therapists and
                dentists to practices across the United Kingdom. Find locum work,
                or enquire about temporary cover. Nothing is booked until you have
                agreed the details.
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
                  Enquire about cover
                </ButtonLink>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6">
                <Stat value="UK-wide" label="Coverage" />
                <Stat value="4 roles" label="Nurses to dentists" />
                <Stat value="Personal" label="A real person to talk to" />
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
              { icon: ShieldIcon, text: "Documents explained for each placement" },
              { icon: ClockIcon, text: "Tell us the dates and we'll check" },
              { icon: WalletIcon, text: "Rates agreed before you book" },
              { icon: HeartIcon, text: "A real person to talk to" },
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
              description="Dental locum work for nurses, hygienists, therapists and dentists. Tell us where you want to work and the kind of bookings you are looking for."
              points={[
                "Work that fits around your life",
                "You know the agreed rate before you accept",
                "We'll explain which documents a placement needs",
                "Locations across the UK",
              ]}
              cta={{ href: "/professionals#register", label: "Register as a professional" }}
              accent="teal"
            />
            <AudienceCard
              tag="For practices"
              title="Enquire about temporary dental cover"
              description="Temporary dental staff for holidays, sickness and other gaps. Tell us the dates, even if they are still tentative. An enquiry is not a confirmed booking."
              points={[
                "Nurses, hygienists, therapists and dentists",
                "Planned cover and short-notice requests",
                "The booking fee is confirmed before you book",
                "An enquiry is not a confirmed booking",
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
              Tell us, talk it through, then decide
            </h2>
            <p className="mt-4 text-lg text-navy-600">
              Three steps. You see the details before anything is agreed.
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
              title="We talk it through"
              text="We look at the role, the place and the dates, then come back to you. An enquiry is not a booking."
            />
            <Step
              n={3}
              icon={CalendarIcon}
              title="Agree the details"
              text="You see the rate and the arrangements before you decide. We help with the practical side once both sides are happy."
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
                We treat clinicians and practices as people we can talk to. You
                hear the agreed rate before a booking goes ahead, and you can
                reach a real person when something changes.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "UK-wide coverage across England, Scotland, Wales and Northern Ireland",
                  "We'll explain the GDC registration, indemnity and disclosure check a placement needs",
                  "You know the agreed rate before you accept a booking",
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
                <InlineLink href="/about">Meet Liset</InlineLink>
                {" · "}
                <InlineLink href="/resources">Browse our guides</InlineLink>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureTile icon={ShieldIcon} title="Clear about documents" text="Requirements vary by role and by country in the UK. We'll explain what to share." />
              <FeatureTile icon={ClockIcon} title="Dates you can talk through" text="Tell us if cover is planned or still tentative. We can't promise same-day cover." />
              <FeatureTile icon={MapPinIcon} title="UK-wide" text="Ask us about the place and the dates. We'll check who may be free." />
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
        description="Register for locum work, or send a cover enquiry. Nothing is booked until the details are agreed."
        primary={{ href: "/professionals#register", label: "Find locum work" }}
        secondary={{ href: "/practices#enquiry", label: "Enquire about cover" }}
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
