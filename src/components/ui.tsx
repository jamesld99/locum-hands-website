import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
};

const buttonStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-teal-500 text-white hover:bg-teal-600 shadow-sm focus-visible:outline-teal-300",
  secondary:
    "bg-navy-700 text-white hover:bg-navy-800 shadow-sm focus-visible:outline-navy-300",
  outline:
    "border border-navy-200 bg-white text-navy-700 hover:bg-navy-50",
  ghost: "text-navy-700 hover:text-teal-600",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const isExternal = href.startsWith("http");
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-semibold transition-colors ${buttonStyles[variant]} ${className}`;
  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block text-sm font-semibold uppercase tracking-wider text-teal-600">
      {children}
    </span>
  );
}

export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      {children}
    </Tag>
  );
}
