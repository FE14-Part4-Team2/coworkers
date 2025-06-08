"use client";

import GenericDropdown from "../../../common/Dropdown/GenericDropdown";
import { useState } from "react";

const options = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function FilterDropdown({
  orderBy,
  setOrderBy,
}: {
  orderBy: "recent" | "like";
  setOrderBy: (order: "recent" | "like") => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GenericDropdown
      options={options}
      selected={orderBy}
      isOpen={isOpen}
      handleToggle={() => setIsOpen((v) => !v)}
      handleClose={() => setIsOpen(false)}
      handleSelect={(value: string) => {
        setOrderBy(value as "recent" | "like");
        setIsOpen(false);
      }}
    />
  );
}
