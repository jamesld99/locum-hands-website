import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import {
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | UK Dental Locum Agency`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "dental locum agency UK",
    "dental nurse locum jobs",
    "hygienist locum work",
    "dentist locum agency",
    "temporary dental staff",
    "dental locum nursing",
    "dental locum jobs",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | UK Dental Locum Agency`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/locum-hands-logo.png",
        width: 1024,
        height: 1024,
        alt: "Locum Hands Ltd — UK dental locum agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | UK Dental Locum Agency`,
    description: siteConfig.description,
    images: ["/images/locum-hands-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/locum-hands-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/locum-hands-logo.png", sizes: "512x512", type: "image/png" },
    ],
  },
  category: "Healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-navy-900 antialiased">
        <JsonLd
          data={[organizationSchema(), localBusinessSchema(), websiteSchema()]}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
