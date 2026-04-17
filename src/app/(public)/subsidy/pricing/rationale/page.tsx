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
          自社開発しています。開発工数はエンジニア延べ約 X人月を要しており、
          UI／UX設計、セキュリティ監査、E2Eテスト整備等の周辺コストも含めた
          初期開発投資額は概ね Y 百万円規模となります。
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
          (3) 運用・保守・インフラコスト
        </h3>
        <p className="text-sm leading-relaxed">
          クラウドホスティング（Vercel／PostgreSQL 東京リージョン）、
          エラー監視（Sentry）、SSL証明書、日次自動バックアップ、
          国税庁Web-API利用料、24時間のセキュリティ監視、
          平日9:00〜17:30のメール／チャットサポート、
          SLA 99.5％水準の稼働維持、日次バックアップおよび障害時復旧体制などの
          運用コストを価格に含めています。
          また、インボイス制度・電帳法・下請法等の法改正に対する継続的な
          システム改修費用も本価格に内包しています。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          (4) 競合製品・類似サービスとの比較
        </h3>
        <p className="text-sm leading-relaxed">
          国内の同等機能を提供する受発注SaaSと比較し、ユーザー数あたり・
          取引件数あたりの利用料水準は概ね市場中央値の範囲内です。
          一方、初期費用を設定せず標準プランで全機能を提供する価格設計は
          中小企業にとって導入ハードルが低く、
          IT導入補助金 インボイス枠（インボイス対応類型）の
          補助対象経費として合理的な水準に収まるよう調整しています。
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
