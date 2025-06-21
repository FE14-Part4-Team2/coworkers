import { EMAIL_REGEX } from "@/constants/regex";
import { z } from "zod";
import { nicknameSchema } from "./nicknameSchema";
import { passwordSchema } from "./passwordSchema";

const signupBaseSchema = z.object({
  name: nicknameSchema,
  email: z
    .string()
    .min(1, "이메일은 필수 입력입니다.")
    .regex(EMAIL_REGEX, "이메일 형식으로 작성해 주세요."),
});

export const signupSchema = z.intersection(signupBaseSchema, passwordSchema);

export type SignupForm = z.infer<typeof signupSchema>;
