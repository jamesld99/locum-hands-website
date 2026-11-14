import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { describe, it } from "node:test";
import { contactSchema, practiceSchema, professionalSchema } from "../validations";
import { createDeliveryBook, createRateLimiter } from "./memory";
import type { EnquiryEmail, EnquiryMailer } from "./notify";
import { handleEnquiryRequest, type EnquiryDeps } from "./submit";
import type { EnquiryKind } from "./types";
import type { ZodType } from "zod";

const from = "Locum Hands <notifications@notify.locumhands.co.uk>";
const to = "hello@locumhands.co.uk";

function mailer(impl?: (email: EnquiryEmail) => Promise<void> | void): EnquiryMailer & { sent: EnquiryEmail[] } {
  const sent: EnquiryEmail[] = [];
  return {
    sent,
    async send(email) {
      if (impl) await impl(email);
      sent.push(email);
    },
  };
}

function deps(sender: EnquiryMailer, rateLimit?: { limit: number; windowMs: number }): EnquiryDeps {
  return {
    mailer: sender,
    from,
    to,
    limiter: createRateLimiter(),
    deliveries: createDeliveryBook(),
    rateLimit,
  };
}

function request(kind: EnquiryKind, schema: ZodType, body: Record<string, unknown>, ipHint: string) {
  return {
    kind,
    schema,
    contentType: "application/json",
    contentLength: null,
    bodyText: JSON.stringify(body),
    ipHint,
  };
}

describe("enquiry email delivery", () => {
  it("sends each form only after the mailer accepts it", async () => {
    const forms = [
      {
        kind: "professional" as const,
        schema: professionalSchema,
        body: professionalBody(),
        replyTo: "jamie@example.com",
        needle: "Jamie Example",
      },
      {
        kind: "practice" as const,
        schema: practiceSchema,
        body: practiceBody(),
        replyTo: "pat@example.com",
        needle: "Example Dental",
      },
      {
        kind: "contact" as const,
        schema: contactSchema,
        body: contactBody(),
        replyTo: "sam@example.com",
        needle: "Hello from the contact form.",
      },
    ];

    for (const form of forms) {
      const sender = mailer();
      const result = await handleEnquiryRequest(request(form.kind, form.schema, form.body, "203.0.113.10"), deps(sender));
      assert.equal(result.status, 201);
      assert.equal(result.body.ok, true);
      assert.equal(result.body.id, form.body.idempotencyKey);
      assert.equal(sender.sent.length, 1);
      assert.equal(sender.sent[0]?.to, to);
      assert.equal(sender.sent[0]?.replyTo, form.replyTo);
      assert.equal(sender.sent[0]?.idempotencyKey, form.body.idempotencyKey);
      assert.match(sender.sent[0]?.text ?? "", new RegExp(form.needle.replace(/[.]/g, "\\.")));
      assert.match(sender.sent[0]?.html ?? "", /LOCUM HANDS/);
      assert.equal(JSON.stringify(sender.sent).includes("203.0.113.10"), false);
    }
  });

  it("keeps a failed send unconfirmed and lets one retry send a single email", async () => {
    const forms = [
      { kind: "professional" as const, schema: professionalSchema, body: professionalBody() },
      { kind: "practice" as const, schema: practiceSchema, body: practiceBody() },
      { kind: "contact" as const, schema: contactSchema, body: contactBody() },
    ];

    for (const form of forms) {
      let failed = false;
      const sender = mailer(async () => {
        if (!failed) {
          failed = true;
          throw new Error("RESEND_503");
        }
      });
      const runtime = deps(sender);
      const first = await handleEnquiryRequest(request(form.kind, form.schema, form.body, "203.0.113.12"), runtime);
      assert.equal(first.status, 502);
      assert.equal(first.body.ok, false);
      assert.equal(first.body.id, undefined);
      assert.match(String(first.body.error), /07949 282054/);
      assert.match(String(first.body.error), /hello@locumhands.co.uk/);
      assert.match(String(first.body.error), /still in the form/);
      assert.equal(sender.sent.length, 0);

      const second = await handleEnquiryRequest(request(form.kind, form.schema, form.body, "203.0.113.12"), runtime);
      assert.equal(second.status, 201);
      assert.equal(second.body.id, form.body.idempotencyKey);
      assert.equal(sender.sent.length, 1);

      const third = await handleEnquiryRequest(request(form.kind, form.schema, form.body, "203.0.113.12"), runtime);
      assert.equal(third.status, 200);
      assert.equal(third.body.id, form.body.idempotencyKey);
      assert.equal(sender.sent.length, 1);
    }
  });

  it("rate limits across the forms and does not send the blocked request", async () => {
    const sender = mailer();
    const runtime = deps(sender, { limit: 2, windowMs: 60_000 });
    const attempts = [
      request("professional", professionalSchema, professionalBody(), "203.0.113.20"),
      request("practice", practiceSchema, practiceBody(), "203.0.113.20"),
      request("contact", contactSchema, contactBody(), "203.0.113.20"),
    ];
    assert.equal((await handleEnquiryRequest(attempts[0]!, runtime)).status, 201);
    assert.equal((await handleEnquiryRequest(attempts[1]!, runtime)).status, 201);
    const blocked = await handleEnquiryRequest(attempts[2]!, runtime);
    assert.equal(blocked.status, 429);
    assert.match(String(blocked.body.error), /07949 282054/);
    assert.equal(sender.sent.length, 2);
    assert.equal((await handleEnquiryRequest(attempts[0]!, runtime)).status, 200);
    assert.equal(sender.sent.length, 2);
  });

  it("discards honeypot submissions and rejects oversized bodies without sending", async () => {
    const sender = mailer();
    const runtime = deps(sender);
    const honeypot = await handleEnquiryRequest(
      request("practice", practiceSchema, practiceBody({ hp_field: "https://spam.example" }), "203.0.113.30"),
      runtime,
    );
    assert.equal(honeypot.status, 200);
    assert.equal(honeypot.body.id, undefined);
    assert.equal(sender.sent.length, 0);

    const oversized = await handleEnquiryRequest(
      {
        kind: "contact",
        schema: contactSchema,
        contentType: "application/json",
        contentLength: "999999",
        bodyText: JSON.stringify({ message: "x" }),
        ipHint: "203.0.113.31",
      },
      runtime,
    );
    assert.equal(oversized.status, 413);
    assert.equal(sender.sent.length, 0);
  });
});

function professionalBody(overrides: Record<string, unknown> = {}) {
  return {
    fullName: "Jamie Example",
    email: "jamie@example.com",
    phone: "07700900123",
    professionType: "nurse",
    professionOther: "",
    gdcNumber: "DN123456",
    experienceLevel: "1-3-years",
    availability: "flexible",
    locationPreferences: "Bristol",
    workSought: "locum-days",
    message: "Weekdays",
    consent: true,
    hp_field: "",
    idempotencyKey: randomUUID(),
    ...overrides,
  };
}

function practiceBody(overrides: Record<string, unknown> = {}) {
  return {
    practiceName: "Example Dental",
    contactName: "Pat Manager",
    email: "pat@example.com",
    phone: "01170000000",
    location: "Cardiff, CF10",
    roleNeeded: "dentist",
    roleOther: "",
    numberOfLocums: 2,
    bookingDates: "3 March and possibly 10 March",
    shiftHours: "8:30am to 5pm",
    coverType: "tentative",
    details: "",
    consent: true,
    hp_field: "",
    idempotencyKey: randomUUID(),
    ...overrides,
  };
}

function contactBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Sam Example",
    email: "sam@example.com",
    phone: "07700900333",
    enquiryType: "professional",
    message: "Hello from the contact form.",
    consent: true,
    hp_field: "",
    idempotencyKey: randomUUID(),
    ...overrides,
  };
}
