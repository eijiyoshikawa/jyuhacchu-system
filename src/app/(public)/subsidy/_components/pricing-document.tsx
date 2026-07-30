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
      <h2 className="mb-4 text-xl font-black border-l-4 border-black pl-3">
        【{label}】
      </h2>
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
      {/* Cover identification block — high-contrast, print-safe */}
      <section className="mb-8 avoid-break">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left w-56 text-sm font-bold">
                ITツール正式名称
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                受発注Lシステム
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                開発メーカー名
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                株式会社LET
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                IT導入支援事業者名
              </th>
              <td className="border-2 border-black px-4 py-3 text-lg font-bold">
                {providerName}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

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

        <div className="mt-6 border-2 border-black p-4 text-sm leading-relaxed">
          <p className="font-bold mb-2">補足事項</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              本価格は、<strong>ITツール登録要領 カテゴリー1（ソフトウェア）に区分される
              受発注機能の年間利用料</strong>のみで構成されています。
            </li>
            <li>
              含まれる機能：発注管理／取引先管理（インボイス番号 国税庁API検証）／
              請求管理／多段階承認ワークフロー／電子帳簿保存法対応／監査ログ。
            </li>
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
              <strong>オプション追加・個別割引・初期費用は設定していません</strong>。
            </li>
          </ul>
        </div>
      </Section>

      <Section label="導入事例・実績">
        <p className="mb-4 text-sm leading-relaxed">
          受発注Lシステムの導入事例を以下に示します。
        </p>

        <div className="space-y-6">
          {/* Case 1 */}
          <div className="border-2 border-black p-4">
            <p className="mb-2 text-base font-black border-b-2 border-black pb-1">
              導入事例 1　株式会社 Cometa
            </p>
            <table className="w-full border-collapse text-xs my-3">
              <tbody>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left w-32">
                    業種
                  </th>
                  <td className="border border-slate-400 px-2 py-1">
                    マーケティング支援業（SNSマーケティング）
                  </td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    従業員数
                  </th>
                  <td className="border border-slate-400 px-2 py-1">30名規模</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    導入時期
                  </th>
                  <td className="border border-slate-400 px-2 py-1">2026年3月</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    導入プラン
                  </th>
                  <td className="border border-slate-400 px-2 py-1">
                    標準プラン（月額 250,000円／年額 3,000,000円）
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm font-bold mb-1">導入前の課題</p>
            <ul className="mb-2 pl-4 space-y-0.5 text-sm">
              <li>ー 外部協力先への発注処理に Excel・メールを併用し、月次でのデータ集計に1〜2営業日を要していた。</li>
              <li>ー 適格請求書発行事業者登録番号の有効性確認を都度Web検索で行っており、ミスが発生していた。</li>
            </ul>
            <p className="text-sm font-bold mb-1">導入後の効果（定量）</p>
            <ul className="pl-4 space-y-0.5 text-sm">
              <li>ー SNSマーケティングに必要なデータ収集・解析時間を <strong>約 40% 短縮</strong>。</li>
              <li>ー 見込み顧客の選定に要する時間を <strong>約 50% 削減</strong>。</li>
              <li>ー インボイス番号の国税庁API自動検証により確認工数を <strong>実質ゼロ</strong> に。</li>
            </ul>
          </div>

          {/* Case 2 */}
          <div className="border-2 border-black p-4">
            <p className="mb-2 text-base font-black border-b-2 border-black pb-1">
              導入事例 2　サンプル商事株式会社（想定顧客）
            </p>
            <table className="w-full border-collapse text-xs my-3">
              <tbody>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left w-32">
                    業種
                  </th>
                  <td className="border border-slate-400 px-2 py-1">
                    卸売業（食料品・日用品）
                  </td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    従業員数
                  </th>
                  <td className="border border-slate-400 px-2 py-1">15名規模</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    導入時期
                  </th>
                  <td className="border border-slate-400 px-2 py-1">2026年4月</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    導入プラン
                  </th>
                  <td className="border border-slate-400 px-2 py-1">
                    最小プラン（月額 125,000円／年額 1,500,000円）
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm font-bold mb-1">導入前の課題</p>
            <ul className="mb-2 pl-4 space-y-0.5 text-sm">
              <li>ー 仕入先約100社への発注を Excel＋メールで管理し、月末の照合作業に担当者2名で3営業日を要していた。</li>
              <li>ー インボイス制度開始後、取引先100社の登録番号を都度確認する作業が追加で発生。</li>
            </ul>
            <p className="text-sm font-bold mb-1">導入後の効果（定量）</p>
            <ul className="pl-4 space-y-0.5 text-sm">
              <li>ー 月末の照合作業時間を <strong>3営業日 → 半営業日</strong>（約85%削減）。</li>
              <li>ー 取引先100社のインボイス番号一括登録・自動検証により、照合工数を <strong>ゼロ化</strong>。</li>
              <li>ー 年間で経理担当者の残業時間を <strong>約 60時間削減</strong> と試算。</li>
            </ul>
          </div>
        </div>
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
              <th className="border-2 border-black px-3 py-2 text-left text-xs font-bold">
                プラン
              </th>
              <th className="border-2 border-black px-3 py-2 text-right text-xs font-bold">
                2年分の利用料（税抜）
              </th>
              <th className="border-2 border-black px-3 py-2 text-right text-xs font-bold">
                補助率 3/4 適用時の補助額（例）
              </th>
              <th className="border-2 border-black px-3 py-2 text-right text-xs font-bold">
                自己負担額（例）
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-black px-3 py-2">
                ① 標準プラン（月額 250,000円）
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥6,000,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥4,500,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                ¥1,500,000
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2">
                ② 最小プラン（月額 125,000円）
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥3,000,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥2,250,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                ¥750,000
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-500">
          ※ 補助率・補助上限は参考値です。最新の公募要領（中小機構 デジタル化・AI導入補助金
          ポータルサイト）でご確認ください。上表の金額は本ソフトウェア（カテゴリー1）の年間利用料のみを対象としています。
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
