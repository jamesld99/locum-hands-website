import {
  availabilityOptions,
  coverTypeOptions,
  enquiryTypeOptions,
  experienceOptions,
  optionLabel,
  professionOptions,
  workSoughtOptions,
} from "../validations";
import { EmailNotConfiguredError, type EnquiryKind, type EnquiryRecord } from "./types";

export type EnquiryEmail = {
  idempotencyKey: string;
  to: string;
  from: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

export type EnquiryMailer = {
  send(email: EnquiryEmail): Promise<void>;
};

type EmailRow = { label: string; value: string; email?: boolean };

const SAFE_EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isSafeEmail(value: string): boolean {
  const email = value.trim();
  return email.length <= 150 && !/[\r\n\0]/.test(email) && SAFE_EMAIL.test(email);
}

export function buildEnquiryEmail(
  record: EnquiryRecord,
  options: { from: string; to: string },
): EnquiryEmail {
  const rows = rowsFor(record.kind, record.payload);
  const replyTo = isSafeEmail(record.replyTo) ? record.replyTo.trim() : "";
  const received = formatUkDate(record.createdAt);
  const copy = copyFor(record.kind);
  const subjectName = oneLine(subjectNameFor(record.kind, record.payload));
  const subject = oneLine(subjectName ? `${copy.subjectPrefix}: ${subjectName}` : copy.subjectPrefix);

  return {
    idempotencyKey: record.notificationKey,
    to: options.to,
    from: options.from,
    replyTo,
    subject,
    text: plainText({ heading: copy.heading, intro: copy.intro, rows, reference: record.id, received }),
    html: htmlEmail({ heading: copy.heading, intro: copy.intro, rows, reference: record.id, received }),
  };
}

export function notificationErrorCode(error: unknown): string {
  if (error instanceof EmailNotConfiguredError) return error.code;
  if (error instanceof Error && /^RESEND_\d{3}$/.test(error.message)) return error.message;
  return "EMAIL_FAILED";
}

export function createResendMailer(apiKey: string): EnquiryMailer {
  return {
    async send(email) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": email.idempotencyKey,
        },
        body: JSON.stringify({
          from: email.from,
          to: [email.to],
          ...(email.replyTo ? { reply_to: email.replyTo } : {}),
          subject: email.subject,
          text: email.text,
          html: email.html,
        }),
      });
      if (!response.ok) {
        throw new Error(`RESEND_${response.status}`);
      }
    },
  };
}

export function createMailerFromEnv(): EnquiryMailer {
  const production = process.env.VERCEL_ENV === "production";
  if (!production && process.env.EMAIL_DELIVERY === "simulate") {
    return { async send() {} };
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && process.env.EMAIL_DELIVERY !== "simulate") {
    return createResendMailer(apiKey);
  }
  return {
    async send() {
      throw new EmailNotConfiguredError();
    },
  };
}

function copyFor(kind: EnquiryKind): { subjectPrefix: string; heading: string; intro: string } {
  if (kind === "professional") {
    return {
      subjectPrefix: "Professional registration",
      heading: "Professional registration",
      intro: "A dental professional has registered their interest through the Locum Hands website.",
    };
  }
  if (kind === "practice") {
    return {
      subjectPrefix: "Practice booking enquiry",
      heading: "Practice booking enquiry",
      intro: "A dental practice has sent a booking enquiry. Sending the form does not confirm a booking.",
    };
  }
  return {
    subjectPrefix: "General website enquiry",
    heading: "General website enquiry",
    intro: "Someone has sent a message through the Locum Hands website.",
  };
}

function subjectNameFor(kind: EnquiryKind, payload: Record<string, unknown>): string {
  if (kind === "professional") return text(payload.fullName);
  if (kind === "practice") return text(payload.practiceName);
  return text(payload.name);
}

function rowsFor(kind: EnquiryKind, payload: Record<string, unknown>): EmailRow[] {
  if (kind === "professional") {
    return present([
      ["Full name", text(payload.fullName)],
      ["Email", text(payload.email), true],
      ["Telephone", text(payload.phone)],
      ["Profession", professionLabel(payload.professionType, payload.professionOther)],
      ["GDC number", text(payload.gdcNumber)],
      ["Experience", optionLabel(experienceOptions, payload.experienceLevel)],
      ["Availability", optionLabel(availabilityOptions, payload.availability)],
      ["Preferred locations", text(payload.locationPreferences)],
      ["Type of work sought", optionLabel(workSoughtOptions, payload.workSought)],
      ["Additional information", text(payload.message)],
    ]);
  }
  if (kind === "practice") {
    return present([
      ["Practice name", text(payload.practiceName)],
      ["Contact name", text(payload.contactName)],
      ["Email", text(payload.email), true],
      ["Telephone", text(payload.phone)],
      ["Practice location", text(payload.location)],
      ["Role", professionLabel(payload.roleNeeded, payload.roleOther)],
      ["Number of locums", text(payload.numberOfLocums)],
      ["Booking dates", text(payload.bookingDates)],
      ["Shift hours", text(payload.shiftHours)],
      ["Type of cover", optionLabel(coverTypeOptions, payload.coverType)],
      ["Additional information", text(payload.details)],
    ]);
  }
  return present([
    ["Name", text(payload.name)],
    ["Email", text(payload.email), true],
    ["Telephone", text(payload.phone)],
    ["Enquiry category", payload.enquiryType ? optionLabel(enquiryTypeOptions, payload.enquiryType) : ""],
    ["Message", text(payload.message)],
  ]);
}

function present(fields: Array<[string, string, boolean?]>): EmailRow[] {
  return fields
    .filter(([, value]) => value.trim().length > 0)
    .map(([label, value, email]) => ({ label, value, email: Boolean(email) && isSafeEmail(value) }));
}

function professionLabel(role: unknown, other: unknown): string {
  const label = optionLabel(professionOptions, role);
  const detail = text(other);
  if (role === "other" && detail) return `${label} (${detail})`;
  return label;
}

function plainText(input: { heading: string; intro: string; rows: EmailRow[]; reference: string; received: string }): string {
  const lines = [input.heading, "", input.intro, ""];
  for (const row of input.rows) {
    lines.push(`${row.label}: ${row.value}`);
    lines.push("");
  }
  lines.push("Reply to this email to reach the person who submitted the form.");
  lines.push("");
  lines.push(`Reference: ${input.reference}`);
  lines.push(`Received: ${input.received}`);
  return lines.join("\n");
}

function htmlEmail(input: { heading: string; intro: string; rows: EmailRow[]; reference: string; received: string }): string {
  const rows = input.rows
    .map(
      (row) => `<tr>
        <td style="padding:16px 20px 16px 0;width:38%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;font-weight:bold;color:#0d2236;">${escapeHtml(row.label)}</td>
        <td style="padding:16px 0;vertical-align:top;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#122f49;word-break:break-word;">${formatValue(row)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en-GB">
<body style="margin:0;padding:0;background:#f3f6f8;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6f8;border-collapse:collapse;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-collapse:collapse;">
          <tr>
            <td style="height:8px;background:#228290;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;letter-spacing:0.04em;color:#228290;font-weight:bold;">LOCUM HANDS</td>
          </tr>
          <tr>
            <td style="padding:0 32px 12px 32px;font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:34px;color:#0d2236;font-weight:bold;">${escapeHtml(input.heading)}</td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px 32px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:24px;color:#334e63;">${escapeHtml(input.intro)}</td>
          </tr>
          <tr>
            <td style="padding:8px 32px 8px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid #e4ebf0;">
                ${rows}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#334e63;">Reply to this email to reach the person who submitted the form.</td>
          </tr>
          <tr>
            <td style="padding:16px 32px 28px 32px;background:#f7fafb;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;color:#5d7386;">
              Reference: ${escapeHtml(input.reference)}<br>
              Received: ${escapeHtml(input.received)}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function formatValue(row: EmailRow): string {
  const html = escapeHtml(row.value).replace(/\r\n|\r|\n/g, "<br>");
  if (!row.email) return html;
  return `<a href="mailto:${escapeHtml(row.value.trim())}" style="color:#228290;text-decoration:underline;">${html}</a>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
}

function text(value: unknown): string {
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return typeof value === "string" ? value.trim() : "";
}

function formatUkDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hourCycle: "h12",
  }).format(date);
}
