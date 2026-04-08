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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名前</TableHead>
              <TableHead>メール</TableHead>
              <TableHead>ロール</TableHead>
              <TableHead>会社名</TableHead>
              <TableHead>作成日</TableHead>
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
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{roleLabels[user.role] || user.role}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                  <TableCell className="text-gray-500">
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
