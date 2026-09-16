import { TransactDemoInfoDocument } from "./transact-demo-info-document"
import { TransactRationaleDocument } from "./transact-rationale-document"

/**
 * 「その他説明資料（任意）」枠に添付する結合資料。
 *
 * 申請ポータルの添付枠は 機能説明資料・価格説明資料・その他説明資料 の3つだけで、
 * その他説明資料は1ファイルしか添付できない（VENDOR_APPLICATION_GUIDE §8-8）。
 * 2026-09-10 の不備通知で「申請価格理由書を その他説明資料 欄に添付し備考欄に記載」を
 * 求められたため、申請価格理由書（資料③）とデモ機・テストアカウント情報（資料⑤）を
 * 1つのPDFとして出力できるように連結する。順序は事務局の指摘順（価格 → デモ機）。
 */
export function TransactAttachmentsDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  variantSuffix?: string
}) {
  return (
    <div>
      <div className="print-hide mx-auto max-w-4xl px-6 pt-6 text-xs text-slate-600">
        本ページは「その他説明資料（任意）」用に 資料③ 申請価格理由書 と 資料⑤ デモ機・テストアカウント情報 を
        連結したものです。どちらかの「PDFとして保存」ボタンで全体が1つのPDFになります。
      </div>
      <TransactRationaleDocument providerName={providerName} variantSuffix={variantSuffix} />
      <div className="page-break-before" />
      <TransactDemoInfoDocument providerName={providerName} variantSuffix={variantSuffix} />
    </div>
  )
}
