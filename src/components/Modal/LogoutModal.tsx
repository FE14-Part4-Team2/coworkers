"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";

interface LogoutModalProps {
  onConfirm: () => void;
}

export default function LogoutModal({ onConfirm }: LogoutModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "logout") return null;

  return (
    <Modal
      title="로그아웃 하시겠어요?"
      buttonType="double-white-red"
      confirmText="로그아웃"
      cancelText="닫기"
      onConfirm={onConfirm}
    ></Modal>
  );
}
