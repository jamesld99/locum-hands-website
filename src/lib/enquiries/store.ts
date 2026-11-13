import { randomUUID } from "node:crypto";
import type { EnquiryKind, EnquiryRecord, InsertEnquiryInput, NotificationStatus } from "./types";

export type Sql = {
  query: (text: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
};

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS enquiries (
    id uuid PRIMARY KEY,
    kind text NOT NULL,
    idempotency_key uuid NOT NULL,
    payload jsonb NOT NULL,
    reply_to text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    notification_status text NOT NULL,
    notification_attempts integer NOT NULL DEFAULT 0,
    notification_error text,
    notification_claimed_at timestamptz,
    notification_sent_at timestamptz,
    notification_key text NOT NULL UNIQUE,
    UNIQUE (kind, idempotency_key)
  )`,
  `CREATE TABLE IF NOT EXISTS enquiry_rate_limits (
    subject_hash text PRIMARY KEY,
    window_start timestamptz NOT NULL,
    hit_count integer NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS enquiries_notification_status_idx
    ON enquiries (notification_status)`,
];

const COLUMNS = `id, kind, idempotency_key, payload, reply_to, created_at,
  notification_status, notification_attempts, notification_error, notification_key`;

export function createEnquiryStore(sql: Sql) {
  let ready: Promise<void> | null = null;

  async function ensureSchema() {
    ready ??= (async () => {
      for (const statement of SCHEMA) {
        await sql.query(statement);
      }
    })();
    return ready;
  }

  return {
    ensureSchema,

    async insertEnquiry(input: InsertEnquiryInput): Promise<{ record: EnquiryRecord; created: boolean }> {
      await ensureSchema();
      const id = randomUUID();
      const inserted = await sql.query(
        `INSERT INTO enquiries (
          id, kind, idempotency_key, payload, reply_to, notification_status, notification_key
        ) VALUES ($1, $2, $3, $4::jsonb, $5, 'pending', $6)
        ON CONFLICT (kind, idempotency_key) DO NOTHING
        RETURNING ${COLUMNS}`,
        [
          id,
          input.kind,
          input.idempotencyKey,
          JSON.stringify(input.payload),
          input.replyTo,
          `enquiry:${id}`,
        ],
      );
      if (inserted.rows[0]) {
        return { record: mapRow(inserted.rows[0]), created: true };
      }
      const existing = await sql.query(
        `SELECT ${COLUMNS} FROM enquiries WHERE kind = $1 AND idempotency_key = $2`,
        [input.kind, input.idempotencyKey],
      );
      const row = existing.rows[0];
      if (!row) throw new Error("ENQUIRY_NOT_FOUND");
      return { record: mapRow(row), created: false };
    },

    async claimForSend(
      id: string,
      options: { reclaimStaleSending?: boolean } = {},
    ): Promise<EnquiryRecord | null> {
      await ensureSchema();
      const staleClause = options.reclaimStaleSending
        ? `OR (notification_status = 'sending' AND notification_claimed_at < now() - interval '15 minutes')`
        : "";
      const result = await sql.query(
        `UPDATE enquiries
         SET notification_status = 'sending',
             notification_attempts = notification_attempts + 1,
             notification_claimed_at = now(),
             notification_error = NULL
         WHERE id = $1
           AND (
             notification_status IN ('pending', 'failed')
             ${staleClause}
           )
         RETURNING ${COLUMNS}`,
        [id],
      );
      return result.rows[0] ? mapRow(result.rows[0]) : null;
    },

    async markSent(id: string): Promise<void> {
      await ensureSchema();
      await sql.query(
        `UPDATE enquiries
         SET notification_status = 'sent', notification_sent_at = now(), notification_error = NULL
         WHERE id = $1`,
        [id],
      );
    },

    async markFailed(id: string, errorCode: string): Promise<void> {
      await ensureSchema();
      await sql.query(
        `UPDATE enquiries
         SET notification_status = 'failed', notification_error = $2
         WHERE id = $1`,
        [id, errorCode.slice(0, 80)],
      );
    },

    async getById(id: string): Promise<EnquiryRecord | null> {
      await ensureSchema();
      const result = await sql.query(`SELECT ${COLUMNS} FROM enquiries WHERE id = $1`, [id]);
      return result.rows[0] ? mapRow(result.rows[0]) : null;
    },

    async listNeedingAttention(): Promise<EnquiryRecord[]> {
      await ensureSchema();
      const result = await sql.query(
        `SELECT ${COLUMNS} FROM enquiries
         WHERE notification_status IN ('pending', 'sending', 'failed')
         ORDER BY created_at ASC`,
      );
      return result.rows.map(mapRow);
    },

    async countEnquiries(): Promise<number> {
      await ensureSchema();
      const result = await sql.query(`SELECT count(*)::int AS count FROM enquiries`);
      return Number(result.rows[0]?.count ?? 0);
    },

    /** Returns true when this subject has exceeded the shared limit. */
    async consumeRateLimit(subjectHash: string, limit: number, windowMs: number): Promise<boolean> {
      await ensureSchema();
      const windowSeconds = windowMs / 1000;
      const result = await sql.query(
        `INSERT INTO enquiry_rate_limits (subject_hash, window_start, hit_count)
         VALUES ($1, now(), 1)
         ON CONFLICT (subject_hash) DO UPDATE SET
           hit_count = CASE
             WHEN enquiry_rate_limits.window_start <= now() - make_interval(secs => $2::double precision)
               THEN 1
             ELSE enquiry_rate_limits.hit_count + 1
           END,
           window_start = CASE
             WHEN enquiry_rate_limits.window_start <= now() - make_interval(secs => $2::double precision)
               THEN now()
             ELSE enquiry_rate_limits.window_start
           END
         RETURNING hit_count`,
        [subjectHash, windowSeconds],
      );
      return Number(result.rows[0]?.hit_count ?? 0) > limit;
    },
  };
}

export type EnquiryStore = ReturnType<typeof createEnquiryStore>;

function mapRow(row: Record<string, unknown>): EnquiryRecord {
  const payload = row.payload;
  return {
    id: String(row.id),
    kind: String(row.kind) as EnquiryKind,
    idempotencyKey: String(row.idempotency_key),
    payload:
      typeof payload === "string"
        ? (JSON.parse(payload) as Record<string, unknown>)
        : (payload as Record<string, unknown>),
    replyTo: String(row.reply_to),
    createdAt: asIso(row.created_at),
    notificationStatus: String(row.notification_status) as NotificationStatus,
    notificationAttempts: Number(row.notification_attempts ?? 0),
    notificationError: row.notification_error == null ? null : String(row.notification_error),
    notificationKey: String(row.notification_key),
  };
}

function asIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
}
