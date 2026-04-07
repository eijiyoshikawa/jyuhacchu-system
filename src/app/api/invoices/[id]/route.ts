import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      items: { orderBy: { itemOrder: "asc" } },
      project: true,
      issuer: true,
      receiver: true,
      createdBy: true,
      purchaseOrder: true,
      approvalFlow: {
        include: {
          steps: {
            include: { approver: true },
            orderBy: { stepOrder: "asc" },
          },
          requestedBy: true,
        },
      },
    },
  })

  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json(invoice)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.invoice.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (existing.status !== "DRAFT") {
    return NextResponse.json({ error: "下書き状態の請求書のみ編集できます" }, { status: 400 })
  }

  const body = await req.json()

  // Recalculate totals
  const items = body.items || []
  const subtotal = items.reduce(
    (sum: number, item: { amount: number }) => sum + item.amount,
    0
  )
  const taxRate = 0.1
  const taxAmount = Math.floor(subtotal * taxRate)
  const totalAmount = subtotal + taxAmount

  // Delete existing items and recreate
  await prisma.invoiceItem.deleteMany({ where: { invoiceId: id } })

  const invoice = await prisma.invoice.update({
    where: { id },
    data: {
      projectId: body.projectId,
      receiverId: body.receiverId,
      subject: body.subject,
      purchaseOrderId: body.purchaseOrderId || null,
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      dueDate: body.dueDate ? new Date(body.dueDate) : null,
      notes: body.notes || null,
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

  return NextResponse.json(invoice)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.invoice.findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (existing.status !== "DRAFT") {
    return NextResponse.json({ error: "下書き状態の請求書のみ削除できます" }, { status: 400 })
  }

  await prisma.invoice.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
