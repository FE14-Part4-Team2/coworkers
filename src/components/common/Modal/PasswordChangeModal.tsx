"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";

interface PasswordChangeModalProps {
  formData: {
    newPassword: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PasswordChangeModal({
  formData,
  onChange,
  onSubmit,
}: PasswordChangeModalProps) {
  const { isOpen, modalType } = useModalStore();

  if (!isOpen || modalType !== "password-change") return null;

  return (
    <Modal
      title="비밀번호 변경"
      buttonType="double-white-green"
      confirmText="변경하기"
      cancelText="닫기"
      confirmButtonType="submit"
      onSubmit={onSubmit}
    >
      <div className="mb-4">
        <Input
          id="new-password"
          name="newPassword"
          type="password"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          value={formData.newPassword}
          onChange={onChange}
          required
        />
      </div>

      <div className="mb-4">
        <Input
          id="confirm-password"
          name="confirmPassword"
          type="password"
          label="새 비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          value={formData.confirmPassword}
          onChange={onChange}
          required
        />
      </div>
    </Modal>
  );
}
