import React, { TextareaHTMLAttributes } from "react";
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
}

export default function Textarea({
  label = "",
  error = false,
  hasTopMargin = false,
  disabled = false,
  height = "h-[15rem]",
  ...props
}: TextareaProps) {
  const textareaStyle = `${inputStyle} w-full resize-none`;

  const containerStyleclasses = [
    containerStyle.replace("flex items-center", "w-full"),
    interactionStyle,
    inputBorderStyle(error),
    disabled && disabledStyle,
    height,
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
        <textarea {...props} className={textareaStyle} disabled={disabled} />
      </div>
    </div>
  );
}
