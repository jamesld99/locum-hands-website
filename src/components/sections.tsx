import Link from "next/link";
import { ButtonLink, Container } from "./ui";
import { ArrowRightIcon } from "./icons";

export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-gradient-to-br from-navy-700 to-navy-900">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-navy-100">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={primary.href} variant="primary">
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline" className="!border-navy-300 !bg-transparent !text-white hover:!bg-navy-800">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-navy-400">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-navy-600">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-teal-600">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-navy-300">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/60 to-white">
      <Container className="py-14 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && (
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-teal-600">
              {eyebrow}
            </span>
          )}
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}

export function InlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 font-semibold text-teal-600 hover:text-teal-700"
    >
      {children}
      <ArrowRightIcon />
    </Link>
  );
}
