import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  hasTopMargin?: boolean;
}

export default function Textarea({
  label = "",
  error = false,
  hasTopMargin = false,
  disabled = false,
  ...props
}: TextareaProps) {
  const containerStyle = "h-[15rem] relative border rounded-xl bg-bg-secondary";
  const textareaStyle =
    "w-full pl-4 py-[14px] text-lg text-text-primary placeholder-text-default bg-transparent rounded-xl disabled:text-text-disabled focus:outline-none resize-none";
  const interactionStyle =
    "focus-within:border-interaction-focus hover:border-interaction-hover";
  const disabledStyle =
    "bg-bg-tertiary hover:border-border-primary cursor-not-allowed";
  const inputBorderStyle = error
    ? "border-status-danger"
    : "border-card-border";

  const containerStyleclasses = `${containerStyle} ${interactionStyle} ${inputBorderStyle} ${disabled && disabledStyle}`;

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
        <textarea {...props} className={textareaStyle} disabled={disabled} />
      </div>
    </div>
  );
}
