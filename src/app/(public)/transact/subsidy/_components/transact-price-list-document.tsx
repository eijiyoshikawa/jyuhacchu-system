import { DSYSTEM_BRAND } from "@/lib/brand"
import { TransactDocumentShell } from "./transact-document-shell"
import { DENSHI_PLANS, jpy, subsidyBase, yearly } from "./denshi-plans"

const TOOL_NAME = DSYSTEM_BRAND.toolName
const MAKER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

/**
 * 料金表（別添）
 *
 * ITツール登録の手引き 3-5 ❼:
 *   「料金表、カタログ、プラン一覧等の価格が分かる資料を**別添する**（見積書は不可）」
 * 価格説明資料の中に料金表を内包するだけでなく、料金表単体のPDFとしても
 * 提出できるように独立ページとして用意する。
 *
 * 金額は denshi-plans.ts を唯一の正として描画するため、
 * 価格説明資料・申請価格理由書と必ず一致する。
 */
export function TransactPriceListDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  variantSuffix?: string
}) {
  return (
    <TransactDocumentShell
      title="料 金 表"
      subtitle={`${SCHEME_LABEL} 申請添付書類（別添）`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      docNo="別添 料金表（プラン一覧）"
      indexHref={`/transact/subsidy${variantSuffix}`}
      schemeLabel={SCHEME_LABEL}
    >
      <section className="mb-8">
        <div className="mb-5 border-4 border-black p-4">
          <p className="text-base font-black">
            本料金表は、申請ITツール「{TOOL_NAME}」1製品の価格のみを記載しています。
          </p>
          <p className="mt-1 text-sm leading-relaxed">
            申請ITツール以外のITツールの価格、保守サポート等の役務の価格は含みません。
            価格はすべて<strong>税抜</strong>表記です。
          </p>
        </div>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black px-3 py-2 text-left text-sm font-bold text-white">
                プラン名
              </th>
              <th className="w-32 border-2 border-black bg-black px-3 py-2 text-right text-sm font-bold text-white">
                月額（税抜）
              </th>
              <th className="w-36 border-2 border-black bg-black px-3 py-2 text-right text-sm font-bold text-white">
                年額（税抜）
              </th>
              <th className="w-44 border-2 border-black bg-black px-3 py-2 text-left text-sm font-bold text-white">
                申請書上の区分
              </th>
            </tr>
          </thead>
          <tbody>
            {DENSHI_PLANS.map((pl) => (
              <tr key={pl.name}>
                <td className="border-2 border-black px-3 py-3 text-base font-black">
                  {pl.mark} {pl.name}
                </td>
                <td className="border-2 border-black px-3 py-3 text-right font-mono text-base font-bold">
                  {jpy(pl.monthly)}
                </td>
                <td className="border-2 border-black px-3 py-3 text-right font-mono text-lg font-black">
                  {jpy(yearly(pl))}
                </td>
                <td className="border-2 border-black px-3 py-3 text-xs font-black">
                  {pl.applicationCategory}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-3 text-sm">
          販売形態は<strong>サブスクリプション（クラウド利用料）</strong>であり、
          年額は月額 × 12ヶ月です。<strong>初期費用・オプション費用は設定していません。</strong>
        </p>
      </section>

      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-black pl-3 text-lg font-black">
          プラン別の上限（機能差はありません）
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black px-3 py-2 text-left text-xs font-bold text-white">
                プラン
              </th>
              <th className="border-2 border-black bg-black px-3 py-2 text-right text-xs font-bold text-white">
                受注側アカウント発行上限
              </th>
              <th className="border-2 border-black bg-black px-3 py-2 text-right text-xs font-bold text-white">
                月次取引件数上限
              </th>
              <th className="border-2 border-black bg-black px-3 py-2 text-right text-xs font-bold text-white">
                受注側企業の利用料
              </th>
            </tr>
          </thead>
          <tbody>
            {DENSHI_PLANS.map((pl) => (
              <tr key={pl.name}>
                <td className="border-2 border-black px-3 py-2">
                  {pl.mark} {pl.name}（月額 {jpy(pl.monthly)}）
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                  {pl.partnerAccountLimit}社
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono">
                  {pl.monthlyTransactionLimit.toLocaleString("ja-JP")}件
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-black">0円</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 border-4 border-black p-3">
          <p className="text-sm font-black">
            受注側企業のアカウントを上限なく発行できる契約は提供していません。
          </p>
          <p className="mt-1 text-sm">
            発行上限はプランごとに定めており、上限の変更は契約更新時のプラン変更によってのみ可能です。
            受注側企業にはアカウント発行料・月額利用料等が一切発生しません（0円）。
          </p>
        </div>
      </section>

      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-black pl-3 text-lg font-black">
          補助対象経費（2年分）の目安
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black px-3 py-2 text-left text-xs font-bold text-white">
                プラン
              </th>
              <th className="border-2 border-black bg-black px-3 py-2 text-right text-xs font-bold text-white">
                1年分（税抜）
              </th>
              <th className="border-2 border-black bg-black px-3 py-2 text-right text-xs font-bold text-white">
                2年分（税抜）
              </th>
            </tr>
          </thead>
          <tbody>
            {DENSHI_PLANS.map((pl) => (
              <tr key={pl.name}>
                <td className="border-2 border-black px-3 py-2">
                  {pl.mark} {pl.name}
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono">
                  {jpy(yearly(pl))}
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                  {jpy(subsidyBase(pl))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-600">
          ※ 交付申請時に利用年数（最大2年）を申請します。ITツール登録申請には1年分の金額を登録します。
        </p>
      </section>
    </TransactDocumentShell>
  )
}
