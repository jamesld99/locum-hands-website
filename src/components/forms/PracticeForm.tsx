"use client";

import { useState } from "react";
import { practiceSchema } from "@/lib/validations";
import {
  CheckboxField,
  FormStatus,
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "./fields";

type Status = "idle" | "submitting" | "success" | "error";
type Errors = Record<string, string>;

export function PracticeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      practiceName: String(fd.get("practiceName") ?? ""),
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      location: String(fd.get("location") ?? ""),
      roleNeeded: String(fd.get("roleNeeded") ?? ""),
      startDate: String(fd.get("startDate") ?? ""),
      duration: String(fd.get("duration") ?? ""),
      details: String(fd.get("details") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const parsed = practiceSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/practices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <FormStatus
        status="success"
        successTitle="Booking enquiry received!"
        successMessage="Thanks — our team will review your requirements and come back to you quickly with available, fully-vetted locum staff."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="practiceName"
          label="Practice name"
          required
          autoComplete="organization"
          error={errors.practiceName}
          placeholder="Smile Dental Practice"
        />
        <TextField
          id="contactName"
          label="Your name"
          required
          autoComplete="name"
          error={errors.contactName}
          placeholder="Practice Manager"
        />
        <TextField
          id="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
          placeholder="manager@practice.co.uk"
        />
        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone}
          placeholder="020 7000 0000"
        />
        <TextField
          id="location"
          label="Practice location"
          required
          error={errors.location}
          hint="Town/city and postcode area help us match the nearest locums."
          placeholder="Leeds, LS1"
        />
        <SelectField
          id="roleNeeded"
          label="Role needed"
          required
          defaultValue=""
          error={errors.roleNeeded}
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="nurse">Dental Nurse</option>
          <option value="hygienist">Dental Hygienist</option>
          <option value="therapist">Dental Therapist</option>
          <option value="dentist">Dentist</option>
        </SelectField>
        <TextField
          id="startDate"
          label="When is cover needed?"
          required
          error={errors.startDate}
          placeholder="e.g. Mon 6 July, or ASAP"
        />
        <TextField
          id="duration"
          label="How long for?"
          required
          error={errors.duration}
          placeholder="e.g. 3 days, 2 weeks, ongoing"
        />
      </div>

      <TextAreaField
        id="details"
        label="Additional details (optional)"
        error={errors.details}
        placeholder="Software used, NHS/private, specific requirements, parking, etc."
      />

      <CheckboxField id="consent" error={errors.consent} required>
        I agree to Locum Hands storing and processing these details to handle our
        booking enquiry, in line with the privacy policy.
      </CheckboxField>

      {status === "error" && (
        <FormStatus
          status="error"
          successTitle=""
          successMessage=""
          errorMessage="We couldn't submit your enquiry. Please try again or email hello@locumhands.co.uk."
        />
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-navy-700 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send booking enquiry"}
      </button>
    </form>
  );
}
