"use client";

import { useResetPassword } from "@/api/user/user.query";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { PasswordForm, passwordSchema } from "@/lib/schemas/passwordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const resetPasswordMutation = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });

  const onSubmit = (data: PasswordForm) => {
    resetPasswordMutation.mutate({
      passwordConfirmation: data.confirmPassword,
      password: data.password,
      token: token,
    });
  };

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
          <Input
            id="confirmPassword"
            label="비밀번호 확인"
            type={showConfirm ? "text" : "password"}
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message || ""}
            {...register("confirmPassword", {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\s/g, "");
              },
            })}
            suffix={
              <PasswordToggle
                isShow={showConfirm}
                onToggle={handleConfirmPasswordToggle}
              />
            }
            hasTopMargin
          />
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
