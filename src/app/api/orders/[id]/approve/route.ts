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
    include: {
      approvalFlow: {
        include: {
          steps: { orderBy: { stepOrder: "asc" } },
        },
      },
    },
  })

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (order.status !== "PENDING_APPROVAL") {
    return NextResponse.json(
      { error: "申請中の発注書のみ承認できます" },
      { status: 400 }
    )
  }

  if (!order.approvalFlow) {
    return NextResponse.json(
      { error: "承認フローが見つかりません" },
      { status: 400 }
    )
  }

  // Find the current pending step assigned to this user
  const currentStep = order.approvalFlow.steps.find(
    (step) => step.approverId === session.user.id && step.status === "PENDING"
  )

  if (!currentStep) {
    return NextResponse.json(
      { error: "承認権限がありません" },
      { status: 403 }
    )
  }

  const body = await req.json().catch(() => ({}))

  const updatedOrder = await prisma.$transaction(async (tx) => {
    // Approve the current step
    await tx.approvalStep.update({
      where: { id: currentStep.id },
      data: {
        status: "APPROVED",
        comment: body.comment || null,
        decidedAt: new Date(),
      },
    })

    // Check if all steps are now approved
    const remainingPending = await tx.approvalStep.count({
      where: {
        approvalFlowId: order.approvalFlow!.id,
        status: "PENDING",
        id: { not: currentStep.id },
      },
    })

    if (remainingPending === 0) {
      // All steps approved
      await tx.approvalFlow.update({
        where: { id: order.approvalFlow!.id },
        data: { status: "APPROVED" },
      })

      await tx.purchaseOrder.update({
        where: { id },
        data: { status: "APPROVED" },
      })
    }

    return tx.purchaseOrder.findUnique({
      where: { id },
      include: {
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
  })

  return NextResponse.json(updatedOrder)
}
