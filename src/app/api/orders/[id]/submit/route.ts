import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const order = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: { issuer: true },
  })

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (order.status !== "DRAFT") {
    return NextResponse.json(
      { error: "下書き状態の発注書のみ申請できます" },
      { status: 400 }
    )
  }

  // Find an ADMIN user from the same company to approve
  const approver = await prisma.user.findFirst({
    where: {
      companyId: session.user.companyId,
      role: "ADMIN",
      id: { not: session.user.id },
    },
  })

  if (!approver) {
    // If no other admin, allow self-approval by finding any admin
    const selfApprover = await prisma.user.findFirst({
      where: {
        companyId: session.user.companyId,
        role: "ADMIN",
      },
    })

    if (!selfApprover) {
      return NextResponse.json(
        { error: "承認者（管理者）が見つかりません" },
        { status: 400 }
      )
    }

    // Use self as approver if no other admin exists
    const updatedOrder = await prisma.$transaction(async (tx) => {
      await tx.purchaseOrder.update({
        where: { id },
        data: { status: "PENDING_APPROVAL" },
      })

      await tx.approvalFlow.create({
        data: {
          targetType: "ORDER",
          purchaseOrderId: id,
          status: "PENDING",
          requestedById: session.user.id,
          steps: {
            create: {
              stepOrder: 1,
              approverId: selfApprover.id,
              status: "PENDING",
            },
          },
        },
      })

      return tx.purchaseOrder.findUnique({
        where: { id },
        include: {
          approvalFlow: {
            include: { steps: { include: { approver: true } } },
          },
        },
      })
    })

    return NextResponse.json(updatedOrder)
  }

  const updatedOrder = await prisma.$transaction(async (tx) => {
    await tx.purchaseOrder.update({
      where: { id },
      data: { status: "PENDING_APPROVAL" },
    })

    await tx.approvalFlow.create({
      data: {
        targetType: "ORDER",
        purchaseOrderId: id,
        status: "PENDING",
        requestedById: session.user.id,
        steps: {
          create: {
            stepOrder: 1,
            approverId: approver.id,
            status: "PENDING",
          },
        },
      },
    })

    return tx.purchaseOrder.findUnique({
      where: { id },
      include: {
        approvalFlow: {
          include: { steps: { include: { approver: true } } },
        },
      },
    })
  })

  return NextResponse.json(updatedOrder)
}
