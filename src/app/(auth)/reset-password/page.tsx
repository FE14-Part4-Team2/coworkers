"use client";

import { useResetPassword } from "@/api/user/user.query";
import Button from "@/components/common/Button";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useToastStore } from "@/stores/toastStore";
import { validateField } from "@/utils/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const resetPasswordMutation = useResetPassword();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  const { showToast } = useToastStore();

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };
  const handleConfirmPasswordToggle = () => {
    setShowConfirm((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const errorMessage = validateField(name, value, resetForm);
    setError((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fieldsToValidate = ["password", "confirmPassword"] as const;

    const newErrors = fieldsToValidate.reduce(
      (acc, key) => {
        acc[key] = validateField(key, resetForm[key], resetForm);
        return acc;
      },
      {} as typeof error,
    );

    setError(newErrors);

    const hasError = Object.values(error).some((msg) => msg);
    if (hasError) return;

    resetPasswordMutation.mutate(
      {
        passwordConfirmation: resetForm.confirmPassword,
        password: resetForm.password,
        token: token,
      },
      {
        onSuccess: () => {
          showToast("비밀번호가 변경되었습니다.", "success");
        },
        onError: () => {
          showToast("입력 값을 확인해주세요.", "error");
        },
      },
    );
  };

  return (
    <div className="w-full mt-6 sm:mt-0">
      <h2 className="text-center font-medium text-2xl md:text-4xl text-text-primary">
        비밀번호 재설정
      </h2>
      <div className="mt-6 sm:mt-20">
        <form onSubmit={handleSubmit}>
          <Input
            id="password"
            name="password"
            label="새 비밀번호"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
            value={resetForm.password}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={error.password !== ""}
            suffix={
              <PasswordToggle
                isShow={showPassword}
                onToggle={handlePasswordToggle}
              />
            }
          />
          <ErrorMsg message={error.password} />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            label="비밀번호 확인"
            type={showConfirm ? "text" : "password"}
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
            value={resetForm.confirmPassword}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            error={error.confirmPassword !== ""}
            suffix={
              <PasswordToggle
                isShow={showConfirm}
                onToggle={handleConfirmPasswordToggle}
              />
            }
            hasTopMargin
          />
          <ErrorMsg message={error.confirmPassword} />
          <Button
            label="재설정"
            variant="primary"
            size="md"
            className="mt-10 w-full"
          />
        </form>
      </div>
    </div>
  );
}
