"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ZodType } from "zod";
import { genericSubmitError } from "@/lib/copy";

export type EnquiryStatus = "idle" | "submitting" | "success" | "error";
export type FieldErrors = Record<string, string>;

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function useEnquiryForm(options: {
  schema: ZodType;
  endpoint: string;
  fieldOrder: string[];
  buildPayload: (form: HTMLFormElement) => Record<string, unknown>;
}) {
  const idempotencyKey = useRef(crypto.randomUUID());
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const [focusId, setFocusId] = useState("");
  const [focusToken, setFocusToken] = useState(0);
  const summaryId = useId();

  useEffect(() => {
    if (!focusId) return;
    document.getElementById(focusId)?.focus();
  }, [focusId, focusToken]);

  function showFieldErrors(fieldErrors: FieldErrors) {
    setErrors(fieldErrors);
    setStatus("idle");
    setMessage("");
    const first = options.fieldOrder.find((key) => fieldErrors[key]);
    setFocusId(first ?? "");
    setFocusToken((token) => token + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      ...options.buildPayload(form),
      idempotencyKey: idempotencyKey.current,
      hp_field: String(new FormData(form).get("hp_field") ?? ""),
    };
    const parsed = options.schema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      showFieldErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setMessage("");
    try {
      const response = await fetch(options.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json().catch(() => null)) as {
        ok?: boolean;
        id?: string;
        error?: string;
        fieldErrors?: FieldErrors;
      } | null;

      if (body?.fieldErrors && Object.keys(body.fieldErrors).length > 0) {
        showFieldErrors(body.fieldErrors);
        return;
      }

      if (!response.ok || !body?.ok || !body.id || !UUID.test(body.id)) {
        setStatus("error");
        setMessage(body?.error || genericSubmitError);
        return;
      }

      setReference(body.id);
      setStatus("success");
    } catch {
      setStatus("error");
      setMessage(genericSubmitError);
    }
  }

  function startAnother() {
    idempotencyKey.current = crypto.randomUUID();
    setStatus("idle");
    setErrors({});
    setMessage("");
    setReference("");
    setFocusId("");
  }

  return {
    status,
    errors,
    message,
    reference,
    summaryId,
    handleSubmit,
    startAnother,
  };
}
