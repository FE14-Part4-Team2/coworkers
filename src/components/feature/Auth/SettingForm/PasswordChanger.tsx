"use client";

import { useUpdatePassword } from "@/api/user/user.query";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordChangeModal from "@/components/common/Modal/PasswordChangeModal";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

function PasswordChanger() {
  const { openModal, closeModal } = useModalStore();
  const updatePasswordMutation = useUpdatePassword();
  const { showToast } = useToastStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: "onBlur" });

  const newPassword = watch("newPassword");

  const onSubmit = (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    updatePasswordMutation.mutate(
      {
        passwordConfirmation: data.confirmPassword,
        password: data.newPassword,
      },
      {
        onSuccess: () => {
          showToast("비밀번호가 변경되었습니다.", "success");
        },
        onError: () => {
          showToast("비밀번호 변경을 실패했습니다.", "error");
        },
      },
    );

    closeModal();
    reset();
  };

  const openPasswordChangeModal = () => {
    openModal("password-change");
  };

  return (
    <>
      <Input
        id="password"
        label="비밀번호"
        type="password"
        defaultValue="password"
        hasTopMargin
        disabled
        suffix={
          <Button
            type="button"
            label="변경하기"
            variant="primary"
            size="sm"
            className="w-[4.3rem] h-8"
            onClick={openPasswordChangeModal}
          />
        }
      />
      <PasswordChangeModal
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        newPassword={newPassword}
      />
    </>
  );
}

export default PasswordChanger;
