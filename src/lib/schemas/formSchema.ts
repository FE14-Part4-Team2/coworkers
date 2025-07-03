import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .nonempty("제목은 필수 입력입니다.")
    .min(5, "제목은 최소 5자 이상 입력해주세요.")
    .max(30, "제목은 최대 30자까지 입력 가능합니다."),
  content: z
    .string()
    .nonempty("내용은 필수 입력입니다.")
    .min(10, "10자 이상 입력해주세요.")
    .max(500, "내용은 최대 500자까지 입력 가능합니다."),
  token: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
