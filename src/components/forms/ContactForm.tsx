"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validations";
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

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      enquiryType: String(fd.get("enquiryType") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
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
      const res = await fetch("/api/contact", {
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
        successTitle="Message sent!"
        successMessage="Thanks for getting in touch. We aim to respond to all enquiries within one working day."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          required
          autoComplete="name"
          error={errors.name}
          placeholder="Your name"
        />
        <TextField
          id="email"
          label="Email address"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
          placeholder="you@example.com"
        />
        <TextField
          id="phone"
          label="Phone (optional)"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
          placeholder="07700 900000"
        />
        <SelectField
          id="enquiryType"
          label="I am a…"
          required
          defaultValue=""
          error={errors.enquiryType}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="professional">Dental professional</option>
          <option value="practice">Dental practice</option>
          <option value="general">General enquiry</option>
        </SelectField>
      </div>

      <TextField
        id="subject"
        label="Subject"
        required
        error={errors.subject}
        placeholder="How can we help?"
      />

      <TextAreaField
        id="message"
        label="Message"
        required
        rows={5}
        error={errors.message}
        placeholder="Tell us a little more…"
      />

      <CheckboxField id="consent" error={errors.consent} required>
        I agree to Locum Hands storing and processing my details to respond to my
        enquiry, in line with the privacy policy.
      </CheckboxField>

      {status === "error" && (
        <FormStatus
          status="error"
          successTitle=""
          successMessage=""
          errorMessage="We couldn't send your message. Please try again or email hello@locumhands.co.uk."
        />
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-lg bg-teal-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
