"use client";
import Image from "next/image";
import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import { useCallback, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

interface CommentDropdownProps {
  // onEdit: () => void;
  onDelete: () => void;
}

export default function CommentDropdown({ onDelete }: CommentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ref = useClickOutside(closeDropdown);

  return (
    <div ref={ref} className="relative z-10">
      <button type="button" onClick={toggleOpen} className="cursor-pointer">
        <Image
          src="/icons/icon-kebabs.svg"
          alt="더보기"
          width={3}
          height={12}
        />
      </button>
      <DropDownMenu
        isOpen={isOpen}
        className="absolute mt-1 right-0 text-center w-[7.5rem]"
      >
        {/* <DropDownItem onClick={onEdit}>수정하기</DropDownItem> */}
        <DropDownItem onClick={onDelete}>삭제하기</DropDownItem>
      </DropDownMenu>
    </div>
  );
}
