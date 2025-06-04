"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useModalStore } from "@/stores/modalStore";
import React, { useState } from "react";
import SendEmailModal from "./SendEmailModal";

export default function LoginForm() {
  const { openModal } = useModalStore();
  const [showPassword, setShowPasword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handlePasswordToggle = () => {
    setShowPasword((prev) => !prev);
  };

  const openPasswordResetModal = () => {
    openModal("password-reset");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmitLogin}>
        <Input
          id="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={loginForm.email}
          onChange={handleInputChange}
        />
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={loginForm.password}
          onChange={handleInputChange}
          hasTopMargin
          suffix={
            <PasswordToggle
              isShow={showPassword}
              onToggle={handlePasswordToggle}
            />
          }
        />
        <button
          type="button"
          className="absolute right-0 mt-3 text-brand-primary text-lg font-medium underline text-md sm:text-lg"
          onClick={openPasswordResetModal}
        >
          비밀번호를 잊으셨나요?
        </button>
        <Button
          label="로그인"
          variant="primary"
          className="mt-[4.75rem] w-full"
        />
      </form>
      <SendEmailModal />
    </>
  );
}
