"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { contactSchema, enquiryTypeOptions } from "@/lib/validations";
import {
  CheckboxField,
  FormStatus,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields";
import { useEnquiryForm } from "./useEnquiryForm";

export function ContactForm() {
  const form = useEnquiryForm({
    schema: contactSchema,
    endpoint: "/api/contact",
    fieldOrder: ["name", "email", "phone", "enquiryType", "message", "consent"],
    buildPayload: (element) => {
      const data = new FormData(element);
      return {
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        enquiryType: String(data.get("enquiryType") ?? ""),
        message: String(data.get("message") ?? ""),
        consent: data.get("consent") === "on",
      };
    },
  });

  if (form.status === "success") {
    return (
      <FormStatus
        status="success"
        successTitle="Message received"
        successMessage={`Thank you. Reference ${form.reference}. Your message has been sent. If you need to add something, call ${siteConfig.phoneDisplay} or email ${siteConfig.email} and quote the reference.`}
        onAnother={form.startAnother}
        anotherLabel="Send another message"
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
      <FieldSummary id={form.summaryId} errors={form.errors} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label="Your name" required autoComplete="name" error={form.errors.name} placeholder="Your name" />
        <TextField id="email" label="Email address" type="email" required autoComplete="email" error={form.errors.email} placeholder="you@example.com" />
        <TextField id="phone" label="Telephone (optional)" type="tel" autoComplete="tel" error={form.errors.phone} placeholder="07700 900000" />
        <SelectField id="enquiryType" label="Enquiry category (optional)" defaultValue="" error={form.errors.enquiryType}>
          <option value="">No preference</option>
          {enquiryTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectField>
      </div>
      <TextAreaField id="message" label="Message" required rows={5} error={form.errors.message} placeholder="Tell us a little about what you need." />
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
        className="inline-flex w-full items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {form.status === "submitting" ? "Sending…" : "Send message"}
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
