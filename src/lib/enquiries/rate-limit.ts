import { createHash } from "node:crypto";

export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/** A hash only. The raw address is not stored with the enquiry. */
export function hashRateLimitSubject(ip: string, salt = process.env.RATE_LIMIT_SALT || "locum-hands-local"): string {
  return createHash("sha256").update(`${salt}\n${ip}`).digest("hex");
}

export function clientIp(headers: { get(name: string): string | null }): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim().slice(0, 80);
  const realIp = headers.get("x-real-ip")?.trim();
  return realIp ? realIp.slice(0, 80) : "unknown";
}
