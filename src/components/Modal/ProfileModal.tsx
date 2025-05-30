"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Image from "next/image";

interface ProfileModalProps {
  name: string;
  email: string;
  profileImageUrl?: string;
  onCopy: () => void;
}

export default function ProfileModal({
  name,
  email,
  profileImageUrl,
  onCopy,
}: ProfileModalProps) {
  const { isOpen, modalType, closeModal } = useModalStore();

  if (!isOpen || modalType !== "profile") return null;

  return (
    <Modal
      title={name}
      description={email}
      buttonType="single-green"
      confirmText="이메일 복사하기"
      onConfirm={onCopy}
      headerImage={
        <Image
          src={profileImageUrl || "/icons/icon-profile-default.svg"}
          alt="프로필 이미지"
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
      }
    />
  );
}
