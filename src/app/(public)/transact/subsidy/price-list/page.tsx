import type { Metadata } from "next"
import { TransactPriceListDocument } from "../_components/transact-price-list-document"

export const metadata: Metadata = {
  title: "料金表（別添）｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類（別添）。電子取引くんのプラン一覧・価格・プラン別上限。",
}

export default function TransactPriceListPage() {
  return <TransactPriceListDocument providerName="株式会社LET" />
}
