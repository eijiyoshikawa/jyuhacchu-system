import type { Metadata } from "next"
import { TransactRationaleDocument } from "../../_components/transact-rationale-document"

export const metadata: Metadata = {
  title: "申請価格理由書｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引くんの標準販売価格の設定理由。",
}

export default function TransactRationalePage() {
  return <TransactRationaleDocument providerName="株式会社LET" />
}
