"use client";

import React from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import ErrorMsg from "@/components/common/Input/ErrorMsg";
import { useUpdateMyInfoMutation } from "@/api/user/user.query";
import { NicknameForm, nicknameFormSchema } from "@/lib/schemas/nicknameSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function SettingForm({ userName }: { userName: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameForm>({
    resolver: zodResolver(nicknameFormSchema),
    mode: "onBlur",
  });
  const updateMyInfoMutation = useUpdateMyInfoMutation();

  const onSubmit = (data: NicknameForm) => {
    updateMyInfoMutation.mutate({ nickname: data.name });
  };

  return (
    <>
      <ProfileImageUploader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="name"
          label="이름"
          defaultValue={userName}
          {...register("name")}
          error={!!errors.name?.message}
          hasTopMargin
          suffix={
            <Button
              type="submit"
              label="저장"
              variant="primary"
              size="sm"
              className="w-[3rem] h-8"
            />
          }
        />
        <ErrorMsg message={errors.name?.message} />
      </form>
    </>
  );
}

export default SettingForm;
