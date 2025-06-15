import type { ButtonSize } from "./Types";

export const SizeMap: Record<ButtonSize, string> = {
  sm: "text-sm py-[0.375rem] rounded-[0.75rem] whitespace-nowrap",
  md: "text-base py-[0.75rem] rounded-[0.75rem] whitespace-nowrap",

  "floating-sm": "text-sm py-[0.565rem] rounded-[2.5rem]",
  "floating-md": "text-base py-[0.75rem] rounded-[2.5rem]",
};
