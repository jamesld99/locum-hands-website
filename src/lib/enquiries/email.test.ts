import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildEnquiryEmail, createResendMailer, isSafeEmail } from "./notify";
import type { EnquiryRecord } from "./types";

const from = "Locum Hands <notifications@notify.locumhands.co.uk>";
const to = "hello@locumhands.co.uk";

function record(overrides: Partial<EnquiryRecord> & Pick<EnquiryRecord, "kind" | "payload" | "replyTo">): EnquiryRecord {
  return {
    id: "98217d57-8a34-49ca-9e82-80fd2ee62191",
    idempotencyKey: "11111111-1111-4111-8111-111111111111",
    createdAt: "2026-11-13T19:14:00.000Z",
    notificationStatus: "pending",
    notificationAttempts: 0,
    notificationError: null,
    notificationKey: "enquiry:98217d57-8a34-49ca-9e82-80fd2ee62191",
    ...overrides,
  };
}

describe("enquiry email layout", () => {
  it("renders a professional registration with a GDC number and wrapped notes", () => {
    const email = buildEnquiryEmail(
      record({
        kind: "professional",
        replyTo: "jamie.example@example.com",
        payload: {
          fullName: "Jamie\r\nExample",
          email: "jamie.example@example.com",
          phone: "07700900123",
          professionType: "nurse",
          gdcNumber: "DN123456",
          experienceLevel: "1-3-years",
          availability: "flexible",
          locationPreferences: "Bristol and Bath",
          workSought: "locum-days",
          message: "Weekdays only.\nPlease call after 5pm.\n<script>alert(1)</script>",
          consent: true,
          hp_field: "bot",
          idempotencyKey: "secret-key",
          website: "https://spam.example",
        },
      }),
      { from, to },
    );

    assert.equal(email.subject, "Professional registration: Jamie Example");
    assert.equal(email.replyTo, "jamie.example@example.com");
    assert.equal(email.to, to);
    assert.equal(email.from, from);
    assert.match(email.text, /GDC number: DN123456/);
    assert.match(email.text, /Weekdays only\.\nPlease call after 5pm/);
    assert.match(email.text, /Received: .*\d{1,2} November 2026/);
    assert.doesNotMatch(email.text, /T19:14/);
    assert.doesNotMatch(email.text, /hp_field|idempotency|spam\.example|consent/i);
    assert.match(email.html, /Professional registration/);
    assert.match(email.html, /mailto:jamie\.example@example\.com/);
    assert.match(email.html, /DN123456/);
    assert.match(email.html, /Weekdays only\.<br>Please call after 5pm\.<br>&lt;script&gt;/);
    assert.equal(email.html.includes("<script>"), false);
    assert.ok(email.text.indexOf("Full name:") < email.text.indexOf("GDC number:"));
    assert.ok(email.text.indexOf("Additional information:") < email.text.indexOf("Reference:"));
    assert.match(email.html, /style=/);
  });

  it("omits a blank GDC number and keeps the practice subject on one line", () => {
    const email = buildEnquiryEmail(
      record({
        kind: "practice",
        replyTo: "manager@example.com",
        payload: {
          practiceName: "Harbour\nDental",
          contactName: "Alex Manager",
          email: "manager@example.com",
          phone: "07700900456",
          location: "Plymouth",
          roleNeeded: "hygienist",
          numberOfLocums: 2,
          bookingDates: "12 December\n19 December",
          shiftHours: "9am to 5pm",
          coverType: "holiday",
          details: "",
        },
      }),
      { from, to },
    );

    assert.equal(email.subject, "Practice booking enquiry: Harbour Dental");
    assert.doesNotMatch(email.text, /Additional information/);
    assert.match(email.text, /Number of locums: 2/);
    assert.match(email.html, /12 December<br>19 December/);
    assert.match(email.text, /does not confirm a booking/);
  });

  it("includes the contact phone, category and message, and rejects an unsafe reply-to", () => {
    const email = buildEnquiryEmail(
      record({
        kind: "contact",
        replyTo: "sam@example.com\nBcc: evil@example.com",
        payload: {
          name: "Sam Sender",
          email: "sam@example.com",
          phone: "07700900789",
          enquiryType: "professional",
          message: "Hello,\nI have a question about locum work.",
        },
      }),
      { from, to },
    );

    assert.equal(email.subject, "General website enquiry: Sam Sender");
    assert.equal(email.replyTo, "");
    assert.equal(isSafeEmail("sam@example.com\nBcc: evil@example.com"), false);
    assert.match(email.text, /Telephone: 07700900789/);
    assert.match(email.text, /Enquiry category:/);
    assert.match(email.text, /Message: Hello,\nI have a question/);
    assert.doesNotMatch(email.text, /Additional information/);
  });

  it("posts the html alternative and reply-to to Resend", async () => {
    const email = buildEnquiryEmail(
      record({
        kind: "contact",
        replyTo: "sam@example.com",
        payload: { name: "Sam Sender", email: "sam@example.com", message: "Hello" },
      }),
      { from, to },
    );
    const original = globalThis.fetch;
    let body: Record<string, unknown> = {};
    globalThis.fetch = async (_url, init) => {
      body = JSON.parse(String(init?.body));
      return new Response("{}", { status: 200 });
    };
    try {
      await createResendMailer("test-key").send(email);
    } finally {
      globalThis.fetch = original;
    }
    assert.equal(body.reply_to, "sam@example.com");
    assert.match(String(body.html), /General website enquiry/);
    assert.match(String(body.text), /Message: Hello/);
  });
});
