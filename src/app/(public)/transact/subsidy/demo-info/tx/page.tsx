import type { Metadata } from "next"
import { TransactDemoInfoDocument } from "../../_components/transact-demo-info-document"

export const metadata: Metadata = {
  title: "【TX.企画版】デモ機・テストアカウント情報｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引Lシステムのデモ環境URL、テストアカウント情報、招待受諾フローの確認手順を記載。",
}

export default function TransactDemoInfoTxPage() {
  return <TransactDemoInfoDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
