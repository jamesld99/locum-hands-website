"use client";

import Link from "next/link";
import { practicePricingWording } from "@/lib/copy";
import { siteConfig } from "@/lib/site";
import { coverTypeOptions, practiceSchema, professionOptions } from "@/lib/validations";
import {
  CheckboxField,
  FormStatus,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields";
import { useEnquiryForm } from "./useEnquiryForm";

export function PracticeForm() {
  const form = useEnquiryForm({
    schema: practiceSchema,
    endpoint: "/api/practices",
    fieldOrder: [
      "practiceName",
      "contactName",
      "email",
      "phone",
      "location",
      "roleNeeded",
      "roleOther",
      "numberOfLocums",
      "bookingDates",
      "shiftHours",
      "coverType",
      "details",
      "consent",
    ],
    buildPayload: (element) => {
      const data = new FormData(element);
      const locums = String(data.get("numberOfLocums") ?? "").trim();
      return {
        practiceName: String(data.get("practiceName") ?? ""),
        contactName: String(data.get("contactName") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        location: String(data.get("location") ?? ""),
        roleNeeded: String(data.get("roleNeeded") ?? ""),
        roleOther: String(data.get("roleOther") ?? ""),
        numberOfLocums: locums === "" ? Number.NaN : Number(locums),
        bookingDates: String(data.get("bookingDates") ?? ""),
        shiftHours: String(data.get("shiftHours") ?? ""),
        coverType: String(data.get("coverType") ?? ""),
        details: String(data.get("details") ?? ""),
        consent: data.get("consent") === "on",
      };
    },
  });

  if (form.status === "success") {
    return (
      <FormStatus
        status="success"
        successTitle="Enquiry received"
        successMessage={`Thank you. Reference ${form.reference}. Sending this form does not confirm a booking. We'll look at the dates and come back to you. If you need to add or change something, call ${siteConfig.phoneDisplay} or email ${siteConfig.email} and quote the reference.`}
        onAnother={form.startAnother}
        anotherLabel="Send another enquiry"
      />
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit}
      noValidate
      aria-busy={form.status === "submitting"}
      className="relative space-y-5"
    >
      <Honeypot />
      <div className="rounded-xl bg-navy-50 p-4 text-sm text-navy-800">
        <p>
          Call{" "}
          <a className="font-semibold text-teal-700 underline" href={`tel:${siteConfig.phone}`}>
            {siteConfig.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a className="font-semibold text-teal-700 underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
        <p className="mt-2">{practicePricingWording}</p>
        <p className="mt-2 font-semibold">Sending this enquiry does not confirm a booking.</p>
      </div>
      <FieldSummary id={form.summaryId} errors={form.errors} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="practiceName" label="Practice name" required autoComplete="organization" error={form.errors.practiceName} placeholder="Smile Dental Practice" />
        <TextField id="contactName" label="Contact name" required autoComplete="name" error={form.errors.contactName} placeholder="Practice manager" />
        <TextField id="email" label="Email address" type="email" required autoComplete="email" error={form.errors.email} placeholder="manager@practice.co.uk" />
        <TextField id="phone" label="Telephone" type="tel" required autoComplete="tel" error={form.errors.phone} placeholder="020 7000 0000" />
        <TextField id="location" label="Practice location" required error={form.errors.location} hint="Town or city, and a postcode area if you have one." placeholder="Leeds, LS1" />
        <SelectField id="roleNeeded" label="Role required" required defaultValue="" error={form.errors.roleNeeded}>
          <option value="" disabled>Select a role</option>
          {professionOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectField>
        <TextField id="roleOther" label="If another role, which one?" error={form.errors.roleOther} hint="Leave this blank unless you chose another dental role." />
        <TextField id="numberOfLocums" label="Number of locums" type="number" required min={1} max={20} inputMode="numeric" error={form.errors.numberOfLocums} placeholder="1" />
      </div>
      <TextAreaField
        id="bookingDates"
        label="Booking dates"
        required
        error={form.errors.bookingDates}
        hint="List every date you have in mind, or say if the cover is still tentative. For example: 3 and 4 March, and possibly 10 March."
        placeholder="3 and 4 March, and possibly 10 March"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="shiftHours" label="Shift hours" required error={form.errors.shiftHours} placeholder="8:30am to 5:00pm" />
        <SelectField id="coverType" label="Type of cover" required defaultValue="" error={form.errors.coverType}>
          <option value="" disabled>Select the type of cover</option>
          {coverTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectField>
      </div>
      <TextAreaField id="details" label="Additional information (optional)" error={form.errors.details} placeholder="Software, NHS or private, parking, or anything else that would help." />
      <CheckboxField id="consent" error={form.errors.consent} required>
        I have read the <Link href="/privacy" className="font-semibold text-teal-700 underline">privacy notice</Link>.
      </CheckboxField>
      {form.status === "error" && (
        <FormStatus status="error" successTitle="" successMessage="" errorMessage={form.message} />
      )}
      <p className="text-sm text-navy-600">
        If the form will not send, call{" "}
        <a className="font-semibold text-teal-700 underline" href={`tel:${siteConfig.phone}`}>{siteConfig.phoneDisplay}</a>{" "}
        or email{" "}
        <a className="font-semibold text-teal-700 underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        What you have typed stays in the form until it is accepted.
      </p>
      <button
        type="submit"
        disabled={form.status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-navy-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {form.status === "submitting" ? "Sending…" : "Send booking enquiry"}
      </button>
    </form>
  );
}

function FieldSummary({ id, errors }: { id: string; errors: Record<string, string> }) {
  const messages = Object.values(errors);
  if (messages.length === 0) return null;
  return (
    <div id={id} role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
      Please check {messages.length === 1 ? "this field" : "these fields"}: {messages.join(" ")}
    </div>
  );
}
