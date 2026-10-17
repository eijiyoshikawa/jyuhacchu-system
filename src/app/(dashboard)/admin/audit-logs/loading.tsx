import { LoadingAnnouncement, Skeleton, TableSkeleton } from "@/components/ui/skeleton"

/** 監査ログ（見出し＋5列テーブル＋前へ/次へ）。 */
export default function AuditLogsLoading() {
  return (
    <div className="space-y-6">
      <LoadingAnnouncement />
      <Skeleton className="h-7 w-28" />
      <TableSkeleton columns={5} rows={10} />
      <div className="flex items-center justify-center gap-2">
        <Skeleton className="h-9 w-14" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-14" />
      </div>
    </div>
  )
}
