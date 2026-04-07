import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { generateDocumentHash } from "@/lib/document-hash"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const order = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      items: { orderBy: { itemOrder: "asc" } },
    },
  })

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })

  if (order.confirmedAt) {
    return NextResponse.json(
      { error: "この発注書は既に確定済みです" },
      { status: 400 }
    )
  }

  if (order.status !== "APPROVED" && order.status !== "ORDERED") {
    return NextResponse.json(
      { error: "承認済または発注済の発注書のみ確定できます" },
      { status: 400 }
    )
  }

  // Generate hash from order data for tamper detection
  const hashData: Record<string, unknown> = {
    orderNumber: order.orderNumber,
    subject: order.subject,
    items: order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      amount: item.amount,
    })),
    subtotal: order.subtotal,
    taxRate: order.taxRate,
    taxAmount: order.taxAmount,
    totalAmount: order.totalAmount,
    issuedAt: order.issuedAt?.toISOString() ?? null,
    deliveryDeadline: order.deliveryDeadline?.toISOString() ?? null,
  }

  const confirmedAt = new Date()
  const confirmedHash = generateDocumentHash(hashData)

  const updatedOrder = await prisma.purchaseOrder.update({
    where: { id },
    data: { confirmedAt, confirmedHash },
    include: {
      items: { orderBy: { itemOrder: "asc" } },
      project: true,
      issuer: true,
      receiver: true,
    },
  })

  return NextResponse.json({
    message: "発注書を確定しました",
    confirmedAt: updatedOrder.confirmedAt,
    confirmedHash: updatedOrder.confirmedHash,
    order: updatedOrder,
  })
}
