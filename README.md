# Locum Hands Ltd — Website

A professional, modern marketing website for **Locum Hands Ltd**, a UK-wide dental
locum agency connecting dental nurses, hygienists, therapists and dentists with
dental practices that need reliable temporary staff.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, optimised for
SEO, accessibility (WCAG) and fast loads, and ready to deploy to **Vercel**.

## Features

- **Pages**: Home, For Professionals, For Practices, About, Blog (with post,
  category and tag pages), Contact and FAQs.
- **Forms** (validated with [Zod](https://zod.dev) on client *and* server):
  - Professional registration (name, email, phone, profession, experience,
    location preferences, availability).
  - Practice booking enquiry.
  - Contact enquiry.
  - Honeypot + in-memory rate limiting for spam/abuse protection.
- **SEO**: dynamic metadata, Open Graph/Twitter cards, `sitemap.xml`, `robots.txt`,
  canonical URLs, semantic HTML and a proper heading hierarchy.
- **Structured data (JSON-LD)**: `Organization`, `LocalBusiness` /
  `EmploymentAgency`, `WebSite`, `BreadcrumbList`, `FAQPage` and `BlogPosting`,
  all UK-targeted.
- **Blog taxonomy**: categories and tags with their own crawlable pages and
  internal linking, targeting UK dental locum search terms.
- **Accessibility**: skip link, visible focus styles, ARIA-friendly forms,
  reduced-motion support and keyboard-navigable menus.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm start       # run the production build
npm run lint    # eslint
```

## Configuration

All site-wide details live in [`src/lib/site.ts`](src/lib/site.ts) — update the
production `url`, phone, email and address there and they flow through metadata,
schema, the header and the footer.

## Form submissions

Enquiries are validated in the browser and on the server, then saved to
PostgreSQL. That database row is the receipt. Resend is only the notification
to `hello@locumhands.co.uk`. Local JSON files and Vercel's temporary disk are
not a receipt.

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a Postgres
database. Without `RESEND_API_KEY`, the enquiry is still saved and the
notification is marked failed so it can be retried. Do not set real secrets in
the example file.

Authorised staff can inspect and retry notifications with:

```bash
npm run enquiries:status
npm run enquiries:retry
```

`enquiries:status -- --details` prints the submitted fields. Keep that output
private.

## Content

- Blog posts: [`src/lib/blog.ts`](src/lib/blog.ts)
- FAQs: [`src/lib/faqs.ts`](src/lib/faqs.ts)

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it into Vercel.
3. Set the production domain and update `siteConfig.url`.
4. (Recommended) Configure a datastore for form submissions as noted above.
