import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { checkConstructionLawCompliance, checkElectronicBookCompliance } from "@/lib/compliance-check"

export async function GET(
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
      project: true,
      issuer: true,
      receiver: true,
    },
  })

  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const constructionLaw = checkConstructionLawCompliance({
    subject: order.subject,
    constructionName: order.constructionName,
    constructionSite: order.constructionSite,
    constructionPeriodStart: order.constructionPeriodStart,
    constructionPeriodEnd: order.constructionPeriodEnd,
    totalAmount: order.totalAmount,
    paymentTerms: order.paymentTerms,
    issuedAt: order.issuedAt,
    items: order.items,
  })

  const electronicBook = checkElectronicBookCompliance({
    confirmedAt: order.confirmedAt,
    confirmedHash: order.confirmedHash,
    createdAt: order.createdAt,
  })

  return NextResponse.json({
    order,
    compliance: {
      constructionLaw: {
        label: "取引契約 必要記載事項",
        ...constructionLaw,
      },
      electronicBook: {
        label: "電子帳簿保存法",
        ...electronicBook,
      },
    },
  })
}
