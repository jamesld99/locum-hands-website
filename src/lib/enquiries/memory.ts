export type RateLimiter = {
  /** Returns true when the subject has gone over the limit. The raw address is never stored. */
  consume(subjectHash: string, limit: number, windowMs: number): boolean;
};

type Bucket = { windowStart: number; count: number };

/** Process-local limit. It does not use Neon or store the enquiry. */
export function createRateLimiter(now: () => number = Date.now): RateLimiter {
  const buckets = new Map<string, Bucket>();
  return {
    consume(subjectHash, limit, windowMs) {
      const time = now();
      const current = buckets.get(subjectHash);
      if (!current || time - current.windowStart >= windowMs) {
        buckets.set(subjectHash, { windowStart: time, count: 1 });
        return false;
      }
      current.count += 1;
      return current.count > limit;
    },
  };
}

type Delivery =
  | { status: "inflight"; id: string; promise: Promise<boolean> }
  | { status: "sent"; id: string };

export type DeliveryBook = {
  sentId(key: string): string | undefined;
  inflight(key: string): Promise<boolean> | undefined;
  begin(key: string, id: string, send: () => Promise<void>): Promise<boolean>;
  admitted(key: string): boolean;
  admit(key: string): void;
};

/**
 * Remembers a successful send for this server process so a retry reuses the
 * reference and does not call Resend again. The form payload is not stored.
 * Resend's Idempotency-Key covers a retry that reaches another process.
 */
export function createDeliveryBook(): DeliveryBook {
  const entries = new Map<string, Delivery>();
  const admitted = new Set<string>();
  return {
    sentId(key) {
      const entry = entries.get(key);
      return entry?.status === "sent" ? entry.id : undefined;
    },
    inflight(key) {
      const entry = entries.get(key);
      return entry?.status === "inflight" ? entry.promise : undefined;
    },
    begin(key, id, send) {
      const promise = send()
        .then(() => {
          entries.set(key, { status: "sent", id });
          return true;
        })
        .catch((error: unknown) => {
          entries.delete(key);
          throw error;
        });
      entries.set(key, { status: "inflight", id, promise });
      return promise;
    },
    admitted(key) {
      return admitted.has(key);
    },
    admit(key) {
      admitted.add(key);
    },
  };
}
