import { DSYSTEM_BRAND } from "@/lib/brand"
import {
  DENSHI_PLANS,
  MINIMUM_PLAN,
  STANDARD_PLAN,
  SUBSIDY_CAP,
  isCapped,
  jpy,
  selfPay,
  subsidyAmount,
  subsidyBase,
  yearly,
  yen,
} from "./denshi-plans"
import { TransactDocumentShell, TransactSection } from "./transact-document-shell"
import {
  DENSHI_REQUIREMENTS,
  DenshiRequirementTableForPricing,
  SCHEME_NOTE_TITLE,
} from "./denshi-torihiki-requirements"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName
const MAKER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

/**
 * 導入事例・実績（ITツール登録要領 別紙1（1）2.⑥ ／ ITツール登録の手引き 3-5 ❻）
 *
 * ⚠️ この欄は「**過去の**導入事例・実績」でなければならない。
 *   要領 別紙1（1）2.⑥:「導入事例・実績 ※過去の導入事例・実績を説明したもの。」
 *   手引き 3-5 ❻: 同上 ＋「※URLのみの記載は不可」。書式例は
 *   「20YY年MM月 導入社数3000社達成」「AA株式会社、BB会社」と実在の実績を挙げている。
 *   手引きには「※❸〜❼の項目で不備が頻発しています」とも明記されている。
 *
 * ⚠️ 想定・仮定の事例（「（想定）」「想定顧客」等）を書くことは要件違反であり、
 *   2026年8月の不採択の最有力原因と考えられる（docs/APPLICATION_PLAYBOOK.md §11-B）。
 *   **事実のみを書くこと。** 値が確認できない項目は空文字にすれば行ごと描画されない。
 */
const SERVICE_LAUNCH_DATE = "2026年4月20日"

type CaseStudy = {
  /** 導入企業の名称（掲載許諾済みの実名） */
  name: string
  industry: string
  employees: string
  /** 招待した受注側企業数 */
  invitedPartners: string
  /** 利用開始年月 */
  startedAt: string
  /** 契約プラン・契約形態（無償／有償の別を必ず明記する） */
  contract: string
  challenges: string[]
  effects: string[]
}

/**
 * 実在の導入実績のみを列挙する。空配列のあいだは事例カードを描画しない。
 *
 * 記載してよいのは「過去の事実」だけ。将来の契約予定・見込みは実績ではないため
 * 本欄には書かない（書くと「実績なし」を自ら申告することにもなる）。
 */
const CASE_STUDIES: CaseStudy[] = [
  {
    name: "株式会社Cometa",
    industry: "IT関連事業・スクール関連事業",
    employees: "5名",
    invitedPartners: "受注側企業 5社（全社を無償招待）",
    startedAt: "2026年4月（本ITツールの提供開始月より利用）",
    contract: "無償によるパイロット導入",
    challenges: [
      "WEB制作の外注をはじめとする取引が、取引先ごとに個別のやり取り（メール・チャット等）に分散しており、発注内容と請求状況を一元的に把握できていなかった。",
    ],
    effects: [
      "取引先5社との発注・請求を本ITツール上に一元化し、単一の画面で取引状況を確認できるようになった。",
      "招待した受注側企業5社はいずれも無償アカウントで参加しており、取引先側の費用負担は発生していない。",
    ],
  },
]

export function TransactPricingDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <TransactDocumentShell
      title="価格説明資料"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      docNo="資料② 価格説明資料"
      indexHref={`/transact/subsidy${variantSuffix}`}
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >
      {/* Cover identification block */}

      {/* ★ 電子取引類型 補助対象要件 適合表 — 価格・契約条件の面からの適合を明示 */}
      <section className="mb-8 page-break-before">
        <div className="border-4 border-black p-6 mb-5 text-center">
          <p className="text-sm font-bold tracking-[0.4em] mb-3">
            インボイス枠（電子取引類型）補助対象要件 対応説明
          </p>
          <h2 className="text-2xl sm:text-3xl font-black tracking-widest border-y-4 border-black py-3 my-3">
            本ITツールは インボイス枠（電子取引類型）の
            <br />
            補助対象となるソフトウェアです
          </h2>
          <p className="mt-3 text-sm font-bold">{SCHEME_NOTE_TITLE}に定める全{DENSHI_REQUIREMENTS.length}項目に適合</p>
          <div className="mx-auto mt-5 max-w-2xl border-4 border-black p-4 text-left">
            <p className="text-base font-black mb-2">価格・契約条件の面から確認できる要件</p>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed">
              <li>
                <strong className="bg-yellow-200 px-1">
                  要件② 受注者側へのアカウント無償発行
                </strong>
                : 利用料は<strong>発注側企業にのみ</strong>請求し、
                <strong>受注側企業のアカウント発行料・月額利用料等は一切発生しません（0円）</strong>。
                → 本資料「ITツールの価格」補足事項に明記
              </li>
              <li>
                <strong className="bg-yellow-200 px-1">
                  要件⑥ 受注者側アカウントを上限なく発行できる契約ではないこと
                </strong>
                : 契約プランごとに受注側アカウント発行上限
                （標準200社／ミドル100社／最小50社）を定めています。
                → 本資料「ITツールの価格」プラン別上限表に明記
              </li>
            </ul>
          </div>
        </div>

        <h3 className="mb-3 bg-black text-white px-4 py-2 text-lg font-black">
          インボイス枠（電子取引類型）補助対象要件 適合表（全{DENSHI_REQUIREMENTS.length}項目）
        </h3>
        <p className="mb-3 text-sm leading-relaxed">
          {SCHEME_NOTE_TITLE}に定める要件について、本ITツール「{TOOL_NAME}」の適合状況を
          <strong>要件ごとに逐条で</strong>示します。要件文言は登録要領の表記のまま記載し、
          価格説明資料（本資料）で確認できる箇所と、機能説明資料の該当箇所を併記しています。
          <strong>本表の全{DENSHI_REQUIREMENTS.length}項目すべてに適合（◎）しています。</strong>
        </p>
        <DenshiRequirementTableForPricing />
        <p className="mt-3 text-xs leading-relaxed">
          ※ 要件番号（①〜⑥）は機能説明資料の「インボイス枠（電子取引類型）補助対象要件 適合表」と
          同一です。機能面の実装内容の詳細は機能説明資料の該当箇所をご参照ください。
        </p>
      </section>

      {/* ★ 料金表（プラン一覧）— 申請ITツールの価格を単独で明示 */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          料金表（プラン一覧）／ 申請ITツール「{TOOL_NAME}」の価格
        </h2>
        <div className="mb-4 border-4 border-black p-4">
          <p className="text-base font-black mb-1">
            本料金表は、申請ITツール「{TOOL_NAME}」1製品の価格のみを記載しています
          </p>
          <p className="text-sm leading-relaxed">
            本資料には、申請ITツール以外のITツールの価格は一切記載していません。
            申請書に入力した
            <strong className="bg-yellow-200">
              標準販売価格 {jpy(yearly(STANDARD_PLAN))}（税抜）
            </strong>
            および
            <strong className="bg-yellow-200">
              最小販売価格 {jpy(yearly(MINIMUM_PLAN))}（税抜）
            </strong>
            は、
            下表のとおり<strong>標準プランの年額</strong>および<strong>最小プランの年額</strong>に対応します。
          </p>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                プラン名
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-right text-sm font-bold w-32">
                月額（税抜）
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-right text-sm font-bold w-36">
                年額（税抜）
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-44">
                申請書の区分
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-right text-sm font-bold w-32">
                受注側アカウント<br />発行上限
              </th>
            </tr>
          </thead>
          <tbody>
            {DENSHI_PLANS.map((pl) => (
              <tr key={pl.name} className={pl.isApplicationPrice ? "bg-yellow-100" : undefined}>
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
                <td className="border-2 border-black px-3 py-3 text-right font-mono font-bold">
                  {pl.partnerAccountLimit}社
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-3 list-disc pl-5 text-sm leading-relaxed space-y-1">
          <li>販売形態は<strong>サブスクリプション（クラウド利用料）</strong>であり、年額は月額 × 12ヶ月です。</li>
          <li>
            <strong>初期費用・カスタマイズ費用・オプション費用は一切ありません。</strong>
            全機能を全プランに標準提供しており、プラン間の機能差はありません。
          </li>
          <li>
            利用料は<strong>発注側企業にのみ</strong>ご請求します。
            <strong className="bg-yellow-200">受注側企業の費用負担は 0円（無償）</strong>です。
          </li>
          <li>ソフトウェア（カテゴリー1）の利用料のみで構成され、カテゴリー7 保守サポート役務は含みません。</li>
          <li>表示は全て税抜価格です。別途、消費税（標準税率10%）をご請求いたします。</li>
        </ul>
      </section>

      <TransactSection label="IT導入支援事業者名">
        <p className="text-base">{providerName}</p>
      </TransactSection>

      <TransactSection label="ITツール名">
        <p className="text-base">{TOOL_NAME}</p>
      </TransactSection>

      <TransactSection label="ITツールの価格">
        <p className="text-base font-bold mb-4">
          プラン展開は3プラン（標準／ミドル／最小）
        </p>

        {DENSHI_PLANS.map((pl) => (
          <div key={pl.name} className="mb-6">
            <p className="mb-2 font-bold">
              {pl.mark} {pl.name}
              {pl.isApplicationPrice ? ` ＝ ソフトウェア(ITツール)の${pl.applicationCategory.split("（")[0]}` : ""}
              （税抜）：月額　{jpy(pl.monthly)}
            </p>
            <p className="mb-2 pl-4">ー 1年間利用料：{jpy(yearly(pl))}</p>
            <p className="mb-2 pl-4">ー 2年間利用料（補助対象範囲）：{jpy(subsidyBase(pl))}</p>
            <p className="pl-4 text-sm text-slate-600">※ 初期費用無し／オプション無し</p>
          </div>
        ))}

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
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mb-4 border-4 border-black p-4">
          <p className="mb-2 border-b-2 border-black pb-1 text-base font-black">
            電子取引類型 要件② に対応：受注側企業への課金は一切ありません
          </p>
          <p className="text-sm leading-relaxed">
            上記の利用料は<strong>発注側企業（招待する側）にのみ</strong>ご請求します。
            発注側企業から招待を受けた<strong className="bg-yellow-200 px-1">
            受注側企業のアカウント発行料・月額利用料・取引件数に応じた従量課金は
            いずれも 0円（完全無償）</strong>であり、受注側企業に費用負担は発生しません。
            これは、インボイス枠（電子取引類型）の
            「受注者側に対してアカウントを無償で発行し、利用させることのできる機能を有すること」
            の要件に対応するものです。
          </p>
        </div>

        <div className="mb-4 border-4 border-black p-4">
          <p className="mb-2 border-b-2 border-black pb-1 text-base font-black">
            電子取引類型 要件⑥ に対応：受注側アカウントの発行上限
          </p>
          <p className="text-sm leading-relaxed">
            いずれのプランも、発注側企業が発行できる受注側アカウント数には上表のとおり
            <strong className="bg-yellow-200 px-1">契約上の上限（標準200社／ミドル100社／最小50社）</strong>
            が定められており、<strong>上限なく発行できる契約ではありません</strong>。
            上限の変更はプラン変更（契約更新時）によってのみ行えます。
          </p>
        </div>

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
      </TransactSection>

      <TransactSection label="導入事例・実績">
        <table className="w-full border-collapse text-sm mb-4">
          <tbody>
            <tr>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left w-56 text-sm font-bold">
                提供開始日
              </th>
              <td className="border-2 border-black px-3 py-2 text-lg font-black">
                {SERVICE_LAUNCH_DATE}
              </td>
            </tr>
            <tr>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                導入社数（{SERVICE_LAUNCH_DATE} 提供開始〜現在）
              </th>
              <td className="border-2 border-black px-3 py-2 text-lg font-black">
                {CASE_STUDIES.length} 社
              </td>
            </tr>
          </tbody>
        </table>

        {CASE_STUDIES.length === 0 && (
          <div className="border-4 border-red-600 bg-red-50 p-4 text-sm font-black leading-relaxed">
            ⚠️ 未記入：提出前に CASE_STUDIES（実在の導入実績）を必ず記入すること。
            この状態のまま提出してはならない。要領 別紙1（1）2.⑥ は「過去の導入事例・実績」を
            必須としており、未記入または想定事例は不備・不採択の直接原因となる。
          </div>
        )}

        {CASE_STUDIES.length > 0 && (
          <div className="space-y-6">
            {CASE_STUDIES.map((c) => (
              <div key={c.name} className="border-2 border-black p-4 avoid-break">
                <p className="mb-2 text-base font-black border-b-2 border-black pb-1">
                  導入事例　{c.name}
                </p>
                <table className="w-full border-collapse text-xs my-3">
                  <tbody>
                    {([
                      ["業種", c.industry],
                      ["従業員数", c.employees],
                      ["招待した取引先数", c.invitedPartners],
                      ["利用開始", c.startedAt],
                      ["契約プラン・契約形態", c.contract],
                    ] as const)
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <tr key={k}>
                          <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left w-40">
                            {k}
                          </th>
                          <td className="border border-slate-400 px-2 py-1">{v}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {c.challenges.length > 0 && (
                  <>
                    <p className="text-sm font-bold mb-1">導入前の課題</p>
                    <ul className="mb-2 pl-4 space-y-0.5 text-sm">
                      {c.challenges.map((t) => (
                        <li key={t}>ー {t}</li>
                      ))}
                    </ul>
                  </>
                )}
                {c.effects.length > 0 && (
                  <>
                    <p className="text-sm font-bold mb-1">導入後の効果</p>
                    <ul className="pl-4 space-y-0.5 text-sm">
                      {c.effects.map((t) => (
                        <li key={t}>ー {t}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 border-2 border-black p-3 text-sm leading-relaxed">
          <p className="font-black mb-1">本ITツールの販売形態について</p>
          <p>
            本ITツールは {SERVICE_LAUNCH_DATE} に提供を開始し、
            上記「ITツールの価格」に記載した標準販売価格により
            <strong>一般に販売しているクラウドサービス（SaaS）</strong>です。
            特定の顧客向けに限定して提供しているものではなく、
            サービスサイトから業種を問わずお申し込みいただけます。
            契約に応じたカスタマイズ開発・スクラッチ開発は行いません。
          </p>
        </div>
      </TransactSection>

      <TransactSection label="補助金活用時の自己負担額イメージ">
        <p className="mb-4 text-sm leading-relaxed">
          デジタル化・AI導入補助金2026 インボイス枠 <strong>電子取引類型</strong> を活用した場合の、
          {TOOL_NAME}導入時の自己負担額のイメージは以下のとおりです。
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
            {DENSHI_PLANS.map((pl) => (
              <tr key={pl.name}>
                <td className="border-2 border-black px-3 py-2">
                  {pl.mark} {pl.name}（月額 {jpy(pl.monthly)}）
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono">
                  {yen(subsidyBase(pl))}
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono">
                  {yen(subsidyAmount(pl))}
                  {isCapped(pl) && (
                    <>
                      <br />
                      <span className="text-xs">（補助上限適用）</span>
                    </>
                  )}
                </td>
                <td className="border-2 border-black px-3 py-2 text-right font-mono font-bold">
                  {yen(selfPay(pl))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-500">
          ※ 補助率・補助上限は電子取引類型（補助上限 {jpy(SUBSIDY_CAP)}・補助率 中小企業 2/3）に基づく参考値です。
          最新の公募要領（中小機構 デジタル化・AI導入補助金ポータルサイト）でご確認ください。
          上表の金額は本ソフトウェア（カテゴリー1）の年間利用料のみを対象としています。
        </p>
      </TransactSection>

      <TransactSection label="お問い合わせ">
        <table className="w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                料金・導入相談
              </th>
              <td className="px-3 py-2 font-mono">sales@aigrowthx.pro</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                補助金活用相談
              </th>
              <td className="px-3 py-2 font-mono">transact@aigrowthx.pro</td>
            </tr>
            <tr className="border-b border-slate-200">
              <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">
                請求・契約関連
              </th>
              <td className="px-3 py-2 font-mono">billing@aigrowthx.pro</td>
            </tr>
          </tbody>
        </table>
      </TransactSection>
    </TransactDocumentShell>
  )
}
