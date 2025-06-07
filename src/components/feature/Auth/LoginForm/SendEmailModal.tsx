"use client";

import { useSendResetPasswordMutation } from "@/api/user/user.query";
import PasswordResetModal from "@/components/common/Modal/PasswordResetModal";
import { useModalStore } from "@/stores/modalStore";
import { useToastStore } from "@/stores/toastStore";
import React, { useState } from "react";

export default function SendEmailModal() {
  const [email, setEmail] = useState("");
  const sendEmailMutation = useSendResetPasswordMutation();
  const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const { closeModal } = useModalStore();
  const { showToast } = useToastStore();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailMutation.mutate(
      { email, redirectUrl: redirectUrl },
      {
        onSuccess: () => {
          showToast("비밀번호 재설정 링크가 전송되었습니다.", "success");
          closeModal();
          setEmail("");
        },
        onError: () => {
          showToast("이메일을 확인해주세요.", "error");
        },
      },
    );
  };

  return (
    <PasswordResetModal
      value={email}
      onChange={handleEmailChange}
      onSubmit={handleSubmit}
    />
  );
}
