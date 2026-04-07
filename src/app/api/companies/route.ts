import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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

  return NextResponse.json(companies)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 })
  }

  const body = await req.json()
  const company = await prisma.company.create({ data: body })
  return NextResponse.json(company, { status: 201 })
}
