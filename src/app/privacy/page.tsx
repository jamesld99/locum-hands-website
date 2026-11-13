import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";
import { formatRegisteredOffice } from "@/lib/company";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Notice",
  description:
    "How Locum Hands Ltd handles enquiries sent through the website forms, and which privacy decisions are still to be confirmed.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Privacy notice", url: "/privacy" },
        ])}
      />
      <Container className="py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Privacy notice", href: "/privacy" },
          ]}
        />
        <article className="mx-auto mt-8 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-navy-900">Privacy notice</h1>
          <p className="mt-4 text-lg text-navy-600">
            This notice explains what the Locum Hands website forms collect. It is not a finished
            privacy policy. A few decisions still need to be made by Locum Hands before it can be
            treated as complete.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">Who we are</h2>
          <p className="mt-3 text-navy-700">
            {siteConfig.legalName}, company number {siteConfig.companiesHouse.number}. Registered
            office: {formatRegisteredOffice()}. That address is the registered office, not a public
            walk-in branch. Email{" "}
            <a className="font-semibold text-teal-700 underline" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>{" "}
            or call{" "}
            <a className="font-semibold text-teal-700 underline" href={`tel:${siteConfig.phone}`}>
              {siteConfig.phoneDisplay}
            </a>
            .
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">What the forms collect</h2>
          <p className="mt-3 text-navy-700">
            Professional registration asks for your name, email, telephone, profession, GDC number
            if you have one, experience, availability, preferred locations, the type of work you
            want, and any optional note. Practice enquiries ask for the practice name, contact
            name, email, telephone, location, role, number of locums, dates, shift hours, type of
            cover, and any optional note. The contact form asks for your name, email and message.
            Telephone and enquiry category are optional there.
          </p>
          <p className="mt-3 text-navy-700">
            The forms do not ask you to create an account, upload documents or answer medical
            questions. A hidden field is used to catch automated submissions and is discarded.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">How an enquiry is handled</h2>
          <p className="mt-3 text-navy-700">
            If the enquiry is saved, that database record is the receipt. A notification is then
            sent to {siteConfig.email} from the verified Locum Hands address on
            notify.locumhands.co.uk. The email lists the details you entered. Your email address
            is the reply-to address, so a reply goes to you. You are shown a reference only after
            the save succeeds. If the notification cannot be sent, the enquiry is kept and the
            delivery state is recorded so it can be tried again without creating a second enquiry.
          </p>
          <p className="mt-3 text-navy-700">
            We do not store your IP address alongside the enquiry. The site keeps a short-lived
            hash to limit repeated submissions.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">Still to be confirmed</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-navy-700">
            <li>
              Lawful basis. The form asks you to confirm you have read this notice. That checkbox
              is not, by itself, a decision about whether the lawful basis is contract, legitimate
              interests or consent.
            </li>
            <li>How long enquiry records are kept, and when they are deleted.</li>
            <li>Which members of staff may open the enquiry database or the notification inbox.</li>
          </ul>
          <p className="mt-3 text-navy-700">
            Until those points are confirmed, email {siteConfig.email} if you want to know how a
            particular enquiry is being handled, or if you want us to correct or delete what you
            sent.
          </p>

          <p className="mt-10 text-sm text-navy-500">
            <Link href="/contact" className="font-semibold text-teal-700 underline">
              Contact Locum Hands
            </Link>
          </p>
        </article>
      </Container>
    </>
  );
}
