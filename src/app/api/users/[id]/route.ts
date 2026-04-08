import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { apiError, apiSuccess } from "@/lib/api-helpers"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)

  const { id } = await params
  const user = await prisma.user.findUnique({
    where: { id },
    include: { company: true },
  })

  if (!user) return apiError("ユーザーが見つかりません", 404)

  const { password, ...sanitized } = user
  return apiSuccess(sanitized)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)
  if (session.user.role !== "ADMIN") {
    return apiError("権限がありません", 403)
  }

  const { id } = await params
  const body = await req.json()
  const { name, email, role, companyId, password } = body

  const updateData: Record<string, unknown> = {}
  if (name) updateData.name = name
  if (email) updateData.email = email
  if (role) updateData.role = role
  if (companyId) updateData.companyId = companyId
  if (password) {
    updateData.password = await bcrypt.hash(password, 10)
  }

  // Check for duplicate email if email is being changed
  if (email) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing && existing.id !== id) {
      return apiError("このメールアドレスは既に使用されています", 400)
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    include: { company: true },
  })

  const { password: _, ...sanitized } = user
  return apiSuccess(sanitized)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)
  if (session.user.role !== "ADMIN") {
    return apiError("権限がありません", 403)
  }

  const { id } = await params

  // Prevent self-deletion
  if (id === session.user.id) {
    return apiError("自分自身を削除することはできません", 400)
  }

  await prisma.user.delete({ where: { id } })
  return apiSuccess({ message: "ユーザーを削除しました" })
}
