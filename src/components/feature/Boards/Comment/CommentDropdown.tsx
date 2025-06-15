"use client";
import DropDownItem from "@/components/common/Dropdown/Item";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import { useCallback, useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";

interface CommentDropdownProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onDelete: () => void;
}

export default function CommentDropdown({
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: CommentDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ref = useClickOutside(closeDropdown);

  const handleDelete = () => {
    console.log("[DEBUG] CommentDropdown handleDelete 실행됨");
    setIsOpen(false);
    onDelete();
  };

  return (
    <div ref={ref} className="relative z-10">
      <button type="button" onClick={toggleOpen} className="cursor-pointer">
        <Image
          src="/icons/icon-more-vertical-sm.svg"
          alt="더보기"
          width={25}
          height={25}
        />
      </button>
      <DropDownMenu
        isOpen={isOpen}
        className="absolute mt-1 right-0 text-center w-[7.5rem]"
      >
        {isEditing ? (
          <>
            <DropDownItem onClick={onSave}>저장</DropDownItem>
            <DropDownItem onClick={onCancel}>취소</DropDownItem>
          </>
        ) : (
          <>
            <DropDownItem onClick={onEdit}>수정하기</DropDownItem>
            <DropDownItem onClick={handleDelete}>삭제하기</DropDownItem>
          </>
        )}
      </DropDownMenu>
    </div>
  );
}
