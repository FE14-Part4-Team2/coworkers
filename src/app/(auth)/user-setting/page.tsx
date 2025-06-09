import Input from "@/components/common/Input/Input";
import PasswordChanger from "@/components/feature/Auth/SettingForm/PasswordChanger";
import Secession from "@/components/feature/Auth/SettingForm/Secession";
import SettingForm from "@/components/feature/Auth/SettingForm/SettingForm";

export default function UserSettingPage() {
  return (
    <div className="w-full">
      <h3 className="mb-6 text-2lg font-bold sm:text-xl">계정 설정</h3>
      <SettingForm />
      <Input
        id="email"
        label="이메일"
        defaultValue="유저 이메일 연결"
        hasTopMargin
        disabled
      />
      <PasswordChanger />
      <Secession />
    </div>
  );
}
