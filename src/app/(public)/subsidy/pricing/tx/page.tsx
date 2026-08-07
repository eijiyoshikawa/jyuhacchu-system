import type { Metadata } from "next"
import { PricingDocument } from "../../_components/pricing-document"

export const metadata: Metadata = {
  title: "価格説明資料（TX.企画版）｜受発注Lシステム｜IT導入補助金 申請書類",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 申請添付書類（株式会社TX.企画 申請用）。受発注Lシステムの標準／最小販売価格、導入事例を記載。",
}

export default function PricingDocumentTxPage() {
  return <PricingDocument providerName="株式会社TX.企画" />
}
