import type { Metadata } from "next"
import { TransactAttachmentsDocument } from "../_components/transact-attachments-document"

export const metadata: Metadata = {
  title: "その他説明資料（申請価格理由書＋デモ機・テストアカウント情報）｜電子取引くん",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 の「その他説明資料」用に、申請価格理由書とデモ機・テストアカウント情報を1ファイルに連結した添付資料。",
}

export default function TransactAttachmentsPage() {
  return <TransactAttachmentsDocument providerName="株式会社LET" />
}
