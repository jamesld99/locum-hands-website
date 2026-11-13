export const enquiryKinds = ["professional", "practice", "contact"] as const;

export type EnquiryKind = (typeof enquiryKinds)[number];

export type NotificationStatus = "pending" | "sending" | "sent" | "failed";

export type EnquiryRecord = {
  id: string;
  kind: EnquiryKind;
  idempotencyKey: string;
  payload: Record<string, unknown>;
  replyTo: string;
  createdAt: string;
  notificationStatus: NotificationStatus;
  notificationAttempts: number;
  notificationError: string | null;
  notificationKey: string;
};

export type InsertEnquiryInput = {
  kind: EnquiryKind;
  idempotencyKey: string;
  payload: Record<string, unknown>;
  replyTo: string;
};

export class StorageUnavailableError extends Error {
  readonly code = "STORAGE_UNAVAILABLE";

  constructor() {
    super("STORAGE_UNAVAILABLE");
    this.name = "StorageUnavailableError";
  }
}

export class EmailNotConfiguredError extends Error {
  readonly code = "EMAIL_NOT_CONFIGURED";

  constructor() {
    super("EMAIL_NOT_CONFIGURED");
    this.name = "EmailNotConfiguredError";
  }
}
