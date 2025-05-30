"use client";

import ErrorMsg from "@/components/common/Input/ErrorMsg";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import { useCallback, useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="bg-bg-primary w-full h-[100vh] p-10">
      <Input id="email" label="이메일" placeholder="이메일을 입력해주세요." />
      <Input
        id="email"
        label="disabled"
        placeholder="비활성화 상태 입니다."
        disabled
        hasTopMargin
      />
      <Input
        id="password"
        label="비밀번호"
        type={showPassword ? "text" : "password"}
        placeholder="비밀번호를 입력해주세요."
        hasTopMargin
        suffix={
          <PasswordToggle
            onToggle={handlePasswordToggle}
            isShow={showPassword}
          />
        }
      />
      <Input
        placeholder="버튼 예시"
        hasTopMargin
        suffix={
          <button
            type="button"
            className="bg-brand-secondary p-1 rounded-lg text-text-inverse text-sm"
          >
            임시 버튼
          </button>
        }
      />
      <Input
        id="error"
        label="error"
        placeholder="에러입니다."
        hasTopMargin
        error
      />
      <ErrorMsg message="기본 간격 8px 입니다." />
      <Input
        id="error"
        label="error"
        placeholder="에러입니다."
        hasTopMargin
        error
      />
      <ErrorMsg message="className으로 간격 변경 가능합니다" className="mt-3" />
    </div>
  );
}
