import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  FormFieldSkeleton,
  LoadingAnnouncement,
  Skeleton,
  TableSkeleton,
} from "@/components/ui/skeleton"

/** 取引先招待（発行フォーム＋発行済み招待一覧）。 */
export default function PartnerInviteLoading() {
  return (
    <div className="max-w-4xl space-y-6">
      <LoadingAnnouncement />
      <div>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-2 h-4 w-80 max-w-full" />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </div>
          <FormFieldSkeleton />
          <FormFieldSkeleton />
          <Skeleton className="h-10 w-36" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <TableSkeleton columns={7} rows={3} bare />
        </CardContent>
      </Card>
    </div>
  )
}
