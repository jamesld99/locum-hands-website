"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mainNav, siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setOpen(false);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Locum Hands Ltd home">
          <Image
            src="/images/locum-hands-icon.png"
            alt="Locum Hands Ltd logo"
            width={56}
            height={56}
            className="h-12 w-12 object-contain"
            priority
          />
          <span className="hidden text-lg font-bold leading-tight text-navy-700 sm:block">
            Locum Hands
            <span className="block text-xs font-medium text-teal-600">
              Supplying Dental Locums
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-teal-600"
                    : "text-navy-700 hover:text-teal-600"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/practices#enquiry"
            className="rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Book staff
          </Link>
          <Link
            href="/professionals#register"
            className="rounded-lg border border-navy-200 px-4 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50"
          >
            Find work
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-700 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-navy-100 bg-white lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive(item.href)
                      ? "bg-teal-50 text-teal-700"
                      : "text-navy-700 hover:bg-navy-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="grid grid-cols-2 gap-2 pt-3">
              <Link
                href="/practices#enquiry"
                onClick={closeMenu}
                className="rounded-lg bg-teal-500 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Book staff
              </Link>
              <Link
                href="/professionals#register"
                onClick={closeMenu}
                className="rounded-lg border border-navy-200 px-4 py-2 text-center text-sm font-semibold text-navy-700"
              >
                Find work
              </Link>
            </li>
            <li className="pt-2 text-sm text-navy-500">
              <a href={`tel:${siteConfig.phone}`} className="hover:text-teal-600">
                Call {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
