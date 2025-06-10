"use client";

import GenericDropdown from "../../../common/Dropdown/GenericDropdown";
import { useState } from "react";
import { ORDER_OPTIONS, OrderType } from "@/constants/orderType";

export default function FilterDropdown({
  orderBy,
  setOrderBy,
  className,
}: {
  orderBy: OrderType;
  setOrderBy: (order: OrderType) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GenericDropdown
      options={ORDER_OPTIONS}
      selected={orderBy}
      isOpen={isOpen}
      handleToggle={() => setIsOpen((v) => !v)}
      handleClose={() => setIsOpen(false)}
      handleSelect={(value: string) => {
        setOrderBy(value as OrderType);
        setIsOpen(false);
      }}
      className={className}
    />
  );
}
