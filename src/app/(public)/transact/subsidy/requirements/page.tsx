import type { Metadata } from "next"
import { TransactRequirementsDocument } from "../_components/transact-requirements-document"

export const metadata: Metadata = {
  title: "その他要件説明資料｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。Pコード選択、電子取引類型 の機能要件、SECURITY ACTION・GビズID対応。",
}

export default function TransactRequirementsPage() {
  return <TransactRequirementsDocument providerName="株式会社LET" />
}
