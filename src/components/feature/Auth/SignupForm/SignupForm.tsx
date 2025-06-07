"use client";

import { useSignUp } from "@/api/auth/auth.query";
import Button from "@/components/common/Button";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useAuthStore } from "@/stores/authStroe";
import { useToastStore } from "@/stores/toastStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type SignupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const [showPassword, setShowPasword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const signupMutation = useSignUp();
  const { setAuth } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: "onBlur",
  });
  const { showToast } = useToastStore();

  const handlePasswordToggle = () => {
    setShowPasword((prev) => !prev);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirm((prev) => !prev);
  };

  const onSubmit = (data: SignupForm) => {
    signupMutation.mutate(
      {
        nickname: data.name,
        email: data.email,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      },
      {
        onSuccess: (data) => {
          showToast("회원가입을 성공했습니다", "success");
          setAuth(data.user);
          router.push("/");
        },
        onError: (error) => {
          showToast(error.message, "error");
        },
      },
    );
  };

  const password = watch("password");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="이름"
          placeholder="이름을 입력해주세요."
          error={!!errors.name}
          {...register("name", {
            required: "이름은 필수 입력입니다.",
            maxLength: {
              value: 20,
              message: "이름은 최대 20자까지 가능합니다.",
            },
          })}
        />
        <ErrorMsg message={errors.name?.message || ""} />
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
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 최소 8자 이상입니다.",
            },
            validate: {
              isValidFormat: (value) => {
                const regex = /^[A-Za-z\d!@#$%^&*]+$/;
                return (
                  regex.test(value) ||
                  "비밀번호는 숫자, 영문, 특수문자로만 가능합니다."
                );
              },
              hasAllRequiredTypes: (value) => {
                const hasLetter = /[A-Za-z]/.test(value);
                const hasNumber = /\d/.test(value);
                const hasSpecial = /[!@#$%^&*]/.test(value);

                return (
                  (hasLetter && hasNumber && hasSpecial) ||
                  "영문, 숫자, 특수문자를 모두 포함해야 합니다."
                );
              },
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
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
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
