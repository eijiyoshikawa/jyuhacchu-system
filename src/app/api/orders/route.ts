import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const orders = await prisma.purchaseOrder.findMany({
    where: {
      OR: [
        { issuerId: session.user.companyId },
        { receiverId: session.user.companyId },
      ],
      ...(search && {
        AND: {
          OR: [
            { orderNumber: { contains: search, mode: "insensitive" } },
            { subject: { contains: search, mode: "insensitive" } },
            { project: { name: { contains: search, mode: "insensitive" } } },
          ],
        },
      }),
      ...(status && { status: status as never }),
    },
    include: {
      project: true,
      issuer: true,
      receiver: true,
      createdBy: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const count = await prisma.purchaseOrder.count({
    where: { orderNumber: { startsWith: `PO-${today}` } },
  })
  const orderNumber = `PO-${today}-${String(count + 1).padStart(4, "0")}`

  // Calculate totals from items
  const items = body.items || []
  const subtotal = items.reduce(
    (sum: number, item: { amount: number }) => sum + item.amount,
    0
  )
  const taxRate = 0.1
  const taxAmount = Math.floor(subtotal * taxRate)
  const totalAmount = subtotal + taxAmount

  const order = await prisma.purchaseOrder.create({
    data: {
      orderNumber,
      projectId: body.projectId,
      issuerId: session.user.companyId,
      receiverId: body.receiverId,
      createdById: session.user.id,
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

  return NextResponse.json(order, { status: 201 })
}
