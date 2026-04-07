import { prisma } from "@/lib/prisma"
import { requireRole } from "@/lib/auth-helpers"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

const actionLabels: Record<string, string> = {
  CREATE: "作成",
  UPDATE: "更新",
  DELETE: "削除",
  STATUS_CHANGE: "ステータス変更",
  LOGIN: "ログイン",
  LOGOUT: "ログアウト",
}

const targetTypeLabels: Record<string, string> = {
  COMPANY: "会社",
  PROJECT: "案件",
  ORDER: "発注",
  INVOICE: "請求",
  USER: "ユーザー",
}

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  await requireRole(["ADMIN"])

  const params = await searchParams
  const page = Math.max(1, parseInt(params.page || "1"))
  const limit = 20
  const skip = (page - 1) * limit

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.auditLog.count(),
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">監査ログ</h1>

      <div className="rounded-md border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-gray-500">日時</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">ユーザー</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">操作</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">対象</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">詳細</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  監査ログはありません
                </td>
              </tr>
            ) : (
              logs.map((log) => {
                let details = ""
                if (log.details) {
                  try {
                    const parsed = JSON.parse(log.details)
                    details = Object.entries(parsed)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(", ")
                  } catch {
                    details = log.details
                  }
                }

                return (
                  <tr key={log.id} className="border-b">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="px-4 py-3">{log.userName}</td>
                    <td className="px-4 py-3">
                      {actionLabels[log.action] || log.action}
                    </td>
                    <td className="px-4 py-3">
                      {targetTypeLabels[log.targetType] || log.targetType}
                      {log.targetId && (
                        <span className="ml-1 text-gray-400 text-xs">
                          ({log.targetId.slice(0, 8)})
                        </span>
                      )}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-500 text-xs">
                      {details}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 ? (
            <Link
              href={`/admin/audit-logs?page=${page - 1}`}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              前へ
            </Link>
          ) : (
            <span className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium opacity-50">
              前へ
            </span>
          )}

          <span className="px-3 text-sm text-gray-600">
            {page} / {totalPages}
          </span>

          {page < totalPages ? (
            <Link
              href={`/admin/audit-logs?page=${page + 1}`}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              次へ
            </Link>
          ) : (
            <span className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium opacity-50">
              次へ
            </span>
          )}
        </div>
      )}
    </div>
  )
}
