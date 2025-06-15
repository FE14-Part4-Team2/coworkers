"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Image from "next/image";
import Button from "../Button";

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
        <div className="relative rounded-full w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] overflow-hidden">
          <Image
            src={profileImageUrl || "/icons/icon-profile-default.svg"}
            alt="프로필 이미지"
            fill
            className="rounded-full object-cover"
          />
        </div>
      }
    >
      <div className="mt-3 flex flex-col gap-3">
        <Button
          label="이메일 복사하기"
          variant="primary"
          size="md"
          className="w-full"
          onClick={onCopy}
        />
        {isSelf && (
          <Button
            label="내 계정 설정"
            variant="ghost"
            size="md"
            className="w-full"
            onClick={onClickUserSetting}
          />
        )}
      </div>
    </Modal>
  );
}
