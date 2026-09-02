import { DSYSTEM_BRAND } from "@/lib/brand"
import { DENSHI_PLANS, jpy, yearly } from "./denshi-plans"
import { TransactDocumentShell } from "./transact-document-shell"
import { ScreenshotPlaceholder } from "@/app/(public)/subsidy/_components/screenshot-placeholder"
import {
  DENSHI_REQUIREMENTS,
  DenshiRequirementTableForFeature,
  SCHEME_NOTE_TITLE,
} from "@/app/(public)/transact/subsidy/_components/denshi-torihiki-requirements"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName
const MAKER_NAME = "株式会社LET"

/**
 * 本資料に掲載する画面キャプチャの一覧。
 * page は A4 印刷時の実ページ番号（PDF を生成して実測した値）。
 * 図を追加・削除した場合は必ず再計測して更新すること。
 */
const SCREEN_CAPTURES: {
  fig: string
  side: "買い手側" | "売り手側" | "共通"
  desc: string
  page: string
}[] = [
  { fig: "Fig.1", side: "共通", desc: "ダッシュボード（発注件数・請求件数・承認待ち件数・最近の発注／請求）", page: "P.13" },
  { fig: "Fig.2", side: "買い手側", desc: "取引先招待 画面（受注側企業への無償アカウント発行・招待URL発行／発行済み招待一覧）", page: "P.15" },
  { fig: "Fig.3", side: "売り手側", desc: "招待受諾ページ（受注側企業が費用ゼロでアカウントを作成）", page: "P.15" },
  { fig: "Fig.4", side: "買い手側", desc: "発注書 一覧画面（発注管理）", page: "P.16" },
  { fig: "Fig.5", side: "買い手側", desc: "発注書 新規作成画面（仕入明細の入力・税率別自動計算）", page: "P.17" },
  { fig: "Fig.6", side: "買い手側", desc: "取引先管理 一覧画面（適格請求書発行事業者登録番号＝インボイス管理番号の管理）", page: "P.18" },
  { fig: "Fig.7", side: "買い手側", desc: "請求書 一覧画面（受領請求書の確認・買掛／支払管理）", page: "P.19" },
  { fig: "Fig.8", side: "売り手側", desc: "受注側企業が受領した発注書の一覧（受注管理）", page: "P.21" },
  { fig: "Fig.9", side: "売り手側", desc: "受注側企業が発行した請求書の一覧（売上請求管理・売掛／回収管理）", page: "P.22" },
  { fig: "Fig.10", side: "売り手側", desc: "受注側企業による適格請求書の新規作成画面（売上請求管理）", page: "P.22" },
  { fig: "Fig.11", side: "買い手側", desc: "アカウント利用状況（発行済み受注側アカウント一覧・インボイス管理番号・発行上限の消化状況）", page: "P.23" },
  { fig: "Fig.12", side: "買い手側", desc: "電子取引アーカイブ（電帳法 検索要件3項目による横断検索・SHA-256ハッシュ／タイムスタンプ）", page: "P.24" },
]
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

export function TransactFeatureDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <TransactDocumentShell
      title="機能説明資料"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      docNo="資料① 機能説明資料"
      indexHref={`/transact/subsidy${variantSuffix}`}
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >
      {/* Cover page — 識別情報はシェルのマストヘッド表に集約し、
          ここでは資料の位置づけと Pコードの補足のみを置く */}
      <section className="mb-8 page-break-after avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-4">
            ＩＴツール登録申請 添付書類
          </p>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr>
                <th className="border-2 border-black px-4 py-3 text-left w-56 text-sm font-bold">
                  主Ｐコード
                </th>
                <td className="border-2 border-black px-4 py-3 text-base font-black">
                  共P-02（決済・債権債務・資金回収）
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black px-4 py-3 text-left text-sm font-bold">
                  副Ｐコード
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  設定なし（共P-02 単独申請）
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black px-4 py-3 text-left text-sm font-bold">
                  補助上限額／補助率
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  350万円 ／ 中小企業 2/3・小規模事業者 1/2
                </td>
              </tr>
              <tr>
                <th className="border-2 border-black px-4 py-3 text-left text-sm font-bold">
                  ＡＩを用いた機能
                </th>
                <td className="border-2 border-black px-4 py-3 text-base">
                  搭載なし（生成ＡＩ・生成ＡＩ以外のＡＩ技術のいずれも使用していません）
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 border-t-4 border-black pt-4">
            <p className="text-xs leading-relaxed">
              本資料は、{SCHEME_LABEL} の ITツール登録申請における「機能説明資料」として、
              IT導入支援事業者 {providerName} が、開発メーカー {MAKER_NAME} が提供するITツール
              「{TOOL_NAME}」の機能内容、業務フロー、利用方法、および補助金要件への
              適合状況を説明するために作成されたものです。
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-8 page-break-before page-break-after avoid-break">
        <div className="border-4 border-black p-6">
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            目　次
          </h2>

          <table className="w-full border-collapse text-sm">
            <tbody>
              {[
                { no: "★0", label: "インボイス枠（電子取引類型）補助対象要件 適合表（登録要領 留意事項 全6項目・逐条）", page: "P.3〜5" },
                { no: "★0-1", label: "電子取引類型 必須要件 対応説明（招待型 電子取引プラットフォーム）", page: "P.6〜7" },
                { no: "★0-2", label: "本ITツールは「受発注機能」を有します（会計／受発注／決済の有無）", page: "P.8" },
                { no: "★0-3", label: "売り手側機能・買い手側機能を両方有することの明示（電子取引類型 必須要件）", page: "P.9〜10" },
                { no: "★0-4", label: "画面キャプチャ 一覧（全12点・買い手側／売り手側）", page: "P.11" },
                { no: "1", label: "製品概要（ITツール正式名称・開発メーカー名・IT導入支援事業者名）", page: "P.12" },
                { no: "2", label: "解決する業務課題と導入効果（受注側企業を無償招待し電子化を推進）", page: "P.12" },
                { no: "★3", label: "機能詳細（3-1 招待管理／3-2 発注／3-3 取引先／3-4 請求／3-5 インボイス／3-6 電帳法／3-7 承認／3-8 監査／3-9 受注側企業の画面／3-10 アカウント利用状況／3-11 電子取引アーカイブ）", page: "P.13〜24" },
                { no: "★4", label: "業務フロー図（招待発行→受諾→両社間電子取引成立）［図1］", page: "P.25〜26" },
                { no: "★5", label: "ITツールの利用方法（5-1 招待発行〜5-6 管理者運用）", page: "P.27〜28" },
                { no: "6", label: "技術仕様", page: "P.29" },
                { no: "7", label: "導入プロセス", page: "P.29" },
                { no: "8", label: "サポート体制", page: "P.30" },
                { no: "9", label: "お問い合わせ", page: "P.30" },
              ].map((row) => (
                <tr key={row.no}>
                  <td
                    className={
                      "border-2 border-black px-3 py-2 text-center font-bold w-20 " +
                      (row.no.startsWith("★") ? "bg-black text-white text-base" : "")
                    }
                  >
                    §{row.no}
                  </td>
                  <td
                    className={
                      "border-2 border-black px-3 py-2 " +
                      (row.no.startsWith("★") ? "bg-yellow-100 font-bold text-base" : "")
                    }
                  >
                    {row.label}
                  </td>
                  <td className="border-2 border-black px-3 py-2 text-center w-28 font-mono whitespace-nowrap">
                    {row.page}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ★ 電子取引類型 補助対象要件 章扉ページ — 登録要領 留意事項 への逐条適合を明示 */}
      <section className="mb-8 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold tracking-[0.4em] mb-3">CHAPTER 0</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            インボイス枠（電子取引類型）
            <br />
            補助対象要件への適合
          </h2>
          <p className="mt-4 text-base font-bold">
            {SCHEME_NOTE_TITLE}
            <br />
            に定める全 {DENSHI_REQUIREMENTS.length} 項目への適合状況
          </p>
          <div className="mx-auto mt-6 max-w-xl border-4 border-black bg-black px-4 py-3 text-white">
            <p className="text-xl font-black">
              本ITツールは インボイス枠（電子取引類型）の
              <br />
              補助対象となるソフトウェアです
            </p>
          </div>
          <table className="mx-auto mt-6 w-full max-w-xl border-collapse text-sm">
            <tbody>
              <tr>
                <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold w-44">
                  ITツール正式名称
                </th>
                <td className="border-2 border-black px-3 py-2 text-lg font-black">{TOOL_NAME}</td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                  開発メーカー名
                </th>
                <td className="border-2 border-black px-3 py-2 text-lg font-black">{MAKER_NAME}</td>
              </tr>
              <tr>
                <th className="border-2 border-black bg-slate-100 px-3 py-2 text-left text-sm font-bold">
                  申請枠・類型
                </th>
                <td className="border-2 border-black px-3 py-2 text-base font-bold">
                  インボイス枠（電子取引類型）／カテゴリー1 ソフトウェア
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ★ 電子取引類型 補助対象要件 逐条適合表 */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §0. インボイス枠（電子取引類型）補助対象要件 適合表（全{DENSHI_REQUIREMENTS.length}項目）
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          {SCHEME_NOTE_TITLE}に定める要件について、
          本ITツール「{TOOL_NAME}」の適合状況を <strong>要件ごとに逐条で</strong> 示します。
          要件文言は登録要領の表記のまま記載し、各要件に対応する実装内容と
          本資料内の該当箇所（節番号・図番号）を併記しています。
          <strong>本表の全{DENSHI_REQUIREMENTS.length}項目すべてに適合（◎）しています。</strong>
        </p>
        <DenshiRequirementTableForFeature />
        <p className="mt-3 text-xs leading-relaxed">
          ※ 価格・契約条件の面（受注側企業への課金の有無、受注側アカウント発行上限の定め）からの
          適合確認は、<strong>価格説明資料の「インボイス枠（電子取引類型）補助対象要件 適合表」</strong>
          に同一の要件番号で記載しています。
        </p>
      </section>

      {/* 電子取引プラットフォームとしての性質の説明 */}
      <section className="mb-8 page-break-before avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-2">
            電子取引類型 必須要件 対応説明
          </p>
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            本ITツールは「招待型 電子取引プラットフォーム」です
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            デジタル化・AI導入補助金2026 インボイス枠 <strong>電子取引類型</strong> は、
            「発注者と受注者双方が利用可能な電子取引プラットフォームであり、
            両社間で商取引情報（発注書・請求書等）を電子的に授受できるソフトウェア」を
            補助対象とします。本ツール「{TOOL_NAME}」が、当該類型の必須要件を
            全て充足していることを以下に明示します。
          </p>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-56">
                  電子取引類型 の要件
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-center text-sm font-bold w-20">
                  本ツール<br />対応
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                  本ツールでの実装内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ① 発注者・受注者双方が<br />利用可能なプラットフォーム
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注側企業と受注側企業の両方が同一プラットフォーム上でアカウントを保有し、
                  発注書・請求書等の商取引情報を電子的に授受可能。
                  Company モデルには companyType（CONTRACTOR＝発注側 / SUBCONTRACTOR＝受注側）が
                  設定され、Invitation 経由で受注側が招待受諾すると自動的に SUBCONTRACTOR 企業として作成される。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ② 招待型・受注側企業への<br />無償アカウント発行
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注側企業が /partners/invite から取引先の会社名・担当者メールアドレスを
                  入力し、招待URL（30日間有効）を発行。受注側企業は招待URLから
                  <strong>費用負担ゼロ</strong>でアカウントを作成できる。
                  受注側企業には課金・アカウント発行料・月額費用等、一切請求されない。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ③ 両社間の電子取引データ<br />授受機能
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注書（Order モデル）・請求書（Invoice モデル）の作成・送付・受領・
                  承認・支払を、両社間で電子的に授受可能。紙・FAX・メール添付・押印を撤廃。
                  発注書 → 検収 → 請求書 → 支払 の一気通貫な電子取引フローを提供。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ④ 電子帳簿保存法<br />電子取引要件対応
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  確定した発注書・請求書に対して SHA-256 ハッシュ＋タイムスタンプを自動付与し、
                  改ざん防止を担保。検索要件3項目（取引年月日・取引金額・取引先）で
                  絞り込み可能な状態で保存し、2024年1月に義務化された電子取引データの
                  電子保存要件を満たす。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  ⑤ インボイス制度対応
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  適格請求書発行事業者登録番号（T＋13桁）を国税庁Web-APIで自動検証。
                  税率別合計表示、免税事業者からの仕入に対する経過措置（80%→50%→0%）の
                  日付基準での自動適用、適格請求書フォーマットでの PDF 出力に対応。
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-xs leading-relaxed">
            <p className="font-bold mb-1">対応する機能セクションへのページ参照</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>
                <strong>① 招待型アカウント発行機能の詳細</strong> →
                §3-1 招待管理機能（本資料 P.14）
              </li>
              <li>
                <strong>② 両社間の発注・請求授受機能の詳細</strong> →
                §3-2 発注管理機能（P.16）／§3-4 請求管理機能（P.18）
              </li>
              <li>
                <strong>③ 業務フロー全体（招待発行→受諾→電子取引成立）</strong> →
                §4 業務フロー図［図1］（P.25〜P.26）
              </li>
              <li>
                <strong>④ 電子取引データ保存の実装</strong> →
                §3-6 電子帳簿保存法対応（P.19）
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 受発注機能 明示セクション — ITツール登録要領 2-3 (1) 4. 対応（会計／受発注／決済の有無明示） */}
      <section className="mb-8 page-break-before avoid-break">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.4em] mb-2">
            ITツール登録要領 2-3 (1) 4. の対応説明
          </p>
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            本ITツールは「受発注機能」を有します
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            ITツール登録要領「2-3 各カテゴリーの内容（1）カテゴリー1 ソフトウェア
            4. 『会計』『受発注』『決済』の3つの機能のいずれかを有するソフトウェアに関する留意事項」
            に基づき、本ITツール「{TOOL_NAME}」が
            <strong className="bg-yellow-200">『受発注』機能</strong>
            を有していることを以下の表で明示します。
          </p>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-44">
                  カテゴリ機能
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-center text-sm font-bold w-24">
                  本ツールでの<br />該当有無
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                  本ツールでの実装内容
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-black px-3 py-2 font-bold">
                  会計機能
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-2xl font-black">
                  ×
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs">
                  仕訳・元帳・試算表・財務三表等の会計機能は提供しません。
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base">
                  受発注機能<br />（本ツールが該当）
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-3xl font-black">
                  ◎
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  <strong>買い手側（発注側企業）機能</strong>:
                  発注書作成（PO-YYYYMMDD-XXXX 自動採番）、明細・税率・消費税の自動計算、
                  仕入管理、買掛・支払管理（ステータス: 発注済→請負済→納品完了→検収完了→支払済）。
                  <br />
                  <strong>売り手側（受注側企業・無償アカウント）機能</strong>:
                  受領発注書の受諾・納品報告、発注書からの請求書自動生成（INV-YYYYMMDD-XXXX 採番）、
                  売上請求管理、売掛・回収管理（ステータス: 提出→承認→支払）、
                  適格請求書等保存方式準拠のPDF／CSV出力。
                  <br />
                  <strong>両社間電子取引（電子取引類型 特有）</strong>:
                  招待型アカウント発行により発注側・受注側の両社が同一プラットフォーム上で
                  発注書・請求書等の商取引情報を電子的に授受。
                  <br />
                  <strong>取引先・契約条件管理／承認・統制機能</strong>:
                  取引先マスタ（適格請求書発行事業者登録番号の国税庁Web-API自動検証）、案件管理、
                  多段階承認ワークフロー、監査ログ、SHA-256ハッシュ＋タイムスタンプによる改ざん防止
                  （電子帳簿保存法 電子取引要件準拠）。
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black px-3 py-2 font-bold">
                  決済機能
                </td>
                <td className="border-2 border-black px-3 py-2 text-center text-2xl font-black">
                  ×
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs">
                  POSレジ等の決済機能や、商品売買に伴う金銭のやり取りで債権債務を解消する機能は提供しません。
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-xs leading-relaxed">
            <p className="font-bold mb-1">対応する機能セクションへのページ参照</p>
            <ul className="list-disc pl-5 space-y-0.5">
              <li>
                <strong>買い手側 受発注機能の詳細</strong> →
                §3-2 発注管理機能（P.16）／ §3-3 取引先管理機能（P.17）
              </li>
              <li>
                <strong>売り手側 受発注機能（請求）の詳細</strong> →
                §3-4 請求管理機能（P.18）／ §3-5 インボイス制度対応（P.19）
              </li>
              <li>
                <strong>両社間電子取引の基盤（招待型アカウント発行）</strong> →
                §3-1 招待管理機能（P.14）
              </li>
              <li>
                <strong>業務フロー全体（発注側／受注側 並列）</strong> →
                §4 業務フロー図［図1］（P.25〜P.26）
              </li>
            </ul>
          </div>

          <p className="mt-3 text-xs text-slate-600">
            ※ 本セクションは ITツール登録要領「2-3 各カテゴリーの内容（1）4.」の留意事項に対応するために設けたものです。
          </p>
        </div>
      </section>

      {/* ★ 売り手側機能・買い手側機能 の両方保有を明示（電子取引類型 必須要件） */}
      <section className="mb-8 page-break-before">
        <div className="border-4 border-black p-6">
          <p className="text-center text-sm font-bold tracking-[0.3em] mb-2">
            インボイス枠（電子取引類型）必須要件 対応説明
          </p>
          <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">
            本ITツールは「売り手側機能」と「買い手側機能」を
            <br />
            両方有しています
          </h2>

          <p className="text-sm leading-relaxed mb-4">
            インボイス枠（電子取引類型）では、ITツールが
            <strong className="bg-yellow-200">売り手側・買い手側の機能を両方有していること</strong>
            が必須要件とされています。本ITツール「{TOOL_NAME}」は、発注側企業（買い手側）と、
            招待を受けた受注側企業（売り手側）が同一プラットフォーム上でそれぞれの機能を利用し、
            両社間で発注書・請求書を電子的に授受します。
            各機能の実装状況と、実際の<strong>画面キャプチャ</strong>の掲載箇所は以下のとおりです。
          </p>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-40">
                  区分
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-52">
                  機能
                </th>
                <th className="border-2 border-black bg-black text-white px-2 py-2 text-center text-sm font-bold w-16">
                  有無
                </th>
                <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                  本ITツールでの実装内容 ／ 画面キャプチャ
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 font-black text-base" rowSpan={4}>
                  買い手側機能
                  <br />
                  <span className="text-xs font-bold">
                    （発注側企業＝有償契約者のアカウント）
                  </span>
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">発注管理</td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注書の作成（PO-YYYYMMDD-XXXX 自動採番）・多段階承認・発行。
                  <strong>画面キャプチャ Fig.4（発注書一覧）・Fig.5（発注書新規作成）</strong>
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">
                  仕入管理（仕入明細）
                </td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注明細で品名・仕様・数量・単位・単価・金額・税率を明細行単位で管理し、
                  税抜／消費税／税込を自動計算。<strong>画面キャプチャ Fig.5</strong>
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">買掛・支払管理</td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  受注側企業から提出された請求書の受領・確認・承認・支払ステータス管理
                  （提出済 → 承認済 → 支払済）。<strong>画面キャプチャ Fig.7（請求書一覧）</strong>
                </td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">
                  取引先管理（インボイス番号）
                </td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  取引先の適格請求書発行事業者登録番号を管理し、国税庁Web-APIで自動検証。
                  <strong>画面キャプチャ Fig.6（取引先一覧）</strong>
                </td>
              </tr>

              <tr className="bg-green-50">
                <td className="border-2 border-black px-3 py-2 font-black text-base" rowSpan={4}>
                  売り手側機能
                  <br />
                  <span className="text-xs font-bold">
                    （受注側企業＝無償招待アカウント）
                  </span>
                </td>
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">
                  受注管理（発注書の受領）
                </td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  発注側企業が発行した発注書を受注側企業のアカウントで受領・内容確認し、
                  受諾・納品報告を行う。<strong>画面キャプチャ Fig.8（受注側で受領した発注書一覧）</strong>
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">売上請求管理</td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  受注側企業が適格請求書を作成（INV-YYYYMMDD-XXXX 自動採番／発注書からの明細引継ぎ）し、
                  発注側企業へ電子的に提出。
                  <strong>画面キャプチャ Fig.9（受注側の請求書一覧）・Fig.10（請求書新規作成）</strong>
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">売掛・回収管理</td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">◎</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  自社が発行した請求書の支払期限とステータス（提出済 → 承認済 → 支払済）を
                  一覧で管理し、未回収債権を把握。<strong>画面キャプチャ Fig.9</strong>
                </td>
              </tr>
              <tr>
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">
                  電子記録債権・手形管理
                </td>
                <td className="border-2 border-black px-2 py-2 text-center text-2xl font-black">—</td>
                <td className="border-2 border-black px-3 py-2 text-xs leading-relaxed">
                  本ITツールでは提供していません（登録要領の例示のうち、
                  売上請求管理・売掛・回収管理を搭載しています）。
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 border-2 border-black p-3 text-xs leading-relaxed">
            <p className="font-bold mb-1">両社間で電子取引が成立することの確認方法</p>
            <p>
              同一の取引（案件「本社オフィス什器導入プロジェクト」）について、
              買い手側では発注書 <span className="font-mono">PO-20260407-0001</span> を発行し
              （<strong>Fig.4</strong>）、売り手側では同じ発注書を受領して
              （<strong>Fig.8</strong>）請求書 <span className="font-mono">INV-20260428-0001</span> を
              作成・提出しています（<strong>Fig.9</strong>）。
              買い手側では当該請求書を受領・承認します（<strong>Fig.7</strong>）。
              業務フロー全体は §4 業務フロー図［図1］を参照してください。
            </p>
          </div>
        </div>
      </section>

      {/* ★ 画面キャプチャ 一覧 */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          画面キャプチャ 一覧（全{SCREEN_CAPTURES.length}点）
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          本資料に掲載している<strong>画面キャプチャ</strong>の一覧です。
          いずれも本ITツール「{TOOL_NAME}」の実稼働環境
          （<span className="font-mono">https://dlsystem.aigrowthx.pro</span>）で取得した実画面です。
          買い手側（発注側企業）・売り手側（受注側企業）それぞれのアカウントで
          ログインした画面を掲載しています。
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-black bg-black text-white px-2 py-2 text-left text-sm font-bold w-20">
                図番号
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold w-24">
                区分
              </th>
              <th className="border-2 border-black bg-black text-white px-3 py-2 text-left text-sm font-bold">
                画面名 ／ 確認できる機能
              </th>
              <th className="border-2 border-black bg-black text-white px-2 py-2 text-center text-sm font-bold w-24">
                掲載ページ
              </th>
            </tr>
          </thead>
          <tbody>
            {SCREEN_CAPTURES.map((c) => (
              <tr key={c.fig} className={c.side === "売り手側" ? "bg-green-50" : undefined}>
                <td className="border-2 border-black px-2 py-2 font-black">{c.fig}</td>
                <td className="border-2 border-black px-3 py-2 text-xs font-bold">{c.side}</td>
                <td className="border-2 border-black px-3 py-2 text-xs">{c.desc}</td>
                <td className="border-2 border-black px-2 py-2 text-center font-mono text-xs">
                  {c.page}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 1. Product Overview */}
      <section className="mb-8 avoid-break page-break-before">
        <h2 className="mb-3 border-l-4 border-black pl-3 text-lg font-bold">
          1. 製品概要
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["ITツール正式名称", TOOL_NAME],
              // 別紙1（1）1.【大分類Ⅰソフトウェア】No.2:
              // 「同一のＩＴツールにおいて、複数のプラン名が存在する場合は、プラン名を明記すること」
              [
                "プラン名",
                DENSHI_PLANS.map(
                  (pl) => `${pl.name}（年額 ${jpy(yearly(pl))}・税抜）`
                ).join(" ／ "),
              ],
              ["開発メーカー名", MAKER_NAME],
              ["IT導入支援事業者名", providerName],
              ["提供形態", "クラウド型SaaS（マルチテナント／ブラウザ利用／招待型プラットフォーム）"],
              ["対応ブラウザ", "Chrome / Edge / Safari / Firefox 最新版"],
              ["対応端末", "PC・タブレット・スマートフォン（レスポンシブ対応）"],
              ["対象事業者", "発注側企業（有償契約）／招待を受けた受注側企業（無償利用）"],
              [
                "主要機能",
                "招待型アカウント発行／発注管理／取引先管理（インボイス番号検証）／請求管理／両社間電子取引／承認ワークフロー／監査ログ",
              ],
              [
                "法令対応",
                "適格請求書等保存方式（インボイス制度）／電子帳簿保存法（電子取引要件）／下請法・請負契約一般の必要記載事項",
              ],
              [
                "AIを用いた機能",
                "搭載なし（生成AI・生成AI以外のAI技術のいずれも使用していません）",
              ],
              ["主Pコード", "共P-02（決済・債権債務・資金回収）"],
              ["副Pコード", "設定なし（共P-02 単独申請）"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b-2 border-black">
                <th className="w-40 border-2 border-black bg-slate-100 px-3 py-2 text-left text-xs font-bold text-slate-900">
                  {k}
                </th>
                <td className="border-2 border-black px-3 py-2 font-medium">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 2. Problem & Benefit */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-teal-700 pl-3 text-lg font-bold">
          2. 解決する業務課題と導入効果
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                導入前の課題
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                本ツールによる解決／効果
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "取引先側の電子化コストがネックで、電子取引が進まない",
                "招待型・受注側企業は完全無償。発注側企業の負担のみで取引先まで巻き込んだ電子化が可能",
              ],
              [
                "発注書・請求書を紙・FAX・メール添付で運用",
                "両社間電子取引プラットフォームで発注→受注→請求→支払を一気通貫で電子化",
              ],
              [
                "取引先が適格請求書発行事業者かどうか都度確認",
                "国税庁Web-API連携で登録番号を自動検証。登録事業者名を自動取得",
              ],
              [
                "承認の押印フローで業務が数日止まる",
                "電子承認ワークフローで承認スピードを大幅短縮。スマホからも承認可能",
              ],
              [
                "電子帳簿保存法 電子取引要件が未対応",
                "確定時にSHA-256ハッシュ＋タイムスタンプを自動付与、検索3項目を標準搭載",
              ],
              [
                "監査・内部統制の証跡が残らない",
                "全操作を監査ログに自動記録、ADMINから絞り込み閲覧可能",
              ],
            ].map(([before, after]) => (
              <tr key={before}>
                <td className="border border-slate-300 px-3 py-2 align-top">{before}</td>
                <td className="border border-slate-300 px-3 py-2 align-top">{after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.1"
        caption="ダッシュボード（サマリカード・最近の発注／請求）"
        sourceUrl="https://dlsystem.aigrowthx.pro/"
        src="/images/transact/dashboard.png"
      />

      {/* 3-1. 招待管理機能 */}
      <section className="page-break-before mb-8">
        <h2 className="mb-3 border-l-4 border-teal-700 pl-3 text-lg font-bold">
          3. 機能詳細
        </h2>

        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-1. 招待管理機能（電子取引類型 必須要件の中核機能）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            電子取引類型 対応（招待型アカウント発行／両社間プラットフォーム成立）
          </span>
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（両社間の発注・請求授受の基盤機能）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-48">
                機能
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                詳細
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "招待作成",
                "発注側企業の管理者／発注担当者が /partners/invite から取引先の会社名・担当者名・担当者メールを入力し、招待URLを発行",
              ],
              [
                "招待URL トークン",
                "crypto.randomBytes(24) による推測困難なトークンをbase64url形式で生成",
              ],
              [
                "有効期限管理",
                "招待発行から30日間有効。期限を過ぎた招待は自動的に EXPIRED ステータスに遷移し、以後は受諾不可",
              ],
              [
                "招待受諾ページ（公開）",
                "/invite/[token] で招待情報を表示。会社情報（会社コード・住所・電話等）・管理者情報（名前・メール・パスワード）を入力し、Company + User を同時作成",
              ],
              [
                "受注側企業への課金",
                "一切なし。招待受諾で作成された Company・User には課金コードを付与しない設計",
              ],
              [
                "招待取消",
                "招待発行元の管理者は PENDING 状態の招待を取消可能。取消後は招待URLからのアカウント作成不可",
              ],
              [
                "ステータス管理",
                "PENDING（招待中）／ACCEPTED（受諾済）／REVOKED（取消済）／EXPIRED（期限切れ）の4状態",
              ],
              [
                "監査ログ連携",
                "招待発行・受諾・取消の全操作を AuditLog に自動記録（INVITE_CREATE / INVITE_ACCEPT / INVITE_REVOKE）",
              ],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 align-top text-xs font-bold">
                  {k}
                </td>
                <td className="border border-slate-300 px-3 py-2 align-top">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.2"
        caption="取引先招待 画面（発注側管理者による招待URL発行）"
        sourceUrl="https://dlsystem.aigrowthx.pro/partners/invite"
        src="/images/transact/partners-invite.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.3"
        caption="招待受諾ページ（受注側企業が費用ゼロでアカウント作成）"
        sourceUrl="https://dlsystem.aigrowthx.pro/invite/[token]"
        src="/images/transact/invite-accept.png"
      />

      {/* 3-2 Orders */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-2. 発注管理機能（両社間電子取引の起点）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（発注・仕入管理／買掛・支払管理／採算管理）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "発注書作成",
                "明細行追加／品名・仕様・数量・単位・単価・金額を入力。税抜→税込を自動計算",
              ],
              ["発注番号自動採番", "PO-YYYYMMDD-XXXX 形式で連番採番し重複を防止"],
              [
                "承認ワークフロー",
                "多段階承認（申請→1次承認→2次承認→…→発注済）。却下コメント必須、差戻し可能",
              ],
              [
                "ステータス遷移",
                "下書き／申請中／承認済／発注済／請負済／納品完了／検収完了／却下／取消 の9状態管理",
              ],
              [
                "確定（電帳法対応）",
                "検収完了時点で SHA-256 ハッシュと確定日時を自動記録し、以後は編集不可",
              ],
              [
                "発注書印刷／PDF出力",
                "A4最適化の印刷レイアウト。適格請求書対応の登録番号表記、取引契約必要記載事項欄を完備",
              ],
              [
                "受注側企業への通知",
                "発注書確定と同時に、招待受諾済み受注側企業のダッシュボードに新着表示",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.4"
        caption="発注書 一覧画面"
        sourceUrl="https://dlsystem.aigrowthx.pro/orders"
        src="/images/transact/orders-list.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.5"
        caption="発注書 新規作成画面（明細入力・税率自動計算・免税事業者警告表示）"
        sourceUrl="https://dlsystem.aigrowthx.pro/orders/new"
        src="/images/transact/orders-new.png"
      />

      {/* 3-3 Partners */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-3. 取引先管理機能（インボイス制度対応の要）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（採算管理／インボイス制度対応）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "取引先マスタ CRUD",
                "会社コード、会社種別（発注企業／受注企業）、住所、電話、メール、インボイス番号",
              ],
              [
                "招待からの自動連携",
                "招待を受諾した受注側企業は自動的に取引先マスタに登録される（重複防止）",
              ],
              [
                "インボイス番号フォーマット検証",
                "T＋13桁数字 / チェックデジットの整合性を入力時にリアルタイム検証",
              ],
              [
                "国税庁Web-API 連携",
                "公表サイトAPIで登録番号の有効性を照会し、登録事業者名を自動取得",
              ],
              [
                "免税事業者判定",
                "登録番号未設定＝免税事業者として扱い、発注書作成時に画面上で警告表示",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.6"
        caption="取引先管理 一覧画面（インボイス番号列を含む）"
        sourceUrl="https://dlsystem.aigrowthx.pro/partners"
        src="/images/transact/partners-list.png"
      />

      {/* 3-4 Invoice */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-4. 請求管理機能（両社間電子取引の完結）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（受注・売上請求管理／売掛・回収管理）
          </span>
        </div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["請求書作成", "受注側企業が発注書から請求書を自動生成（明細を引き継ぎ、再入力不要）"],
              ["請求番号自動採番", "INV-YYYYMMDD-XXXX 形式"],
              [
                "適格請求書出力",
                "登録番号・税率別合計・消費税額を明記したA4印刷レイアウトに対応",
              ],
              ["CSV出力", "BOM付きUTF-8でExcel直読み込み可能"],
              ["ステータス管理", "下書き／提出済／承認済／却下／支払済 の5状態"],
              [
                "発注側企業への通知",
                "請求書提出と同時に、発注側企業のダッシュボードに新着表示",
              ],
              [
                "確定（電帳法対応）",
                "発注書と同様に SHA-256 ハッシュ＋タイムスタンプを自動記録",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.7"
        caption="請求書 一覧画面"
        sourceUrl="https://dlsystem.aigrowthx.pro/invoices"
        src="/images/transact/invoices-list.png"
      />

      {/* 3-5 Invoice compliance */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-5. インボイス制度対応
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "適格請求書発行事業者登録番号",
                "取引先／自社マスタに登録。国税庁Web-APIで自動検証",
              ],
              [
                "税率別合計表示",
                "標準税率10%／軽減税率8%の混在明細に対応、税率別合計を表示・出力",
              ],
              [
                "経過措置の自動適用",
                "2023/10〜:控除80%、2026/10〜:控除50%、2029/10〜:控除0%を発注日基準で自動適用",
              ],
              [
                "適格請求書レイアウト",
                "登録番号・税率別対価・税額・発行者名等の必須項目を充足",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3-6 e-book */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-6. 電子帳簿保存法 電子取引要件対応
        </h3>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              [
                "電子取引要件",
                "発注書・請求書データをクラウドに原本保存、2024年1月の電子取引保存義務化に対応",
              ],
              [
                "改ざん防止措置",
                "確定時に SHA-256 ハッシュ＋確定タイムスタンプを自動付与",
              ],
              [
                "検索要件3項目",
                "取引年月日・取引金額・取引先名による絞り込みを標準画面で提供",
              ],
              [
                "データ保全",
                "日次自動バックアップ、障害時は最大24時間前まで復旧可能",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-48 bg-slate-50 px-3 py-2 text-left text-xs font-bold align-top">
                  {k}
                </th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3-7 Workflow & 3-8 Audit */}
      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-7. 承認ワークフロー・権限管理
        </h3>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>多段階承認（ApprovalFlow テーブルで柔軟な承認経路を設定）</li>
          <li>却下時のコメント必須入力、再申請時の修正材料として保持</li>
          <li>
            ロールベース権限（管理者／発注担当／受注担当）によるアクセス制御
          </li>
          <li>
            会社ID（companyId）によるマルチテナント自動スコープ、招待受諾で作成された
            受注側企業も自社データのみ閲覧可能
          </li>
        </ul>
      </section>

      <section className="mb-8 avoid-break">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-8. 監査ログ・内部統制
        </h3>
        <ul className="list-disc pl-6 text-sm leading-relaxed space-y-1">
          <li>作成・更新・削除・承認・却下の全操作を AuditLog に記録</li>
          <li>招待発行・受諾・取消も INVITE_CREATE / INVITE_ACCEPT / INVITE_REVOKE として記録</li>
          <li>操作日時・ユーザー名・IPアドレス・操作内容を保持</li>
          <li>管理者画面から日時・対象種別・操作者で絞り込み閲覧可能</li>
        </ul>
      </section>

      {/* 3-9 受注側企業（売り手側）の画面 — 画面キャプチャ Fig.8〜Fig.10 */}
      <section className="mb-8 page-break-before">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-9. 受注側企業（売り手側）の機能・画面
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-green-200 px-3 py-1 text-xs font-black">
            売り手側機能（受注管理／売上請求管理／売掛・回収管理）
          </span>
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            共P-02 対応（受注・売上請求管理／売掛・回収管理）
          </span>
        </div>
        <p className="mb-3 text-sm leading-relaxed">
          以下は、招待を受けた<strong>受注側企業（売り手側）の無償アカウント</strong>
          （ケヤキ工房株式会社／受注担当 森 四郎）でログインした実画面です。
          発注側企業（買い手側）とは<strong>メニュー・操作権限・データ参照範囲が分離</strong>されており、
          受注側企業は自社が受領した発注書と、自社が発行する請求書のみを扱います。
        </p>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.8"
        caption="【売り手側】受注側企業が受領した発注書の一覧（受注管理）"
        sourceUrl="https://dlsystem.aigrowthx.pro/orders"
        src="/images/transact/seller-orders.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.9"
        caption="【売り手側】受注側企業が発行した請求書の一覧（売上請求管理・売掛/回収管理）"
        sourceUrl="https://dlsystem.aigrowthx.pro/invoices"
        src="/images/transact/seller-invoices.png"
      />
      <ScreenshotPlaceholder
        figure="Fig.10"
        caption="【売り手側】受注側企業による適格請求書の新規作成画面（売上請求管理）"
        sourceUrl="https://dlsystem.aigrowthx.pro/invoices/new"
        src="/images/transact/seller-invoice-new.png"
      />

      {/* 3-10 アカウント利用状況管理 — 画面キャプチャ Fig.11 */}
      <section className="mb-8 page-break-before">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-10. アカウント利用状況管理（発行済み受注側アカウントの一覧）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-blue-200 px-3 py-1 text-xs font-black">
            買い手側機能（発行した受注側アカウントの状況管理）
          </span>
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            留意事項 ③ 対応（発行した受注者側アカウントと利用者の状況管理）
          </span>
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            留意事項 ⑥ 対応（発行上限の管理）
          </span>
        </div>
        <p className="mb-3 text-sm leading-relaxed">
          発注側企業の管理者は「アカウント利用状況」画面で、<strong>無償発行した受注側企業アカウントの
          利用状況を一覧で管理</strong>できます。事業者名・<strong>適格請求書発行事業者登録番号
          （インボイス管理番号）</strong>・アカウント発行経路（招待受諾／直接登録）・利用者数・
          直近の取引日・受領発注件数／発行請求件数を一画面で確認できます。
        </p>
        <p className="mb-3 text-sm leading-relaxed">
          あわせて、画面上部に<strong>契約プランの発行上限に対する消化状況</strong>
          （発行済みアカウント数／招待中件数／上限数）を表示します。
          上限に達すると新規の招待発行は行えず、<strong>受注側アカウントを上限なく発行できる契約は
          提供していません</strong>。各行には受注側企業の<strong>利用料 0円</strong>を明示しています。
        </p>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.11"
        caption="【買い手側】アカウント利用状況（発行済み受注側アカウントの一覧・インボイス管理番号・発行上限の消化状況）"
        sourceUrl="https://dlsystem.aigrowthx.pro/partners/accounts"
        src="/images/transact/partner-accounts.png"
      />

      {/* 3-11 電子取引アーカイブ — 画面キャプチャ Fig.12 */}
      <section className="mb-8 page-break-before">
        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          3-11. 電子取引アーカイブ（電子帳簿保存法 検索要件への対応）
        </h3>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-blue-200 px-3 py-1 text-xs font-black">
            買い手側機能（電子取引データの検索・保存）
          </span>
          <span className="inline-block border-2 border-black bg-green-200 px-3 py-1 text-xs font-black">
            電子帳簿保存法 電子取引要件 対応
          </span>
        </div>
        <p className="mb-3 text-sm leading-relaxed">
          電子帳簿保存法が電子取引データの保存に求める<strong>検索要件3項目
          （① 取引年月日 ② 取引金額 ③ 取引先）</strong>で、発注書と請求書を
          <strong>横断検索</strong>できる専用画面を標準搭載しています。
          取引年月日と取引金額は<strong>範囲検索</strong>に、3項目は
          <strong>組み合わせ検索</strong>に対応します。
        </p>
        <p className="mb-3 text-sm leading-relaxed">
          検索結果には、各データの<strong>確定日時（タイムスタンプ）</strong>と
          <strong>SHA-256 ハッシュ値</strong>を併記し、改ざん防止措置が講じられていることを
          画面上で確認できます。
        </p>
      </section>

      <ScreenshotPlaceholder
        figure="Fig.12"
        caption="【買い手側】電子取引アーカイブ（電子帳簿保存法 検索要件3項目による発注書・請求書の横断検索／SHA-256ハッシュ・タイムスタンプ表示）"
        sourceUrl="https://dlsystem.aigrowthx.pro/archive"
        src="/images/transact/archive.png"
      />

      {/* §4 章扉ページ */}
      <section className="mb-6 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold mb-2">CHAPTER 4</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            業 務 フ ロ ー 図
          </h2>
          <p className="text-sm mt-3">［図1］招待発行→受諾→両社間電子取引成立の業務フロー</p>
          <p className="text-xs mt-2 text-slate-600">
            開発メーカー: {MAKER_NAME} ／ ITツール: {TOOL_NAME}
          </p>
        </div>
      </section>

      {/* 4. Business Flow Diagram */}
      <section className="mb-8">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §4. 業務フロー図
        </h2>
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-block border-2 border-black bg-yellow-200 px-3 py-1 text-xs font-black">
            電子取引類型 対応（招待型・両社間電子取引プラットフォームの成立プロセス）
          </span>
        </div>
        <p className="mb-4 text-sm leading-relaxed">
          {TOOL_NAME}の中核となる、招待発行から両社間電子取引成立、
          その後の発注→受注→請求→支払の完結までの業務フローを以下の図に示します。
        </p>

        <figure className="my-6 border-2 border-black p-4 avoid-break">
          <figcaption className="mb-3 text-center text-sm font-bold">
            ［図1］招待発行→受諾→両社間電子取引成立
          </figcaption>

          <svg
            viewBox="0 0 900 820"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            role="img"
            aria-label={`業務フロー図 ${TOOL_NAME}`}
          >
            <defs>
              <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
              </marker>
            </defs>

            <rect x="10" y="10" width="430" height="34" fill="#000" />
            <text x="225" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
              発注側企業（招待発行元・有償）
            </text>
            <rect x="460" y="10" width="430" height="34" fill="#000" />
            <text x="675" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">
              受注側企業（招待受諾者・無償）
            </text>

            {[
              { y: 60, t1: "① 契約・アカウント発行", t2: "有償プラン契約" },
              { y: 140, t1: "② 取引先招待発行", t2: "会社名・メール入力→URL生成" },
              { y: 300, t1: "③ 招待一覧で状態確認", t2: "PENDING→ACCEPTED表示" },
              { y: 400, t1: "④ 発注書起票", t2: "明細・税率／消費税自動計算" },
              { y: 480, t1: "⑤ 多段階承認", t2: "ワークフロー（スマホ承認可）" },
              { y: 560, t1: "⑥ 発注確定", t2: "SHA-256+TS付与→受注側通知" },
              { y: 700, t1: "⑦ 検収→請求書受領", t2: "支払処理→支払済へ" },
            ].map((s) => (
              <g key={`b2-${s.y}`}>
                <rect x="20" y={s.y} width="410" height="54" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="225" y={s.y + 22} textAnchor="middle" fontSize="14" fontWeight="bold">{s.t1}</text>
                <text x="225" y={s.y + 42} textAnchor="middle" fontSize="11" fill="#333">{s.t2}</text>
              </g>
            ))}

            {[
              { y: 140, t1: "② 招待URL受領", t2: "メール等で招待URL受け取り" },
              { y: 220, t1: "③ 招待受諾", t2: "会社情報入力→無償アカウント作成" },
              { y: 300, t1: "④ ログイン開始", t2: "自社データスコープで利用開始" },
              { y: 400, t1: "⑤ 発注書受領通知", t2: "システム新着＋メール" },
              { y: 480, t1: "⑥ 発注受諾→納品", t2: "履行期間内で作業実施→報告" },
              { y: 620, t1: "⑦ 請求書起票", t2: "発注書から明細自動引継ぎ" },
              { y: 700, t1: "⑧ 適格請求書送付", t2: "SHA-256+TS付与→発注側通知" },
            ].map((s) => (
              <g key={`s2-${s.y}`}>
                <rect x="470" y={s.y} width="410" height="54" fill="#fff" stroke="#000" strokeWidth="2" />
                <text x="675" y={s.y + 22} textAnchor="middle" fontSize="14" fontWeight="bold">{s.t1}</text>
                <text x="675" y={s.y + 42} textAnchor="middle" fontSize="11" fill="#333">{s.t2}</text>
              </g>
            ))}

            {/* Invitation URL arrow */}
            <line x1="430" y1="167" x2="470" y2="167" stroke="#000" strokeWidth="3" markerEnd="url(#arrow2)" />
            <text x="450" y="158" textAnchor="middle" fontSize="11" fill="#000" fontWeight="bold">招待URL</text>

            <rect x="20" y="260" width="860" height="30" fill="#f59e0b" />
            <text x="450" y="280" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="bold">
              ★ 電子取引類型 の中核：無償招待によるアカウント発行が完了 → 両社間電子取引 開始
            </text>

            <line x1="430" y1="427" x2="470" y2="427" stroke="#000" strokeWidth="2" markerEnd="url(#arrow2)" />
            <text x="450" y="418" textAnchor="middle" fontSize="10" fill="#000">発注書</text>

            <line x1="470" y1="647" x2="430" y2="727" stroke="#000" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow2)" />
            <text x="450" y="695" textAnchor="middle" fontSize="10" fill="#000">請求書</text>
          </svg>

          <p className="mt-3 text-[10px] text-slate-700 leading-relaxed">
            凡例: 実線矢印＝同一企業内のステップ遷移／実線矢印（企業間・横方向）＝
            システム通知・データ伝達／破線矢印＝ステータス情報の同期。
            オレンジ帯は電子取引類型 の中核となる「招待受諾完了→両社間電子取引開始」
            のフェーズ境界を示します。
          </p>
        </figure>
      </section>

      {/* §5 章扉ページ */}
      <section className="mb-6 page-break-before avoid-break">
        <div className="border-4 border-black p-8 text-center">
          <p className="text-sm font-bold mb-2">CHAPTER 5</p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
            I T ツ ー ル の 利 用 方 法
          </h2>
          <p className="text-sm mt-3">5-1 招待発行 ／ 5-2 招待受諾 ／ 5-3 発注業務 ／ 5-4 受注業務 ／ 5-5 承認 ／ 5-6 管理者運用</p>
          <p className="text-xs mt-2 text-slate-600">
            開発メーカー: {MAKER_NAME} ／ ITツール: {TOOL_NAME}
          </p>
        </div>
      </section>

      {/* 5. How to use */}
      <section className="mb-8">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          §5. ITツールの利用方法
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          {TOOL_NAME}の日常的な利用手順を、招待発行から両社間電子取引成立、
          その後の発注・受注・請求業務までの典型的な操作フローに沿って説明します。
        </p>

        <h3 className="mt-5 mb-2 text-base font-bold text-slate-900">
          5-1. 招待発行手順（発注側企業）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>発注側管理者アカウントでログイン。</li>
          <li>サイドバー「取引先招待」→ 招待発行フォームを表示。</li>
          <li>取引先の会社名、担当者名（任意）、担当者メールアドレスを入力。</li>
          <li>任意で招待メッセージを入力し「招待URLを発行」ボタンをクリック。</li>
          <li>発行された招待URLをコピーし、取引先へメール等で送付。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-2. 招待受諾手順（受注側企業／完全無償）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>発注側から送付された招待URLをクリック。</li>
          <li>招待情報表示ページで、招待元・招待先・有効期限を確認。</li>
          <li>「アカウント作成フォーム」に会社情報・管理者情報を入力。</li>
          <li>「無償アカウントを作成する」ボタンをクリック。</li>
          <li>作成完了後、ログイン画面へ遷移。作成した管理者アカウントでログイン。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-3. 発注業務フロー（発注側担当者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>「発注管理」→「新規作成」→ 案件・取引先・明細を入力。</li>
          <li>「申請」→ 承認者にメール通知が届く。</li>
          <li>承認完了後、発注書が確定し、受注側企業へ通知される。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-4. 受注業務フロー（受注側担当者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>ログイン → 新着の発注書通知を確認。</li>
          <li>発注内容を確認し、「受諾」を押下。</li>
          <li>納品・作業完了後、「納品報告」を登録。</li>
          <li>検収完了後、「請求管理」→「新規作成」で請求書を起票（明細は発注書から自動引継ぎ）。</li>
          <li>「印刷／PDF出力」で適格請求書を出力し、必要に応じて送付。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-5. 承認業務フロー（承認者）
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>承認依頼メール受信、もしくはダッシュボードで承認待ち件数を確認。</li>
          <li>「承認」画面で対象を選択し、内容を確認。</li>
          <li>承認または却下（コメント必須）を選択。スマホからも操作可能。</li>
        </ol>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          5-6. 管理者運用
        </h3>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-1">
          <li>ユーザー管理：新規ユーザー追加・権限変更・退職者の無効化。</li>
          <li>取引先招待一覧：発行済み招待の状態確認・取消。</li>
          <li>監査ログ：招待発行・受諾・取消を含む全操作を検索。</li>
          <li>取引先マスタ：インボイス番号変更時の再検証、免税事業者の切り替え時期の管理。</li>
        </ol>
      </section>

      {/* 6. Tech stack */}
      <section className="mb-8 avoid-break page-break-before">
        <h2 className="mb-3 border-l-4 border-teal-700 pl-3 text-lg font-bold">
          6. 技術仕様
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["フロントエンド", "Next.js 16（App Router）／React 19／TypeScript 5／Tailwind CSS 4"],
              ["バックエンド", "Next.js Route Handlers（Node.js ランタイム）"],
              ["データベース", "PostgreSQL 16（東京リージョン）"],
              ["ORM", "Prisma 5"],
              ["認証", "NextAuth.js v5（JWT セッション、bcrypt によるパスワードハッシュ化）"],
              ["招待トークン生成", "Node.js crypto.randomBytes(24) → base64url 24バイト＝192ビット強度"],
              ["バリデーション", "Zod（全POST／PUTエンドポイントで検証）"],
              ["ホスティング", "Vercel（東京リージョン hnd1、自動SSL）"],
              ["監視", "Sentry（ランタイムエラー・パフォーマンス監視）"],
              ["CI/CD", "GitHub Actions（ESLint・型チェック・E2Eテスト）"],
              ["E2Eテスト", "Playwright（Chromium）"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 7. Process flow */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-teal-700 pl-3 text-lg font-bold">
          7. 導入プロセス
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-16">#</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-40">フェーズ</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">内容</th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-28">目安期間</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "お申込み・契約", "利用規約同意、プラン選択、GビズID連携のご案内", "1〜2営業日"],
              ["2", "発注側アカウント発行", "管理者アカウント＋サブドメイン発行", "即日〜1営業日"],
              ["3", "初期設定", "自社情報・承認フロー設定、社内ユーザー登録", "1〜5営業日"],
              ["4", "取引先招待発行", "既存取引先へ招待URL送付（CSV一括／個別）", "招待発行は即時"],
              ["5", "取引先受諾", "取引先による招待受諾・無償アカウント作成", "取引先ごと"],
              ["6", "社内トレーニング", "運用マニュアル提供＋オンライン説明会", "1営業日"],
              ["7", "本番運用開始", "監視／サポート契約の発効", "—"],
            ].map(([n, phase, detail, period]) => (
              <tr key={n}>
                <td className="border border-slate-300 px-3 py-2 text-center">{n}</td>
                <td className="border border-slate-300 px-3 py-2 font-bold">{phase}</td>
                <td className="border border-slate-300 px-3 py-2">{detail}</td>
                <td className="border border-slate-300 px-3 py-2 text-xs">{period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 8. Support */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-teal-700 pl-3 text-lg font-bold">
          8. サポート体制
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["窓口", "メール（24時間受付／平日営業時間内対応）、チャット（標準プラン）"],
              ["対応時間", "平日 9:00〜17:30（土日祝・年末年始を除く）"],
              ["SLA目標", "稼働率 99.5%／障害発生時30分以内に状況通知"],
              ["バックアップ", "日次自動バックアップ、最大24時間前までリストア可"],
              ["セキュリティ対応", "脆弱性報告への24時間以内の初動"],
              ["契約期間", "月額（最低契約期間なし）／年額（10%割引）"],
              ["受注側企業のサポート", "招待発行元の発注側企業経由でご対応（受注側単独契約は不要）"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 9. Contact */}
      <section className="mb-4 avoid-break">
        <h2 className="mb-3 border-l-4 border-teal-700 pl-3 text-lg font-bold">
          9. お問い合わせ
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["導入相談・見積", "sales@aigrowthx.pro"],
              ["IT導入補助金 相談", "transact@aigrowthx.pro"],
              ["技術サポート", "support@aigrowthx.pro"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2 font-mono">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-500">
          ※ 連絡先は仮置きです。正式公開時に確定した窓口に差し替えます。
        </p>
      </section>
    </TransactDocumentShell>
  )
}
