"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useModalStore } from "@/stores/modalStore";
import React, { useState } from "react";
import SendEmailModal from "./SendEmailModal";
import { useForm } from "react-hook-form";
import { useSignIn } from "@/api/auth/auth.query";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import { useAuthStore } from "@/stores/authStroe";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { openModal } = useModalStore();
  const [showPassword, setShowPasword] = useState(false);

  const loginMutation = useSignIn();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onBlur",
  });

  const handlePasswordToggle = () => {
    setShowPasword((prev) => !prev);
  };

  const openPasswordResetModal = () => {
    openModal("password-reset");
  };

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          setAuth(data.user);
          router.push("/");
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          error={!!errors.email}
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "이메일 형식으로 작성해 주세요.",
            },
          })}
        />
        <ErrorMsg message={errors.email?.message} />
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          hasTopMargin
          error={!!errors.password}
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
          })}
          suffix={
            <PasswordToggle
              isShow={showPassword}
              onToggle={handlePasswordToggle}
            />
          }
        />
        <ErrorMsg message={errors.password?.message} />
        <button
          type="button"
          className="absolute right-0 mt-3 text-brand-primary text-lg font-medium underline text-md sm:text-lg"
          onClick={openPasswordResetModal}
        >
          비밀번호를 잊으셨나요?
        </button>
        <Button
          type="submit"
          label="로그인"
          variant="primary"
          className="mt-[4.75rem] w-full"
        />
      </form>
      <SendEmailModal />
    </>
  );
}
