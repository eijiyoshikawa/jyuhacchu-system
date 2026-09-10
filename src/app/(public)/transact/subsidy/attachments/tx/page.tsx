import type { Metadata } from "next"
import { TransactAttachmentsDocument } from "../../_components/transact-attachments-document"

export const metadata: Metadata = {
  title: "【TX.企画版】その他説明資料（申請価格理由書＋デモ機・テストアカウント情報）｜電子取引くん",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。申請価格理由書とデモ機・テストアカウント情報を1ファイルに連結した「その他説明資料」用の添付資料。",
}

export default function TransactAttachmentsTxPage() {
  return <TransactAttachmentsDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
