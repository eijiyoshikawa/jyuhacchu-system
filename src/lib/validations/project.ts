import { z } from "zod"

export const projectSchema = z.object({
  name: z.string().min(1, "案件名を入力してください"),
  description: z.string().optional(),
  status: z.enum(["IN_PROGRESS", "COMPLETED", "CANCELLED"]).default("IN_PROGRESS"),
  address: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type ProjectFormData = z.infer<typeof projectSchema>
