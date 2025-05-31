"use client";
import Image from "next/image";
import Link from "next/link";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DropDownItem from "@/components/common/Dropdown/Item";

interface UserDropdownProps {
  userName: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function UserDropdown({
  userName,
  isOpen,
  onToggle,
}: UserDropdownProps) {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex gap-2 cursor-pointer">
        <Image
          src="/icons/icon-user.svg"
          alt="프로필"
          width={16}
          height={16}
          className="rounded-full cursor-pointer"
        />
        <span className="whitespace-nowrap text-md text-text-primary hidden lg:inline-block">
          {userName}
        </span>
      </button>

      <DropDownMenu
        isOpen={isOpen}
        className="absolute mt-2 right-0 text-center"
      >
        <DropDownItem>
          <Link href="/myhistory">마이 히스토리</Link>
        </DropDownItem>
        <DropDownItem>
          <Link href="/join">팀 참여</Link>
        </DropDownItem>
        <DropDownItem>
          <Link href="/user-setting">계정 설정</Link>
        </DropDownItem>
        <DropDownItem>로그아웃</DropDownItem>
      </DropDownMenu>
    </div>
  );
}
