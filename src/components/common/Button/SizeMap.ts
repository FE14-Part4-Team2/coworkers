import type { ButtonSize } from "./Types";

export const SizeMap: Record<ButtonSize, string> = {
  sm: "text-sm px-[0.805rem] py-[0.375rem] rounded-[0.75rem] whitespace-nowrap",
  md: "text-base px-[8.625rem] py-[0.75rem] rounded-[0.75rem] whitespace-nowrap",

  "floating-sm": "text-sm px-[1.275rem] py-[0.565rem] rounded-[2.5rem]",
  "floating-md": "text-base px-[1.325rem] py-[0.75rem] rounded-[2.5rem]",
};
