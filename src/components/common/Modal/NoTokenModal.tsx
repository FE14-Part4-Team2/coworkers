"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";

interface NoTokenModalProps {
  onConfirm: () => void;
}

export default function NoTokenModal({ onConfirm }: NoTokenModalProps) {
  const { isOpen, modalType, closeModal } = useModalStore();

  if (!isOpen || modalType !== "no-token") return null;

  return (
    <Modal
      title="팀 참여 링크가 없습니다."
      description={`참여 링크 없이 글을 작성할 경우, 이메일을 요구하는 등 다른 방식으로 팀원을 초대해야 합니다. \n계속 진행하시겠습니까?`}
      buttonType="double-white-green"
      cancelText="닫기"
      confirmText="글 작성하기"
      onConfirm={() => {
        closeModal();
        onConfirm();
      }}
      showCloseIcon={false}
    />
  );
}
