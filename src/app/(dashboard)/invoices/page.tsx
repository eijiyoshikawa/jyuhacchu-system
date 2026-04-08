import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { InvoiceStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { Pagination } from "@/components/ui/pagination"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"
import { Download, Plus } from "lucide-react"

const PAGE_SIZE = 20

const statusOptions = [
  { value: "", label: "全て" },
  { value: "DRAFT", label: "下書き" },
  { value: "SUBMITTED", label: "提出済" },
  { value: "APPROVED", label: "承認済" },
  { value: "REJECTED", label: "却下" },
  { value: "PAID", label: "支払済" },
]

export default async function InvoicesPage({ searchParams }: { searchParams: Promise<{ search?: string; status?: string; page?: string }> }) {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const params = await searchParams
  const search = params.search ?? ""
  const status = params.status ?? ""
  const page = Math.max(1, parseInt(params.page ?? "1", 10))

  const where: Prisma.InvoiceWhereInput = {
    OR: [
      { issuerId: session.user.companyId },
      { receiverId: session.user.companyId },
    ],
    ...(status ? { status: status as Prisma.InvoiceWhereInput["status"] } : {}),
    ...(search
      ? {
          AND: [
            {
              OR: [
                { invoiceNumber: { contains: search, mode: "insensitive" as const } },
                { subject: { contains: search, mode: "insensitive" as const } },
              ],
            },
          ],
        }
      : {}),
  }

  const [invoices, totalCount] = await Promise.all([
    prisma.invoice.findMany({
      where,
      include: {
        project: true,
        issuer: true,
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.invoice.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">請求管理</h1>
          <p className="mt-1 text-sm text-muted-foreground">請求書の一覧を管理します</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/api/invoices/export?status=APPROVED">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              CSV出力
            </Button>
          </Link>
          <Link href="/invoices/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新規作成
            </Button>
          </Link>
        </div>
      </div>

      <SearchFilterBar
        searchPlaceholder="請求番号・件名で検索"
        statusOptions={statusOptions}
        baseUrl="/invoices"
      />

      <div className="overflow-x-auto rounded-sm border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>請求番号</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead className="hidden md:table-cell">請求元</TableHead>
              <TableHead className="hidden lg:table-cell">請求先</TableHead>
              <TableHead className="hidden lg:table-cell">件名</TableHead>
              <TableHead className="text-right">金額</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="hidden md:table-cell">支払期限</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  請求書が登録されていません
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Link href={`/invoices/${invoice.id}`} className="text-blue-600 hover:underline">
                      {invoice.invoiceNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.project.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{invoice.issuer.name}</TableCell>
                  <TableCell className="hidden lg:table-cell">{invoice.receiver.name}</TableCell>
                  <TableCell className="hidden lg:table-cell font-medium">{invoice.subject}</TableCell>
                  <TableCell className="text-right">{formatCurrency(invoice.totalAmount)}</TableCell>
                  <TableCell>
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{invoice.dueDate ? formatDate(invoice.dueDate) : "-"}</TableCell>
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
          baseUrl="/invoices"
          searchParams={{ search, status }}
        />
      </div>
    </div>
  )
}
