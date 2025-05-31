"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";

interface InviteModalProps {
  onCopy: () => void;
}

export default function InviteModal({ onCopy }: InviteModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "invite") return null;

  return (
    <Modal
      title="멤버 초대"
      description="그룹에 참여할 수 있는 링크를 복사합니다."
      buttonType="single-green"
      confirmText="링크복사"
      onConfirm={onCopy}
    ></Modal>
  );
}
