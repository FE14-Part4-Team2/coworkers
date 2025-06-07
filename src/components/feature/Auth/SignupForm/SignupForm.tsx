"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import React, { useState } from "react";

export default function SignupForm() {
  const [showPassword, setShowPasword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handlePasswordToggle = () => {
    setShowPasword((prev) => !prev);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirm((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmitSignup}>
        <Input
          id="name"
          name="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          value={signupForm.name}
          onChange={handleInputChange}
        />
        <Input
          id="email"
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          value={signupForm.email}
          onChange={handleInputChange}
          hasTopMargin
        />
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          value={signupForm.password}
          onChange={handleInputChange}
          hasTopMargin
          suffix={
            <PasswordToggle
              isShow={showPassword}
              onToggle={handlePasswordToggle}
            />
          }
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirm ? "text" : "password"}
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          value={signupForm.confirmPassword}
          onChange={handleInputChange}
          hasTopMargin
          suffix={
            <PasswordToggle
              isShow={showConfirm}
              onToggle={handleConfirmPasswordToggle}
            />
          }
        />
        <Button
          type="submit"
          label="회원가입"
          variant="primary"
          className="mt-10 w-full"
        />
      </form>
    </>
  );
}
