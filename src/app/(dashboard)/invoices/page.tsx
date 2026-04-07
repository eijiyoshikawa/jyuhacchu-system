import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { PageHeader } from "@/components/ui/page-header"
import { InvoiceStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function InvoicesPage() {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const invoices = await prisma.invoice.findMany({
    where: {
      OR: [
        { issuerId: session.user.companyId },
        { receiverId: session.user.companyId },
      ],
    },
    include: {
      project: true,
      issuer: true,
      receiver: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <PageHeader
        title="請求管理"
        description="請求書の一覧を管理します"
        createHref="/invoices/new"
        createLabel="新規作成"
      />

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>請求番号</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead>請求元</TableHead>
              <TableHead>請求先</TableHead>
              <TableHead>件名</TableHead>
              <TableHead className="text-right">金額</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>支払期限</TableHead>
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
                  <TableCell>{invoice.issuer.name}</TableCell>
                  <TableCell>{invoice.receiver.name}</TableCell>
                  <TableCell className="font-medium">{invoice.subject}</TableCell>
                  <TableCell className="text-right">{formatCurrency(invoice.totalAmount)}</TableCell>
                  <TableCell>
                    <InvoiceStatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell>{invoice.dueDate ? formatDate(invoice.dueDate) : "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
