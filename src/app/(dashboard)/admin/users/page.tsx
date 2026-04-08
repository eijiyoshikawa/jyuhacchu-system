import { prisma } from "@/lib/prisma"
import { requireRole, roleLabels } from "@/lib/auth-helpers"
import { formatDate } from "@/lib/utils"
import { PageHeader } from "@/components/ui/page-header"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import Link from "next/link"

export default async function UsersPage() {
  await requireRole(["ADMIN"])

  const users = await prisma.user.findMany({
    include: { company: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="ユーザー管理"
        description="システムのユーザーを管理します"
        createHref="/admin/users/new"
        createLabel="ユーザー追加"
      />

      <div className="overflow-x-auto rounded-sm border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead className="hidden sm:table-cell">メール</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead className="hidden md:table-cell">会社名</TableHead>
              <TableHead className="hidden lg:table-cell">作成日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  ユーザーはありません
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                  <TableCell>{roleLabels[user.role] || user.role}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.company.name}</TableCell>
                  <TableCell className="hidden lg:table-cell text-gray-500">
                    {formatDate(user.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
