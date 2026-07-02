import { siteConfig } from "./site";

/**
 * Structured-data (JSON-LD) builders. Output is injected via the <JsonLd />
 * component so search engines can read Organization, LocalBusiness, Breadcrumb,
 * FAQ, Article and WebSite markup.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/images/locum-hands-logo.png`,
      width: 1024,
      height: 1024,
    },
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    foundingDate: siteConfig.companiesHouse.incorporated,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "Companies House",
      name: "Company number",
      value: siteConfig.companiesHouse.number,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      areaServed: "GB",
      availableLanguage: "English",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.registeredOffice.streetAddress,
      addressLocality: siteConfig.registeredOffice.addressLocality,
      postalCode: siteConfig.registeredOffice.postalCode,
      addressCountry: siteConfig.registeredOffice.addressCountry,
    },
    sameAs: [
      siteConfig.companiesHouse.url,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EmploymentAgency"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.legalName,
    image: `${siteConfig.url}/images/locum-hands-logo.png`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "££",
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.registeredOffice.streetAddress,
      addressLocality: siteConfig.registeredOffice.addressLocality,
      postalCode: siteConfig.registeredOffice.postalCode,
      addressCountry: siteConfig.registeredOffice.addressCountry,
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    sameAs: [
      siteConfig.companiesHouse.url,
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en-GB",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
    image: post.image
      ? `${siteConfig.url}${post.image}`
      : `${siteConfig.url}/images/locum-hands-logo.png`,
    inLanguage: "en-GB",
  };
}

export function guideSchema(guide: {
  title: string;
  description: string;
  slug: string;
  updated: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updated,
    datePublished: guide.updated,
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/resources/${guide.slug}`,
    },
    image: `${siteConfig.url}/images/locum-hands-logo.png`,
    inLanguage: "en-GB",
  };
}
