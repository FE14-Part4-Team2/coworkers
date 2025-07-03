"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Button from "@/components/common/Button";
import LabeledField from "./LabeledField";
import Input from "@/components/common/Input/Input";
import Textarea from "../../../common/TextArea/TextArea";
import ImageUploader from "./ImageUploader";
import { formSchema, FormValues } from "@/lib/schemas/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export interface BoardsFormProps {
  isSubmitting: boolean;
  onSubmit: (data: FormValues) => void;
  imageUrl?: string | null;
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
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: defaultValues ?? { title: "", content: "" },
    shouldFocusError: false,
  });

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  const isEdit = mode === "edit";

  const errorStyle = "block mt-2 text-status-danger text-sm";

  const formFields = [
    {
      id: "title",
      label: "제목",
      required: true,
      placeholder: "제목을 입력해주세요.",
      component: Input,
      maxLength: 30,
    },
    {
      id: "token",
      label: (
        <>
          팀 참여 링크{" "}
          <span className="ml-1 text-sm text-text-secondary">
            (팀 페이지에서 복사할 수 있습니다.)
          </span>
        </>
      ),
      required: false,
      placeholder: "팀 참여 링크를 입력해주세요.",
      component: Input,
    },
    {
      id: "content",
      label: "내용",
      required: true,
      placeholder: "내용을 입력해주세요",
      component: Textarea,
      maxLength: 500,
    },
  ];

  const submitButton = (
    <Button
      label={
        isSubmitting ? (isEdit ? "수정중" : "등록중") : isEdit ? "수정" : "등록"
      }
      variant="primary"
      state={isSubmitting ? "disabled" : "default"}
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

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-[2.5rem] mt-[1.5rem] sm:mt-0">
        <h1 className="text-text-primary text-2lg sm:text-xl">
          {isEdit ? "게시글 수정" : "게시글 쓰기"}
        </h1>
        <div className="hidden sm:block">{submitButton}</div>
      </div>
      <hr className="w-full border-t border-border-primary opacity-10" />

      {formFields.map(
        ({
          id,
          label,
          required,
          placeholder,
          component: Component,
          maxLength,
        }) => {
          const fieldError = errors[id as keyof FormValues];

          return (
            <LabeledField key={id} id={id} label={label} required={required}>
              <Component
                id={id}
                placeholder={placeholder}
                {...register(id as keyof FormValues)}
                error={!!fieldError}
                maxLength={maxLength}
                className={fieldError ? "hover:border-status-danger" : ""}
              />
              {fieldError && (
                <span className={errorStyle}>{fieldError.message}</span>
              )}
            </LabeledField>
          );
        },
      )}
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
