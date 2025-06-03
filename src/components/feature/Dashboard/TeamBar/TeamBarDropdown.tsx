"use client";

import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function TeamBarDropdown() {
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

  return (
    <div className="relative z-10">
      <Image
        src="/icons/icon-setting.svg"
        alt="setting"
        width={24}
        height={24}
        className={`cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        onClick={toggleOpen}
      />
      <DropDownMenu
        isOpen={isOpen}
        className="absolute mt-2 right-0 text-center w-[7.5rem]"
      >
        <DropDownItem onClick={handleEdit}>수정하기</DropDownItem>
        <DropDownItem onClick={handleDelete}>삭제하기</DropDownItem>
      </DropDownMenu>
    </div>
  );
}
