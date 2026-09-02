import type { Metadata } from "next"
import { TransactPriceListDocument } from "../../_components/transact-price-list-document"

export const metadata: Metadata = {
  title: "【TX.企画版】料金表（別添）｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類（別添）。電子取引くんのプラン一覧・価格・プラン別上限。",
}

export default function TransactPriceListTxPage() {
  return <TransactPriceListDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
