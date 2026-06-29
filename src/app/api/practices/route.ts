import type { NextRequest } from "next/server";
import { handleSubmission } from "@/lib/api";
import { practiceSchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  return handleSubmission(req, "practice", practiceSchema);
}
