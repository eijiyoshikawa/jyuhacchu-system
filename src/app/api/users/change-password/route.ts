import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { passwordPolicySchema } from "@/lib/validations/auth"
import { apiError, apiSuccess } from "@/lib/api-helpers"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)

  const body = await req.json()
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    return apiError("現在のパスワードと新しいパスワードを入力してください", 400)
  }

  // Validate new password against policy
  const policyResult = passwordPolicySchema.safeParse(newPassword)
  if (!policyResult.success) {
    const messages = policyResult.error.issues.map((issue) => issue.message)
    return apiError(messages[0], 400)
  }

  // Get current user from DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  if (!user) {
    return apiError("ユーザーが見つかりません", 404)
  }

  // Verify current password
  const isValid = await bcrypt.compare(currentPassword, user.password)
  if (!isValid) {
    return apiError("現在のパスワードが正しくありません", 400)
  }

  // Hash new password and update
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  })

  return apiSuccess({ message: "パスワードを変更しました" })
}
