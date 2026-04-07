import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json().catch(() => ({}))

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      approvalFlow: {
        include: { steps: { orderBy: { stepOrder: "asc" } } },
      },
    },
  })

  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (invoice.status !== "SUBMITTED") {
    return NextResponse.json({ error: "提出済の請求書のみ承認できます" }, { status: 400 })
  }

  const flow = invoice.approvalFlow
  if (!flow) return NextResponse.json({ error: "承認フローが見つかりません" }, { status: 400 })

  // Find the pending step for this approver
  const step = flow.steps.find(
    (s) => s.approverId === session.user.id && s.status === "PENDING"
  )
  if (!step) {
    return NextResponse.json({ error: "承認権限がありません" }, { status: 403 })
  }

  const result = await prisma.$transaction(async (tx) => {
    // Approve the step
    await tx.approvalStep.update({
      where: { id: step.id },
      data: {
        status: "APPROVED",
        comment: body.comment || null,
        decidedAt: new Date(),
      },
    })

    // Check if all steps are approved
    const pendingSteps = flow.steps.filter(
      (s) => s.id !== step.id && s.status === "PENDING"
    )

    if (pendingSteps.length === 0) {
      // All steps approved - update flow and invoice
      await tx.approvalFlow.update({
        where: { id: flow.id },
        data: { status: "APPROVED" },
      })
      return tx.invoice.update({
        where: { id },
        data: { status: "APPROVED" },
      })
    }

    return tx.invoice.findUnique({ where: { id } })
  })

  return NextResponse.json(result)
}
