import { DSYSTEM_BRAND } from "@/lib/brand"
import { DocumentShell } from "@/app/(public)/subsidy/_components/document-shell"
import {
  DENSHI_REQUIREMENTS,
  SCHEME_NOTE_TITLE,
} from "@/app/(public)/transact/subsidy/_components/denshi-torihiki-requirements"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName
const MAKER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

export function TransactRequirementsDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <DocumentShell
      title="その他要件の説明資料"
      subtitle={`Pコード選択 ／ 電子取引類型 要件適合 ／ 付随要件の対応状況`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      indexHref={`/transact/subsidy${variantSuffix}`}
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >
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

      {/* 1. P-Code Selection */}
      <section className="mb-8">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          1. Pコード 選択一覧
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          {TOOL_NAME}は、以下の Pコード（業務プロセス分類）に該当します。
          「主」は本ツールの中核機能が該当するもの、「副」は付随的に該当するものです。
          本欄は、IT導入補助金 交付申請システムの「Pコード選択画面」への入力内容と対応しています。
        </p>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-2 py-2 text-left text-xs font-bold w-16">
                Pコード
              </th>
              <th className="border border-slate-300 px-2 py-2 text-left text-xs font-bold w-40">
                プロセス
              </th>
              <th className="border border-slate-300 px-2 py-2 text-left text-xs font-bold">
                該当する機能例（公募要領より）
              </th>
              <th className="border border-slate-300 px-2 py-2 text-center text-xs font-bold w-14">
                選択
              </th>
              <th className="border border-slate-300 px-2 py-2 text-left text-xs font-bold">
                本ツールに含まれる機能概要
              </th>
              <th className="border border-slate-300 px-2 py-2 text-left text-xs font-bold w-24">
                機能説明資料の該当ページ
              </th>
            </tr>
          </thead>
          <tbody className="text-xs">
            <tr>
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">共P-01</td>
              <td className="border border-slate-300 px-2 py-2 align-top">①顧客対応・販売支援</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                MA／SFA／CRM／予約受付台帳・無人受付など
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">—</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                非該当。本ツールは顧客管理／販売促進機能を主目的としません。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">—</td>
            </tr>
            <tr className="bg-orange-50">
              <td className="border border-slate-300 px-2 py-2 align-top font-mono font-bold">
                共P-02
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top">
                ②決済・債権債務・資金回収
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                発注・仕入管理、買掛・支払管理、受注・売上請求管理、売掛・回収管理、電子記録債権・手形管理、採算管理
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center font-black text-orange-600">
                ✓<br />主
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                発注書作成（PO-YYYYMMDD-XXXX 自動採番）、承認ワークフロー、請求書作成（INV-YYYYMMDD-XXXX）、取引先マスタ（インボイス番号 国税庁API検証）、経過措置税額自動計算、支払ステータス管理。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                機能説明資料 §3-2／§3-3／§3-4／§4 業務フロー図
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">共P-03</td>
              <td className="border border-slate-300 px-2 py-2 align-top">③供給・在庫・物流</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                取引条件管理（取引先、納入条件）、ロケーション／入出庫管理、在庫分析、納品管理、配送業者管理
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">—</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                本ツールは在庫管理・入出庫・配送業者管理等の物流機能を提供しないため、本Pコードは選択しません。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">—</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">共P-04</td>
              <td className="border border-slate-300 px-2 py-2 align-top">④会計・財務・経営</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                予算統制、仕訳、総勘定元帳、財務三表、固定資産、経費精算、税務申告、管理会計
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">—</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                非該当。会計ソフト機能は保有せず、外部会計ソフトへのCSV連携でのみ対応。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">—</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">共P-05</td>
              <td className="border border-slate-300 px-2 py-2 align-top">
                ⑤総務・人事・給与・労務・教育訓練・法務・情シス・統合業務
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                勤怠、給与計算、人事基本台帳、電子契約、社内資産管理、ビジネスアプリ作成ツール 等
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">—</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                非該当。総務・人事・労務は本ツールの対象外。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">—</td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">
                汎P-07
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top">
                ⑦汎用・自動化・分析ツール
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                ワークフロー、グループウェア、コラボレーションツール、BI・分析専門ツール、RPA、チャットボットシステム 等
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">—</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                承認ワークフロー・通知等のコラボレーション機能は搭載していますが、
                ITツール登録要領により<strong>業務プロセスと汎用プロセスは同時に選択できない</strong>ため、
                本Pコードは選択しません。該当機能は主Pコード（共P-02）の選択プロセス内で説明します。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">—</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 rounded border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed">
          <p className="font-bold">選択方針</p>
          <p className="mt-1">
            本ツールの中核機能は <strong>共P-02（決済・債権債務・資金回収）</strong> に該当し、
            電子取引類型 の要件を充足します。ITツール登録要領により業務プロセスと汎用プロセスは
            同時に選択できないため、<strong>本申請は 共P-02 の単独選択</strong>とします。
            招待型プラットフォームによる両社間コラボレーション（承認ワークフロー・通知）機能は、
            共P-02 に該当する発注・請求の両社間授受機能の一部として機能説明資料 §3-1 で説明しています。
          </p>
        </div>
      </section>

      {/* 2. Denshi-torihiki-type requirements */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          2. 電子取引類型 機能要件への適合
        </h2>
        <div className="mb-4 border-4 border-black p-4">
          <p className="mb-2 border-b-2 border-black pb-1 text-base font-black">
            本ITツールは インボイス枠（電子取引類型）の補助対象となるソフトウェアです
          </p>
          <p className="text-sm leading-relaxed">
            {SCHEME_NOTE_TITLE}に定める全{DENSHI_REQUIREMENTS.length}項目への逐条の適合表は、
            <strong>機能説明資料および価格説明資料の「インボイス枠（電子取引類型）補助対象要件 適合表」</strong>
            に同一の要件番号（①〜⑥）で記載しています。本資料では、当該要件を含む
            電子取引類型の機能要件全般への適合状況を示します。
          </p>
        </div>
        <p className="mb-4 text-sm leading-relaxed">
          デジタル化・AI導入補助金2026 インボイス枠 <strong>電子取引類型</strong> は、
          「発注者と受注者双方が利用可能な電子取引プラットフォームであり、
          両社間で商取引情報（発注書・請求書等）を電子的に授受できるソフトウェア」が対象です。
          {TOOL_NAME}の各要件への適合状況は以下のとおりです。
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-1/3">
                要件
              </th>
              <th className="border border-slate-300 px-3 py-2 text-center text-xs font-bold w-20">
                適合
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                本ツールの対応内容
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "★ 発注者・受注者双方が利用可能な電子取引プラットフォームであること",
                "✓",
                "発注側企業が管理者アカウントを取得後、招待機能により受注側企業へ無償でアカウント発行。両社は同一プラットフォーム上で発注書・請求書等を授受可能。",
              ],
              [
                "★ 招待型・受注側企業への無償アカウント発行機能",
                "✓",
                "/partners/invite から取引先の会社名・担当者メールアドレスを入力し、招待URL（30日間有効）を発行。受注側企業は費用負担なくアカウント作成可能。",
              ],
              [
                "会計／受発注／決済のうち1機能以上",
                "✓",
                "受発注機能（発注書・請求書作成、取引先マスタ、承認ワークフロー）を中核機能として保有",
              ],
              [
                "インボイス制度対応（適格請求書等保存方式）",
                "✓",
                "登録番号の国税庁API自動検証、税率別合計表示、経過措置の自動適用、適格請求書フォーマット出力に対応",
              ],
              [
                "★ 電子帳簿保存法 電子取引要件への対応",
                "✓",
                "確定時に SHA-256 ハッシュ＋タイムスタンプを自動付与、検索要件3項目（取引年月日・取引金額・取引先）を標準搭載",
              ],
              [
                "クラウド型ソフトウェアであること",
                "✓",
                "SaaS形態、Webブラウザのみで利用可能。専用アプリ・サーバ構築不要",
              ],
              [
                "★ 発注者側／受注者側でアカウント機能が分かれ、受注者側アカウントの状況を管理できること（要件③）",
                "✓",
                "会社種別・ロールでメニューと権限を分離。発注側管理者は招待一覧で受注側アカウントのステータス（招待中／受諾済／取消／期限切れ）を管理可能",
              ],
              [
                "★ 発注者側が取引内容を一元管理（契約・発注、請求等）できること（要件④）",
                "✓",
                "案件（契約単位）→発注書→検収→請求書→支払を同一DBで関連付けて一元管理。案件別の発注・請求金額集計にも対応",
              ],
              [
                "★ 発注者側が受注者側のインボイス管理番号を管理できること（要件⑤）",
                "✓",
                "取引先マスタに適格請求書発行事業者登録番号欄を標準搭載し、国税庁Web-APIで自動検証。取引先一覧で全取引先の登録番号を確認可能",
              ],
              [
                "★ 受注者側のアカウントを上限なく発行できる契約ではないこと（要件⑥）",
                "✓",
                "契約プランごとに受注側アカウント発行上限（標準200社／ミドル100社／最小50社）を設定。詳細は価格説明資料のプラン別上限表に記載",
              ],
              [
                "最低1年以上の利用継続",
                "✓",
                "標準契約は月額だが、補助金申請時は最短1年・最長2年の契約としてご案内",
              ],
            ].map(([k, mark, v]) => (
              <tr key={k}>
                <td className="border border-slate-300 px-3 py-2 align-top">{k}</td>
                <td className="border border-slate-300 px-3 py-2 align-top text-center font-bold text-orange-600">
                  {mark}
                </td>
                <td className="border border-slate-300 px-3 py-2 align-top text-xs">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3. Applicant-side requirements */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          3. 交付申請者（中小企業・小規模事業者）側で必要な要件
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          本ツールの導入にあたり、補助金交付申請者側で必ず準備いただく要件は以下の通りです。
          弊社では以下の準備について<strong>申請支援サービス</strong>でのサポートもご案内しています。
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-56">
                要件
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                内容
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "GビズIDプライムの取得",
                "交付申請・実績報告などの諸手続きに必要。デジタル庁のポータルから取得。受領まで2〜3週間程度を要するため、早めのお申し込みを推奨します。",
              ],
              [
                "SECURITY ACTION 宣言",
                "情報処理推進機構（IPA）の「SECURITY ACTION」で、★一つ星以上の宣言が必須。弊社は「★★二つ星」宣言済で、同水準の宣言ガイドを申請支援にて提供可能です。",
              ],
              [
                "みらデジ経営チェック",
                "中小機構が提供する無料の経営状態チェック。所要時間約15分。交付申請時に実施完了が必要（年度・枠により要件変動）。",
              ],
              [
                "事業規模・業種要件",
                "中小企業基本法で定める中小企業・小規模事業者であること。業種ごとの資本金・従業員数要件は最新公募要領にてご確認ください。",
              ],
              [
                "口座情報・法人番号",
                "交付決定後の補助金振込先として、法人口座情報と法人番号が必要。",
              ],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="border border-slate-300 bg-slate-50 px-3 py-2 align-top text-xs font-bold">
                  {k}
                </td>
                <td className="border border-slate-300 px-3 py-2 align-top text-xs">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 4. Security */}
      <section className="mb-8 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          4. セキュリティ・信頼性の対応状況
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {[
              ["通信暗号化", "全ての通信は SSL/TLS により暗号化（HTTPS）"],
              [
                "パスワード保存",
                "bcrypt による不可逆ハッシュ化。8文字以上＋大文字小文字＋数字のポリシー強制",
              ],
              [
                "アクセス制御",
                "ロールベース権限＋会社ID（companyId）によるマルチテナント自動スコープ。招待受諾で作成された受注側企業アカウントも自社データのみ閲覧可能。",
              ],
              [
                "招待URL のセキュリティ",
                "crypto.randomBytes(24) による推測困難なトークン、30日間の有効期限、取消機能、二重受諾防止",
              ],
              [
                "監査ログ",
                "招待発行・受諾・取消を含む全操作を AuditLog に自動記録",
              ],
              [
                "改ざん防止",
                "確定時に SHA-256 ハッシュ＋タイムスタンプを自動付与（電子帳簿保存法準拠）",
              ],
              [
                "SECURITY ACTION",
                "「★★二つ星」宣言済（IT導入補助金の提供事業者要件を充足）",
              ],
              [
                "データ保管",
                "国内リージョン（東京）のクラウド基盤で運用、日次自動バックアップ",
              ],
              [
                "エラー監視",
                "Sentry による 24 時間のランタイムエラー監視",
              ],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-slate-200">
                <th className="w-40 bg-slate-50 px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="px-3 py-2 text-xs">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 5. References */}
      <section className="mb-4 avoid-break">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          5. 根拠資料・参照先
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs leading-relaxed">
          <li>
            デジタル化・AI導入補助金2026 インボイス枠（<strong>電子取引類型</strong>）公募要領
            — 中小機構 デジタル化・AI導入補助金ポータルサイト
          </li>
          <li>
            インボイス制度（適格請求書等保存方式）— 国税庁 インボイス制度特設サイト
          </li>
          <li>
            電子帳簿保存法（令和3年度改正）— 国税庁 電子帳簿等保存制度特設サイト
          </li>
          <li>SECURITY ACTION — 独立行政法人情報処理推進機構（IPA）</li>
          <li>GビズID — デジタル庁 GビズIDポータル</li>
          <li>みらデジ経営チェック — 中小機構 みらデジ</li>
        </ul>
      </section>
    </DocumentShell>
  )
}
