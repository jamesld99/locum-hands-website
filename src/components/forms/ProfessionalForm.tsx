"use client";

import Link from "next/link";
import {
  availabilityOptions,
  experienceOptions,
  professionOptions,
  professionalSchema,
  workSoughtOptions,
} from "@/lib/validations";
import { siteConfig } from "@/lib/site";
import {
  CheckboxField,
  FormStatus,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields";
import { useEnquiryForm } from "./useEnquiryForm";

export function ProfessionalForm() {
  const form = useEnquiryForm({
    schema: professionalSchema,
    endpoint: "/api/professionals",
    fieldOrder: [
      "fullName",
      "email",
      "phone",
      "professionType",
      "professionOther",
      "gdcNumber",
      "experienceLevel",
      "availability",
      "locationPreferences",
      "workSought",
      "message",
      "consent",
    ],
    buildPayload: (element) => {
      const data = new FormData(element);
      return {
        fullName: String(data.get("fullName") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        professionType: String(data.get("professionType") ?? ""),
        professionOther: String(data.get("professionOther") ?? ""),
        gdcNumber: String(data.get("gdcNumber") ?? ""),
        experienceLevel: String(data.get("experienceLevel") ?? ""),
        availability: String(data.get("availability") ?? ""),
        locationPreferences: String(data.get("locationPreferences") ?? ""),
        workSought: String(data.get("workSought") ?? ""),
        message: String(data.get("message") ?? ""),
        consent: data.get("consent") === "on",
      };
    },
  });

  if (form.status === "success") {
    return (
      <FormStatus
        status="success"
        successTitle="Registration received"
        successMessage={`Your registration has been sent. Reference ${form.reference}. We'll be in touch about any documents a placement needs. Nothing has been booked yet. If you need to add something, call ${siteConfig.phoneDisplay} or email ${siteConfig.email} and quote the reference.`}
        onAnother={form.startAnother}
        anotherLabel="Register another person"
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
        <TextField id="fullName" label="Full name" required autoComplete="name" error={form.errors.fullName} placeholder="Jane Smith" />
        <TextField id="email" label="Email address" type="email" required autoComplete="email" error={form.errors.email} placeholder="jane@example.com" />
        <TextField id="phone" label="Telephone" type="tel" required autoComplete="tel" error={form.errors.phone} placeholder="07700 900000" />
        <SelectField id="professionType" label="Profession" required defaultValue="" error={form.errors.professionType}>
          <option value="" disabled>Select your role</option>
          {professionOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectField>
        <TextField
          id="professionOther"
          label="If another role, which one?"
          error={form.errors.professionOther}
          hint="Leave this blank unless you chose another dental role."
          placeholder="For example, orthodontic therapist"
        />
        <TextField
          id="gdcNumber"
          label="GDC number"
          error={form.errors.gdcNumber}
          hint="Add this if you have one. You can register without it and send evidence later."
          placeholder="If you have one"
        />
        <SelectField id="experienceLevel" label="Experience" required defaultValue="" error={form.errors.experienceLevel}>
          <option value="" disabled>Select experience</option>
          {experienceOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectField>
        <SelectField id="availability" label="Availability" required defaultValue="" error={form.errors.availability}>
          <option value="" disabled>Select availability</option>
          {availabilityOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </SelectField>
      </div>
      <TextField
        id="locationPreferences"
        label="Preferred work locations"
        required
        error={form.errors.locationPreferences}
        hint="Towns, cities or regions. For example, Manchester and the North West."
        placeholder="Manchester, Stockport, North West"
      />
      <SelectField id="workSought" label="Type of work sought" required defaultValue="" error={form.errors.workSought}>
        <option value="" disabled>Select the type of work</option>
        {workSoughtOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </SelectField>
      <TextAreaField
        id="message"
        label="Additional information (optional)"
        error={form.errors.message}
        placeholder="Preferred days, or anything else we should know. Please don't include medical information."
      />
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
        {form.status === "submitting" ? "Sending…" : "Register as a professional"}
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
