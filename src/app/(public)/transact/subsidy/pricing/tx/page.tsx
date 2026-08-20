import type { Metadata } from "next"
import { TransactPricingDocument } from "../../_components/transact-pricing-document"

export const metadata: Metadata = {
  title: "【TX.企画版】価格説明資料｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 の申請添付書類。電子取引くんの料金表・標準価格・最小価格および導入事例。",
}

export default function TransactPricingTxPage() {
  return <TransactPricingDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
