import { DetailPageSkeleton } from "@/components/ui/skeleton"

/** 請求書詳細（見出し＋請求情報＋明細）。 */
export default function InvoiceDetailLoading() {
  return <DetailPageSkeleton fields={8} itemColumns={5} timeline={false} className="max-w-4xl" />
}
