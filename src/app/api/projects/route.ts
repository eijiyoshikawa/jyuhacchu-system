import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { projectSchema } from "@/lib/validations/project"
import { validateBody, apiError, apiSuccess } from "@/lib/api-helpers"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return apiError("Unauthorized", 401)

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const projects = await prisma.project.findMany({
    where: {
      ...(session.user.role !== "ADMIN" && { companyId: session.user.companyId }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { projectCode: { contains: search, mode: "insensitive" } },
          { address: { contains: search, mode: "insensitive" } },
        ],
      }),
      ...(status && { status: status as "IN_PROGRESS" | "COMPLETED" | "CANCELLED" }),
    },
    orderBy: { createdAt: "desc" },
  })

  return apiSuccess(projects)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return apiError("Unauthorized", 401)

  const result = await validateBody(req, projectSchema)
  if (result.error) return result.error
  const body = result.data

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const count = await prisma.project.count({
    where: { projectCode: { startsWith: `PJ-${today}` } },
  })
  const projectCode = `PJ-${today}-${String(count + 1).padStart(4, "0")}`

  const project = await prisma.project.create({
    data: {
      projectCode,
      name: body.name,
      description: body.description || null,
      address: body.address || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      companyId: session.user.companyId,
    },
  })

  return apiSuccess(project, 201)
}
