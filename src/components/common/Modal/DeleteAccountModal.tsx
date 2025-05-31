"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Image from "next/image";

interface DeleteAccountModalProps {
  onConfirm: () => void;
}

export default function DeleteAccountModal({
  onConfirm,
}: DeleteAccountModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "delete-account") return null;

  return (
    <Modal
      title="회원 탈퇴를 진행하시겠어요?"
      description={`그룹장으로 있는 그룹은 자동으로 삭제되고,\n모든 그룹에서 나가집니다.`}
      buttonType="double-white-red"
      cancelText="닫기"
      confirmText="회원 탈퇴"
      onConfirm={onConfirm}
      headerImage={
        <Image
          src="/icons/icon-alert.svg"
          alt="경고 아이콘"
          width={24}
          height={24}
        />
      }
    />
  );
}
