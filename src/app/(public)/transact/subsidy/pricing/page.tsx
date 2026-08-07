import type { Metadata } from "next"
import { TransactPricingDocument } from "../_components/transact-pricing-document"

export const metadata: Metadata = {
  title: "価格説明資料｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 の申請添付書類。電子取引Lシステムの標準価格・最小価格および導入事例。",
}

export default function TransactPricingPage() {
  return <TransactPricingDocument providerName="株式会社LET" />
}
