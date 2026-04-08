import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { orderSchema } from "@/lib/validations/order"
import { validateBody, apiError, apiSuccess } from "@/lib/api-helpers"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) return apiError("Unauthorized", 401)

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get("search") || ""
  const status = searchParams.get("status") || ""

  const orders = await prisma.purchaseOrder.findMany({
    where: {
      ...(session.user.role !== "ADMIN" && {
        OR: [
          { issuerId: session.user.companyId },
          { receiverId: session.user.companyId },
        ],
      }),
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

  return apiSuccess(orders)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) return apiError("Unauthorized", 401)

  const result = await validateBody(req, orderSchema)
  if (result.error) return result.error
  const body = result.data

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  const count = await prisma.purchaseOrder.count({
    where: { orderNumber: { startsWith: `PO-${today}` } },
  })
  const orderNumber = `PO-${today}-${String(count + 1).padStart(4, "0")}`

  const items = body.items || []

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.purchaseOrder.create({
      data: {
        orderNumber,
        projectId: body.projectId,
        issuerId: session.user.companyId,
        receiverId: body.receiverId,
        createdById: session.user.id,
        subject: body.subject,
        orderType: body.orderType || null,
        subtotal: 0,
        taxRate: 0.1,
        taxAmount: 0,
        totalAmount: 0,
        notes: body.notes || null,
        deliveryDeadline: body.deliveryDeadline
          ? new Date(body.deliveryDeadline)
          : null,
      },
    })

    for (let i = 0; i < items.length; i++) {
      const item = items[i] as {
        name: string
        specification?: string
        quantity: number
        unit: string
        unitPrice: number
        amount: number
        remarks?: string
      }
      await tx.purchaseOrderItem.create({
        data: {
          purchaseOrderId: newOrder.id,
          itemOrder: i + 1,
          name: item.name,
          specification: item.specification || null,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          amount: item.amount,
          remarks: item.remarks || null,
        },
      })
    }

    // Recalculate totals from created items
    const createdItems = await tx.purchaseOrderItem.findMany({
      where: { purchaseOrderId: newOrder.id },
    })
    const subtotal = createdItems.reduce((sum, item) => sum + item.amount, 0)
    const taxRate = 0.1
    const taxAmount = Math.floor(subtotal * taxRate)
    const totalAmount = subtotal + taxAmount

    return tx.purchaseOrder.update({
      where: { id: newOrder.id },
      data: { subtotal, taxAmount, totalAmount },
      include: {
        items: true,
        project: true,
        issuer: true,
        receiver: true,
      },
    })
  })

  return apiSuccess(order, 201)
}
