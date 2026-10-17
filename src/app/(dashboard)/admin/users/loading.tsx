import { ListPageSkeleton } from "@/components/ui/skeleton"

/** ユーザー管理 一覧（名前／メール／ロール／会社名／作成日）。 */
export default function AdminUsersLoading() {
  return <ListPageSkeleton columns={5} filter={false} />
}
