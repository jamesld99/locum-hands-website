import { NextResponse, type NextRequest } from "next/server";
import type { ZodType } from "zod";
import { saveSubmission, type SubmissionKind } from "./storage";

/**
 * Very small in-memory rate limiter. Good enough to blunt abuse on a single
 * instance; for multi-instance production swap for a shared store (e.g. Upstash).
 */
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function getIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Shared POST handler: rate-limits, validates with a Zod schema, rejects
 * honeypot hits, and persists the submission.
 */
export async function handleSubmission(
  req: NextRequest,
  kind: SubmissionKind,
  schema: ZodType,
) {
  const ip = getIp(req);

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data as Record<string, unknown>;

  // Honeypot: silently accept but discard obvious bot submissions.
  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true, id: "ignored" });
  }

  try {
    const { id } = await saveSubmission(kind, data, {
      ip,
      userAgent: req.headers.get("user-agent"),
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (err) {
    console.error(`Failed to save ${kind} submission`, err);
    return NextResponse.json(
      { ok: false, error: "We couldn't save your submission. Please try again." },
      { status: 500 },
    );
  }
}
