"use client";
import Button from "@/components/common/Button";
import LabeledField from "./LabeledField";
import Input from "@/components/common/Input/Input";
import Textarea from "../../../common/TextArea/TextArea";
import ImageUploader from "./ImageUploader";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export interface FormValues {
  title: string;
  content: string;
  token?: string;
}

export interface BoardsFormProps {
  isSubmitting: boolean;
  onSubmit: (data: FormValues) => void;
  imageUrl?: string;
  onImageUpload: (file: File | null) => void;
  isImageUploading: boolean;
  mode: "create" | "edit";
  defaultValues?: FormValues;
  articleId?: string;
}

export default function BoardsForm({
  isSubmitting,
  onSubmit,
  onImageUpload,
  isImageUploading,
  mode,
  defaultValues,
  imageUrl,
}: BoardsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: defaultValues ?? { title: "", content: "" },
    shouldFocusError: false,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const isEdit = mode == "edit";

  const errorStyle = "block mt-2 text-status-danger text-sm";

  const submitButton = (
    <Button
      label={
        isSubmitting ? (isEdit ? "수정중" : "등록중") : isEdit ? "수정" : "등록"
      }
      variant="primary"
      type="submit"
      disabled={isSubmitting}
      className="
        w-full sm:w-[11.5rem] 
        h-[3rem] 
        mt-[2.5rem] sm:mt-0
        sm:!px-0
      "
    />
  );

  const onValidSubmit = (data: FormValues) => {
    onSubmit(data);
  };

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      <div className="flex justify-between items-center mb-[2.5rem] mt-[1.5rem] sm:mt-0">
        <h1 className="text-text-primary text-2lg sm:text-xl">
          {isEdit ? "게시글 수정" : "게시글 쓰기"}
        </h1>
        <div className="hidden sm:block">{submitButton}</div>
      </div>
      <hr className="w-full border-t border-border-primary opacity-10" />
      <LabeledField id="title" label="제목" required>
        <Input
          id="title"
          placeholder="제목을 입력해주세요."
          {...register("title", {
            required: "제목은 필수 입력입니다.",
            minLength: {
              value: 5,
              message: "제목은 최소 5자 이상 입력해주세요.",
            },
          })}
          error={!!errors.title}
          maxLength={30}
          className={!!errors.title ? "hover:border-status-danger" : ""}
        />
        {errors.title && (
          <span className={errorStyle}>{errors.title.message}</span>
        )}
      </LabeledField>
      <LabeledField
        id="token"
        label={
          <>
            팀 참여 링크{" "}
            <span className="ml-1 text-sm text-text-secondary">
              (팀 참여 링크는 팀페이지에서 복사할 수 있습니다.)
            </span>
          </>
        }
      >
        <Input
          id="token"
          placeholder="팀 참여 링크를 입력해주세요."
          {...register("token")}
          error={!!errors.token}
          className={!!errors.token ? "hover:border-status-danger" : ""}
        />
        {errors.token && (
          <span className={errorStyle}>{errors.token.message}</span>
        )}
      </LabeledField>

      <LabeledField id="content" label="내용" required>
        <Textarea
          id="content"
          placeholder="내용을 입력해주세요."
          {...register("content", {
            required: "내용은 필수 입력입니다.",
            minLength: { value: 10, message: "10자 이상 입력해주세요." },
          })}
          error={!!errors.content}
          maxLength={500}
          className={!!errors.content ? "hover:border-status-danger" : ""}
        />
        {errors.content && (
          <span className={errorStyle}>{errors.content.message}</span>
        )}
      </LabeledField>
      <section aria-label="이미지 등록">
        <ImageUploader
          onChange={onImageUpload}
          disabled={isImageUploading}
          imageUrl={imageUrl}
        />
        {isImageUploading && (
          <p className="mt-2 text-sm text-text-secondary">
            이미지 업로드 중...
          </p>
        )}
      </section>
      <div className="block sm:hidden">{submitButton}</div>
    </form>
  );
}
