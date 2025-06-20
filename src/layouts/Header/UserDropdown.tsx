"use client";
import Image from "next/image";
import Link from "next/link";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DropDownItem from "@/components/common/Dropdown/Item";
import useClickOutside from "@/hooks/useClickOutside";

interface UserDropdownProps {
  userName: string;
  userImg: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onLogoutClick: () => void;
}

export default function UserDropdown({
  userName,
  userImg,
  isOpen,
  onToggle,
  onClose,
  onLogoutClick,
}: UserDropdownProps) {
  const ref = useClickOutside(onClose);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex gap-2 cursor-pointer items-center"
      >
        <div className="relative w-6 h-6">
          <Image
            src={userImg}
            alt="프로필"
            fill
            className="rounded-full cursor-pointer"
          />
        </div>

        <span className="whitespace-nowrap text-lg text-text-primary hidden md:inline-block">
          {userName}
        </span>
      </button>

      <DropDownMenu
        isOpen={isOpen}
        className="w-[8.5rem] absolute mt-2 right-0 text-center"
      >
        <DropDownItem>
          <Link href="/myhistory" onClick={onClose}>
            마이 히스토리
          </Link>
        </DropDownItem>
        <DropDownItem>
          <Link href="/join" onClick={onClose}>
            팀 참여
          </Link>
        </DropDownItem>
        <DropDownItem>
          <Link href="/user-setting" onClick={onClose}>
            계정 설정
          </Link>
        </DropDownItem>
        <DropDownItem onClick={onLogoutClick}>로그아웃</DropDownItem>
      </DropDownMenu>
    </div>
  );
}
