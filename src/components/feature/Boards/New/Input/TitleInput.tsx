import Input from "@/components/common/Input/Input";
import { InputHTMLAttributes } from "react";

export default function TitleInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <>
      <div className="flex gap-[0.3rem] mb-[1rem] mt-[2.5rem]">
        <span className="text-brand-tertiary text-lg">*</span>
        <span className="text-text-primary text-lg">제목</span>
      </div>
      <Input
        id="title"
        placeholder="제목을 입력해주세요."
        className="border border-card-border"
        {...props}
      />
    </>
  );
}
