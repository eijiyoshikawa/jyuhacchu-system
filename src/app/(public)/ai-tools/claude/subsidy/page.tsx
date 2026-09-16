import type { Metadata } from "next"
import { ClaudeSubsidyIndex } from "../../_components/claude-subsidy-index"

export const metadata: Metadata = {
  title: "申請資料｜Claude Team｜デジタル化・AI導入補助金2026 通常枠",
  robots: { index: false, follow: false },
}

export default function ClaudeSubsidyIndexPage() {
  return <ClaudeSubsidyIndex providerName="株式会社LET" />
}
