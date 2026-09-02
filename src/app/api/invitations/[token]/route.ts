import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { apiError, apiSuccess } from "@/lib/api-helpers"
import { dsystemApiGuard } from "@/lib/dsystem-guard"

interface RouteContext {
  params: Promise<{ token: string }>
}

/**
 * GET /api/invitations/[token]
 * 招待トークンの有効性チェック（公開エンドポイント：認証不要）
 * 受注側企業がアクセスした際に招待情報を取得するために使用
 */
export async function GET(_req: NextRequest, ctx: RouteContext) {
  // 招待APIは 電子取引くん 固有機能
  const guard = await dsystemApiGuard()
  if (guard) return guard

  const { token } = await ctx.params
  const invitation = await prisma.invitation.findUnique({
    where: { token },
  })
  if (!invitation) return apiError("招待が見つかりません", 404)

  const now = new Date()
  if (invitation.status === "REVOKED") {
    return apiError("この招待は取り消されました", 410)
  }
  if (invitation.status === "ACCEPTED") {
    return apiError("この招待は既に受諾済みです", 410)
  }
  if (invitation.expiresAt < now) {
    return apiError("招待の有効期限が切れています", 410)
  }

  // 公開エンドポイントのため、内部ID等は返さない
  return apiSuccess({
    invitedCompanyName: invitation.invitedCompanyName,
    invitedContactName: invitation.invitedContactName,
    invitedContactEmail: invitation.invitedContactEmail,
    inviterUserName: invitation.inviterUserName,
    message: invitation.message,
    expiresAt: invitation.expiresAt,
    createdAt: invitation.createdAt,
  })
}

/**
 * DELETE /api/invitations/[token]
 * 発注側企業が招待を取消（要ログイン、発行元企業のみ）
 */
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  // 招待APIは 電子取引くん 固有機能
  const guard = await dsystemApiGuard()
  if (guard) return guard

  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)

  const { token } = await ctx.params
  const invitation = await prisma.invitation.findUnique({ where: { token } })
  if (!invitation) return apiError("招待が見つかりません", 404)

  if (invitation.inviterCompanyId !== session.user.companyId) {
    return apiError("この招待を取消する権限がありません", 403)
  }
  if (invitation.status !== "PENDING") {
    return apiError("PENDING 状態の招待のみ取消できます", 400)
  }

  const updated = await prisma.invitation.update({
    where: { id: invitation.id },
    data: { status: "REVOKED", revokedAt: new Date() },
  })

  await prisma.auditLog.create({
    data: {
      userId: session.user.id,
      userName: session.user.name ?? "",
      action: "INVITE_REVOKE",
      targetType: "INVITATION",
      targetId: invitation.id,
    },
  })

  return apiSuccess(updated)
}
