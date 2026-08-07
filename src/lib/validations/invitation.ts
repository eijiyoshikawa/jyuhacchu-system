import { z } from "zod"

export const invitationCreateSchema = z.object({
  invitedCompanyName: z.string().min(1, "取引先の会社名を入力してください").max(200),
  invitedContactName: z.string().max(100).optional(),
  invitedContactEmail: z.string().email("有効なメールアドレスを入力してください"),
  message: z.string().max(1000).optional(),
})

export type InvitationCreateData = z.infer<typeof invitationCreateSchema>

export const invitationAcceptSchema = z.object({
  companyCode: z.string().min(1, "会社コードを入力してください").max(50),
  companyPostalCode: z.string().max(20).optional(),
  companyAddress: z.string().max(500).optional(),
  companyPhone: z.string().max(50).optional(),
  companyRegistrationNumber: z
    .string()
    .regex(/^T\d{13}$/, "適格請求書発行事業者登録番号は T + 13 桁の数字で入力してください")
    .optional()
    .or(z.literal("")),
  userName: z.string().min(1, "担当者名を入力してください").max(100),
  userEmail: z.string().email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .max(200)
    .regex(/[a-z]/, "パスワードには小文字を1文字以上含めてください")
    .regex(/[A-Z]/, "パスワードには大文字を1文字以上含めてください")
    .regex(/[0-9]/, "パスワードには数字を1文字以上含めてください"),
})

export type InvitationAcceptData = z.infer<typeof invitationAcceptSchema>
