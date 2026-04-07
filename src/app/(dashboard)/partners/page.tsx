import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function PartnersPage() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <PageHeader
        title="協力会社管理"
        description="取引先の会社情報を管理します"
        createHref="/partners/new"
        createLabel="新規登録"
      />

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>会社コード</TableHead>
              <TableHead>会社名</TableHead>
              <TableHead>種別</TableHead>
              <TableHead>電話番号</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>インボイス番号</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  会社が登録されていません
                </TableCell>
              </TableRow>
            ) : (
              companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <Link href={`/partners/${company.id}`} className="text-blue-600 hover:underline">
                      {company.code}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>
                    <Badge variant={company.companyType === "GENERAL_CONTRACTOR" ? "default" : "secondary"}>
                      {company.companyType === "GENERAL_CONTRACTOR" ? "元請" : "協力会社"}
                    </Badge>
                  </TableCell>
                  <TableCell>{company.phone || "-"}</TableCell>
                  <TableCell>{company.email || "-"}</TableCell>
                  <TableCell>{company.registrationNumber || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
