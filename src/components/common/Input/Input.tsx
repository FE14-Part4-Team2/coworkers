import React, { InputHTMLAttributes } from "react";

export const containerStyle =
  "relative flex items-center border rounded-xl bg-bg-secondary";
export const inputStyle =
  "flex-grow pl-4 py-[14px] text-lg text-text-primary placeholder-text-default bg-transparent rounded-xl disabled:text-text-disabled focus:outline-none";
export const interactionStyle =
  "focus-within:border-interaction-focus hover:border-interaction-hover";
export const disabledStyle =
  "bg-bg-tertiary hover:!border-border-primary/10 cursor-not-allowed";

export const inputBorderStyle = (error: boolean) =>
  error ? "border-status-danger" : "border-border-primary/10";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  suffix?: React.ReactElement | null;
  hasTopMargin?: boolean;
}

export default function Input({
  label = "",
  error = false,
  suffix = null,
  hasTopMargin = false,
  disabled = false,
  ...props
}: InputProps) {
  const containerStyleclasses = [
    containerStyle,
    interactionStyle,
    inputBorderStyle(error),
    disabled && disabledStyle,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`w-full ${hasTopMargin && "mt-6"}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-text-primary font-medium mb-3"
        >
          {label}
        </label>
      )}
      <div className={containerStyleclasses}>
        <input {...props} className={inputStyle} disabled={disabled} />
        {suffix && <div className="flex-shrink-0 px-4">{suffix}</div>}
      </div>
    </div>
  );
}
