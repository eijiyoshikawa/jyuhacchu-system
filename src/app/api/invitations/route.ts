import { NextRequest } from "next/server"
import crypto from "crypto"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { apiError, apiSuccess, validateBody } from "@/lib/api-helpers"
import { invitationCreateSchema } from "@/lib/validations/invitation"
import { dsystemApiGuard } from "@/lib/dsystem-guard"

const INVITATION_EXPIRY_DAYS = 30

/**
 * GET /api/invitations
 * 現在ログインしているユーザーの所属会社が発行した招待の一覧
 */
export async function GET() {
  // 招待APIは 電子取引くん 固有機能
  const guard = await dsystemApiGuard()
  if (guard) return guard

  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)

  const invitations = await prisma.invitation.findMany({
    where: { inviterCompanyId: session.user.companyId },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return apiSuccess(invitations)
}

/**
 * POST /api/invitations
 * 発注側企業が取引先を招待（無償アカウント発行フロー）
 */
export async function POST(req: NextRequest) {
  // 招待APIは 電子取引くん 固有機能
  const guard = await dsystemApiGuard()
  if (guard) return guard

  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)
  if (session.user.role !== "ADMIN" && session.user.role !== "CONTRACTOR") {
    return apiError("招待発行権限がありません", 403)
  }

  const { data, error } = await validateBody(req, invitationCreateSchema)
  if (error) return error

  const token = crypto.randomBytes(24).toString("base64url")
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + INVITATION_EXPIRY_DAYS)

  const invitation = await prisma.invitation.create({
    data: {
      token,
      inviterCompanyId: session.user.companyId,
      inviterUserId: session.user.id,
      inviterUserName: session.user.name ?? "",
      invitedCompanyName: data.invitedCompanyName,
      invitedContactName: data.invitedContactName,
      invitedContactEmail: data.invitedContactEmail,
      message: data.message,
      expiresAt,
    },
  })

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      userName: session.user.name ?? "",
      action: "INVITE_CREATE",
      targetType: "INVITATION",
      targetId: invitation.id,
      details: JSON.stringify({
        invitedCompanyName: data.invitedCompanyName,
        invitedContactEmail: data.invitedContactEmail,
      }),
    },
  })

  return apiSuccess(invitation, 201)
}
