import { NextResponse, type NextRequest } from "next/server";
import type { ZodType } from "zod";
import { clientIp } from "./enquiries/rate-limit";
import { handleEnquiryRequest, type EnquiryDeps } from "./enquiries/submit";
import { createMailerFromEnv } from "./enquiries/notify";
import type { EnquiryKind } from "./enquiries/types";

function defaultDeps(): EnquiryDeps {
  return {
    mailer: createMailerFromEnv(),
    from: process.env.ENQUIRY_FROM_EMAIL || "Locum Hands <notifications@notify.locumhands.co.uk>",
    to: process.env.ENQUIRY_TO_EMAIL || "hello@locumhands.co.uk",
  };
}

/**
 * Shared POST handler. Validates, rate-limits in memory, then sends the
 * enquiry email. A reference is returned only after Resend accepts the send.
 */
export async function handleSubmission(req: NextRequest, kind: EnquiryKind, schema: ZodType) {
  let bodyText = "";
  try {
    bodyText = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const result = await handleEnquiryRequest(
    {
      kind,
      schema,
      contentType: req.headers.get("content-type"),
      contentLength: req.headers.get("content-length"),
      bodyText,
      ipHint: clientIp(req.headers),
    },
    defaultDeps(),
  );

  return NextResponse.json(result.body, {
    status: result.status,
    headers: result.status === 429 ? { "Retry-After": "600" } : undefined,
  });
}
