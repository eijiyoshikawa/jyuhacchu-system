import { ListPageSkeleton } from "@/components/ui/skeleton"

/** 承認待ち 一覧（種別〜操作の9列・検索バーなし・新規作成ボタンなし）。 */
export default function ApprovalsLoading() {
  return <ListPageSkeleton columns={9} filter={false} action={false} />
}
