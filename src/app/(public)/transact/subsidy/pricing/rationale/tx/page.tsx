import type { Metadata } from "next"
import { TransactRationaleDocument } from "../../../_components/transact-rationale-document"

export const metadata: Metadata = {
  title: "【TX.企画版】申請価格理由書｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。電子取引Lシステムの標準販売価格の設定理由。",
}

export default function TransactRationaleTxPage() {
  return <TransactRationaleDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
