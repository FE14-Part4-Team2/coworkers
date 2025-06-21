import { z } from "zod";

export const nicknameSchema = z
  .string()
  .min(1, "이름을 입력해주세요.")
  .max(20, "이름은 최대 20자까지 가능합니다.");

export const nicknameFormSchema = z.object({
  name: nicknameSchema,
});

export type NicknameForm = z.infer<typeof nicknameFormSchema>;
