"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useModalStore } from "@/stores/modalStore";
import React, { useState } from "react";
import SendEmailModal from "./SendEmailModal";
import { useForm } from "react-hook-form";
import { useSignIn } from "@/api/auth/auth.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/loginSchema";
import type { LoginForm } from "@/lib/schemas/loginSchema";

export default function LoginForm() {
  const { openModal } = useModalStore();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const openPasswordResetModal = () => {
    openModal("password-reset");
  };

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          error={!!errors.email}
          errorMessage={errors.email?.message || ""}
          {...register("email")}
        />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          hasTopMargin
          error={!!errors.password}
          errorMessage={errors.password?.message || ""}
          {...register("password", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\s/g, "");
            },
          })}
          suffix={
            <PasswordToggle
              isShow={showPassword}
              onToggle={handlePasswordToggle}
            />
          }
        />
        <button
          type="button"
          className="absolute right-0 mt-3 text-brand-primary font-medium underline text-md sm:text-lg"
          onClick={openPasswordResetModal}
        >
          비밀번호를 잊으셨나요?
        </button>
        <Button
          type="submit"
          label={loginMutation.isPending ? "로그인 중.." : "로그인"}
          variant="primary"
          className="mt-[4.75rem] w-full"
          state={loginMutation.isPending ? "disabled" : "default"}
        />
      </form>
      <SendEmailModal />
    </>
  );
}
