import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { apiError, apiSuccess, validateBody } from "@/lib/api-helpers"
import { invitationAcceptSchema } from "@/lib/validations/invitation"

interface RouteContext {
  params: Promise<{ token: string }>
}

/**
 * POST /api/invitations/[token]/accept
 * 受注側企業が招待を受諾し、自社アカウント（Company + 管理者User）を作成
 * 公開エンドポイント：認証不要
 * 受注企業側は費用ゼロ（本フローに課金要素なし）
 */
export async function POST(req: NextRequest, ctx: RouteContext) {
  const { token } = await ctx.params
  const invitation = await prisma.invitation.findUnique({ where: { token } })
  if (!invitation) return apiError("招待が見つかりません", 404)
  if (invitation.status === "REVOKED") return apiError("この招待は取り消されました", 410)
  if (invitation.status === "ACCEPTED") return apiError("この招待は既に受諾済みです", 410)
  if (invitation.expiresAt < new Date()) {
    return apiError("招待の有効期限が切れています", 410)
  }

  const { data, error } = await validateBody(req, invitationAcceptSchema)
  if (error) return error

  // 会社コード重複チェック
  const existingCompany = await prisma.company.findUnique({
    where: { code: data.companyCode },
  })
  if (existingCompany) {
    return apiError("指定の会社コードは既に登録されています。別のコードを指定してください。", 409)
  }

  // メールアドレス重複チェック
  const existingUser = await prisma.user.findUnique({
    where: { email: data.userEmail },
  })
  if (existingUser) {
    return apiError("指定のメールアドレスは既に登録されています。", 409)
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const result = await prisma.$transaction(async (tx) => {
    // 受注企業の作成
    const company = await tx.company.create({
      data: {
        name: invitation.invitedCompanyName,
        code: data.companyCode,
        companyType: "SUBCONTRACTOR",
        postalCode: data.companyPostalCode || null,
        address: data.companyAddress || null,
        phone: data.companyPhone || null,
        email: invitation.invitedContactEmail,
        registrationNumber: data.companyRegistrationNumber || null,
      },
    })

    // 管理者ユーザーの作成
    const user = await tx.user.create({
      data: {
        email: data.userEmail,
        name: data.userName,
        password: hashedPassword,
        role: "ADMIN",
        companyId: company.id,
      },
    })

    // 招待を受諾済に更新
    const updated = await tx.invitation.update({
      where: { id: invitation.id },
      data: {
        status: "ACCEPTED",
        acceptedCompanyId: company.id,
        acceptedUserId: user.id,
        acceptedAt: new Date(),
      },
    })

    return { company, user, invitation: updated }
  })

  await prisma.auditLog.create({
    data: {
      userId: result.user.id,
      userName: result.user.name,
      action: "INVITE_ACCEPT",
      targetType: "INVITATION",
      targetId: result.invitation.id,
      details: JSON.stringify({
        companyId: result.company.id,
        companyName: result.company.name,
      }),
    },
  })

  return apiSuccess(
    {
      companyId: result.company.id,
      userId: result.user.id,
      loginUrl: "/auth/login",
    },
    201
  )
}
