import type { Metadata } from "next"
import { TransactInvoiceSampleDocument } from "../_components/transact-invoice-sample-document"

export const metadata: Metadata = {
  title: "適格請求書 出力サンプル｜電子取引くん｜IT導入補助金 電子取引類型",
  description:
    "電子取引くんが出力する適格請求書（インボイス）のサンプル。取引年月日・登録番号・税率別合計・税率別消費税額・適用税率等の必要記載事項を網羅。",
}

export default function TransactInvoiceSamplePage() {
  return <TransactInvoiceSampleDocument providerName="株式会社LET" />
}
