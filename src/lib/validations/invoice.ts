import { z } from "zod"

export const invoiceItemSchema = z.object({
  name: z.string().min(1, "品名を入力してください"),
  specification: z.string().optional(),
  quantity: z.number().min(0, "数量は0以上にしてください"),
  unit: z.string().min(1, "単位を入力してください"),
  unitPrice: z.number().min(0, "単価は0以上にしてください"),
  amount: z.number(),
  remarks: z.string().optional(),
})

export const invoiceSchema = z.object({
  projectId: z.string().min(1, "案件を選択してください"),
  receiverId: z.string().min(1, "請求先を選択してください"),
  purchaseOrderId: z.string().optional(),
  subject: z.string().min(1, "件名を入力してください"),
  taxRate: z.number().default(0.1),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, "明細を1つ以上追加してください"),
})

export type InvoiceFormData = z.infer<typeof invoiceSchema>
