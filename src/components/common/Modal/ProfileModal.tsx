"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Image from "next/image";

interface ProfileModalProps {
  name: string;
  email: string;
  profileImageUrl?: string;
  onCopy: () => void;
  isSelf?: boolean;
  onClickUserSetting?: () => void;
}

export default function ProfileModal({
  name,
  email,
  profileImageUrl,
  onCopy,
  isSelf = false,
  onClickUserSetting,
}: ProfileModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "profile") return null;

  return (
    <Modal
      title={name}
      description={email}
      buttonType="none-button"
      headerImage={
        <Image
          src={profileImageUrl || "/icons/icon-profile-default.svg"}
          alt="프로필 이미지"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      }
    >
      <div className="mt-3 flex flex-col gap-2">
        <button
          className="w-full bg-brand-primary text-white py-2 rounded"
          onClick={onCopy}
        >
          이메일 복사하기
        </button>
        {isSelf && (
          <button
            className="w-full border border-border-primary text-text-primary py-2 rounded"
            onClick={onClickUserSetting}
          >
            계정 설정
          </button>
        )}
      </div>
    </Modal>
  );
}
