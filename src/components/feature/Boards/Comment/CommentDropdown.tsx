"use client";
import Image from "next/image";
import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import { useCallback, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

export default function CommentDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleEdit = useCallback(() => {
    alert("수정하기");
  }, []);

  const handleDelete = useCallback(() => {
    alert("삭제하기");
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
        <DropDownItem onClick={handleEdit}>수정하기</DropDownItem>
        <DropDownItem onClick={handleDelete}>삭제하기</DropDownItem>
      </DropDownMenu>
    </div>
  );
}
