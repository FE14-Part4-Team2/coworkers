"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

export default function NoAuthModal() {
  const { isOpen, modalType, closeModal } = useModalStore();
  const router = useRouter();

  if (!isOpen || modalType !== "no-auth") return null;

  return (
    <Modal
      title="로그인이 필요해요"
      description={`로그인하고 코워커스의 모든 서비스를 \n자유롭게 경험해보세요!`}
      buttonType="double-white-green"
      cancelText="닫기"
      confirmText="로그인 하러가기"
      onConfirm={() => {
        closeModal();
        router.push("/login");
      }}
      showCloseIcon={false}
    />
  );
}
