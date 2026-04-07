import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectStatusBadge } from "@/components/ui/status-badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const session = await auth()
  if (!session) redirect("/auth/login")

  const projects = await prisma.project.findMany({
    where: { companyId: session.user.companyId },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div>
      <PageHeader
        title="案件管理"
        description="工事案件の一覧を管理します"
        createHref="/projects/new"
        createLabel="新規作成"
      />

      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>案件コード</TableHead>
              <TableHead>案件名</TableHead>
              <TableHead>ステータス</TableHead>
              <TableHead>現場住所</TableHead>
              <TableHead>着工日</TableHead>
              <TableHead>完工予定日</TableHead>
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
                  <TableCell>{project.address || "-"}</TableCell>
                  <TableCell>{project.startDate ? formatDate(project.startDate) : "-"}</TableCell>
                  <TableCell>{project.endDate ? formatDate(project.endDate) : "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
