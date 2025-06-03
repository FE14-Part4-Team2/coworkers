import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";
import React from "react";

export default function LoginForm() {
  // 비밀번호 버튼 클릭
  const handlePasswordToggle = () => {};

  return (
    <form action="submit">
      <Input id="email" label="이메일" placeholder="이메일을 입력해주세요." />
      <Input
        id="password"
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        hasTopMargin
        suffix={
          <PasswordToggle isShow={false} onToggle={handlePasswordToggle} />
        }
      />
      <button
        type="button"
        className="absolute right-0 mt-3 text-brand-primary text-lg font-medium underline text-md sm:text-lg"
      >
        비밀번호를 잊으셨나요?
      </button>
      <Button
        label="로그인"
        variant="primary"
        className="mt-[4.75rem] w-full"
      />
    </form>
  );
}
