import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
  password: z
    .string()
    .min(1, "パスワードを入力してください"),
})

export const passwordPolicySchema = z
  .string()
  .min(8, "パスワードは8文字以上で入力してください")
  .regex(/[A-Z]/, "パスワードに大文字のアルファベットを含めてください")
  .regex(/[a-z]/, "パスワードに小文字のアルファベットを含めてください")
  .regex(/[0-9]/, "パスワードに数字を含めてください")

export type LoginFormData = z.infer<typeof loginSchema>
