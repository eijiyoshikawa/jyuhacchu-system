import type { Metadata } from "next"
import { ClaudePricingDocument } from "../../../../_components/claude-pricing-document"

export const metadata: Metadata = {
  title: "【TX.企画版】価格説明資料｜Claude Team｜デジタル化・AI導入補助金2026 通常枠",
  robots: { index: false, follow: false },
}

export default function ClaudePricingTxPage() {
  return <ClaudePricingDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
