import { DocumentShell } from "@/app/(public)/subsidy/_components/document-shell"
import { DSYSTEM_BRAND } from "@/lib/brand"
import {
  MIDDLE_PLAN,
  MINIMUM_PLAN,
  STANDARD_PLAN,
  jpy,
  yearly,
  yen,
} from "./denshi-plans"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName
const MAKER_NAME = "株式会社LET"
const SCHEME_LABEL = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）"

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 avoid-break">
      <h2 className="mb-4 text-xl font-black text-sky-600">【{label}】</h2>
      <div className="pl-2">{children}</div>
    </section>
  )
}

export function TransactRationaleDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <DocumentShell
      title="申請価格理由書"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
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
                インボイス枠（電子取引類型）／補助上限 350万円／補助率 中小企業 2/3
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-8 avoid-break">
        <div className="border-4 border-black p-5">
          <h2 className="text-center text-xl font-black tracking-widest border-y-4 border-black py-2 mb-3">
            目　次
          </h2>
          <table className="w-full border-collapse text-sm">
            <tbody>
              {[
                { no: "①", label: "IT導入支援事業者名", page: "P.2" },
                { no: "②", label: "ITツール名", page: "P.2" },
                { no: "③", label: "価格設定の内容", page: "P.3" },
                { no: "④ (1)", label: "リリース初期における開発費用の資金回収計画", page: "P.4" },
                { no: "★④ (2)", label: "市場における希少性・独自性（招待型／両社間電子取引）", page: "P.4" },
                { no: "④ (3)", label: "SaaS 提供に必要な継続的コスト", page: "P.5" },
                { no: "★④ (4)", label: "類似ITツールとの価格及び機能の比較", page: "P.6〜P.7" },
                { no: "⑤", label: "最小販売価格の根拠", page: "P.8" },
                { no: "⑥", label: "価格改定方針", page: "P.8" },
              ].map((row) => (
                <tr key={row.no}>
                  <td
                    className={
                      "border-2 border-black px-2 py-1.5 text-center font-bold w-20 " +
                      (row.no.startsWith("★") ? "bg-black text-white" : "")
                    }
                  >
                    {row.no}
                  </td>
                  <td
                    className={
                      "border-2 border-black px-3 py-1.5 " +
                      (row.no.startsWith("★") ? "bg-yellow-100 font-bold" : "")
                    }
                  >
                    {row.label}
                  </td>
                  <td className="border-2 border-black px-2 py-1.5 text-center w-24 font-mono text-xs">
                    {row.page}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-slate-600">
            ※ ★ 印は審査における重要項目です。
          </p>
        </div>
      </section>

      <Section label="① IT導入支援事業者名">
        <p className="text-base">{providerName}</p>
      </Section>

      <Section label="② ITツール名">
        <p className="text-base">{TOOL_NAME}</p>
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
            {([
              [`標準販売価格（1年間）`, STANDARD_PLAN, "発注側企業のみ課金／受注側は無償"],
              [`ミドルプラン（1年間）`, MIDDLE_PLAN, "中間プラン／受注側は無償"],
              [`最小販売価格（1年間）`, MINIMUM_PLAN, "最小プラン／受注側は無償"],
            ] as const).map(([label, pl, note]) => (
              <tr key={label}>
                <td className="border border-slate-300 px-3 py-2 font-bold">{label}</td>
                <td className="border border-slate-300 px-3 py-2 text-right font-mono">
                  {yen(yearly(pl))}
                </td>
                <td className="border border-slate-300 px-3 py-2">
                  月額 {jpy(pl.monthly)} × 12ヶ月（{note}）
                </td>
              </tr>
            ))}
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
              <td className="border border-slate-300 px-3 py-2 font-bold">初期費用</td>
              <td className="border border-slate-300 px-3 py-2 text-right">なし</td>
              <td className="border border-slate-300 px-3 py-2">
                サーバ構築・インストール作業不要
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">
                受注側企業への課金
              </td>
              <td className="border border-slate-300 px-3 py-2 text-right">なし</td>
              <td className="border border-slate-300 px-3 py-2">
                招待型プラットフォームのため、受注側企業には一切課金しない
              </td>
            </tr>
            <tr>
              <td className="border border-slate-300 px-3 py-2 font-bold">追加オプション</td>
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
          {TOOL_NAME}の標準販売価格（年額 {jpy(yearly(STANDARD_PLAN))}／月額 {jpy(STANDARD_PLAN.monthly)}）、
          ミドルプラン価格（年額 {jpy(yearly(MIDDLE_PLAN))}／月額 {jpy(MIDDLE_PLAN.monthly)}）および
          最小販売価格（年額 {jpy(yearly(MINIMUM_PLAN))}／月額 {jpy(MINIMUM_PLAN.monthly)}）は、以下の4つの観点を
          総合的に勘案して設定しています。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          (1) リリース初期における開発費用の資金回収計画
        </h3>
        <p className="text-sm leading-relaxed">
          {TOOL_NAME}は、発注側企業と受注側企業の両方が利用可能な招待型プラットフォームとして
          設計されており、受発注機能・招待管理機能・両社間データ同期・電子取引データ保存
          （SHA-256 ハッシュ＋タイムスタンプ）・国税庁 Web-API 連携・多段階承認・
          監査ログ等を自社開発しています。開発工数はエンジニア延べ約 12 人月を要しており、
          UI／UX設計、セキュリティ監査、E2Eテスト整備、招待受諾フロー整備等の周辺コストも含めた
          初期開発投資額は概ね 18 百万円規模です。
          リリース初年度〜3年度での段階的な資金回収計画に基づき、
          受注側企業からは一切の課金を行わず、発注側企業からのSaaS利用料のみで
          投資回収を行う設計としています。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          ★ (2) 市場における希少性・独自性（招待型／両社間電子取引プラットフォーム）
        </h3>
        <p className="text-sm leading-relaxed">
          本ツールの最大の希少性は、
          <strong>
            「発注側企業が受注側企業にアカウントを無償で発行し、両社間で発注書・請求書等の
            電子取引データを授受できる招待型プラットフォーム」
          </strong>
          である点にあります。国内の受発注SaaS市場では、発注側／受注側の一方のみを想定した
          製品が主流であり、両社間の電子取引を「無償招待」で成立させる仕組みを提供している
          クラウドサービスは限定的です。本ツールはこの招待型設計により、発注企業側の負担で
          取引先まで含めた電子化を推進できる点で、電子取引類型 の趣旨に完全に合致します。
        </p>

        <h3 className="mt-6 mb-2 text-base font-bold text-slate-900">
          (3) SaaS 提供に必要な継続的コスト
        </h3>
        <p className="text-sm leading-relaxed">
          本ソフトウェア価格には、SaaS 提供に必要な継続的なソフトウェア改修コスト
          （インボイス制度・電子帳簿保存法・下請法等の法改正への追随、機能改善、
          セキュリティアップデート、招待メール送信基盤の維持）が含まれます。
          本価格は<strong>ITツール登録要領 カテゴリー1（ソフトウェア）</strong>として整理されており、
          その他カテゴリーの役務は本価格に含めていません。
        </p>

        <div className="mt-8 mb-6 page-break-before avoid-break">
          <div className="border-4 border-black p-8 text-center">
            <p className="text-sm font-bold mb-2">CHAPTER ④</p>
            <h3 className="text-2xl sm:text-3xl font-black tracking-widest border-y-4 border-black py-4 my-3">
              類 似 I T ツ ー ル と の<br />
              価 格 及 び 機 能 の 比 較
            </h3>
            <p className="text-sm mt-3">本資料 ④ (4)</p>
            <p className="text-xs mt-2 text-slate-600">
              開発メーカー: {MAKER_NAME} ／ ITツール: {TOOL_NAME}<br />
              比較対象: 招待型・両社間電子取引プラットフォームを中心とした実在製品8件
              （BtoBプラットフォーム, TS-BASE 受発注, CO-NECT, Bill One, invox, ANDPAD, AnyONE, 楽楽明細）
            </p>
          </div>
        </div>

        <div className="mb-4 page-break-before">
          <h3 className="border-4 border-black bg-black text-white p-3 text-center text-lg font-black">
            (4) 類似ITツールとの価格及び機能の比較
          </h3>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          本ツール「{TOOL_NAME}」の標準販売価格（年額{jpy(yearly(STANDARD_PLAN))}）および最小販売価格
          （年額{jpy(yearly(MINIMUM_PLAN))}）の妥当性を、<strong>国内で実際に流通する具体的な競合製品8件</strong>
          と比較した結果を下表にまとめます。比較対象は実在する製品名（提供企業名併記）であり、
          各社の公表価格・公開資料に基づく2026年4月時点の調査値です。
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-2 py-2 text-left font-bold w-48">
                  製品カテゴリ
                </th>
                <th className="border border-slate-300 px-2 py-2 text-right font-bold w-28">
                  年額料金<br />（税抜・参考）
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  招待型<br />受注側無償
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  適格番号<br />国税庁API<br />自動検証
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  電帳法<br />SHA-256+<br />TS自動付与
                </th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">
                  多段階<br />承認
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
                  {TOOL_NAME}<br />（本ツール／標準）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono font-bold">
                  {yen(yearly(STANDARD_PLAN))}
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
                  {TOOL_NAME}<br />（本ツール／最小）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono font-bold">
                  ¥1,800,000
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
                  A. <strong>BtoBプラットフォーム 受発注</strong>（株式会社インフォマート）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥1,200,000〜<br />¥3,600,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥200,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  B. <strong>TS-BASE 受発注</strong>（竹田印刷株式会社）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥600,000〜<br />¥1,800,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥100,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  C. <strong>CO-NECT</strong>（CO-NECT株式会社）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥120,000〜<br />¥600,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△<br />（受発注のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">無料</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  D. <strong>Bill One</strong>（Sansan株式会社）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥1,200,000〜<br />¥3,600,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△<br />（請求受領のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—<br />（請求のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥100,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  E. <strong>invox 受取請求書</strong>（株式会社Deepwork）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥120,000〜<br />¥600,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—<br />（請求のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">無料</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  F. <strong>ANDPAD 受発注</strong>（株式会社アンドパッド）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  ¥2,400,000〜<br />¥4,800,000
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">◎</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥300,000〜</td>
              </tr>
              <tr>
                <td className="border border-slate-300 px-2 py-2 font-bold">
                  G. <strong>AnyONE</strong>（株式会社ＲＤＳ）
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
                  H. <strong>楽楽明細</strong>（株式会社ラクス）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono">
                  約¥330,000<br />（月額¥27,500）
                </td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">○</td>
                <td className="border border-slate-300 px-2 py-2 text-center">△</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—</td>
                <td className="border border-slate-300 px-2 py-2 text-center">—<br />（請求のみ）</td>
                <td className="border border-slate-300 px-2 py-2 text-center">¥100,000〜</td>
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
            <strong>招待型・両社間電子取引プラットフォームでの優位性</strong>：招待型かつ
            適格番号自動検証・電帳法 SHA-256/TS 自動付与・多段階承認・発注/請求一貫管理の
            5要件を「◎（標準搭載）」で満たす製品は本ツールのみであり、
            <strong>電子取引類型 の趣旨に完全合致する仕様</strong>を
            年額{jpy(yearly(STANDARD_PLAN))}（最小{jpy(yearly(MINIMUM_PLAN))}）で
            提供する点に市場希少性があります。
          </li>
          <li>
            <strong>BtoBプラットフォーム 受発注（A）との比較</strong>：招待型・両社間電子取引は
            同等ですが、電帳法自動付与・多段階承認・国税庁API連携は本ツールが上回ります。
            価格は同水準ながら、初期費用ゼロで導入可能な点で優位です。
          </li>
          <li>
            <strong>TS-BASE 受発注／CO-NECT（B・C）との比較</strong>：受発注特化SaaSは安価ですが
            電帳法・インボイス自動対応・多段階承認は限定的で、電子取引類型 が求める
            「電子取引要件への自動準拠」を単体では満たせません。
          </li>
          <li>
            <strong>Bill One／invox 受取請求書（D・E）との比較</strong>：請求書受領特化SaaSは
            強力ですが、発注書起票・受発注両社間の一貫管理には対応しておらず、
            発注〜請求までの一気通貫な電子取引が実現できません。
          </li>
          <li>
            <strong>ANDPAD 受発注／AnyONE（F・G）との比較</strong>：建設業特化SaaSは業種依存の
            機能に強い反面、国税庁API自動検証や電帳法 SHA-256 自動付与は限定的で、
            業種横断で使える汎用性は本ツールに軍配が上がります。
          </li>
        </ol>

        <h4 className="mt-5 mb-2 text-sm font-bold text-slate-900">
          総括：市場における希少性
        </h4>
        <p className="text-sm leading-relaxed">
          上表の通り、「招待型・受注側企業無償」「適格請求書発行事業者番号の国税庁API自動検証」
          「電子帳簿保存法 電子取引要件の自動準拠（SHA-256＋タイムスタンプ）」
          「多段階承認ワークフロー」「発注〜請求の一貫管理」の<strong>5機能を全て標準搭載</strong>
          している国内SaaSは現時点で本ツールのみであり、この機能集約性を年額 {jpy(yearly(STANDARD_PLAN))}
          （ミドル {jpy(yearly(MIDDLE_PLAN))}・最小 {jpy(yearly(MINIMUM_PLAN))}）で提供する点に市場希少性があります。
          加えて、初期費用・オプション費用・受注側企業への課金を一切設けない設計は、
          電子取引類型 の趣旨と完全に合致します。
        </p>
      </Section>

      <Section label="⑤ 最小販売価格の根拠">
        <p className="text-sm leading-relaxed">
          最小販売価格 {jpy(yearly(MINIMUM_PLAN))}／年（月額 {jpy(MINIMUM_PLAN.monthly)}）は、招待できる受注側企業数・
          月次取引件数上限を標準プランより限定した「最小構成プラン」
          （受注側アカウント発行上限 50社・月次取引 500件）として販売店が
          顧客に提示可能な価格です。当該価格においても、招待型アカウント発行・
          インボイス制度対応・電子帳簿保存法対応・多段階承認ワークフロー等の
          コア機能は標準プランと同等に提供します。
          なお、標準プラン（発行上限 200社・月次取引 3,000件）と最小プランの間には、
          中規模事業者向けのミドルプラン（年額 {jpy(yearly(MIDDLE_PLAN))}／月額 {jpy(MIDDLE_PLAN.monthly)}・
          発行上限 100社・月次取引 1,500件）を設けており、事業規模に応じた
          段階的なプラン選択が可能です（機能差はなく、いずれのプランも受注側企業への
          課金はなく、受注側アカウントを上限なく発行できる契約ではありません）。
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
        本書は、{SCHEME_LABEL} の交付申請において、IT導入支援事業者 {providerName} が販売する
        「{TOOL_NAME}」の販売価格設定の理由を説明する目的で作成されたものです。
        記載内容は 2026年4月時点の事業計画に基づき、将来予告なく変更される場合があります。
      </p>
    </DocumentShell>
  )
}
