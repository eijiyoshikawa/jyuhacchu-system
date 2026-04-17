import { DocumentShell } from "./document-shell"

interface PricingDocumentProps {
  /**
   * 表示する「IT導入支援事業者名」。通常は「株式会社 受発注Lシステム」、
   * 補助金の個別申請用途で別名義（例: 株式会社TX.企画）を表示したい場合に差し替えます。
   */
  providerName: string
}

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8 avoid-break">
      <h2 className="mb-4 text-xl font-black text-sky-600">【{label}】</h2>
      <div className="pl-2">{children}</div>
    </section>
  )
}

/**
 * IT導入補助金 申請添付書類「価格説明資料」の本文。
 * `providerName` のみページ間で差し替え、残りは共通で管理します。
 */
export function PricingDocument({ providerName }: PricingDocumentProps) {
  return (
    <DocumentShell title="価格説明資料">
      <Section label="IT導入支援事業者名">
        <p className="text-base">{providerName}</p>
      </Section>

      <Section label="ITツール名">
        <p className="text-base">受発注Lシステム</p>
      </Section>

      <Section label="ITツールの価格">
        <p className="text-base font-bold mb-4">プラン展開は1プランのみ</p>

        <div className="mb-6">
          <p className="mb-2 font-bold">
            ① ソフトウェア(ITツール)の標準販売価格（税抜）：月額　250,000円
          </p>
          <p className="mb-2 pl-4">ー 1年間利用料：3,000,000円</p>
          <p className="pl-4 text-sm text-slate-600">※ 初期費用無し／オプション無し</p>
        </div>

        <div className="mb-6">
          <p className="mb-2 font-bold">
            ② ソフトウェア(ITツール)の最小販売価格（税抜）：月額　125,000円
          </p>
          <p className="mb-2 pl-4">ー 1年間利用料：1,500,000円</p>
          <p className="pl-4 text-sm text-slate-600">※ 初期費用無し／オプション無し</p>
        </div>

        <div className="mt-6 rounded border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
          <p className="font-bold mb-2">補足事項</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              補助金交付申請にあたっては、原則 <strong>最大2年分の SaaS 利用料</strong> を
              補助対象経費として申請できます（公募要領に準拠）。
            </li>
            <li>
              税抜価格で表記しています。別途、消費税（標準税率10%）をご請求いたします。
            </li>
            <li>
              価格改定を行う場合は、契約更新のタイミングで適用し、既存契約の期中には影響しません。
            </li>
            <li>
              本資料の価格は標準プランおよび最小プランの2種類のみであり、
              <strong>オプション追加・個別割引は設定していません</strong>。
            </li>
          </ul>
        </div>
      </Section>

      <Section label="導入事例・実績">
        <div className="space-y-6">
          {[
            {
              name: "株式会社 A商事（卸売業）",
              bullets: [
                "仕入先100社への発注業務を一元化し、月末の照合作業を 3日 → 半日に短縮。",
                "インボイス番号の国税庁API自動検証で、確認工数を大幅に削減。",
              ],
            },
            {
              name: "株式会社 B システム（IT サービス業）",
              bullets: [
                "外注先40社のインボイス番号を一括登録し、免税事業者を自動判定。",
                "電子帳簿保存法 電子取引要件への対応工数をゼロ化。",
              ],
            },
            {
              name: "株式会社 C 製造（製造業）",
              bullets: [
                "複数工場・複数部門の発注フォーマットを全社共通化し、本社経理の統合作業を撤廃。",
                "多段階承認＋監査ログで内部統制対応をクリア。",
              ],
            },
          ].map((c) => (
            <div key={c.name}>
              <p className="font-bold text-base">{c.name}</p>
              <ul className="mt-2 pl-4 space-y-1 text-sm">
                {c.bullets.map((b) => (
                  <li key={b}>ー {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          ※ 導入事例は将来公開分も含む仮例示です。正式公開時に実名事例に差し替えます。
        </p>
      </Section>

      <Section label="補助金活用時の自己負担額イメージ">
        <p className="mb-4 text-sm leading-relaxed">
          デジタル化・AI導入補助金2026 インボイス枠 インボイス対応類型を活用した場合の、
          受発注Lシステム導入時の自己負担額のイメージは以下のとおりです。
          補助率・補助上限・対象範囲は年度・事業規模により変動するため、
          実際の交付決定額は最新の公募要領および交付決定通知に従ってください。
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                プラン
              </th>
              <th className="border border-slate-300 px-3 py-2 text-right text-xs font-bold">
                2年分の利用料（税抜）
              </th>
              <th className="border border-slate-300 px-3 py-2 text-right text-xs font-bold">
                補助率 3/4 適用時の補助額（例）
              </th>
              <th className="border border-slate-300 px-3 py-2 text-right text-xs font-bold">
                自己負担額（例）
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2">
                ① 標準プラン（月額 250,000円）
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                ¥6,000,000
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                ¥4,500,000
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono font-bold">
                ¥1,500,000
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2">
                ② 最小プラン（月額 125,000円）
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                ¥3,000,000
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                ¥2,250,000
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono font-bold">
                ¥750,000
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-500">
          ※ 補助率・補助上限は参考値です。最新の公募要領（中小機構 デジタル化・AI導入補助金
          ポータルサイト）でご確認ください。補助対象外経費は含みません。
        </p>
      </Section>

      <Section label="お問い合わせ">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                料金・導入相談
              </th>
              <td className="px-3 py-2 font-mono">sales@juhacchu-l.jp</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                補助金活用相談
              </th>
              <td className="px-3 py-2 font-mono">subsidy@juhacchu-l.jp</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                請求・契約関連
              </th>
              <td className="px-3 py-2 font-mono">billing@juhacchu-l.jp</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </DocumentShell>
  )
}
