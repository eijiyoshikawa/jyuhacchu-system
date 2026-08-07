import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { Pagination } from "@/components/ui/pagination"
import Link from "next/link"
import { Prisma } from "@prisma/client"

const PAGE_SIZE = 20

const typeOptions = [
  { value: "", label: "全て" },
  { value: "GENERAL_CONTRACTOR", label: "発注企業" },
  { value: "SUBCONTRACTOR", label: "受注企業" },
]

export default async function PartnersPage({ searchParams }: { searchParams: Promise<{ search?: string; status?: string; page?: string }> }) {
  const params = await searchParams
  const search = params.search ?? ""
  const type = params.status ?? ""
  const page = Math.max(1, parseInt(params.page ?? "1", 10))

  const where: Prisma.CompanyWhereInput = {
    ...(type ? { companyType: type as Prisma.CompanyWhereInput["companyType"] } : {}),
    ...(search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { code: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  }

  const [companies, totalCount] = await Promise.all([
    prisma.company.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.company.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <PageHeader
        title="取引先管理"
        description="取引先の会社情報を管理します"
        createHref="/partners/new"
        createLabel="新規登録"
      />

      <SearchFilterBar
        searchPlaceholder="会社名・会社コードで検索"
        statusOptions={typeOptions}
        baseUrl="/partners"
      />

      <div className="overflow-x-auto rounded-sm border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>会社コード</TableHead>
              <TableHead>会社名</TableHead>
              <TableHead>種別</TableHead>
              <TableHead className="hidden md:table-cell">電話番号</TableHead>
              <TableHead className="hidden md:table-cell">メール</TableHead>
              <TableHead className="hidden lg:table-cell">インボイス番号</TableHead>
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
                      {company.companyType === "GENERAL_CONTRACTOR" ? "発注企業" : "受注企業"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{company.phone || "-"}</TableCell>
                  <TableCell className="hidden md:table-cell">{company.email || "-"}</TableCell>
                  <TableCell className="hidden lg:table-cell">{company.registrationNumber || "-"}</TableCell>
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
          baseUrl="/partners"
          searchParams={{ search, status: type }}
        />
      </div>
    </div>
  )
}
