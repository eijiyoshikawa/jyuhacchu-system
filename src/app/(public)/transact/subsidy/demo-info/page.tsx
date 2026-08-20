import type { Metadata } from "next"
import { TransactDemoInfoDocument } from "../_components/transact-demo-info-document"

export const metadata: Metadata = {
  title: "デモ機・テストアカウント情報｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引くんのデモ環境URL、テストアカウント情報、招待受諾フローの確認手順を記載。",
}

export default function TransactDemoInfoPage() {
  return <TransactDemoInfoDocument providerName="株式会社LET" />
}
