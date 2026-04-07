import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const invoice = await prisma.invoice.findUnique({ where: { id } })
  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (invoice.status !== "DRAFT") {
    return NextResponse.json({ error: "下書き状態の請求書のみ提出できます" }, { status: 400 })
  }

  // Find approvers (ADMIN or CONTRACTOR users from the receiver company)
  const approvers = await prisma.user.findMany({
    where: {
      companyId: invoice.receiverId,
      role: { in: ["ADMIN", "CONTRACTOR"] },
    },
    orderBy: { createdAt: "asc" },
    take: 1,
  })

  // Update invoice status and create approval flow in a transaction
  const result = await prisma.$transaction(async (tx) => {
    const updatedInvoice = await tx.invoice.update({
      where: { id },
      data: { status: "SUBMITTED" },
    })

    const approvalFlow = await tx.approvalFlow.create({
      data: {
        targetType: "INVOICE",
        invoiceId: id,
        requestedById: session.user.id,
        steps: {
          create: approvers.map((approver, index) => ({
            stepOrder: index + 1,
            approverId: approver.id,
          })),
        },
      },
      include: {
        steps: { include: { approver: true } },
      },
    })

    return { invoice: updatedInvoice, approvalFlow }
  })

  return NextResponse.json(result)
}
