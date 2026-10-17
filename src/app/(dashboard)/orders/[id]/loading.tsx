import { DetailPageSkeleton } from "@/components/ui/skeleton"

/** 発注書詳細（見出し＋ステータスタイムライン＋発注情報＋明細）。 */
export default function OrderDetailLoading() {
  return <DetailPageSkeleton fields={8} itemColumns={5} className="max-w-5xl" />
}
