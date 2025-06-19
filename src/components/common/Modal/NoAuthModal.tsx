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
      title="로그인 후 이용해주세요"
      description={`좋아요 및 댓글 작성은 로그인 후에 이용할 수 있어요!`}
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
