import { siteConfig } from "./site";

/** Approved pay wording. Use this exact sentence on For Professionals and in the earnings FAQ. */
export const professionalPayWording =
  "You set your own locum rate. We'll discuss it with the dental practice and negotiate with the aim of staying close to the usual rates for your role in that area. You'll know the agreed rate before you decide whether to accept the booking.";

/** Approved practice pricing FAQ. Do not add VAT, therapist fees, cancellation fees or booking-change fees here. */
export const practicePricingWording =
  "The dental practice pays a fixed Locum Hands booking fee once per booked day. The fee is £40 per day for a dental nurse or hygienist and £60 per day for a dentist. This is separate from the locum's agreed rate. We confirm both amounts before you book.";

export const sendFailureMessage = `We couldn't send that. Your answers are still in the form. Please try again, or call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`;

export const rateLimitMessage = `Please wait a few minutes before sending that again. You can also call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`;

export const genericSubmitError = `We couldn't submit that. Your answers are still in the form. Please try again, or call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`;
