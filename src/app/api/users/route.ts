import { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { passwordPolicySchema } from "@/lib/validations/auth"
import { apiError, apiSuccess } from "@/lib/api-helpers"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)
  if (session.user.role !== "ADMIN") {
    return apiError("権限がありません", 403)
  }

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get("search") || ""

  const users = await prisma.user.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      company: true,
    },
    orderBy: { createdAt: "desc" },
  })

  // Remove password from response
  const sanitized = users.map(({ password, ...user }) => user)

  return apiSuccess(sanitized)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) return apiError("Unauthorized", 401)
  if (session.user.role !== "ADMIN") {
    return apiError("権限がありません", 403)
  }

  const body = await req.json()
  const { name, email, password, role, companyId } = body

  if (!name || !email || !password || !role || !companyId) {
    return apiError("必須項目を入力してください", 400)
  }

  // Validate password
  const policyResult = passwordPolicySchema.safeParse(password)
  if (!policyResult.success) {
    const messages = policyResult.error.issues.map((issue) => issue.message)
    return apiError(messages[0], 400)
  }

  // Check for duplicate email
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return apiError("このメールアドレスは既に使用されています", 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      companyId,
    },
    include: { company: true },
  })

  const { password: _, ...sanitized } = user
  return apiSuccess(sanitized, 201)
}
