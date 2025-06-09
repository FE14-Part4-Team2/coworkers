"use client";

import React from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/common/Input/ErrorMsg";

interface SettingForm {
  name: string;
}

function SettingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingForm>({ mode: "onBlur" });

  const onSubmit = (data: SettingForm) => {
    console.log("프로필 업데이트 API:", data);
  };

  return (
    <>
      <ProfileImageUploader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="이름"
          defaultValue="유저 이름 연결"
          {...register("name", {
            required: "이름을 입력해주세요.",
            maxLength: {
              value: 20,
              message: "이름은 최대 20자까지 가능합니다.",
            },
          })}
          error={!!errors.name?.message}
          hasTopMargin
          suffix={
            <Button
              type="submit"
              label="저장"
              variant="primary"
              size="sm"
              className="w-18 h-8"
            />
          }
        />
        <ErrorMsg message={errors.name?.message} />
      </form>
    </>
  );
}

export default SettingForm;
