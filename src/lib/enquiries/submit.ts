import type { ZodType } from "zod";
import { rateLimitMessage, storageFailureMessage } from "../copy";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS, hashRateLimitSubject } from "./rate-limit";
import type { EnquiryStore } from "./store";
import { buildEnquiryEmail, notificationErrorCode, type EnquiryMailer } from "./notify";
import {
  EmailNotConfiguredError,
  StorageUnavailableError,
  type EnquiryKind,
  type EnquiryRecord,
} from "./types";

export const MAX_BODY_BYTES = 16_384;

export type EnquiryDeps = {
  getStore: () => EnquiryStore;
  mailer: EnquiryMailer;
  from: string;
  to: string;
  rateLimit?: { limit: number; windowMs: number };
};

type RequestInput = {
  kind: EnquiryKind;
  schema: ZodType;
  contentType: string | null;
  contentLength: string | null;
  bodyText: string;
  ipHint: string;
};

export async function handleEnquiryRequest(
  input: RequestInput,
  deps: EnquiryDeps,
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!input.contentType?.toLowerCase().includes("application/json")) {
    return { status: 415, body: { ok: false, error: "Invalid request body." } };
  }

  const declaredLength = Number(input.contentLength);
  if (
    (input.contentLength && (!Number.isFinite(declaredLength) || declaredLength > MAX_BODY_BYTES)) ||
    Buffer.byteLength(input.bodyText) > MAX_BODY_BYTES
  ) {
    return {
      status: 413,
      body: {
        ok: false,
        error: "That message is too long to send. Please shorten it, or email hello@locumhands.co.uk.",
      },
    };
  }

  let json: unknown;
  try {
    json = JSON.parse(input.bodyText) as unknown;
  } catch {
    return { status: 400, body: { ok: false, error: "Invalid request body." } };
  }

  const parsed = input.schema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: 422,
      body: { ok: false, error: "Please check the form and try again.", fieldErrors },
    };
  }

  const data = parsed.data as Record<string, unknown>;
  if (typeof data.hp_field === "string" && data.hp_field.trim().length > 0) {
    return { status: 200, body: { ok: true } };
  }

  const replyTo = typeof data.email === "string" ? data.email : "";
  const idempotencyKey = String(data.idempotencyKey);
  const payload = { ...data };
  delete payload.hp_field;
  delete payload.idempotencyKey;

  try {
    const store = deps.getStore();
    const limit = deps.rateLimit?.limit ?? RATE_LIMIT_MAX;
    const windowMs = deps.rateLimit?.windowMs ?? RATE_LIMIT_WINDOW_MS;
    const limited = await store.consumeRateLimit(hashRateLimitSubject(input.ipHint), limit, windowMs);
    if (limited) {
      return { status: 429, body: { ok: false, error: rateLimitMessage } };
    }

    const saved = await store.insertEnquiry({
      kind: input.kind,
      idempotencyKey,
      payload,
      replyTo,
    });

    try {
      await deliverNotification(saved.record, store, deps.mailer, {
        from: deps.from,
        to: deps.to,
      });
    } catch (error) {
      console.error("enquiry_notification_failed", input.kind, notificationErrorCode(error));
    }

    return {
      status: saved.created ? 201 : 200,
      body: { ok: true, id: saved.record.id },
    };
  } catch (error) {
    if (!(error instanceof StorageUnavailableError)) {
      console.error("enquiry_storage_failed", input.kind);
    }
    return { status: 503, body: { ok: false, error: storageFailureMessage } };
  }
}

export async function deliverNotification(
  record: EnquiryRecord,
  store: EnquiryStore,
  mailer: EnquiryMailer,
  options: { from: string; to: string; reclaimStaleSending?: boolean },
): Promise<"sent" | "failed" | "skipped"> {
  if (record.notificationStatus === "sent") return "skipped";
  const claimed = await store.claimForSend(record.id, {
    reclaimStaleSending: options.reclaimStaleSending,
  });
  if (!claimed) return "skipped";
  try {
    await mailer.send(buildEnquiryEmail(claimed, { from: options.from, to: options.to }));
    await store.markSent(claimed.id);
    return "sent";
  } catch (error) {
    const code = notificationErrorCode(error);
    try {
      await store.markFailed(claimed.id, code);
    } catch {
      console.error("enquiry_notification_state_failed", claimed.kind);
    }
    if (error instanceof EmailNotConfiguredError) return "failed";
    return "failed";
  }
}
