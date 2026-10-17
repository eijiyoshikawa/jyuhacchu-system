import { ListPageSkeleton } from "@/components/ui/skeleton"

/** 発注管理 一覧（発注番号／案件名／取引先／件名／金額／ステータス／発注日）。 */
export default function OrdersLoading() {
  return <ListPageSkeleton columns={7} />
}
