import type { Metadata } from "next"
import { TransactInvoiceSampleDocument } from "../../_components/transact-invoice-sample-document"

export const metadata: Metadata = {
  title: "【TX.企画版】適格請求書 出力サンプル｜電子取引Lシステム｜IT導入補助金 電子取引類型",
  description:
    "IT導入支援事業者 株式会社TX.企画 申請版。電子取引Lシステムが出力する適格請求書（インボイス）のサンプル。取引年月日・登録番号・税率別合計・税率別消費税額・適用税率等の必要記載事項を網羅。",
}

export default function TransactInvoiceSampleTxPage() {
  return <TransactInvoiceSampleDocument providerName="株式会社TX.企画" variantSuffix="/tx" />
}
