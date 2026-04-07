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
  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      items: { orderBy: { itemOrder: "asc" } },
    },
  })

  if (!invoice) return NextResponse.json({ error: "Not found" }, { status: 404 })

  if (invoice.confirmedAt) {
    return NextResponse.json(
      { error: "この請求書は既に確定済みです" },
      { status: 400 }
    )
  }

  if (invoice.status !== "APPROVED") {
    return NextResponse.json(
      { error: "承認済の請求書のみ確定できます" },
      { status: 400 }
    )
  }

  // Generate hash from invoice data for tamper detection
  const hashData: Record<string, unknown> = {
    invoiceNumber: invoice.invoiceNumber,
    subject: invoice.subject,
    items: invoice.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      amount: item.amount,
    })),
    subtotal: invoice.subtotal,
    taxRate: invoice.taxRate,
    taxAmount: invoice.taxAmount,
    totalAmount: invoice.totalAmount,
    dueDate: invoice.dueDate?.toISOString() ?? null,
  }

  const confirmedAt = new Date()
  const confirmedHash = generateDocumentHash(hashData)

  const updatedInvoice = await prisma.invoice.update({
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
    message: "請求書を確定しました",
    confirmedAt: updatedInvoice.confirmedAt,
    confirmedHash: updatedInvoice.confirmedHash,
    invoice: updatedInvoice,
  })
}
