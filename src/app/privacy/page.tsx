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
    "How Locum Hands Ltd handles enquiries sent through the website forms, including who can see them and how long they are kept.",
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
            This notice explains what the Locum Hands website forms collect and how those enquiries
            are handled.
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
            The form emails your details to {siteConfig.email} from the verified Locum Hands
            address on notify.locumhands.co.uk. That inbox message is the enquiry. Your email
            address is the reply-to address, so a reply goes to you. You are shown a reference
            only after the email is accepted. If it cannot be sent, nothing is kept and the form
            still shows what you typed. Sending it again uses the same reference, so a second
            email is not created once the first one has been accepted.
          </p>
          <p className="mt-3 text-navy-700">
            We do not keep a separate copy of the form. We do not store your IP address. The
            server keeps a short-lived hash in memory to limit repeated submissions.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">Why we use enquiry details</h2>
          <p className="mt-3 text-navy-700">
            Locum Hands receives a routine enquiry by email, keeps that email and replies because
            that is necessary for its legitimate interests in running the agency and answering
            people who get in touch. Where using the details is necessary for a contract with you,
            or for steps you ask Locum Hands to take before a contract, the lawful basis is
            contract. The checkbox on the form records that you have read this notice.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">Who can see an enquiry</h2>
          <p className="mt-3 text-navy-700">
            Liset Hernandez handles Locum Hands enquiries. She is responsible for how long they are
            kept and for deleting them. Routine access to the enquiry inbox is limited to Liset.
            James Lloyd-Davies can help with an enquiry in Outlook only when Liset specifically
            authorises it and there is a business need. He does not need database access for
            routine enquiry handling.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-navy-900">How long enquiries are kept</h2>
          <p className="mt-3 text-navy-700">
            A closed routine enquiry is kept in the inbox for up to six months. It is deleted
            sooner when the information is no longer needed, and Liset removes it from Outlook. A
            registration or booking that is still active, and a record needed for a legal
            obligation or a dispute, is kept for the period that applies to that record. Liset
            reviews closed routine enquiries each month.
          </p>
          <p className="mt-3 text-navy-700">
            Email {siteConfig.email} if you want to know how a particular enquiry is being handled,
            or if you want us to correct or delete what you sent.
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
