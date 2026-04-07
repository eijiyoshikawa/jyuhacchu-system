import { prisma } from "@/lib/prisma"

export async function createAuditLog(params: {
  userId: string
  userName: string
  action: string
  targetType: string
  targetId?: string
  details?: Record<string, unknown>
  ipAddress?: string
}) {
  return prisma.auditLog.create({
    data: {
      ...params,
      details: params.details ? JSON.stringify(params.details) : null,
    },
  })
}
