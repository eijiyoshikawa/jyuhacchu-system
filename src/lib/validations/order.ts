import { z } from "zod"

export const orderItemSchema = z.object({
  name: z.string().min(1, "品名を入力してください"),
  specification: z.string().optional(),
  quantity: z.number().min(0, "数量は0以上にしてください"),
  unit: z.string().min(1, "単位を入力してください"),
  unitPrice: z.number().min(0, "単価は0以上にしてください"),
  amount: z.number(),
  remarks: z.string().optional(),
})

export const orderSchema = z.object({
  projectId: z.string().min(1, "案件を選択してください"),
  receiverId: z.string().min(1, "取引先を選択してください"),
  subject: z.string().min(1, "件名を入力してください"),
  orderType: z.string().optional(),
  taxRate: z.number().default(0.1),
  deliveryDeadline: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(orderItemSchema).min(1, "明細を1つ以上追加してください"),
})

export type OrderFormData = z.infer<typeof orderSchema>
export type OrderItemFormData = z.infer<typeof orderItemSchema>
