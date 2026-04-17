import type { Metadata } from "next"
import { PricingDocument } from "../_components/pricing-document"

export const metadata: Metadata = {
  title: "価格説明資料｜受発注Lシステム｜IT導入補助金 申請書類",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 申請添付書類。受発注Lシステムの標準／最小販売価格、導入事例を記載。",
}

export default function PricingDocumentPage() {
  return <PricingDocument providerName="株式会社 受発注Lシステム" />
}
