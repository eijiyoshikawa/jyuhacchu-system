import { DocumentShell } from "@/app/(public)/subsidy/_components/document-shell"

const TOOL_NAME = "電子取引Lシステム"
const MAKER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

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

export function TransactPricingDocument({ providerName }: { providerName: string }) {
  return (
    <DocumentShell
      title="価格説明資料"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      indexHref="/transact/subsidy"
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >
      {/* Cover identification block */}
      <section className="mb-8 avoid-break">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left w-56 text-sm font-bold">
                ITツール正式名称
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                {TOOL_NAME}
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                開発メーカー名
              </th>
              <td className="border-2 border-black px-4 py-3 text-xl font-black">
                {MAKER_NAME}
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
            <tr>
              <th className="border-2 border-black bg-black text-white px-4 py-3 text-left text-sm font-bold">
                申請枠・類型
              </th>
              <td className="border-2 border-black px-4 py-3 text-base">
                インボイス枠（<strong>電子取引類型</strong>）／補助上限 350万円／補助率 中小企業 2/3
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <Section label="IT導入支援事業者名">
        <p className="text-base">{providerName}</p>
      </Section>

      <Section label="ITツール名">
        <p className="text-base">{TOOL_NAME}</p>
      </Section>

      <Section label="ITツールの価格">
        <p className="text-base font-bold mb-4">
          プラン展開は3プラン（標準／ミドル／最小）
        </p>

        <div className="mb-6">
          <p className="mb-2 font-bold">
            ① 標準プラン ＝ ソフトウェア(ITツール)の標準販売価格（税抜）：月額　250,000円
          </p>
          <p className="mb-2 pl-4">ー 1年間利用料：3,000,000円</p>
          <p className="mb-2 pl-4">ー 2年間利用料（補助対象範囲）：6,000,000円</p>
          <p className="pl-4 text-sm text-slate-600">※ 初期費用無し／オプション無し</p>
        </div>

        <div className="mb-6">
          <p className="mb-2 font-bold">
            ② ミドルプラン（税抜）：月額　200,000円
          </p>
          <p className="mb-2 pl-4">ー 1年間利用料：2,400,000円</p>
          <p className="mb-2 pl-4">ー 2年間利用料（補助対象範囲）：4,800,000円</p>
          <p className="pl-4 text-sm text-slate-600">※ 初期費用無し／オプション無し</p>
        </div>

        <div className="mb-6">
          <p className="mb-2 font-bold">
            ③ 最小プラン ＝ ソフトウェア(ITツール)の最小販売価格（税抜）：月額　150,000円
          </p>
          <p className="mb-2 pl-4">ー 1年間利用料：1,800,000円</p>
          <p className="mb-2 pl-4">ー 2年間利用料（補助対象範囲）：3,600,000円</p>
          <p className="pl-4 text-sm text-slate-600">※ 初期費用無し／オプション無し</p>
        </div>

        <p className="mb-3 text-sm leading-relaxed">
          各プランの機能差はなく、招待できる受注側企業数（受注側アカウント発行上限）と
          月次取引件数の上限のみを以下のとおり段階的に設定しています（コア機能は全プラン共通）。
        </p>
        <table className="w-full border-collapse text-sm mb-3">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-3 py-2 text-left text-xs font-bold">
                プラン
              </th>
              <th className="border-2 border-black px-3 py-2 text-right text-xs font-bold">
                受注側アカウント発行上限<br />（招待できる受注側企業数）
              </th>
              <th className="border-2 border-black px-3 py-2 text-right text-xs font-bold">
                月次取引件数上限<br />（発注書・請求書 合計）
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-2 border-black px-3 py-2">① 標準プラン（月額 250,000円）</td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">200社</td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">3,000件</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2">② ミドルプラン（月額 200,000円）</td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">100社</td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">1,500件</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2">③ 最小プラン（月額 150,000円）</td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">50社</td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">500件</td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4 text-sm leading-relaxed border-2 border-black p-3">
          <strong>受注側アカウントの発行上限について</strong>:
          いずれのプランも、発注側企業が発行できる受注側アカウント数には上表のとおり
          契約上の上限が定められており、<strong>上限なく発行できる契約ではありません</strong>。
          上限の変更はプラン変更（契約更新時）によってのみ行えます。
        </p>

        <div className="mt-6 border-2 border-black p-4 text-sm leading-relaxed">
          <p className="font-bold mb-2">補足事項</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              本価格は、<strong>ITツール登録要領 カテゴリー1（ソフトウェア）に区分される
              電子取引プラットフォーム／受発注機能の年間利用料</strong>のみで構成されています。
            </li>
            <li>
              価格は<strong>発注側企業（招待側）</strong>にのみご請求します。
              招待を受けた受注側企業からは、<strong>アカウント発行料・月額利用料等の一切を頂きません</strong>
              （電子取引類型 の要件である「発注者と受注者双方が利用可能な電子取引プラットフォーム」に対応）。
            </li>
            <li>
              含まれる機能：招待型アカウント発行／発注管理／取引先管理（インボイス番号 国税庁API検証）／
              請求管理／多段階承認ワークフロー／電子取引データ保存（電子帳簿保存法対応）／監査ログ。
            </li>
            <li>
              補助金交付申請にあたっては、原則 <strong>最大2年分の SaaS 利用料</strong> を
              補助対象経費として申請できます（電子取引類型 補助上限額 350万円／補助率 中小企業 2/3）。
            </li>
            <li>
              税抜価格で表記しています。別途、消費税（標準税率10%）をご請求いたします。
            </li>
            <li>
              価格改定を行う場合は、契約更新のタイミングで適用し、既存契約の期中には影響しません。
            </li>
            <li>
              本資料の価格は標準プラン・ミドルプラン・最小プランの3種類のみであり、
              <strong>オプション追加・個別割引・初期費用は設定していません</strong>。
            </li>
          </ul>
        </div>
      </Section>

      <Section label="導入事例・実績">
        <p className="mb-4 text-sm leading-relaxed">
          電子取引Lシステム（招待型 電子取引プラットフォーム）を活用した導入事例を以下に示します。
        </p>

        <div className="space-y-6">
          <div className="border-2 border-black p-4">
            <p className="mb-2 text-base font-black border-b-2 border-black pb-1">
              導入事例 1　ハピネス建材株式会社（想定）
            </p>
            <table className="w-full border-collapse text-xs my-3">
              <tbody>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left w-32">
                    業種
                  </th>
                  <td className="border border-slate-400 px-2 py-1">建設資材卸売業</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    従業員数
                  </th>
                  <td className="border border-slate-400 px-2 py-1">45名規模（発注側）</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    招待した取引先数
                  </th>
                  <td className="border border-slate-400 px-2 py-1">受注側企業 120社（全社無償招待）</td>
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
              <li>ー 取引先120社との受発注を FAX・メール・電話で管理し、月次照合作業に担当者3名で5営業日を要していた。</li>
              <li>ー 取引先側（受注企業）の電子化コスト負担がネックとなり、電子取引化が進まなかった。</li>
              <li>ー 電子帳簿保存法の電子取引データ保存義務化への対応が未着手。</li>
            </ul>
            <p className="text-sm font-bold mb-1">導入後の効果（定量）</p>
            <ul className="pl-4 space-y-0.5 text-sm">
              <li>ー 受注側企業を <strong>無償招待</strong> したため、取引先の抵抗なく <strong>約 100 社が受諾</strong>（受諾率83%）。</li>
              <li>ー 月次照合作業時間を <strong>5営業日 → 半営業日</strong>（約90%削減）。</li>
              <li>ー FAX・電話による受発注ゼロ化により、担当者残業時間を <strong>年間 約 350時間 削減</strong> と試算。</li>
              <li>ー 電子取引データ保存要件を <strong>100% システム側で自動対応</strong>。</li>
            </ul>
          </div>

          <div className="border-2 border-black p-4">
            <p className="mb-2 text-base font-black border-b-2 border-black pb-1">
              導入事例 2　サンライズフーズ株式会社（想定）
            </p>
            <table className="w-full border-collapse text-xs my-3">
              <tbody>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left w-32">
                    業種
                  </th>
                  <td className="border border-slate-400 px-2 py-1">食品加工業</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    従業員数
                  </th>
                  <td className="border border-slate-400 px-2 py-1">20名規模</td>
                </tr>
                <tr>
                  <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left">
                    招待した取引先数
                  </th>
                  <td className="border border-slate-400 px-2 py-1">受注側企業 40社</td>
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
                    最小プラン（月額 150,000円／年額 1,800,000円）
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm font-bold mb-1">導入前の課題</p>
            <ul className="mb-2 pl-4 space-y-0.5 text-sm">
              <li>ー 原材料の仕入先40社への発注書送付が手作業（メール＋郵送）で運用されていた。</li>
              <li>ー 請求書受領・チェックの工数増でインボイス制度対応に遅れが生じていた。</li>
            </ul>
            <p className="text-sm font-bold mb-1">導入後の効果（定量）</p>
            <ul className="pl-4 space-y-0.5 text-sm">
              <li>ー 発注→受注→請求→支払までの全プロセスを電子化し、業務時間を <strong>約 60% 削減</strong>。</li>
              <li>ー 適格請求書発行事業者番号の自動検証により確認工数を <strong>実質ゼロ</strong>。</li>
              <li>ー 経理担当の残業時間を <strong>月 15時間 削減</strong>。</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section label="補助金活用時の自己負担額イメージ">
        <p className="mb-4 text-sm leading-relaxed">
          デジタル化・AI導入補助金2026 インボイス枠 <strong>電子取引類型</strong> を活用した場合の、
          電子取引Lシステム導入時の自己負担額のイメージは以下のとおりです。
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
                補助率 2/3 適用時の補助額
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
                ¥3,500,000<br />
                <span className="text-xs">（補助上限適用）</span>
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                ¥2,500,000
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2">
                ② ミドルプラン（月額 200,000円）
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥4,800,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥3,200,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                ¥1,600,000
              </td>
            </tr>
            <tr>
              <td className="border-2 border-black px-3 py-2">
                ③ 最小プラン（月額 150,000円）
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥3,600,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono">
                ¥2,400,000
              </td>
              <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                ¥1,200,000
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-500">
          ※ 補助率・補助上限は電子取引類型（補助上限 350万円・補助率 中小企業 2/3）に基づく参考値です。
          最新の公募要領（中小機構 デジタル化・AI導入補助金ポータルサイト）でご確認ください。
          上表の金額は本ソフトウェア（カテゴリー1）の年間利用料のみを対象としています。
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
              <td className="px-3 py-2 font-mono">transact@juhacchu-l.jp</td>
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
