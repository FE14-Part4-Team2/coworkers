"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input/Input";
import PasswordToggle from "@/components/common/Input/PasswordToggle";

export default function ResetPasswordPage() {
  const handlePasswordToggle = () => {};
  const handleConfirmPasswordToggle = () => {};

  return (
    <div className="w-full mt-6 sm:mt-0">
      <h2 className="text-center font-medium text-2xl md:text-4xl text-text-primary">
        비밀번호 재설정
      </h2>
      <div className="mt-6 sm:mt-20">
        <form>
          <Input
            id="password"
            label="새 비밀번호"
            type="password"
            placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
            suffix={
              <PasswordToggle isShow={false} onToggle={handlePasswordToggle} />
            }
          />
          <Input
            id="comfirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="새 비밀번호를 다시 한번 입력해주세요."
            suffix={
              <PasswordToggle
                isShow={false}
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
          />
        </form>
      </div>
    </div>
  );
}
