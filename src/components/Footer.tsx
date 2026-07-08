import Image from "next/image";
import Link from "next/link";
import { formatRegisteredOffice } from "@/lib/company";
import { footerNav, siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3" aria-label="Locum Hands Ltd home">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                <Image
                  src="/images/locum-hands-icon.png"
                  alt="Locum Hands Ltd logo"
                  width={44}
                  height={44}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <span className="text-lg font-bold text-white">Locum Hands Ltd</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
              A UK-wide dental locum agency connecting dental nurses, hygienists,
              therapists and dentists with practices that need reliable temporary
              staff.
            </p>
            <address className="mt-4 not-italic text-sm text-navy-200">
              <a href={`tel:${siteConfig.phone}`} className="block hover:text-teal-300">
                {siteConfig.phoneDisplay}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="block hover:text-teal-300">
                {siteConfig.email}
              </a>
              <span className="mt-2 block text-navy-300">
                Proudly serving dental practices &amp; professionals across the UK
              </span>
            </address>
          </div>

          <FooterColumn title="For Professionals" links={footerNav.professionals} />
          <FooterColumn title="For Practices" links={footerNav.practices} />
          <FooterColumn title="Company" links={footerNav.company} />
        </div>

        <div className="mt-12 space-y-4 border-t border-navy-700 pt-8 text-sm text-navy-300">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p>
              &copy; {year} {siteConfig.legalName}. Serving dental practices and
              professionals across the United Kingdom.
            </p>
            <div className="flex gap-4">
              <a href={siteConfig.social.linkedin} className="hover:text-teal-300" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={siteConfig.social.facebook} className="hover:text-teal-300" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </div>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed text-navy-400">
            {siteConfig.legalName} is a company registered in{" "}
            {siteConfig.companiesHouse.jurisdiction}. Company number{" "}
            <a
              href={siteConfig.companiesHouse.url}
              className="text-navy-300 underline decoration-navy-600 underline-offset-2 hover:text-teal-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.companiesHouse.number}
            </a>
            . Registered office: {formatRegisteredOffice()}.{" "}
            <a
              href={siteConfig.companiesHouse.url}
              className="text-navy-300 underline decoration-navy-600 underline-offset-2 hover:text-teal-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Companies House
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
        {title}
      </h2>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-navy-200 hover:text-teal-300">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
