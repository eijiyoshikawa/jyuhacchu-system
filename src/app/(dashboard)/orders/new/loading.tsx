import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  FormFieldSkeleton,
  ItemsCardSkeleton,
  LoadingAnnouncement,
  Skeleton,
} from "@/components/ui/skeleton"

/** 発注書新規作成（基本情報カード＋明細カード＋登録ボタン）。 */
export default function OrderNewLoading() {
  return (
    <div className="max-w-5xl">
      <LoadingAnnouncement />
      <Skeleton className="mb-6 h-7 w-44" />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-20" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
              </div>
            ))}
            <FormFieldSkeleton />
          </CardContent>
        </Card>
        <ItemsCardSkeleton columns={6} rows={2} />
        <div className="flex justify-end gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
}
