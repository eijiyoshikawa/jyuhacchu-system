import Link from "next/link"
import { DSYSTEM_BRAND } from "@/lib/brand"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName

const DOCUMENTS = [
  {
    href: "/transact/subsidy/feature" as const,
    label: `機能説明資料（${TOOL_NAME}）`,
    description:
      "招待型アカウント発行、発注書・請求書の電子授受、電子取引データ保存、承認ワークフロー等、補助金審査に必要な機能詳細を体系的に記載。",
    pages: "30 ページ",
  },
  {
    href: "/transact/subsidy/pricing" as const,
    label: `価格説明資料（${TOOL_NAME}）`,
    description:
      "IT導入補助金 電子取引類型（補助上限額 350万円）の申請様式に準拠した標準価格・最小価格・導入事例。",
    pages: "8 ページ",
  },
  {
    href: "/transact/subsidy/price-list" as const,
    label: `料金表（別添）（${TOOL_NAME}）`,
    description:
      "ITツール登録の手引き 3-5 ❼「料金表・カタログ・プラン一覧等を別添する」に対応する別添資料。プラン一覧・価格・プラン別上限・補助対象経費の目安を記載。",
    pages: "約 2 ページ",
  },
  {
    href: "/transact/subsidy/pricing/rationale" as const,
    label: `申請価格理由書（${TOOL_NAME}）`,
    description:
      "標準価格の設定理由・開発費用の回収計画・希少性・類似ITツール比較を記載した PDF 添付用ファイル。",
    pages: "7 ページ",
  },
  {
    href: "/transact/subsidy/requirements" as const,
    label: `その他要件の説明資料（${TOOL_NAME}）`,
    description:
      "Pコード選択、電子取引類型 特有の要件（招待型・両社間電子取引プラットフォーム）対応、SECURITY ACTION・GビズID対応状況を記載。",
    pages: "5 ページ",
  },
  {
    href: "/transact/subsidy/demo-info" as const,
    label: `デモ機・テストアカウント情報（${TOOL_NAME}）`,
    description:
      "審査確認用のサービスログインURL、招待発行〜受諾フローの動作確認手順、ロール別テストアカウント情報を記載。",
    pages: "6 ページ",
  },
  {
    href: "/transact/subsidy/attachments" as const,
    label: `その他説明資料（申請価格理由書＋デモ機・テストアカウント情報）（${TOOL_NAME}）`,
    description:
      "申請ポータル「その他説明資料（任意）」欄に添付する1ファイル版。2026-09-10 の不備通知（申請価格理由書の添付要請・デモ機ログイン不可）への対応として資料③と資料⑤を連結。",
    pages: "約 15 ページ",
  },
  {
    href: "/transact/subsidy/invoice-sample" as const,
    label: `適格請求書 出力サンプル（${TOOL_NAME}）`,
    description:
      `${TOOL_NAME}が出力する適格請求書のサンプル。取引年月日・登録番号・税率別合計・税率別消費税額・適用税率等を網羅。`,
    pages: "約 2 ページ",
  },
]

export function TransactSubsidyIndex({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f1e2e] text-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-3 inline-block rounded-full bg-teal-600 px-3 py-1 text-xs font-bold">
            IT導入補助金 2026 インボイス枠 電子取引類型 対応
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
            IT導入補助金 申請資料
            <br />
            <span className="text-teal-300">{TOOL_NAME}</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            デジタル化・AI導入補助金2026「インボイス枠（電子取引類型）」の申請に必要な
            各種資料をまとめています。各資料はブラウザの印刷機能（Ctrl+P / ⌘+P）から
            <strong className="text-white">PDFとしてダウンロード</strong>いただけます。
          </p>
          <dl className="mt-6 inline-grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded border border-slate-500 bg-white/10 px-4 py-3 text-sm">
            <dt className="font-bold text-slate-300">ITツール正式名称</dt>
            <dd className="font-bold">{TOOL_NAME}</dd>
            <dt className="font-bold text-slate-300">開発メーカー名</dt>
            <dd className="font-bold">株式会社LET</dd>
            <dt className="font-bold text-slate-300">IT導入支援事業者名</dt>
            <dd className="font-bold">{providerName}</dd>
          </dl>
        </div>
      </section>

      {/* Applicable scheme */}
      <section className="py-12 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 text-xl font-black">本ツールが対応する補助金区分</h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-y-3 gap-x-6 text-sm">
              <dt className="font-bold text-slate-700">補助金名称</dt>
              <dd>デジタル化・AI導入補助金 2026（旧称: IT導入補助金）</dd>
              <dt className="font-bold text-slate-700">枠</dt>
              <dd>インボイス枠</dd>
              <dt className="font-bold text-slate-700">類型</dt>
              <dd>
                <strong className="text-teal-700">電子取引類型</strong>
              </dd>
              <dt className="font-bold text-slate-700">補助上限額</dt>
              <dd>最大 350万円（下限 なし）</dd>
              <dt className="font-bold text-slate-700">補助率</dt>
              <dd>中小企業 2/3 以内 ／ 小規模事業者 1/2 以内</dd>
              <dt className="font-bold text-slate-700">補助対象経費</dt>
              <dd>ソフトウェア購入費・クラウド利用料（最大2年分）・導入関連費 等</dd>
              <dt className="font-bold text-slate-700">主要機能区分</dt>
              <dd>受発注機能（会計・受発注・決済のうち「受発注」）＋ 電子取引プラットフォーム</dd>
              <dt className="font-bold text-slate-700">主Pコード</dt>
              <dd>共P-02（決済・債権債務・資金回収）</dd>
              <dt className="font-bold text-slate-700">副Pコード</dt>
              <dd>設定なし（共P-02 単独申請）</dd>
              <dt className="font-bold text-slate-700">類型特有要件</dt>
              <dd>
                <strong>発注側企業が受注側企業に無償でアカウント発行する招待型プラットフォーム</strong>
                であり、両社間で電子取引データ（発注書・請求書等）を授受できること
              </dd>
              <dt className="font-bold text-slate-700">申請共通要件</dt>
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
                  href={`${doc.href}${variantSuffix}`}
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
            申請書類の書き方、Pコード選択、電子取引類型 特有の要件対応などについてのご相談は
            <br />
            下記までお気軽にお問い合わせください。
          </p>
          <a
            href="mailto:transact@aigrowthx.pro"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-teal-600 px-6 py-3 text-sm font-bold text-white hover:bg-teal-700"
          >
            補助金活用相談 transact@aigrowthx.pro
          </a>
        </div>
      </section>
    </div>
  )
}
