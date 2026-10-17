import {
  FormFieldSkeleton,
  LoadingAnnouncement,
  PageHeaderSkeleton,
  Skeleton,
  TableSkeleton,
} from "@/components/ui/skeleton"

/** 電子取引アーカイブ（見出し＋検索条件6欄＋結果テーブル7列）。 */
export default function ArchiveLoading() {
  return (
    <div className="space-y-6 py-6">
      <LoadingAnnouncement />
      <PageHeaderSkeleton action={false} />
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <Skeleton className="mb-3 h-3 w-40" />
        <div className="grid gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <FormFieldSkeleton key={i} />
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-9 w-16" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-2">
          <Skeleton className="h-3 w-40" />
        </div>
        <TableSkeleton columns={7} rows={8} bare />
      </div>
    </div>
  )
}
