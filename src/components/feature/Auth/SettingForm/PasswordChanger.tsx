"use client";

import { useUpdatePassword } from "@/api/user/user.query";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordChangeModal from "@/components/common/Modal/PasswordChangeModal";
import { PasswordForm, passwordSchema } from "@/lib/schemas/passwordSchema";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

function PasswordChanger() {
  const { openModal, closeModal } = useModalStore();
  const updatePasswordMutation = useUpdatePassword();
  const { showToast } = useToastStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: PasswordForm) => {
    if (data.password !== data.confirmPassword) {
      showToast("비밀번호가 일치하지 않습니다.", "error");
      return;
    }

    updatePasswordMutation.mutate({
      passwordConfirmation: data.confirmPassword,
      password: data.password,
    });

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
      />
    </>
  );
}

export default PasswordChanger;
