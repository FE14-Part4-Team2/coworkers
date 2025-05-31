import clsx from "clsx";
import { type ReactNode } from "react";

import { StyleMap } from "./StyleMap";
import { SizeMap } from "./SizeMap";
import type {
  ButtonVariant,
  ButtonTone,
  ButtonState,
  ButtonSize,
} from "./Types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant: ButtonVariant;
  tone?: ButtonTone;
  state?: ButtonState;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export default function Button({
  label,
  variant,
  tone = "default",
  state = "default",
  size = "md",
  icon,
  iconPosition = "left",
  className,
  ...props
}: ButtonProps) {
  const isDisabled = state === "disabled";

  const buttonClassName = clsx(
    "flex items-center justify-center font-semibold disabled:cursor-not-allowed",
    SizeMap[size],
    isDisabled ? StyleMap[variant].disabled : StyleMap[variant].tones[tone],
    className,
  );

  return (
    <button className={buttonClassName} disabled={isDisabled} {...props}>
      {iconPosition === "left" && icon && (
        <span className="mr-[0.25rem]">{icon}</span>
      )}
      <span>{label}</span>
      {iconPosition === "right" && icon && (
        <span className="ml-[0.25rem]">{icon}</span>
      )}
    </button>
  );
}
