"use client";

import Button from "@/components/common/Button";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { validateField } from "@/utils/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetForm, setResetForm] = useState({
    token: token,
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

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

    const newErrors: typeof error = { password: "", confirmPassword: "" };

    fieldsToValidate.forEach((key) => {
      newErrors[key] = validateField(key, resetForm[key], resetForm);
    });

    setError(newErrors);

    const hasError = Object.values(error).some((msg) => msg);
    if (hasError) return;
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
