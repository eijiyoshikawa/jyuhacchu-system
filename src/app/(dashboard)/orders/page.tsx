import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { PageHeader } from "@/components/ui/page-header"
import { OrderStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { Pagination } from "@/components/ui/pagination"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"

const PAGE_SIZE = 20

const statusOptions = [
  { value: "", label: "全て" },
  { value: "DRAFT", label: "下書き" },
  { value: "PENDING_APPROVAL", label: "申請中" },
  { value: "APPROVED", label: "承認済" },
  { value: "ORDERED", label: "発注済" },
  { value: "INSPECTED", label: "検収完了" },
]

export default async function OrdersPage({ searchParams }: { searchParams: Promise<{ search?: string; status?: string; page?: string }> }) {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const params = await searchParams
  const search = params.search ?? ""
  const status = params.status ?? ""
  const page = Math.max(1, parseInt(params.page ?? "1", 10))

  const where: Prisma.PurchaseOrderWhereInput = {
    OR: [
      { issuerId: session.user.companyId },
      { receiverId: session.user.companyId },
    ],
    ...(status ? { status: status as Prisma.PurchaseOrderWhereInput["status"] } : {}),
    ...(search
      ? {
          AND: [
            {
              OR: [
                { orderNumber: { contains: search, mode: "insensitive" as const } },
                { subject: { contains: search, mode: "insensitive" as const } },
              ],
            },
          ],
        }
      : {}),
  }

  const [orders, totalCount] = await Promise.all([
    prisma.purchaseOrder.findMany({
      where,
      include: {
        project: true,
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.purchaseOrder.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <PageHeader
        title="発注管理"
        description="発注書の一覧を管理します"
        createHref="/orders/new"
        createLabel="新規作成"
      />

      <SearchFilterBar
        searchPlaceholder="発注番号・件名で検索"
        statusOptions={statusOptions}
        baseUrl="/orders"
      />

      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>発注番号</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead className="hidden md:table-cell">協力会社</TableHead>
              <TableHead className="hidden lg:table-cell">件名</TableHead>
              <TableHead className="text-right">金額</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="hidden md:table-cell">発注日</TableHead>
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
                  <TableCell className="hidden md:table-cell">{order.receiver.name}</TableCell>
                  <TableCell className="hidden lg:table-cell">{order.subject}</TableCell>
                  <TableCell className="text-right">{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.issuedAt ? formatDate(order.issuedAt) : formatDate(order.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl="/orders"
          searchParams={{ search, status }}
        />
      </div>
    </div>
  )
}
