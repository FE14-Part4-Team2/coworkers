"use client";

import React from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import { useUpdateMyInfoMutation } from "@/api/user/user.query";
import { useToastStore } from "@/stores/toastStore";

interface SettingForm {
  name: string;
}

function SettingForm({ userName }: { userName: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingForm>({ mode: "onBlur" });
  const updateMyInfoMutation = useUpdateMyInfoMutation();
  const { showToast } = useToastStore();

  const onSubmit = (data: SettingForm) => {
    updateMyInfoMutation.mutate(
      { nickname: data.name },
      {
        onSuccess: () => {
          showToast("이름을 변경했습니다.", "success");
        },
        onError: () => {
          showToast("이름 변경을 실패했습니다.", "error");
        },
      },
    );
  };

  return (
    <>
      <ProfileImageUploader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="이름"
          defaultValue={userName}
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
