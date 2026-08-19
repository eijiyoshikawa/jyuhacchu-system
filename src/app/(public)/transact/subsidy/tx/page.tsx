import type { Metadata } from "next"
import { TransactSubsidyIndex } from "../_components/transact-subsidy-index"

export const metadata: Metadata = {
  title: "【TX.企画版】IT導入補助金 申請資料｜電子取引Lシステム",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）の申請に必要な、電子取引Lシステムの機能説明資料・価格説明資料・要件対応資料をまとめてご確認いただけます。",
}

export default function TransactSubsidyIndexTxPage() {
  return (
    <TransactSubsidyIndex
      providerName="株式会社TX.企画"
      variantSuffix="/tx"
    />
  )
}
