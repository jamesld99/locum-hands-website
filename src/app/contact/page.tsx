import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { Breadcrumbs } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildPageMetadata } from "@/lib/seo";
import { MailIcon, MapPinIcon, PhoneIcon, ClockIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Contact Locum Hands Ltd for dental locum work or temporary staff cover across the UK. Call, email or send an enquiry and our team will respond promptly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <section className="border-b border-navy-100 bg-gradient-to-b from-teal-50/70 to-white">
        <Container className="py-12 sm:py-16">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              We&apos;d love to hear from you
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-600">
              Questions about finding locum work or booking dental staff? Send us a
              message and we&apos;ll get back to you within one working day.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-navy-900">Get in touch</h2>
              <p className="mt-3 text-navy-600">
                Prefer to call or email? Use the details below, or fill in the form
                and we&apos;ll come back to you.
              </p>
              <ul className="mt-8 space-y-6">
                <ContactItem icon={PhoneIcon} title="Phone" >
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-teal-600">
                    {siteConfig.phoneDisplay}
                  </a>
                </ContactItem>
                <ContactItem icon={MailIcon} title="Email">
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-teal-600">
                    {siteConfig.email}
                  </a>
                </ContactItem>
                <ContactItem icon={MapPinIcon} title="Coverage">
                  <span className="not-italic">
                    UK-wide — England, Scotland, Wales &amp; Northern Ireland
                  </span>
                </ContactItem>
                <ContactItem icon={ClockIcon} title="Opening hours">
                  Monday to Friday, 8:00am – 6:00pm
                </ContactItem>
              </ul>
              <div className="mt-8 rounded-2xl bg-navy-50 p-6">
                <p className="text-sm text-navy-700">
                  We serve dental professionals and practices across the whole of the
                  United Kingdom — England, Scotland, Wales and Northern Ireland.
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-navy-900">Send a message</h2>
                <p className="mt-2 text-navy-600">
                  Fields marked with <span className="text-teal-600">*</span> are
                  required.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({
  icon: Icon,
  title,
  children,
}: {
  icon: (p: { className?: string }) => React.ReactElement;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-teal-50 text-teal-600">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <h3 className="font-semibold text-navy-900">{title}</h3>
        <div className="mt-1 text-navy-600">{children}</div>
      </div>
    </li>
  );
}
