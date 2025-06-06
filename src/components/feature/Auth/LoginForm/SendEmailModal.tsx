"use client";

import { useSendResetPasswordMutation } from "@/api/user/user.query";
import PasswordResetModal from "@/components/common/Modal/PasswordResetModal";
import { useModalStore } from "@/stores/modalStore";
import React, { useState } from "react";

export default function SendEmailModal() {
  const [email, setEmail] = useState("");
  const sendEmailMutation = useSendResetPasswordMutation();
  const redirectUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const { closeModal } = useModalStore();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailMutation.mutate(
      { email, redirectUrl: redirectUrl },
      {
        onSuccess: () => {
          closeModal();
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
