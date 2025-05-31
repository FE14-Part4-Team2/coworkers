"use client";
import { ReactNode } from "react";

interface DropDownMenuProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

// 드롭다운 메뉴 컴포넌트
export default function DropDownMenu({
  children,
  isOpen,
  className,
}: DropDownMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute mt-1 w-[120px] flex flex-col gap-2 px-[11px] py-[14px] rounded-[16px] bg-bg-secondary text-text-primary border border-[#4c4c4c] text-md font-regular z-50 ${className}`}
    >
      {children}
    </div>
  );
}
