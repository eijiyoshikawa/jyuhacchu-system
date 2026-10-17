import {
  LoadingAnnouncement,
  PageHeaderSkeleton,
  Skeleton,
  TableSkeleton,
} from "@/components/ui/skeleton"

/** アカウント利用状況（見出し＋消化状況カード3枚＋6列テーブル）。 */
export default function PartnerAccountsLoading() {
  return (
    <div className="space-y-6 py-6">
      <LoadingAnnouncement />
      <PageHeaderSkeleton action={false} />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="mt-2 h-9 w-16" />
            {i === 2 && <Skeleton className="mt-3 h-2 w-full rounded-full" />}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-2">
          <Skeleton className="h-3 w-48" />
        </div>
        <TableSkeleton columns={6} rows={6} bare />
      </div>
    </div>
  )
}
