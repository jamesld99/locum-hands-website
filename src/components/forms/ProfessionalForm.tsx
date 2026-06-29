"use client";

import { useState } from "react";
import { professionalSchema } from "@/lib/validations";
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

export function ProfessionalForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      professionType: String(fd.get("professionType") ?? ""),
      experienceLevel: String(fd.get("experienceLevel") ?? ""),
      locationPreferences: String(fd.get("locationPreferences") ?? ""),
      availability: String(fd.get("availability") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const parsed = professionalSchema.safeParse(payload);
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
      const res = await fetch("/api/professionals", {
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
        successTitle="Thanks for registering!"
        successMessage="We've received your details. Our team will verify your information and be in touch about suitable locum bookings shortly."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="fullName"
          label="Full name"
          required
          autoComplete="name"
          error={errors.fullName}
          placeholder="Jane Smith"
        />
        <TextField
          id="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
          placeholder="jane@example.com"
        />
        <TextField
          id="phone"
          label="Phone number"
          type="tel"
          required
          autoComplete="tel"
          error={errors.phone}
          placeholder="07700 900000"
        />
        <SelectField
          id="professionType"
          label="Profession"
          required
          defaultValue=""
          error={errors.professionType}
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="nurse">Dental Nurse</option>
          <option value="hygienist">Dental Hygienist</option>
          <option value="therapist">Dental Therapist</option>
          <option value="dentist">Dentist</option>
        </SelectField>
        <SelectField
          id="experienceLevel"
          label="Experience level"
          required
          defaultValue=""
          error={errors.experienceLevel}
        >
          <option value="" disabled>
            Select experience
          </option>
          <option value="newly-qualified">Newly qualified</option>
          <option value="1-3-years">1–3 years</option>
          <option value="3-5-years">3–5 years</option>
          <option value="5-plus-years">5+ years</option>
        </SelectField>
        <SelectField
          id="availability"
          label="Availability"
          required
          defaultValue=""
          error={errors.availability}
        >
          <option value="" disabled>
            Select availability
          </option>
          <option value="immediately">Immediately</option>
          <option value="within-2-weeks">Within 2 weeks</option>
          <option value="within-a-month">Within a month</option>
          <option value="flexible">Flexible</option>
        </SelectField>
      </div>

      <TextField
        id="locationPreferences"
        label="Location preferences"
        required
        error={errors.locationPreferences}
        hint="Towns, cities or regions you'd like to work in (e.g. Manchester, North West)."
        placeholder="Manchester, Stockport, North West"
      />

      <TextAreaField
        id="message"
        label="Anything else? (optional)"
        error={errors.message}
        placeholder="Tell us about your specialisms, preferred days, or any questions."
      />

      <CheckboxField id="consent" error={errors.consent} required>
        I agree to Locum Hands storing and processing my details to match me with
        locum opportunities, in line with the privacy policy.
      </CheckboxField>

      {status === "error" && (
        <FormStatus
          status="error"
          successTitle=""
          successMessage=""
          errorMessage="We couldn't submit your registration. Please try again or email hello@locumhands.co.uk."
        />
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Submitting…" : "Register as a professional"}
      </button>
    </form>
  );
}
