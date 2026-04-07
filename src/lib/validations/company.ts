import { z } from "zod"

export const companySchema = z.object({
  name: z.string().min(1, "会社名を入力してください"),
  code: z.string().min(1, "会社コードを入力してください"),
  companyType: z.enum(["GENERAL_CONTRACTOR", "SUBCONTRACTOR"], "会社種別を選択してください"),
  postalCode: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("正しいメールアドレスを入力してください").optional().or(z.literal("")),
  registrationNumber: z.string().optional(),
})

export type CompanyFormData = z.infer<typeof companySchema>
