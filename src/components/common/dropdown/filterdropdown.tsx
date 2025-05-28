"use client";

import GenericDropdown from "./genericdropdown";
import useGenericDropdown from "@/hooks/usegenericdropdown";

const options = [
  { label: "최신순", value: "latest" },
  { label: "좋아요순", value: "likes" },
];

export default function FilterDropdown() {
  const { selected, isOpen, handleToggle, handleClose, handleSelect } =
    useGenericDropdown("최신순");

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
