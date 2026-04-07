import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/auth-helpers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderStatusBadge, InvoiceStatusBadge } from "@/components/ui/status-badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { FileText, Receipt, ClipboardCheck, TrendingUp } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getSession()
  const companyId = session.user.companyId

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [orderCount, invoiceCount, pendingApprovals, recentOrders, recentInvoices, monthlyTotal] = await Promise.all([
    prisma.purchaseOrder.count({
      where: {
        OR: [{ issuerId: companyId }, { receiverId: companyId }],
      },
    }),
    prisma.invoice.count({
      where: {
        OR: [{ issuerId: companyId }, { receiverId: companyId }],
      },
    }),
    prisma.approvalStep.count({
      where: { approverId: session.user.id, status: "PENDING" },
    }),
    prisma.purchaseOrder.findMany({
      where: {
        OR: [{ issuerId: companyId }, { receiverId: companyId }],
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { project: true, receiver: true },
    }),
    prisma.invoice.findMany({
      where: {
        OR: [{ issuerId: companyId }, { receiverId: companyId }],
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { project: true, issuer: true, receiver: true },
    }),
    prisma.purchaseOrder.aggregate({
      _sum: { totalAmount: true },
      where: {
        issuerId: companyId,
        createdAt: { gte: startOfMonth },
      },
    }),
  ])

  const summaryCards = [
    { title: "発注件数", value: `${orderCount}件`, icon: FileText, color: "text-blue-600" },
    { title: "請求件数", value: `${invoiceCount}件`, icon: Receipt, color: "text-green-600" },
    { title: "承認待ち件数", value: `${pendingApprovals}件`, icon: ClipboardCheck, color: "text-yellow-600" },
    { title: "今月の発注金額", value: formatCurrency(monthlyTotal._sum.totalAmount ?? 0), icon: TrendingUp, color: "text-indigo-600" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            最近の発注
            <Link href="/orders" className="text-sm font-normal text-blue-600 hover:underline">
              すべて表示
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>発注番号</TableHead>
                <TableHead>案件名</TableHead>
                <TableHead>発注先</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>作成日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-4">
                    発注データがありません
                  </TableCell>
                </TableRow>
              ) : (
                recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{order.project.name}</TableCell>
                    <TableCell>{order.receiver.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(order.totalAmount)}</TableCell>
                    <TableCell>
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            最近の請求
            <Link href="/invoices" className="text-sm font-normal text-blue-600 hover:underline">
              すべて表示
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>請求番号</TableHead>
                <TableHead>案件名</TableHead>
                <TableHead>請求元</TableHead>
                <TableHead>請求先</TableHead>
                <TableHead className="text-right">金額</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>作成日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-4">
                    請求データがありません
                  </TableCell>
                </TableRow>
              ) : (
                recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Link href={`/invoices/${invoice.id}`} className="text-blue-600 hover:underline">
                        {invoice.invoiceNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{invoice.project.name}</TableCell>
                    <TableCell>{invoice.issuer.name}</TableCell>
                    <TableCell>{invoice.receiver.name}</TableCell>
                    <TableCell className="text-right">{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell>{formatDate(invoice.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
