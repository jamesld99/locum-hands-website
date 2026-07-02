import { siteConfig } from "./site";

/** Formats the Companies House registered office as a single-line address. */
export function formatRegisteredOffice(): string {
  const { streetAddress, addressLocality, postalCode } = siteConfig.registeredOffice;
  return `${streetAddress}, ${addressLocality}, ${postalCode}`;
}
