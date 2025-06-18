"use client";

import { useModalStore } from "@/stores/modalStore";
import Modal from "./Modal";
import Input from "../Input/Input";
import ErrorMsg from "../Input/ErrorMsg";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeModalProps {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  newPassword: string;
}

export default function PasswordChangeModal({
  register,
  errors,
  onSubmit,
  newPassword,
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
          {...register("newPassword", {
            required: "비밀번호를 입력해주세요.",
            minLength: { value: 8, message: "비밀번호는 최소 8자 이상입니다." },
            validate: {
              isValidFormat: (value) => {
                const regex = /^[A-Za-z\d!@#$%^&*]+$/;
                return (
                  regex.test(value) ||
                  "비밀번호는 숫자, 영문, 특수문자로만 가능합니다."
                );
              },
              hasAllRequiredTypes: (value) => {
                const hasLetter = /[A-Za-z]/.test(value);
                const hasNumber = /\d/.test(value);
                const hasSpecial = /[!@#$%^&*]/.test(value);

                return (
                  (hasLetter && hasNumber && hasSpecial) ||
                  "영문, 숫자, 특수문자를 모두 포함해야 합니다."
                );
              },
            },
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          error={!!errors.newPassword?.message}
        />
        <ErrorMsg message={errors.newPassword?.message} />
      </div>

      <div className="mb-4">
        <Input
          id="confirm-password"
          type="password"
          label="새 비밀번호 확인"
          placeholder="새 비밀번호를 다시 한 번 입력해주세요."
          {...register("confirmPassword", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) =>
              value === newPassword || "비밀번호가 일치하지 않습니다.",
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          error={!!errors.confirmPassword?.message}
        />
        <ErrorMsg message={errors.confirmPassword?.message} />
      </div>
    </Modal>
  );
}
