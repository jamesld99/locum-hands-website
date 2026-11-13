import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { buildEnquiryEmail } from "../src/lib/enquiries/notify";
import type { EnquiryKind, EnquiryRecord } from "../src/lib/enquiries/types";

const from = "Locum Hands <notifications@notify.locumhands.co.uk>";
const to = "hello@locumhands.co.uk";
const out = path.resolve("tmp/email-previews");

const samples: Array<{ file: string; record: EnquiryRecord }> = [
  {
    file: "professional",
    record: sample("professional", "jamie.example@example.com", {
      fullName: "Jamie Example",
      email: "jamie.example@example.com",
      phone: "07700900123",
      professionType: "nurse",
      gdcNumber: "DN123456",
      experienceLevel: "1-3-years",
      availability: "flexible",
      locationPreferences: "Bristol and Bath",
      workSought: "locum-days",
      message: "Weekdays only.\nPlease call after 5pm.\nI can travel for a block of days in December.",
    }),
  },
  {
    file: "practice",
    record: sample("practice", "manager@example.com", {
      practiceName: "Harbour Dental",
      contactName: "Alex Manager",
      email: "manager@example.com",
      phone: "07700900456",
      location: "Plymouth",
      roleNeeded: "hygienist",
      numberOfLocums: 2,
      bookingDates: "12 December 2026\n19 December 2026, still tentative",
      shiftHours: "9am to 5pm",
      coverType: "holiday",
      details: "NHS and private lists.\nPlease call the practice manager before 9am.",
    }),
  },
  {
    file: "contact",
    record: sample("contact", "sam.sender@example.com", {
      name: "Sam Sender",
      email: "sam.sender@example.com",
      phone: "07700900789",
      enquiryType: "professional",
      message: "Hello,\nI would like to ask about dental nurse locum work around Bristol.\nPlease reply by email.",
    }),
  },
];

mkdirSync(out, { recursive: true });
const cards = samples.map(({ file, record }) => {
  const email = buildEnquiryEmail(record, { from, to });
  writeFileSync(path.join(out, `${file}.html`), email.html);
  writeFileSync(path.join(out, `${file}.txt`), email.text);
  writeFileSync(
    path.join(out, `${file}.json`),
    JSON.stringify({ subject: email.subject, from: email.from, to: email.to, replyTo: email.replyTo }, null, 2),
  );
  return { file, subject: email.subject, replyTo: email.replyTo };
});

const frames = cards
  .map(
    (card) => `<section>
      <h2>${card.subject}</h2>
      <p>Reply-To: ${card.replyTo}</p>
      <div class="row">
        <iframe title="${card.subject} desktop" src="${card.file}.html" style="width:640px;height:920px"></iframe>
        <iframe title="${card.subject} phone" src="${card.file}.html" style="width:360px;height:920px"></iframe>
      </div>
    </section>`,
  )
  .join("\n");

writeFileSync(
  path.join(out, "index.html"),
  `<!DOCTYPE html><html lang="en-GB"><head><meta charset="utf-8"><title>Locum Hands email previews</title>
  <style>body{font-family:Arial,sans-serif;margin:24px;background:#eef2f4}h1{font-size:22px}iframe{border:1px solid #ccc;background:#fff} .row{display:flex;gap:16px;align-items:flex-start;overflow:auto}</style>
  </head><body><h1>Synthetic email previews. Nothing has been sent.</h1>${frames}</body></html>`,
);

function sample(kind: EnquiryKind, replyTo: string, payload: Record<string, unknown>): EnquiryRecord {
  return {
    id: "98217d57-8a34-49ca-9e82-80fd2ee62191",
    kind,
    idempotencyKey: "11111111-1111-4111-8111-111111111111",
    payload,
    replyTo,
    createdAt: "2026-11-13T19:14:00.000Z",
    notificationStatus: "pending",
    notificationAttempts: 0,
    notificationError: null,
    notificationKey: "enquiry:98217d57-8a34-49ca-9e82-80fd2ee62191",
  };
}
