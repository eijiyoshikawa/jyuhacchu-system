import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IT導入補助金 申請資料｜受発注Lシステム",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）の申請に必要な、受発注Lシステムの機能説明資料・価格説明資料・要件対応資料をまとめてご確認いただけます。",
}

const DOCUMENTS = [
  {
    href: "/subsidy/feature",
    label: "機能説明資料",
    description:
      "発注管理・取引先管理・請求管理・承認ワークフロー等、補助金審査に必要な機能詳細を体系的に記載。ブラウザから直接PDF保存可能。",
    pages: "約 10〜12 ページ",
  },
  {
    href: "/subsidy/pricing",
    label: "価格説明資料",
    description:
      "IT導入補助金の申請様式（1プラン展開）に準拠した標準・最小価格と導入事例を明記。",
    pages: "約 2〜3 ページ",
  },
  {
    href: "/subsidy/requirements",
    label: "その他要件の説明資料",
    description:
      "Pコード選択（共P-02 等）、インボイス制度・電子帳簿保存法の要件対応、SECURITY ACTION・GビズID対応状況を記載。",
    pages: "約 4〜5 ページ",
  },
]

export default function SubsidyIndexPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1a2332] text-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-3 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-bold">
            IT導入補助金 2026 インボイス枠 対応
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
            IT導入補助金 申請資料
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            デジタル化・AI導入補助金2026「インボイス枠（インボイス対応類型）」の申請に必要な
            各種資料をまとめています。各資料はブラウザの印刷機能（Ctrl+P / ⌘+P）から
            <strong className="text-white">PDFとしてダウンロード</strong>いただけます。
          </p>
        </div>
      </section>

      {/* Applicable scheme */}
      <section className="py-12 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-xl font-black">本ツールが対応する補助金区分</h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-y-3 gap-x-6 text-sm">
              <dt className="font-bold text-slate-700">補助金名称</dt>
              <dd>デジタル化・AI導入補助金 2026（旧称: IT導入補助金）</dd>
              <dt className="font-bold text-slate-700">枠</dt>
              <dd>インボイス枠</dd>
              <dt className="font-bold text-slate-700">類型</dt>
              <dd>インボイス対応類型</dd>
              <dt className="font-bold text-slate-700">主要機能区分</dt>
              <dd>受発注機能（会計・受発注・決済のうち「受発注」）</dd>
              <dt className="font-bold text-slate-700">主Pコード</dt>
              <dd>共P-02（決済・債権債務・資金回収）</dd>
              <dt className="font-bold text-slate-700">副Pコード</dt>
              <dd>共P-03（供給・在庫・物流） / 汎P-07（汎用・自動化・分析ツール）</dd>
              <dt className="font-bold text-slate-700">申請要件</dt>
              <dd>GビズIDプライム取得、SECURITY ACTION 宣言、みらデジ経営チェック 等</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-xl font-black">申請資料一覧</h2>
          <div className="space-y-4">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.href}
                className="rounded-lg border border-slate-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{doc.label}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">ボリューム目安: {doc.pages}</p>
                </div>
                <Link
                  href={doc.href}
                  className="inline-flex items-center justify-center rounded-sm bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700"
                >
                  資料を開く
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to download */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-xl font-black">PDFダウンロード方法</h2>
          <ol className="space-y-3 text-sm text-slate-700 leading-relaxed list-decimal pl-5">
            <li>各資料ページを開きます。</li>
            <li>ページ上部の「PDFとして保存」ボタンをクリックするか、キーボードで <kbd className="rounded border border-slate-300 bg-white px-2 py-0.5 text-xs font-mono">Ctrl+P</kbd>（Windows）／<kbd className="rounded border border-slate-300 bg-white px-2 py-0.5 text-xs font-mono">⌘+P</kbd>（Mac）を押します。</li>
            <li>印刷ダイアログで送信先を「<strong>PDFとして保存</strong>」に変更し、保存先を指定します。</li>
            <li>A4 サイズ・余白標準で保存すると、ヘッダー／フッター／ナビゲーションが非表示になった申請用レイアウトで出力されます。</li>
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="mb-3 text-xl font-black">補助金活用についてのご相談</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            申請書類の書き方、Pコード選択、提出スケジュールなどについてのご相談は
            <br />
            下記までお気軽にお問い合わせください。
          </p>
          <a
            href="mailto:subsidy@juhacchu-l.jp"
            className="mt-6 inline-flex items-center justify-center rounded-sm bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
          >
            補助金活用相談 subsidy@juhacchu-l.jp
          </a>
        </div>
      </section>
    </div>
  )
}
