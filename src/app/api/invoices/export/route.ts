import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Only ADMIN or CONTRACTOR can export
  if (!["ADMIN", "CONTRACTOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 })
  }

  const searchParams = req.nextUrl.searchParams
  const status = searchParams.get("status")
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  // Build filter
  const where: Record<string, unknown> = {}

  if (status) {
    where.status = status
  } else {
    where.status = { in: ["APPROVED", "PAID"] }
  }

  if (from || to) {
    where.createdAt = {}
    if (from) {
      (where.createdAt as Record<string, unknown>).gte = new Date(from)
    }
    if (to) {
      (where.createdAt as Record<string, unknown>).lte = new Date(to + "T23:59:59.999Z")
    }
  }

  // Scope to user's company unless ADMIN
  if (session.user.role !== "ADMIN") {
    where.OR = [
      { issuerId: session.user.companyId },
      { receiverId: session.user.companyId },
    ]
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      issuer: true,
      project: true,
    },
    orderBy: { createdAt: "desc" },
  })

  // Build CSV
  const headers = [
    "請求番号",
    "請求日",
    "請求元会社名",
    "件名",
    "小計",
    "消費税",
    "合計金額",
    "支払期限",
    "ステータス",
  ]

  const statusLabels: Record<string, string> = {
    DRAFT: "下書き",
    SUBMITTED: "提出済",
    APPROVED: "承認済",
    REJECTED: "却下",
    PAID: "支払済",
  }

  const formatDateCSV = (date: Date | string | null): string => {
    if (!date) return ""
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(date))
  }

  const rows = invoices.map((inv) => [
    inv.invoiceNumber,
    formatDateCSV(inv.createdAt),
    inv.issuer.name,
    inv.subject,
    inv.subtotal.toString(),
    inv.taxAmount.toString(),
    inv.totalAmount.toString(),
    formatDateCSV(inv.dueDate),
    statusLabels[inv.status] || inv.status,
  ])

  // Escape CSV values
  const escapeCSV = (value: string): string => {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`
    }
    return value
  }

  const csvContent =
    "\uFEFF" +
    headers.map(escapeCSV).join(",") +
    "\n" +
    rows.map((row) => row.map(escapeCSV).join(",")).join("\n")

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "")

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="invoices_${today}.csv"`,
    },
  })
}
