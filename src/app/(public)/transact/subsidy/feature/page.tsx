import type { Metadata } from "next"
import { TransactFeatureDocument } from "../_components/transact-feature-document"

export const metadata: Metadata = {
  title: "機能説明資料｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引Lシステムの機能詳細（招待型・両社間電子取引・電子帳簿保存法対応）。",
}

export default function TransactFeaturePage() {
  return <TransactFeatureDocument providerName="株式会社LET" />
}
