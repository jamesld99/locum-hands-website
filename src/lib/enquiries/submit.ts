import type { ZodType } from "zod";
import { rateLimitMessage, sendFailureMessage } from "../copy";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS, hashRateLimitSubject } from "./rate-limit";
import { createDeliveryBook, createRateLimiter, type DeliveryBook, type RateLimiter } from "./memory";
import { buildEnquiryEmail, notificationErrorCode, type EnquiryMailer } from "./notify";
import type { EnquiryKind, EnquiryRecord } from "./types";

export const MAX_BODY_BYTES = 16_384;

export type EnquiryDeps = {
  mailer: EnquiryMailer;
  from: string;
  to: string;
  rateLimit?: { limit: number; windowMs: number };
  limiter?: RateLimiter;
  deliveries?: DeliveryBook;
};

type RequestInput = {
  kind: EnquiryKind;
  schema: ZodType;
  contentType: string | null;
  contentLength: string | null;
  bodyText: string;
  ipHint: string;
};

const shared = globalThis as {
  __locumRateLimiter?: RateLimiter;
  __locumDeliveries?: DeliveryBook;
};

function sharedLimiter(): RateLimiter {
  return (shared.__locumRateLimiter ??= createRateLimiter());
}

function sharedDeliveries(): DeliveryBook {
  return (shared.__locumDeliveries ??= createDeliveryBook());
}

/**
 * Validates and rate-limits, then sends the enquiry email. Confirmation is
 * returned only after Resend accepts it. Nothing is written to a database.
 */
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

  const limiter = deps.limiter ?? sharedLimiter();
  const deliveries = deps.deliveries ?? sharedDeliveries();
  const alreadySent = deliveries.sentId(idempotencyKey);
  if (alreadySent) {
    return { status: 200, body: { ok: true, id: alreadySent } };
  }
  const inflight = deliveries.inflight(idempotencyKey);
  if (inflight) {
    return resultOf(idempotencyKey, inflight);
  }

  if (!deliveries.admitted(idempotencyKey)) {
    const limit = deps.rateLimit?.limit ?? RATE_LIMIT_MAX;
    const windowMs = deps.rateLimit?.windowMs ?? RATE_LIMIT_WINDOW_MS;
    if (limiter.consume(hashRateLimitSubject(input.ipHint), limit, windowMs)) {
      return { status: 429, body: { ok: false, error: rateLimitMessage } };
    }
    deliveries.admit(idempotencyKey);
  }

  const record: EnquiryRecord = {
    id: idempotencyKey,
    kind: input.kind,
    idempotencyKey,
    payload,
    replyTo,
    createdAt: new Date().toISOString(),
    notificationStatus: "pending",
    notificationAttempts: 1,
    notificationError: null,
    notificationKey: idempotencyKey,
  };
  const email = buildEnquiryEmail(record, { from: deps.from, to: deps.to });

  try {
    const accepted = await deliveries.begin(idempotencyKey, record.id, () => deps.mailer.send(email));
    if (!accepted) return failed();
    return { status: 201, body: { ok: true, id: record.id } };
  } catch (error) {
    console.error("enquiry_notification_failed", input.kind, notificationErrorCode(error));
    return failed();
  }
}

async function resultOf(id: string, pending: Promise<boolean>): Promise<{ status: number; body: Record<string, unknown> }> {
  try {
    const accepted = await pending;
    return accepted ? { status: 200, body: { ok: true, id } } : failed();
  } catch {
    return failed();
  }
}

function failed(): { status: number; body: Record<string, unknown> } {
  return { status: 502, body: { ok: false, error: sendFailureMessage } };
}
