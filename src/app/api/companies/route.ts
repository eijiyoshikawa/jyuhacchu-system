import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { companySchema } from "@/lib/validations/company"
import { validateBody, apiError, apiSuccess } from "@/lib/api-helpers"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return apiError("Unauthorized", 401)

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get("search") || ""
  const type = searchParams.get("type") || ""

  const companies = await prisma.company.findMany({
    where: {
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { code: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(type && { companyType: type as "GENERAL_CONTRACTOR" | "SUBCONTRACTOR" }),
    },
    orderBy: { createdAt: "desc" },
  })

  return apiSuccess(companies)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return apiError("Unauthorized", 401)
  if (session.user.role !== "ADMIN") {
    return apiError("権限がありません", 403)
  }

  const result = await validateBody(req, companySchema)
  if (result.error) return result.error

  const company = await prisma.company.create({ data: result.data })
  return apiSuccess(company, 201)
}
