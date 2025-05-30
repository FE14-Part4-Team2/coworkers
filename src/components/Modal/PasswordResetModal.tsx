"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";

interface PasswordResetModalProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PasswordResetModal({
  value,
  onChange,
  onSubmit,
}: PasswordResetModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "password-reset") return null;

  return (
    <Modal
      title="비밀번호 재설정"
      description="비밀번호 재설정 링크를 보내드립니다."
      buttonType="double-white-green"
      confirmText="링크 보내기"
      cancelText="닫기"
      showCloseIcon={false}
      confirmButtonType="submit"
      onSubmit={onSubmit}
    >
      <input
        type="email"
        placeholder="이메일을 입력하세요."
        className="w-full border border-gray-300 rounded px-3 py-2"
        value={value}
        onChange={onChange}
        required
      />
    </Modal>
  );
}
