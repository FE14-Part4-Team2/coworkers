"use client";
import Button from "@/components/common/Button";
import LabeledField from "./LabeledField";
import Input from "@/components/common/Input/Input";
import Textarea from "../../../common/TextArea/TextArea";
import ImageUploader from "./ImageUploader";
import { useForm } from "react-hook-form";

interface FormValues {
  title: string;
  content: string;
}

export default function BoardsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",
    },
    shouldFocusError: false,
  });

  //LATER: 게시글 등록 API 추후 구현, 현재는 RHF 테스트를 위해 정의
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  const errorStyle = "block mt-2 text-status-danger text-sm";

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-[2.5rem] mt-[1.5rem] sm:mt-0">
        <h1 className="text-text-primary text-2lg sm:text-xl">게시글 쓰기</h1>
        <div className="hidden sm:block">
          <Button
            label={isSubmitting ? "등록중" : "등록"}
            variant="primary"
            className="w-[11.5rem] h-[3rem]"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </div>
      <hr className="w-full border-t border-border-primary opacity-10" />
      <LabeledField id="title" label="제목" required>
        <Input
          id="title"
          placeholder="제목을 입력해주세요."
          {...register("title", {
            required: "제목은 필수 입력입니다.",
            minLength: { value: 5, message: "5자 이상 입력해주세요." },
          })}
          error={!!errors.title}
          maxLength={30}
          className={!!errors.title ? "hover:border-status-danger" : ""}
        />
        {errors.title && (
          <span className={errorStyle}>{errors.title.message}</span>
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
          className={!!errors.title ? "hover:border-status-danger" : ""}
        />
        {errors.content && (
          <span className={errorStyle}>{errors.content.message}</span>
        )}
      </LabeledField>
      <section aria-label="이미지 등록">
        <ImageUploader />
      </section>
      <div className="block sm:hidden">
        <Button
          label={isSubmitting ? "등록중" : "등록"}
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className="w-full h-[3rem] mt-[2.5rem] block sm:hidden"
        />
      </div>
    </form>
  );
}
