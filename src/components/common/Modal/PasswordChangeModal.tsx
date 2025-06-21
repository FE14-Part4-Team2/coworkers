"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PasswordForm } from "@/lib/schemas/passwordSchema";

interface PasswordChangeModalProps {
  register: UseFormRegister<PasswordForm>;
  errors: FieldErrors<PasswordForm>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PasswordChangeModal({
  register,
  errors,
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
          type="password"
          label="새 비밀번호"
          placeholder="새 비밀번호를 입력해주세요."
          {...register("password", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          error={!!errors.password?.message}
          errorMessage={errors.password?.message || ""}
        />
      </div>

      <div className="mb-4">
        <Input
          id="confirm-password"
          type="password"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 다시 한 번 입력해주세요."
          {...register("confirmPassword", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          error={!!errors.confirmPassword?.message}
          errorMessage={errors.confirmPassword?.message || ""}
        />
      </div>
    </Modal>
  );
}
