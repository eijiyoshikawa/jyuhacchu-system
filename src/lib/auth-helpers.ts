import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export type UserRole = "ADMIN" | "CONTRACTOR" | "SUBCONTRACTOR"

export async function getSession() {
  const session = await auth()
  if (!session?.user) {
    redirect("/auth/login")
  }
  return session
}

export async function requireRole(roles: UserRole[]) {
  const session = await getSession()
  if (!roles.includes(session.user.role as UserRole)) {
    throw new Error("権限がありません")
  }
  return session
}

export const roleLabels: Record<string, string> = {
  ADMIN: "管理者",
  CONTRACTOR: "元請",
  SUBCONTRACTOR: "協力会社",
}

export const orderStatusLabels: Record<string, string> = {
  DRAFT: "下書き",
  PENDING_APPROVAL: "申請中",
  APPROVED: "承認済",
  ORDERED: "発注済",
  ACCEPTED: "請負済",
  DELIVERY_REPORTED: "納品完了",
  INSPECTED: "検収完了",
  REJECTED: "却下",
  CANCELLED: "取消",
}

export const invoiceStatusLabels: Record<string, string> = {
  DRAFT: "下書き",
  SUBMITTED: "提出済",
  APPROVED: "承認済",
  REJECTED: "却下",
  PAID: "支払済",
}

export const projectStatusLabels: Record<string, string> = {
  IN_PROGRESS: "進行中",
  COMPLETED: "完了",
  CANCELLED: "中止",
}
