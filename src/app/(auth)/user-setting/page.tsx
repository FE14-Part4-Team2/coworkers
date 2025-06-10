"use client";

import Input from "@/components/common/Input/Input";
import PasswordChanger from "@/components/feature/Auth/SettingForm/PasswordChanger";
import Secession from "@/components/feature/Auth/SettingForm/Secession";
import SettingForm from "@/components/feature/Auth/SettingForm/SettingForm";
import { useAuthStore } from "@/stores/authStore";

export default function UserSettingPage() {
  const { user } = useAuthStore();

  if (!user) return <div>로그인 정보가 없습니다.</div>;

  return (
    <div className="w-full">
      <h3 className="mb-6 text-2lg font-bold sm:text-xl">계정 설정</h3>
      <SettingForm userName={user?.nickname} />
      <Input
        id="email"
        label="이메일"
        defaultValue={user?.email}
        hasTopMargin
        disabled
      />
      <PasswordChanger />
      {!user.email.toLowerCase().includes("kakao") && <Secession />}
    </div>
  );
}
