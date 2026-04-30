import type { Metadata } from "next"
import { DocumentShell } from "../../_components/document-shell"

export const metadata: Metadata = {
  title: "申請価格理由書｜受発注Lシステム｜IT導入補助金 申請書類",
  description:
    "デジタル化・AI導入補助金2026 インボイス枠 申請添付書類。受発注Lシステムの標準販売価格の設定理由を記載した申請価格理由書（株式会社TX.企画 申請用）。",
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

export default function PriceRationaleDocumentPage() {
  return (
    <DocumentShell
      title="申請価格理由書"
      subtitle="デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）申請添付書類"
    >
      {/* Cover identification block — print-safe */}
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
                株式会社TX.企画
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <Section label="① IT導入支援事業者名">
        <p className="text-base">株式会社TX.企画</p>
      </Section>

      <Section label="② ITツール名">
        <p className="text-base">受発注Lシステム</p>
      </Section>

      <Section label="③ 価格設定の内容">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold w-1/3">
                区分
              </th>
              <th className="border border-slate-300 px-3 py-2 text-right text-xs font-bold">
                金額（税抜）
              </th>
              <th className="border border-slate-300 px-3 py-2 text-left text-xs font-bold">
                内訳
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">
                標準販売価格（1年間）
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                ¥3,000,000
              </td>
              <td className="border border-slate-300 px-3 py-2">
                月額 250,000円 × 12ヶ月
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">
                最小販売価格（1年間）
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                ¥1,500,000
              </td>
              <td className="border border-slate-300 px-3 py-2">
                月額 125,000円 × 12ヶ月（最小プラン）
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">
                包括ライセンス数
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                1 Lic
              </td>
              <td className="border border-slate-300 px-3 py-2">
                SaaS／サブスクリプション形式のため「1」
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">
                初期費用
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right">なし</td>
              <td className="border border-slate-300 px-3 py-2">
                サーバ構築・インストール作業不要
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">
                追加オプション
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right">なし</td>
              <td className="border border-slate-300 px-3 py-2">
                全機能を標準価格に含めて提供
              </td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section label="④ 価格設定の理由">
        <p className="mb-4 text-sm leading-relaxed">
          受発注Lシステムの標準販売価格（年額 3,000,000円／月額 250,000円）および
          最小販売価格（年額 1,500,000円／月額 125,000円）は、以下の4つの観点を
          総合的に勘案して設定しています。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          (1) リリース初期における開発費用の資金回収計画
        </h3>
        <p className="text-sm leading-relaxed">
          受発注Lシステムは2026年3月にリリースされた新規クラウドサービスであり、
          インボイス制度および電子帳簿保存法への対応を目的として、
          フロントエンド・バックエンド・データベース設計・国税庁Web-API連携・
          SHA-256ハッシュによる改ざん防止機構・多段階承認ワークフロー・監査ログ等を
          自社開発しています。開発工数はエンジニア延べ約 8 人月を要しており、
          UI／UX設計、セキュリティ監査、E2Eテスト整備等の周辺コストも含めた
          初期開発投資額は概ね 12 百万円規模となります。
          リリース初年度〜3年度での段階的な資金回収計画に基づき、
          当該価格での販売を行うことで開発投資を健全に回収し、
          継続的な機能改善とサポート品質の維持を可能とする水準としています。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          (2) 市場における希少性・独自性
        </h3>
        <p className="text-sm leading-relaxed">
          国内の受発注SaaS市場では、発注・請求の機能を提供する製品は複数存在するものの、
          <strong>
            ①適格請求書発行事業者登録番号の国税庁Web-API自動検証、②免税事業者の経過措置
            （80％→50％→0％）の日付基準での自動適用、③確定時のSHA-256ハッシュ＋
            タイムスタンプによる電子帳簿保存法 電子取引要件の自動準拠
          </strong>
          を 1 プロダクトに統合しているサービスは限定的です。
          本ツールはこの 3 要件を標準機能として提供しつつ、
          初期費用不要・オプション不要のシンプルな価格体系で導入可能としており、
          中小企業におけるインボイス制度・電帳法対応の総コストを最小化する点で
          市場における希少性を有しています。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          (3) クラウド基盤の運用インフラコスト
        </h3>
        <p className="text-sm leading-relaxed">
          本ソフトウェア価格（カテゴリー1〜6に該当）には、
          ソフトウェア提供のために必要な <strong>クラウドインフラ運用コスト</strong>
          （Vercel／PostgreSQL 東京リージョンのホスティング、SSL証明書、
          日次自動バックアップ、国税庁Web-API利用料、Sentryによる稼働監視）、
          ならびに、インボイス制度・電子帳簿保存法・下請法等の法改正に対応する
          継続的なソフトウェア改修コストが含まれます。
        </p>
        <p className="mt-3 text-sm leading-relaxed">
          一方、<strong>ITツール登録要領 カテゴリー7（保守サポート）に該当する役務</strong>
          — すなわちコールセンター対応、個別運用代行、障害対応駆けつけ等の
          追加役務 — <strong>は本ソフトウェア価格には含めておらず</strong>、
          本申請では保守サポート（カテゴリー7）を併せて申請する予定はありません。
          これにより、本価格設定はカテゴリー1〜6（ソフトウェア）の単独申請として
          明確に整理されています。
        </p>

        <div className="mt-8 mb-4 page-break-before">
          <h3 className="border-4 border-black bg-black text-white p-3 text-center text-lg font-black">
            (4) 類似ITツールとの価格及び機能の比較
          </h3>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          国内で流通する類似ITツール（受発注・請求・インボイス対応SaaS）との
          価格および機能比較は下表のとおりです。比較対象は、本ツールと同一の
          「インボイス制度対応・受発注機能」を有する主要SaaSカテゴリを想定した
          公表情報ベースの参考値です。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-2 py-2 text-left font-bold w-44">
                  製品カテゴリ
                </th>
                <th className="border border-slate-300 px-2 py-2 text-right font-bold w-28">
                  年額料金<br />（税抜・参考）
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  適格番号<br />国税庁API<br />自動検証
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  税率別合計<br />／経過措置<br />自動適用
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  電帳法<br />SHA-256+<br />TS自動付与
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  多段階<br />承認<br />ワークフロー
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  発注・請求<br />一貫管理
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  初期費用
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-orange-50">
                <td className="border border-slate-300 px-2 py-2 font-bold text-orange-700">
                  受発注Lシステム<br />（本ツール／標準）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono font-bold">
                  ¥3,000,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">無料</td>
              </tr>
              <tr className="bg-orange-50">
                <td className="border border-slate-300 px-2 py-2 font-bold text-orange-700">
                  受発注Lシステム<br />（本ツール／最小）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono font-bold">
                  ¥1,500,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center font-bold text-orange-700">無料</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  A. <strong>Oracle NetSuite</strong>（日本オラクル株式会社）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥6,000,000〜<br />¥12,000,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥1,500,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  A&apos;. <strong>SAP Business ByDesign</strong>（SAPジャパン株式会社）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥5,000,000〜<br />¥10,000,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥1,000,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  B. <strong>マネーフォワード クラウド請求書 Plus</strong>（株式会社マネーフォワード）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  約¥360,000<br />（月額¥30,000）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—<br />（請求のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">無料</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  B&apos;. <strong>楽楽明細</strong>（株式会社ラクス）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  約¥330,000<br />（月額¥27,500）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—<br />（請求のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥100,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  B&apos;&apos;. <strong>バクラク請求書発行</strong>（株式会社LayerX）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  約¥360,000〜<br />¥600,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—<br />（請求のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">無料</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  C. <strong>ANDPAD 受発注</strong>（株式会社アンドパッド）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥2,400,000〜<br />¥4,800,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥300,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  C&apos;. <strong>AnyONE</strong>（株式会社ＲＤＳ）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥1,800,000〜<br />¥3,600,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥200,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  D. <strong>ジョブカンワークフロー</strong>（株式会社DONUTS）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  約¥360,000〜<br />¥720,000<br />（10ID〜20ID）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">—</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—</td>
                <td className="border border-slate-300 px-2 py-2 text-center">無料〜</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
          凡例: ◎ 標準機能として提供／○ 一部または有償オプションで提供／△ 手動対応または限定的に提供／
          — 機能非搭載。年額料金は各製品の中小企業向け代表プランの税抜年額相当の参考値で、
          各社公式サイトの公表価格・公開資料に基づく2026年4月時点の調査値（導入構成・契約期間により変動あり）。
          本表はあくまで価格・機能の比較目的であり、各社製品の優劣を断定するものではありません。
        </p>

        <h4 className="mt-5 mb-2 text-sm font-bold text-slate-900">
          比較から導かれる本ツールの価格設定の妥当性
        </h4>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-2">
          <li>
            <strong>機能充足度での優位性</strong>：国税庁API自動検証・税率別合計＋
            経過措置自動適用・電帳法ハッシュ自動付与・多段階承認・受発注/請求一貫管理の
            5要件を「◎（標準搭載）」で満たす製品は <strong>Oracle NetSuite・SAP Business
            ByDesign の大手ERP系のみ</strong> に限定され、本ツールは
            <strong>これらの大手ERPに匹敵する機能集約性</strong>を中小企業価格帯で
            提供する点に希少性があります。
          </li>
          <li>
            <strong>Oracle NetSuite／SAP Business ByDesign（A・A&apos;）との比較</strong>：
            機能では同等以上の充足度を確保しつつ、本ツールは年額 300万円（最小 150万円）で
            導入可能であり、両製品の価格帯（500〜1,200万円＋初期100〜150万円）と比較して
            <strong>約 50〜75% のコスト削減</strong>が見込めます。
            ただし NetSuite／SAP は会計・在庫まで含むスーツである点で機能範囲は広い。
          </li>
          <li>
            <strong>マネーフォワード／楽楽明細／バクラク請求書（B・B&apos;・B&apos;&apos;）との比較</strong>：
            これら請求書特化SaaSは月額3万円前後と安価ですが、対象機能は<strong>請求書発行のみ</strong>に
            限定され、発注管理・多段階承認・取引契約必要記載事項チェック等は提供していません。
            本ツールは発注・承認・請求・監査ログまでを一元管理するため、複数SaaSを組み合わせて
            運用する必要がなく、<strong>SaaS間連携コストとデータ整合性リスクの両方を排除</strong>できます。
          </li>
          <li>
            <strong>ANDPAD 受発注／AnyONE（C・C&apos;）との比較</strong>：
            両製品は建設業・工務店向けの特化SaaSで、業種依存の業務フローに強い反面、
            インボイス番号の国税庁API自動検証は標準機能ではなく手動対応となっているケースが多い。
            本ツールは <strong>業種不問＋インボイス自動検証</strong>で差別化しており、
            非建設業の中小企業にも導入しやすい点で優位です。
          </li>
          <li>
            <strong>ジョブカンワークフロー（D）との比較</strong>：
            汎用ワークフローSaaSは承認機能のみを提供し、発注書／請求書の業務フローは
            企業側が独自にテンプレート設計する必要があります。本ツールは
            <strong>受発注業務専用に設計された業務フロー＋ワークフロー＋電帳法対応</strong>
            を一体提供するため、業務テンプレート設計コストが不要です。
          </li>
          <li>
            <strong>最小プラン（¥1,500,000／年）</strong>：請求書特化SaaS（マネーフォワード／
            楽楽明細／バクラク請求書）の年額相当を上回るものの、それらでは賄えない
            <strong>発注管理・多段階承認・電帳法対応・監査ログ</strong>を含む点で
            市場優位性があり、中小企業向けの妥当な価格です。
          </li>
        </ol>

        <h4 className="mt-5 mb-2 text-sm font-bold text-slate-900">
          総括：市場における希少性
        </h4>
        <p className="text-sm leading-relaxed">
          上表の通り、「適格請求書発行事業者番号の国税庁API自動検証」「税率別合計＋経過措置の
          自動適用」「電子帳簿保存法 電子取引要件の自動準拠（SHA-256＋タイムスタンプ）」
          「多段階承認ワークフロー」「発注〜請求の一貫管理」の<strong>5機能を全て標準搭載</strong>
          している国内SaaSは現時点で極めて限定的であり、本ツールはこの機能集約性を年額
          3,000,000円（最小 1,500,000円）で提供する点に市場希少性があります。
          加えて、初期費用・オプション費用を一切設けないシンプルな価格体系は、
          中小企業における IT導入補助金 インボイス枠の活用においても、
          補助対象経費の算定・申請を容易にする設計です。
        </p>
      </Section>

      <Section label="⑤ 最小販売価格の根拠">
        <p className="text-sm leading-relaxed">
          最小販売価格 1,500,000円／年（月額 125,000円）は、
          導入企業の事業規模や取引件数を踏まえ、標準プランから
          ユーザー数・月次取引件数上限を限定した「最小構成プラン」として
          販売店が顧客に提示可能な価格です。当該価格においても、
          インボイス制度対応・電子帳簿保存法対応・承認ワークフロー等の
          コア機能は標準プランと同等に提供します。
          本情報は審査目的にのみ利用され、一般公開されません。
        </p>
      </Section>

      <Section label="⑥ 価格改定方針">
        <p className="text-sm leading-relaxed">
          価格改定を行う場合は、契約更新のタイミングで新価格を適用し、
          既存契約の期中には影響しません。重要な価格改定を行う際は
          2ヶ月前までに登録メールアドレスへ通知します。
          本申請期間中の価格改定予定はありません。
        </p>
      </Section>

      <p className="mt-8 text-xs text-slate-500 leading-relaxed avoid-break">
        本書は、デジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）の
        交付申請において、IT導入支援事業者 株式会社TX.企画 が販売する
        「受発注Lシステム」の販売価格設定の理由を説明する目的で作成されたものです。
        記載内容は 2026年4月時点の事業計画に基づき、将来予告なく変更される場合があります。
      </p>
    </DocumentShell>
  )
}
