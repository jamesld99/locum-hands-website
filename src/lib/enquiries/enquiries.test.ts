import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { describe, it } from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { contactSchema, practiceSchema, professionalSchema } from "../validations";
import { createEnquiryStore, type EnquiryStore, type Sql } from "./store";
import { handleEnquiryRequest, deliverNotification } from "./submit";
import type { EnquiryEmail, EnquiryMailer } from "./notify";
import { StorageUnavailableError } from "./types";

const from = "Locum Hands <notifications@locumhands.co.uk>";
const to = "hello@locumhands.co.uk";

async function createTestStore(): Promise<{ store: EnquiryStore; sql: Sql }> {
  const db = new PGlite();
  const sql: Sql = {
    query: async (text, params) => {
      const result = await db.query(text, params);
      return { rows: result.rows as Record<string, unknown>[] };
    },
  };
  const store = createEnquiryStore(sql);
  await store.ensureSchema();
  return { store, sql };
}

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

function professionalBody(overrides: Record<string, unknown> = {}) {
  return {
    fullName: "Jamie Example",
    email: "jamie@example.com",
    phone: "07700900123",
    professionType: "nurse",
    professionOther: "",
    gdcNumber: "",
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

describe("enquiry storage and notification", () => {
  it("saves the enquiry and marks the notification sent together", async () => {
    const { store } = await createTestStore();
    const sender = mailer();
    const body = professionalBody();
    const result = await handleEnquiryRequest(
      {
        kind: "professional",
        schema: professionalSchema,
        contentType: "application/json",
        contentLength: null,
        bodyText: JSON.stringify(body),
        ipHint: "203.0.113.10",
      },
      { getStore: () => store, mailer: sender, from, to },
    );

    assert.equal(result.status, 201);
    assert.equal(await store.countEnquiries(), 1);
    const saved = await store.getById(String(result.body.id));
    assert.equal(saved?.notificationStatus, "sent");
    assert.equal(saved?.payload.hp_field, undefined);
    assert.equal(sender.sent.length, 1);
    assert.equal(sender.sent[0]?.replyTo, "jamie@example.com");
    assert.equal(sender.sent[0]?.to, to);
    assert.match(sender.sent[0]?.text ?? "", /Jamie Example/);
    assert.match(sender.sent[0]?.text ?? "", /Bristol/);
    assert.equal(JSON.stringify(saved).includes("203.0.113.10"), false);
  });

  it("does not create a second enquiry or a second email when the same form is retried", async () => {
    const { store } = await createTestStore();
    const sender = mailer();
    const body = professionalBody();
    const request = {
      kind: "professional" as const,
      schema: professionalSchema,
      contentType: "application/json",
      contentLength: null,
      bodyText: JSON.stringify(body),
      ipHint: "203.0.113.11",
    };
    const deps = { getStore: () => store, mailer: sender, from, to };
    const first = await handleEnquiryRequest(request, deps);
    const second = await handleEnquiryRequest(request, deps);
    assert.equal(first.body.id, second.body.id);
    assert.equal(second.status, 200);
    assert.equal(await store.countEnquiries(), 1);
    assert.equal(sender.sent.length, 1);
  });

  it("keeps the enquiry and allows one retry when email fails", async () => {
    const { store } = await createTestStore();
    let failed = false;
    const sender = mailer(async () => {
      if (!failed) {
        failed = true;
        throw new Error("RESEND_503");
      }
    });
    const body = professionalBody();
    const request = {
      kind: "professional" as const,
      schema: professionalSchema,
      contentType: "application/json",
      contentLength: null,
      bodyText: JSON.stringify(body),
      ipHint: "203.0.113.12",
    };
    const deps = { getStore: () => store, mailer: sender, from, to };
    const first = await handleEnquiryRequest(request, deps);
    assert.equal(first.status, 201);
    const afterFailure = await store.getById(String(first.body.id));
    assert.equal(afterFailure?.notificationStatus, "failed");
    assert.equal(afterFailure?.notificationError, "RESEND_503");
    assert.equal(sender.sent.length, 0);

    const record = afterFailure!;
    const retry = await deliverNotification(record, store, sender, { from, to });
    assert.equal(retry, "sent");
    assert.equal(sender.sent.length, 1);
    const again = await deliverNotification(
      { ...record, notificationStatus: "sent" },
      store,
      sender,
      { from, to },
    );
    assert.equal(again, "skipped");
    assert.equal(sender.sent.length, 1);
    assert.equal(await store.countEnquiries(), 1);
  });

  it("rate limits with a shared counter and does not save the blocked request", async () => {
    const { store } = await createTestStore();
    const sender = mailer();
    const deps = {
      getStore: () => store,
      mailer: sender,
      from,
      to,
      rateLimit: { limit: 2, windowMs: 60_000 },
    };
    for (let i = 0; i < 2; i += 1) {
      const result = await handleEnquiryRequest(
        {
          kind: "contact",
          schema: contactSchema,
          contentType: "application/json",
          contentLength: null,
          bodyText: JSON.stringify({
            name: "Alex Example",
            email: `alex${i}@example.com`,
            phone: "",
            enquiryType: "",
            message: "Please tell me about locum cover.",
            consent: true,
            hp_field: "",
            idempotencyKey: randomUUID(),
          }),
          ipHint: "203.0.113.20",
        },
        deps,
      );
      assert.equal(result.status, 201);
    }
    const blocked = await handleEnquiryRequest(
      {
        kind: "contact",
        schema: contactSchema,
        contentType: "application/json",
        contentLength: null,
        bodyText: JSON.stringify({
          name: "Alex Example",
          email: "alex3@example.com",
          phone: "",
          enquiryType: "practice",
          message: "This one should be limited.",
          consent: true,
          hp_field: "",
          idempotencyKey: randomUUID(),
        }),
        ipHint: "203.0.113.20",
      },
      deps,
    );
    assert.equal(blocked.status, 429);
    assert.equal(await store.countEnquiries(), 2);
  });

  it("discards honeypot submissions and rejects oversized bodies", async () => {
    const { store } = await createTestStore();
    const sender = mailer();
    const honeypot = await handleEnquiryRequest(
      {
        kind: "practice",
        schema: practiceSchema,
        contentType: "application/json",
        contentLength: null,
        bodyText: JSON.stringify(
          professionalPractice({ hp_field: "https://spam.example" }),
        ),
        ipHint: "203.0.113.30",
      },
      { getStore: () => store, mailer: sender, from, to },
    );
    assert.equal(honeypot.status, 200);
    assert.equal(honeypot.body.id, undefined);
    assert.equal(await store.countEnquiries(), 0);
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
      { getStore: () => store, mailer: sender, from, to },
    );
    assert.equal(oversized.status, 413);
    assert.equal(await store.countEnquiries(), 0);
  });

  it("returns a clear error when storage is unavailable and does not claim a receipt", async () => {
    const result = await handleEnquiryRequest(
      {
        kind: "contact",
        schema: contactSchema,
        contentType: "application/json",
        contentLength: null,
        bodyText: JSON.stringify({
          name: "Sam Example",
          email: "sam@example.com",
          phone: "",
          enquiryType: "",
          message: "Hello from the contact form.",
          consent: true,
          hp_field: "",
          idempotencyKey: randomUUID(),
        }),
        ipHint: "203.0.113.40",
      },
      {
        getStore: () => {
          throw new StorageUnavailableError();
        },
        mailer: mailer(),
        from,
        to,
      },
    );
    assert.equal(result.status, 503);
    assert.equal(result.body.ok, false);
    assert.match(String(result.body.error), /has not been received/);
    assert.match(String(result.body.error), /07949 282054/);
  });
});

function professionalPractice(overrides: Record<string, unknown> = {}) {
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
