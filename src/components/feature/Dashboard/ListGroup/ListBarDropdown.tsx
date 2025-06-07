"use client";

import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function ListBarDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    alert("수정하기"); // TODO: 페이지 연결
  }, []);

  const handleDelete = useCallback(() => {
    alert("삭제하기"); // TODO: API 연결
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dropdownRef = useClickOutside(closeDropdown);

  return (
    <div ref={dropdownRef} className="relative">
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
        <DropDownItem onClick={handleEdit}>수정하기</DropDownItem>
        <DropDownItem onClick={handleDelete}>삭제하기</DropDownItem>
      </DropDownMenu>
    </div>
  );
}
