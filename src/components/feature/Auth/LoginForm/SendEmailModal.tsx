"use client";

import { useSendResetPasswordMutation } from "@/api/user/user.query";
import PasswordResetModal from "@/components/common/Modal/PasswordResetModal";
import React, { useState } from "react";

export default function SendEmailModal() {
  const [email, setEmail] = useState("");
  const sendEmailMutation = useSendResetPasswordMutation();
  const redirectUrl =
    typeof window !== "undefined" ? window.location.origin : "";

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendEmailMutation.mutate(
      { email, redirectUrl: redirectUrl },
      {
        onSuccess: () => {
          setEmail("");
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
