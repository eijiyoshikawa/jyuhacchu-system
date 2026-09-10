import type { Metadata } from "next"
import { ClaudeFeatureDocument } from "../../../../_components/claude-feature-document"

export const metadata: Metadata = {
  title: "【TX.企画版】機能説明資料｜Claude Team｜デジタル化・AI導入補助金2026 通常枠",
  robots: { index: false, follow: false },
}

export default function ClaudeFeatureTxPage() {
  return <ClaudeFeatureDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
