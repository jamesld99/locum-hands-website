import type { ReactNode } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
};

const inputClasses =
  "mt-1 block w-full rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-navy-900 shadow-sm placeholder:text-navy-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 disabled:opacity-60";

function Label({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-navy-800">
      {label}
      {required && <span className="ml-0.5 text-teal-600" aria-hidden="true">*</span>}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
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
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
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
          aria-invalid={!!error}
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
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormStatus({
  status,
  successTitle,
  successMessage,
  errorMessage,
}: {
  status: "idle" | "submitting" | "success" | "error";
  successTitle: string;
  successMessage: string;
  errorMessage?: string;
}) {
  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-teal-200 bg-teal-50 p-4 text-teal-900"
      >
        <p className="font-semibold">{successTitle}</p>
        <p className="mt-1 text-sm">{successMessage}</p>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-semibold">Something went wrong</p>
        <p className="mt-1 text-sm">
          {errorMessage ?? "Please check the form and try again, or contact us directly."}
        </p>
      </div>
    );
  }
  return null;
}
