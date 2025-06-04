"use client";

import PasswordResetModal from "@/components/common/Modal/PasswordResetModal";
import React, { useState } from "react";

export default function SendEmailModal() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <PasswordResetModal
      value={email}
      onChange={handleEmailChange}
      onSubmit={handleSubmit}
    />
  );
}
