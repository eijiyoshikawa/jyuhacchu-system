import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth-helpers"
import { PageHeader } from "@/components/ui/page-header"
import { InvoiceStatusBadge, OrderStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

export default async function ApprovalsPage() {
  const session = await getSession()

  const pendingSteps = await prisma.approvalStep.findMany({
    where: {
      approverId: session.user.id,
      status: "PENDING",
    },
    include: {
      approvalFlow: {
        include: {
          purchaseOrder: {
            include: {
              project: true,
              issuer: true,
              receiver: true,
            },
          },
          invoice: {
            include: {
              project: true,
              issuer: true,
              receiver: true,
            },
          },
          requestedBy: true,
        },
      },
      approver: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <PageHeader
        title="承認待ち"
        description="あなたの承認を待っている申請一覧です"
      />

      <div className="rounded-sm border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>種別</TableHead>
              <TableHead>番号</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead>件名</TableHead>
              <TableHead>申請者</TableHead>
              <TableHead className="text-right">金額</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>申請日</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingSteps.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                  承認待ちの申請はありません
                </TableCell>
              </TableRow>
            ) : (
              pendingSteps.map((step) => {
                const flow = step.approvalFlow
                const isOrder = flow.targetType === "ORDER"
                const order = flow.purchaseOrder
                const invoice = flow.invoice

                return (
                  <TableRow key={step.id}>
                    <TableCell>
                      {isOrder ? "発注" : "請求"}
                    </TableCell>
                    <TableCell>
                      {isOrder && order ? (
                        <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                          {order.orderNumber}
                        </Link>
                      ) : invoice ? (
                        <Link href={`/invoices/${invoice.id}`} className="text-blue-600 hover:underline">
                          {invoice.invoiceNumber}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {isOrder ? order?.project.name : invoice?.project.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {isOrder ? order?.subject : invoice?.subject}
                    </TableCell>
                    <TableCell>{flow.requestedBy.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        isOrder ? (order?.totalAmount ?? 0) : (invoice?.totalAmount ?? 0)
                      )}
                    </TableCell>
                    <TableCell>
                      {isOrder && order ? (
                        <OrderStatusBadge status={order.status} />
                      ) : invoice ? (
                        <InvoiceStatusBadge status={invoice.status} />
                      ) : null}
                    </TableCell>
                    <TableCell>{formatDate(step.createdAt)}</TableCell>
                    <TableCell>
                      {isOrder && order ? (
                        <Link
                          href={`/orders/${order.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          詳細
                        </Link>
                      ) : invoice ? (
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          詳細
                        </Link>
                      ) : null}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
