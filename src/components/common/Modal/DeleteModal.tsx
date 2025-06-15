"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Image from "next/image";

interface DeleteModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  modalType?: string;
}

export default function DeleteModal({
  title,
  description,
  onConfirm,
  modalType = "delete",
}: DeleteModalProps) {
  const { isOpen, modalType: currentModalType } = useModalStore();

  if (!isOpen || currentModalType !== modalType) return null;

  return (
    <Modal
      title={title}
      description={description}
      buttonType="double-white-red"
      cancelText="취소"
      confirmText="삭제"
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
