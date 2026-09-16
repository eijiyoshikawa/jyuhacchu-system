import type { Metadata } from "next"
import { ClaudeRationaleDocument } from "../../../../../_components/claude-rationale-document"

export const metadata: Metadata = {
  title: "【TX.企画版】申請価格理由書｜Claude Team｜デジタル化・AI導入補助金2026 通常枠",
  robots: { index: false, follow: false },
}

export default function ClaudeRationaleTxPage() {
  return <ClaudeRationaleDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
