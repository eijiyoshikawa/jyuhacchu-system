import type { Metadata } from "next"
import { DocumentShell } from "../../_components/document-shell"

export const metadata: Metadata = {
  title: "その他要件説明資料（LET版）｜受発注Lシステム｜IT導入補助金 申請書類",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 申請添付書類（株式会社LET 申請用）。Pコード選択、インボイス対応類型の機能要件、SECURITY ACTION・GビズID対応を記載。",
}

export default function RequirementsDocumentLetPage() {
  return (
    <DocumentShell
      title="その他要件の説明資料"
      subtitle="Pコード選択 ／ インボイス対応類型 要件適合 ／ 付随要件の対応状況"
    >
      {/* Cover identification block — LET申請用 */}
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
                株式会社LET
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
          受発注Lシステムは、以下の Pコード（業務プロセス分類）に該当します。
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
              <td className="border border-slate-300 px-2 py-2 align-top">
                ①顧客対応・販売支援
              </td>
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
                機能説明資料 p.3（§3-1）／p.4（§3-2）／p.5（§3-3）
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">
                共P-03
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top">
                ③供給・在庫・物流
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                取引条件管理（取引先、納入条件）、ロケーション／入出庫管理、在庫分析、納品管理、配送業者管理
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">
                —
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                本ツールは在庫管理・入出庫・配送業者管理等の物流機能を提供しないため、
                本Pコードは選択しません。
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
              <td className="border border-slate-300 px-2 py-2 align-top font-mono">汎P-07</td>
              <td className="border border-slate-300 px-2 py-2 align-top">
                ⑦汎用・自動化・分析ツール
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                ワークフロー、グループウェア、コラボレーションツール、BI・分析専門ツール、RPA、チャットボットシステム 等
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-center">—</td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">
                本ツールには発注書・請求書の多段階承認ワークフローが含まれるが、
                公募要領の「業務プロセス（共P-XX）と汎用プロセス（汎P-XX）は同時選択不可」
                の制約により、業務プロセス側（共P-02）の選択を優先するため
                本 Pコードは選択しない。
              </td>
              <td className="border border-slate-300 px-2 py-2 align-top text-[11px]">—</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-4 rounded border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed">
          <p className="font-bold">選択方針</p>
          <p className="mt-1">
            本ツールの中核機能は <strong>共P-02（決済・債権債務・資金回収）</strong> に該当し、
            インボイス対応類型（受発注機能）の要件を充足します。
            業務プロセスとして 共P-02 の単独選択とします。
          </p>
          <p className="mt-2">
            本ツールには発注書・請求書の多段階承認ワークフロー機能も含まれますが、
            ITツール登録要領に
            <strong>「業務プロセス（共P-XX）と汎用プロセス（汎P-XX）は同時に選択できない」</strong>
            旨の規定があるため、汎P-07 は選択しません。
          </p>
        </div>
      </section>

      {/* 2. Invoice-type Requirements */}
      <section className="mb-8 page-break-before">
        <h2 className="mb-3 border-l-4 border-orange-500 pl-3 text-lg font-bold">
          2. インボイス対応類型 機能要件への適合
        </h2>
        <p className="mb-4 text-sm leading-relaxed">
          デジタル化・AI導入補助金2026 インボイス枠 インボイス対応類型は、
          「会計／受発注／決済のうち1機能以上を有し、かつインボイス制度に対応したソフトウェア」が対象です。
          受発注Lシステムの各要件への適合状況は以下のとおりです。
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
                "クラウド型ソフトウェアであること",
                "✓",
                "SaaS形態、Webブラウザのみで利用可能。専用アプリ・サーバ構築不要",
              ],
              [
                "交付申請者が利用可能なアカウント発行機能",
                "✓",
                "管理者画面からユーザーの登録・ロール付与（管理者／発注担当／受注担当）が可能",
              ],
              [
                "導入後の保守・サポートの提供",
                "✓",
                "月額契約＋メール／チャットサポートを継続提供。SLA 99.5%、日次バックアップ",
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
                "ロールベース権限＋会社ID（companyId）によるマルチテナント自動スコープ",
              ],
              [
                "監査ログ",
                "全操作を AuditLog に自動記録、IPアドレス・操作内容を保持",
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
            デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）公募要領
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
