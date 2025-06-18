"use client";

import GenericDropdown from "./GenericDropdown";
import useGenericDropdown from "@/hooks/useGenericDropdown";

interface RepeatDropdownProps {
  value: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  onChange: (value: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY") => void;
}

const options = [
  { label: "한 번", value: "ONCE" },
  { label: "매일", value: "DAILY" },
  { label: "주 반복", value: "WEEKLY" },
  { label: "월 반복", value: "MONTHLY" },
];

export default function RepeatDropdown({
  value,
  onChange,
}: RepeatDropdownProps) {
  const { selected, isOpen, handleToggle, handleClose, handleSelect } =
    useGenericDropdown(value, (val) => {
      const matched = options.find((opt) => opt.value === val);
      if (matched) {
        onChange(matched.value as "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY");
      }
    });

  return (
    <GenericDropdown
      options={options}
      selected={selected}
      isOpen={isOpen}
      handleToggle={handleToggle}
      handleClose={handleClose}
      handleSelect={handleSelect}
    />
  );
}
