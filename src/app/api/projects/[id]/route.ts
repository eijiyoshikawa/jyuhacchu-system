import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Multi-tenant isolation: verify user's company owns the project (ADMIN can see all)
  if (session.user.role !== "ADMIN" && project.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(project)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  // Multi-tenant isolation
  const existing = await prisma.project.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (session.user.role !== "ADMIN" && existing.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const body = await req.json()

  const project = await prisma.project.update({
    where: { id },
    data: {
      name: body.name,
      description: body.description || null,
      status: body.status,
      address: body.address || null,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
    },
  })

  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params

  // Multi-tenant isolation
  const existing = await prisma.project.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (session.user.role !== "ADMIN" && existing.companyId !== session.user.companyId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
