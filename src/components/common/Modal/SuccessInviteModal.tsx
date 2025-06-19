"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

export default function SuccessInviteModal() {
  const { isOpen, modalType, closeModal } = useModalStore();
  const router = useRouter();

  if (!isOpen || modalType !== "success-invite") return null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    closeModal();
    router.push("/boards/new");
  };

  return (
    <Modal
      title="초대 링크 복사 완료!"
      description={`초대 링크가 복사되었습니다. \n 지금 바로 보드를 만들어볼까요?`}
      buttonType="double-white-green"
      confirmText="보드 만들기"
      cancelText="괜찮아요"
      showCloseIcon={false}
      confirmButtonType="submit"
      onSubmit={onSubmit}
    />
  );
}
