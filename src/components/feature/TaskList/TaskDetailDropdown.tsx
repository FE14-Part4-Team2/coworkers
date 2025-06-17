"use client";

import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { useCallback, useState } from "react";

interface TaskDetailDropdownProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TaskDetailDropdown({
  onEdit,
  onDelete,
}: TaskDetailDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dropdownRef = useClickOutside(closeDropdown);

  return (
    <div ref={dropdownRef} className="relative prevent-list-click">
      <Image
        src="/icons/icon-more-vertical-sm.svg"
        alt="setting"
        width={16}
        height={16}
        className="cursor-pointer z-0"
        onClick={(e) => {
          e.stopPropagation();
          toggleOpen();
        }}
      />
      <DropDownMenu
        isOpen={isOpen}
        className="absolute mt-2 right-0 text-center w-[7.5rem] z-[999]"
      >
        <DropDownItem
          onClick={() => {
            setIsOpen(false);
            onEdit();
          }}
        >
          수정하기
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            setIsOpen(false);
            onDelete();
          }}
        >
          삭제하기
        </DropDownItem>
      </DropDownMenu>
    </div>
  );
}
