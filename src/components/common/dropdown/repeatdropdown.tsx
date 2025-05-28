"use client";

import GenericDropdown from "./genericdropdown";
import useGenericDropdown from "@/hooks/usegenericdropdown";

const options = [
  { label: "반복 안함", value: "norepeat" },
  { label: "한 번", value: "once" },
  { label: "매일", value: "everyday" },
  { label: "주 반복", value: "weekly" },
  { label: "월 반복", value: "monthly" },
];

// 반복 설정 드롭다운 (성빈님 페이지)
export default function RepeatDropdown() {
  const { selected, isOpen, handleToggle, handleClose, handleSelect } =
    useGenericDropdown("반복 안함");

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
