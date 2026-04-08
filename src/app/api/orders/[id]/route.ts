import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const order = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      project: true,
      issuer: true,
      receiver: true,
      createdBy: true,
      items: { orderBy: { itemOrder: "asc" } },
      approvalFlow: {
        include: {
          steps: {
            include: { approver: true },
            orderBy: { stepOrder: "asc" },
          },
        },
      },
    },
  })

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Multi-tenant isolation: verify user's company is issuer or receiver (ADMIN can see all)
  if (
    session.user.role !== "ADMIN" &&
    order.issuerId !== session.user.companyId &&
    order.receiverId !== session.user.companyId
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(order)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.purchaseOrder.findUnique({ where: { id } })

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Multi-tenant isolation
  if (
    session.user.role !== "ADMIN" &&
    existing.issuerId !== session.user.companyId &&
    existing.receiverId !== session.user.companyId
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (existing.status !== "DRAFT") {
    return NextResponse.json(
      { error: "下書き状態の発注書のみ編集できます" },
      { status: 400 }
    )
  }
  if (existing.confirmedAt) {
    return NextResponse.json(
      { error: "確定済みの発注書は編集できません" },
      { status: 400 }
    )
  }

  const body = await req.json()
  const items = body.items || []
  const subtotal = items.reduce(
    (sum: number, item: { amount: number }) => sum + item.amount,
    0
  )
  const taxRate = 0.1
  const taxAmount = Math.floor(subtotal * taxRate)
  const totalAmount = subtotal + taxAmount

  // Delete existing items and recreate
  await prisma.purchaseOrderItem.deleteMany({
    where: { purchaseOrderId: id },
  })

  const order = await prisma.purchaseOrder.update({
    where: { id },
    data: {
      projectId: body.projectId,
      receiverId: body.receiverId,
      subject: body.subject,
      orderType: body.orderType || null,
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      notes: body.notes || null,
      deliveryDeadline: body.deliveryDeadline
        ? new Date(body.deliveryDeadline)
        : null,
      items: {
        create: items.map(
          (
            item: {
              name: string
              specification?: string
              quantity: number
              unit: string
              unitPrice: number
              amount: number
              remarks?: string
            },
            index: number
          ) => ({
            itemOrder: index + 1,
            name: item.name,
            specification: item.specification || null,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            amount: item.amount,
            remarks: item.remarks || null,
          })
        ),
      },
    },
    include: {
      items: true,
      project: true,
      issuer: true,
      receiver: true,
    },
  })

  return NextResponse.json(order)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.purchaseOrder.findUnique({ where: { id } })

  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Multi-tenant isolation
  if (
    session.user.role !== "ADMIN" &&
    existing.issuerId !== session.user.companyId &&
    existing.receiverId !== session.user.companyId
  ) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  if (existing.status !== "DRAFT") {
    return NextResponse.json(
      { error: "下書き状態の発注書のみ削除できます" },
      { status: 400 }
    )
  }

  await prisma.purchaseOrder.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
