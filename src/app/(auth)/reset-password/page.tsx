"use client";

import { useResetPassword } from "@/api/user/user.query";
import Button from "@/components/common/Button";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useToastStore } from "@/stores/toastStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ResetForm = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const resetPasswordMutation = useResetPassword();
  const { showToast } = useToastStore();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetForm>({ mode: "onBlur" });

  const onSubmit = (data: ResetForm) => {
    resetPasswordMutation.mutate(
      {
        passwordConfirmation: data.confirmPassword,
        password: data.password,
        token: token,
      },
      {
        onSuccess: () => {
          showToast("비밀번호가 변경되었습니다.", "success");
          router.push("/login");
        },
        onError: () => {
          showToast("입력 값을 확인해주세요.", "error");
        },
      },
    );
  };

  const password = watch("password");

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmPasswordToggle = () => {
    setShowConfirm((prev) => !prev);
  };

  return (
    <div className="w-full mt-6 sm:mt-0">
      <h2 className="text-center font-medium text-2xl md:text-4xl text-text-primary">
        비밀번호 재설정
      </h2>
      <div className="mt-6 sm:mt-20">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="password"
            label="새 비밀번호"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
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
            suffix={
              <PasswordToggle
                isShow={showPassword}
                onToggle={handlePasswordToggle}
              />
            }
          />
          <ErrorMsg message={errors.password?.message} />
          <Input
            id="confirmPassword"
            label="비밀번호 확인"
            type={showConfirm ? "text" : "password"}
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
            error={!!errors.confirmPassword}
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해주세요.",
              validate: (value) =>
                value === password || "비밀번호가 일치하지 않습니다.",
            })}
            suffix={
              <PasswordToggle
                isShow={showConfirm}
                onToggle={handleConfirmPasswordToggle}
              />
            }
            hasTopMargin
          />
          <ErrorMsg message={errors.confirmPassword?.message} />
          <Button
            label="재설정"
            variant="primary"
            size="md"
            className="mt-10 w-full"
            disabled={resetPasswordMutation.isPending}
          />
        </form>
      </div>
    </div>
  );
}
