import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { Pagination } from "@/components/ui/pagination"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Prisma } from "@prisma/client"

const PAGE_SIZE = 20

const statusOptions = [
  { value: "", label: "全て" },
  { value: "IN_PROGRESS", label: "進行中" },
  { value: "COMPLETED", label: "完了" },
  { value: "CANCELLED", label: "中止" },
]

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ search?: string; status?: string; page?: string }> }) {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const params = await searchParams
  const search = params.search ?? ""
  const status = params.status ?? ""
  const page = Math.max(1, parseInt(params.page ?? "1", 10))

  const where: Prisma.ProjectWhereInput = {
    companyId: session.user.companyId,
    ...(status ? { status: status as Prisma.ProjectWhereInput["status"] } : {}),
    ...(search
      ? {
          name: { contains: search, mode: "insensitive" as const },
        }
      : {}),
  }

  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.project.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  return (
    <div>
      <PageHeader
        title="案件管理"
        description="取引案件の一覧を管理します"
        createHref="/projects/new"
        createLabel="新規作成"
      />

      <SearchFilterBar
        searchPlaceholder="案件名で検索"
        statusOptions={statusOptions}
        baseUrl="/projects"
      />

      <div className="overflow-x-auto rounded-sm border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>案件コード</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead className="hidden md:table-cell">納入先 / 作業場所</TableHead>
              <TableHead className="hidden lg:table-cell">開始日</TableHead>
              <TableHead className="hidden lg:table-cell">完了予定日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  案件が登録されていません
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <Link href={`/projects/${project.id}`} className="text-blue-600 hover:underline">
                      {project.projectCode}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <ProjectStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{project.address || "-"}</TableCell>
                  <TableCell className="hidden lg:table-cell">{project.startDate ? formatDate(project.startDate) : "-"}</TableCell>
                  <TableCell className="hidden lg:table-cell">{project.endDate ? formatDate(project.endDate) : "-"}</TableCell>
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
          baseUrl="/projects"
          searchParams={{ search, status }}
        />
      </div>
    </div>
  )
}
