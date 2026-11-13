import { useEffect, useRef, type ReactNode } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
};

const inputClasses =
  "mt-1 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 shadow-sm placeholder:text-navy-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 disabled:opacity-60";

function describedBy(id: string, error?: string, hint?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-navy-800">
      {label}
      {required && (
        <span className="ml-0.5 text-teal-600">
          <span className="sr-only"> (required)</span>
          <span aria-hidden="true">*</span>
        </span>
      )}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
      {error}
    </p>
  );
}

function Hint({ id, hint }: { id: string; hint?: string }) {
  if (!hint) return null;
  return (
    <p id={`${id}-hint`} className="mt-1 text-sm text-navy-400">
      {hint}
    </p>
  );
}

export function TextField({
  id,
  label,
  error,
  required,
  hint,
  type = "text",
  ...rest
}: BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { type?: string }) {
  return (
    <div>
      <Label id={id} label={label} required={required} />
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={inputClasses}
        {...rest}
      />
      <Hint id={id} hint={hint} />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  required,
  hint,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label id={id} label={label} required={required} />
      <textarea
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={inputClasses}
        rows={4}
        {...rest}
      />
      <Hint id={id} hint={hint} />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  error,
  required,
  hint,
  children,
  ...rest
}: BaseProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div>
      <Label id={id} label={label} required={required} />
      <select
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={inputClasses}
        {...rest}
      >
        {children}
      </select>
      <Hint id={id} hint={hint} />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function CheckboxField({
  id,
  error,
  children,
  ...rest
}: {
  id: string;
  error?: string;
  children: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-5 w-5 rounded border-navy-300 text-teal-500 focus:ring-teal-300"
          {...rest}
        />
        <label htmlFor={id} className="text-sm text-navy-700">
          {children}
        </label>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}

/** Honeypot field – hidden from users, catches naive bots. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="hp_field">Leave this field empty</label>
      <input id="hp_field" name="hp_field" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

export function FormStatus({
  status,
  successTitle,
  successMessage,
  errorMessage,
  onAnother,
  anotherLabel,
}: {
  status: "idle" | "submitting" | "success" | "error";
  successTitle: string;
  successMessage: string;
  errorMessage?: string;
  onAnother?: () => void;
  anotherLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "success" || status === "error") ref.current?.focus();
  }, [status, successMessage, errorMessage]);

  if (status === "success") {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="status"
        className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-teal-900 outline-none"
      >
        <p className="font-semibold">{successTitle}</p>
        <p className="mt-1 text-sm">{successMessage}</p>
        {onAnother && (
          <button
            type="button"
            onClick={onAnother}
            className="mt-4 text-sm font-semibold text-teal-800 underline"
          >
            {anotherLabel ?? "Send another"}
          </button>
        )}
      </div>
    );
  }
  if (status === "error") {
    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="alert"
        className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 outline-none"
      >
        <p className="font-semibold">We couldn&apos;t confirm that</p>
        <p className="mt-1 text-sm">
          {errorMessage ?? "Please check the form and try again, or contact us directly."}
        </p>
      </div>
    );
  }
  return null;
}
