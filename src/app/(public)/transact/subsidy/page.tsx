import type { Metadata } from "next"
import { TransactSubsidyIndex } from "./_components/transact-subsidy-index"

export const metadata: Metadata = {
  title: "IT導入補助金 申請資料｜電子取引くん",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）の申請に必要な、電子取引くんの機能説明資料・価格説明資料・要件対応資料をまとめてご確認いただけます。",
}

export default function TransactSubsidyIndexPage() {
  return (
    <TransactSubsidyIndex
      providerName="株式会社LET"
    />
  )
}
