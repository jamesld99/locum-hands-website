/**
 * Authorised staff only. Lists enquiries whose notification is pending, sending
 * or failed, and retries delivery without creating another enquiry.
 *
 * The database is the receipt. Resend is only the notification. A retry uses
 * the same Idempotency-Key, so a repeat send should not create a second email
 * once Resend has accepted the first one.
 *
 *   npm run enquiries:status
 *   npm run enquiries:status -- --details
 *   npm run enquiries:retry
 *   npm run enquiries:retry -- --id <uuid>
 *
 * --details prints the submitted fields. Do not leave that output in shared logs.
 */
import { deliverNotification } from "../src/lib/enquiries/submit";
import { createMailerFromEnv } from "../src/lib/enquiries/notify";
import { closeEnquiryStore, getEnquiryStore } from "../src/lib/enquiries/runtime";

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  const details = args.includes("--details");
  const idFlag = args.indexOf("--id");
  const onlyId = idFlag >= 0 ? args[idFlag + 1] : undefined;
  const from = process.env.ENQUIRY_FROM_EMAIL || "Locum Hands <notifications@locumhands.co.uk>";
  const to = process.env.ENQUIRY_TO_EMAIL || "hello@locumhands.co.uk";

  if (command !== "status" && command !== "retry") {
    console.error("Use status or retry.");
    process.exitCode = 1;
    return;
  }

  const store = getEnquiryStore();
  const records = (await store.listNeedingAttention()).filter((record) => !onlyId || record.id === onlyId);

  if (command === "status") {
    if (records.length === 0) {
      console.log("No pending, sending or failed notifications.");
    }
    for (const record of records) {
      console.log(
        [record.id, record.kind, record.notificationStatus, `attempts=${record.notificationAttempts}`, record.notificationError ?? ""].join(
          "\t",
        ),
      );
      if (details) console.log(JSON.stringify(record.payload));
    }
    return;
  }

  const mailer = createMailerFromEnv();
  for (const record of records) {
    const result = await deliverNotification(record, store, mailer, {
      from,
      to,
      reclaimStaleSending: true,
    });
    console.log(`${record.id}\t${result}`);
  }
}

main()
  .catch((error) => {
    const code = error instanceof Error ? error.name : "ERROR";
    console.error(code);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeEnquiryStore();
  });
