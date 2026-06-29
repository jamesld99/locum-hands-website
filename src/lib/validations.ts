import { z } from "zod";

/**
 * Shared validation schemas used by both the client forms and the API routes,
 * guaranteeing the same rules run in the browser and on the server.
 */

const ukPhone = z
  .string()
  .trim()
  .min(7, "Please enter a valid phone number")
  .max(20, "Phone number is too long")
  .regex(/^[+0-9()\s-]+$/, "Please enter a valid phone number");

export const professionTypes = ["nurse", "hygienist", "dentist", "therapist"] as const;
export const experienceLevels = [
  "newly-qualified",
  "1-3-years",
  "3-5-years",
  "5-plus-years",
] as const;
export const availabilityOptions = [
  "immediately",
  "within-2-weeks",
  "within-a-month",
  "flexible",
] as const;

export const professionalSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(150),
  phone: ukPhone,
  professionType: z.enum(professionTypes, {
    message: "Please select your profession",
  }),
  experienceLevel: z.enum(experienceLevels, {
    message: "Please select your experience level",
  }),
  locationPreferences: z
    .string()
    .trim()
    .min(2, "Please tell us where you'd like to work")
    .max(300),
  availability: z.enum(availabilityOptions, {
    message: "Please select your availability",
  }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please accept the privacy policy to continue"),
  // Honeypot anti-spam field. Accepted by the schema but checked server-side so
  // bot submissions are silently discarded (handleSubmission in lib/api.ts).
  website: z.string().optional().or(z.literal("")),
});

export const practiceSchema = z.object({
  practiceName: z.string().trim().min(2, "Please enter your practice name").max(150),
  contactName: z.string().trim().min(2, "Please enter a contact name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(150),
  phone: ukPhone,
  location: z.string().trim().min(2, "Please enter the practice location").max(200),
  roleNeeded: z.enum(professionTypes, {
    message: "Please select the role you need",
  }),
  startDate: z.string().trim().min(1, "Please tell us when cover is needed").max(100),
  duration: z.string().trim().min(1, "Please tell us how long cover is needed").max(100),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please accept the privacy policy to continue"),
  website: z.string().optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(150),
  phone: ukPhone.optional().or(z.literal("")),
  enquiryType: z.enum(["professional", "practice", "general"], {
    message: "Please select an enquiry type",
  }),
  subject: z.string().trim().min(2, "Please enter a subject").max(150),
  message: z.string().trim().min(10, "Please enter at least 10 characters").max(2000),
  consent: z
    .boolean()
    .refine((v) => v === true, "Please accept the privacy policy to continue"),
  website: z.string().optional().or(z.literal("")),
});

export type ProfessionalInput = z.infer<typeof professionalSchema>;
export type PracticeInput = z.infer<typeof practiceSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
