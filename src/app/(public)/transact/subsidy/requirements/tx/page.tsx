import type { Metadata } from "next"
import { TransactRequirementsDocument } from "../../_components/transact-requirements-document"

export const metadata: Metadata = {
  title: "【TX.企画版】その他要件説明資料｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 申請添付書類。Pコード選択、電子取引類型 の機能要件、SECURITY ACTION・GビズID対応。",
}

export default function TransactRequirementsTxPage() {
  return <TransactRequirementsDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
