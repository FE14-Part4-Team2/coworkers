import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/regex";
import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름은 필수 입력입니다.")
      .max(20, "이름은 최대 20자까지 가능합니다."),
    email: z
      .string()
      .min(1, "이메일은 필수 입력입니다.")
      .regex(EMAIL_REGEX, "이메일 형식으로 작성해 주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상입니다.")
      .regex(PASSWORD_REGEX, "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.")
      .refine(
        (val) =>
          /[A-Za-z]/.test(val) && /\d/.test(val) && /[!@#$%^&*]/.test(val),
        {
          message: "영문, 숫자, 특수문자를 모두 포함해야 합니다.",
        },
      ),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupForm = z.infer<typeof signupSchema>;
