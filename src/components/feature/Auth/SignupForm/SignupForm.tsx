"use client";

import { useSignUp } from "@/api/auth/auth.query";
import Button from "@/components/common/Button";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/schemas/signupSchema";
import type { SignupForm } from "@/lib/schemas/signupSchema";

export default function SignupForm() {
  const [showPassword, setShowPasword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const signupMutation = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const handlePasswordToggle = () => {
    setShowPasword((prev) => !prev);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirm((prev) => !prev);
  };

  const onSubmit = (data: SignupForm) => {
    signupMutation.mutate({
      nickname: data.name,
      email: data.email,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          error={!!errors.name}
          {...register("name")}
        />
        <ErrorMsg message={errors.name?.message || ""} />
        <Input
          id="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          error={!!errors.email}
          {...register("email")}
          hasTopMargin
        />
        <ErrorMsg message={errors.email?.message || ""} />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          error={!!errors.password}
          {...register("password", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          hasTopMargin
          suffix={
            <PasswordToggle
              isShow={showPassword}
              onToggle={handlePasswordToggle}
            />
          }
        />
        <ErrorMsg message={errors.password?.message || ""} />
        <Input
          id="confirmPassword"
          type={showConfirm ? "text" : "password"}
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          error={!!errors.confirmPassword}
          {...register("confirmPassword", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          hasTopMargin
          suffix={
            <PasswordToggle
              isShow={showConfirm}
              onToggle={handleConfirmPasswordToggle}
            />
          }
        />
        <ErrorMsg message={errors.confirmPassword?.message || ""} />
        <Button
          type="submit"
          label="회원가입"
          variant="primary"
          className="mt-10 w-full"
          disabled={signupMutation.isPending}
        />
      </form>
    </>
  );
}
