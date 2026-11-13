import { z } from "zod";

/**
 * Shared validation schemas used by both the client forms and the API routes.
 */

const ukPhone = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(20, "Phone number is too long")
  .regex(/^[+0-9()\s-]+$/, "Please enter a valid phone number");

const optionalPhone = z.union([z.literal(""), ukPhone]);

export const professionOptions = [
  { value: "nurse", label: "Dental nurse" },
  { value: "hygienist", label: "Dental hygienist" },
  { value: "therapist", label: "Dental therapist" },
  { value: "dentist", label: "Dentist" },
  { value: "other", label: "Another dental role" },
] as const;

export const experienceOptions = [
  { value: "newly-qualified", label: "Newly qualified" },
  { value: "1-3-years", label: "1–3 years" },
  { value: "3-5-years", label: "3–5 years" },
  { value: "5-plus-years", label: "5+ years" },
] as const;

export const availabilityOptions = [
  { value: "immediately", label: "Available now" },
  { value: "within-2-weeks", label: "Within 2 weeks" },
  { value: "within-a-month", label: "Within a month" },
  { value: "flexible", label: "Flexible" },
] as const;

export const workSoughtOptions = [
  { value: "locum-days", label: "Locum days" },
  { value: "block-booking", label: "A block of days" },
  { value: "longer-cover", label: "Longer cover" },
  { value: "flexible", label: "Flexible / not sure yet" },
] as const;

export const coverTypeOptions = [
  { value: "planned", label: "Planned cover" },
  { value: "sickness", label: "Sickness" },
  { value: "holiday", label: "Holiday" },
  { value: "maternity", label: "Maternity or longer leave" },
  { value: "ongoing", label: "Ongoing cover" },
  { value: "tentative", label: "Tentative — dates may change" },
] as const;

export const enquiryTypeOptions = [
  { value: "professional", label: "Dental professional" },
  { value: "practice", label: "Dental practice" },
  { value: "general", label: "General enquiry" },
] as const;

const professionValues = professionOptions.map((option) => option.value) as [
  (typeof professionOptions)[number]["value"],
  ...(typeof professionOptions)[number]["value"][],
];
const experienceValues = experienceOptions.map((option) => option.value) as [
  (typeof experienceOptions)[number]["value"],
  ...(typeof experienceOptions)[number]["value"][],
];
const availabilityValues = availabilityOptions.map((option) => option.value) as [
  (typeof availabilityOptions)[number]["value"],
  ...(typeof availabilityOptions)[number]["value"][],
];
const workSoughtValues = workSoughtOptions.map((option) => option.value) as [
  (typeof workSoughtOptions)[number]["value"],
  ...(typeof workSoughtOptions)[number]["value"][],
];
const coverTypeValues = coverTypeOptions.map((option) => option.value) as [
  (typeof coverTypeOptions)[number]["value"],
  ...(typeof coverTypeOptions)[number]["value"][],
];

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const consent = z
  .boolean()
  .refine((value) => value === true, "Please confirm you have read the privacy notice");

const honeypot = z.string().optional().or(z.literal(""));
const idempotencyKey = z.string().uuid("Please try sending the form again");

export const professionalSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(100),
    email: z.string().trim().email("Please enter a valid email address").max(150),
    phone: ukPhone,
    professionType: z.enum(professionValues, { message: "Please select your profession" }),
    professionOther: optionalText(80),
    gdcNumber: optionalText(20),
    experienceLevel: z.enum(experienceValues, { message: "Please select your experience" }),
    availability: z.enum(availabilityValues, { message: "Please select your availability" }),
    locationPreferences: z
      .string()
      .trim()
      .min(2, "Please tell us where you'd like to work")
      .max(300),
    workSought: z.enum(workSoughtValues, { message: "Please tell us the type of work you want" }),
    message: optionalText(2000),
    consent,
    hp_field: honeypot,
    idempotencyKey,
  })
  .superRefine((data, ctx) => {
    if (data.professionType === "other" && !data.professionOther?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["professionOther"],
        message: "Please tell us which role you do",
      });
    }
    const gdc = data.gdcNumber?.trim() ?? "";
    if (gdc && !/^[A-Za-z0-9-]{4,20}$/.test(gdc)) {
      ctx.addIssue({
        code: "custom",
        path: ["gdcNumber"],
        message: "Please check the GDC number",
      });
    }
  });

export const practiceSchema = z
  .object({
    practiceName: z.string().trim().min(2, "Please enter the practice name").max(150),
    contactName: z.string().trim().min(2, "Please enter a contact name").max(100),
    email: z.string().trim().email("Please enter a valid email address").max(150),
    phone: ukPhone,
    location: z.string().trim().min(2, "Please enter the practice location").max(200),
    roleNeeded: z.enum(professionValues, { message: "Please select the role you need" }),
    roleOther: optionalText(80),
    numberOfLocums: z
      .number({ error: "Please enter how many locums you need" })
      .int("Please enter a whole number of locums")
      .min(1, "Please enter how many locums you need")
      .max(20, "Please call us if you need more than 20 locums"),
    bookingDates: z
      .string()
      .trim()
      .min(2, "Please tell us the dates, even if they are still tentative")
      .max(1000),
    shiftHours: z.string().trim().min(2, "Please tell us the shift hours").max(200),
    coverType: z.enum(coverTypeValues, { message: "Please select the type of cover" }),
    details: optionalText(2000),
    consent,
    hp_field: honeypot,
    idempotencyKey,
  })
  .superRefine((data, ctx) => {
    if (data.roleNeeded === "other" && !data.roleOther?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["roleOther"],
        message: "Please tell us which role you need",
      });
    }
  });

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(150),
  phone: optionalPhone,
  enquiryType: z.union([
    z.enum(["professional", "practice", "general"]),
    z.literal(""),
  ]),
  message: z.string().trim().min(10, "Please enter at least 10 characters").max(2000),
  consent,
  hp_field: honeypot,
  idempotencyKey,
});

export type ProfessionalInput = z.infer<typeof professionalSchema>;
export type PracticeInput = z.infer<typeof practiceSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: unknown,
): string {
  const match = options.find((option) => option.value === value);
  return match?.label ?? (typeof value === "string" ? value : "");
}
