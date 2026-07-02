import type { Metadata } from "next";
import { siteConfig } from "./site";

/** Shared SEO constants used across metadata, Open Graph and Twitter cards. */
export const SEO = {
  brandSuffix: "Locum Hands",
  maxTitleLength: 60,
  maxDescriptionLength: 160,
  defaultOgImage: {
    url: "/images/locum-hands-logo.png",
    width: 1024,
    height: 1024,
    alt: "Locum Hands Ltd — UK dental locum agency",
  },
} as const;

export function trimDescription(text: string, max = SEO.maxDescriptionLength): string {
  const normalised = text.replace(/\s+/g, " ").trim();
  if (normalised.length <= max) return normalised;
  const cut = normalised.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 120 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/** Builds a title capped at 60 characters including the brand suffix. */
export function buildAbsoluteTitle(pageTitle: string): string {
  const suffix = ` | ${SEO.brandSuffix}`;
  const maxPage = SEO.maxTitleLength - suffix.length;
  let title = pageTitle.trim();
  if (title.length > maxPage) {
    const cut = title.slice(0, maxPage - 1);
    const lastSpace = cut.lastIndexOf(" ");
    title = `${(lastSpace > maxPage * 0.6 ? cut.slice(0, lastSpace) : cut).trim()}…`;
  }
  return `${title}${suffix}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string | string[];
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noIndex?: boolean;
};

/** Standard page metadata with canonical, Open Graph and Twitter cards. */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    type = "website",
    keywords,
    publishedTime,
    modifiedTime,
    authors,
    tags,
    noIndex = false,
  } = options;

  const absoluteTitle = buildAbsoluteTitle(title);
  const metaDescription = trimDescription(description);

  return {
    title: { absolute: absoluteTitle },
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: absoluteTitle,
      description: metaDescription,
      images: [SEO.defaultOgImage],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: metaDescription,
      images: [SEO.defaultOgImage.url],
    },
    ...(keywords && { keywords }),
    ...(noIndex && {
      robots: { index: false, follow: true },
    }),
  };
}

/** Metadata for 404 and soft-not-found states — never indexed. */
export function buildNotFoundMetadata(label = "Page not found"): Metadata {
  const absoluteTitle = buildAbsoluteTitle(label);
  const metaDescription = trimDescription(
    "The page you requested could not be found on Locum Hands Ltd. Visit our homepage, resources or blog for UK dental locum information."
  );

  return {
    title: { absolute: absoluteTitle },
    description: metaDescription,
    robots: { index: false, follow: true },
    openGraph: {
      title: absoluteTitle,
      description: metaDescription,
      images: [SEO.defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description: metaDescription,
      images: [SEO.defaultOgImage.url],
    },
  };
}
