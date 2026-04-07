import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { PageHeader } from "@/components/ui/page-header"
import { OrderStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const orders = await prisma.purchaseOrder.findMany({
    where: {
      OR: [
        { issuerId: session.user.companyId },
        { receiverId: session.user.companyId },
      ],
    },
    include: {
      project: true,
      receiver: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <PageHeader
        title="発注管理"
        description="発注書の一覧を管理します"
        createHref="/orders/new"
        createLabel="新規作成"
      />

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>発注番号</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead>協力会社</TableHead>
              <TableHead>件名</TableHead>
              <TableHead className="text-right">金額</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>発注日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  発注書が登録されていません
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">{order.project.name}</TableCell>
                  <TableCell>{order.receiver.name}</TableCell>
                  <TableCell>{order.subject}</TableCell>
                  <TableCell className="text-right">{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>{order.issuedAt ? formatDate(order.issuedAt) : formatDate(order.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
