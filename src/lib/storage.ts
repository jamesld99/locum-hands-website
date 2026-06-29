import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Lightweight, append-only submission store.
 *
 * Submissions are written as newline-delimited JSON (JSONL) to a data directory
 * with restrictive file permissions (owner read/write only). This keeps the
 * starter fully functional with zero external services.
 *
 * For production at scale on Vercel (where the app filesystem is read-only),
 * set the SUBMISSIONS_DIR env var to a writable path, or swap the body of
 * `saveSubmission` for a managed datastore (e.g. Vercel Postgres, Supabase) and
 * an email notifier (e.g. Resend). The public API of this module stays the same.
 */

export type SubmissionKind = "professional" | "practice" | "contact";

const DATA_DIR = process.env.SUBMISSIONS_DIR
  ? path.resolve(process.env.SUBMISSIONS_DIR)
  : path.join(process.cwd(), "data");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true, mode: 0o700 });
}

export async function saveSubmission(
  kind: SubmissionKind,
  data: Record<string, unknown>,
  meta: { ip?: string | null; userAgent?: string | null } = {},
): Promise<{ id: string }> {
  const id = randomUUID();
  const record = {
    id,
    kind,
    receivedAt: new Date().toISOString(),
    // Never persist the honeypot field.
    data: stripInternalFields(data),
    meta: {
      ip: meta.ip ?? null,
      userAgent: meta.userAgent ?? null,
    },
  };

  await ensureDir();
  const file = path.join(DATA_DIR, `${kind}.jsonl`);
  await fs.appendFile(file, JSON.stringify(record) + "\n", { mode: 0o600 });

  return { id };
}

function stripInternalFields(data: Record<string, unknown>) {
  const clone = { ...data };
  delete clone.website; // honeypot
  return clone;
}
