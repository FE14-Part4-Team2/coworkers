"use client";
import Image from "next/image";
import Link from "next/link";
import DropDownMenu from "@/components/common/Dropdown/Menu";
import DropDownItem from "@/components/common/Dropdown/Item";
import useClickOutside from "@/hooks/useClickOutside";
import { useSignOut } from "@/api/auth/auth.query";
import { useModalStore } from "@/stores/modalStore";
import LogoutModal from "@/components/common/Modal/LogoutModal";
import { useToastStore } from "@/stores/toastStore";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  userName: string;
  userImg: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function UserDropdown({
  userName,
  userImg,
  isOpen,
  onToggle,
  onClose,
}: UserDropdownProps) {
  const ref = useClickOutside(onClose);
  const signOutMutation = useSignOut();
  const { openModal, closeModal } = useModalStore();
  const { showToast } = useToastStore();
  const router = useRouter();

  const handleSignOut = () => {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        {
          closeModal();
          showToast("로그아웃 되었습니다.", "success");
          router.replace("/");
        }
      },
    });
  };

  return (
    <div ref={ref} className="relative">
      <button onClick={onToggle} className="flex gap-2 cursor-pointer">
        <div className="relative w-6 h-6 sm:w-4 sm:h-4">
          <Image
            src={userImg}
            alt="프로필"
            fill
            className="rounded-full cursor-pointer"
          />
        </div>

        <span className="whitespace-nowrap text-md text-text-primary hidden md:inline-block">
          {userName}
        </span>
      </button>

      <DropDownMenu
        isOpen={isOpen}
        className="w-[8.5rem] absolute mt-2 right-0 text-center"
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
        <DropDownItem onClick={() => openModal("logout")}>
          로그아웃
        </DropDownItem>
      </DropDownMenu>

      <LogoutModal onConfirm={handleSignOut} />
    </div>
  );
}
