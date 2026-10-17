import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  LoadingAnnouncement,
  Skeleton,
  StatCardsSkeleton,
  TableSkeleton,
} from "@/components/ui/skeleton"

/** ダッシュボード（サマリーカード4枚＋最近の発注・請求の2テーブル）。 */
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <LoadingAnnouncement />
      <Skeleton className="h-8 w-48" />
      <StatCardsSkeleton count={4} />
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </CardHeader>
          <CardContent>
            <TableSkeleton columns={5} rows={5} bare />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
