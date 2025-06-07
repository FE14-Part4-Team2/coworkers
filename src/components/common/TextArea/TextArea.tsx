import React, { TextareaHTMLAttributes } from "react";
import { useRef } from "react";
import {
  containerStyle,
  inputStyle,
  interactionStyle,
  disabledStyle,
  inputBorderStyle,
} from "@/components/common/Input/Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  hasTopMargin?: boolean;
  height?: string;
  className?: string;
}

export default function Textarea({
  label = "",
  error = false,
  hasTopMargin = false,
  disabled = false,
  height = "h-[15rem]",
  className = "",
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textareaStyle = `${inputStyle} w-full h-full resize-none leading-6 cursor-text`;

  const containerStyleclasses = [
    containerStyle.replace("flex items-center", "w-full"),
    interactionStyle,
    inputBorderStyle(error),
    disabled && disabledStyle,
    height,
    "relative cursor-text",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`w-full h-full${hasTopMargin && " mt-6"}`}>
      {label && (
        <label
          htmlFor={props.id}
          className="block text-text-primary font-medium mb-3"
        >
          {label}
        </label>
      )}
      <div
        className={containerStyleclasses}
        onClick={() => textareaRef.current?.focus()}
        tabIndex={-1}
      >
        <textarea
          ref={textareaRef}
          {...props}
          className={`${textareaStyle} ${className}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
