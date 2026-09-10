import { TransactDocumentShell, TransactSection } from "./transact-document-shell"
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
/** 類似ツールの価格調査時点（各社公式サイト・公式発表） */
const PRICE_SURVEY_DATE = "2026年9月"

/** 修正箇所マーカー（別紙1(2)「資料内で前回からの修正箇所を明記すること」） */
function RevisedBadge() {
  return (
    <span className="mr-2 inline-block border-2 border-black bg-yellow-200 px-1.5 py-0.5 align-middle text-[10px] font-black">
      修正（2026-09-10）
    </span>
  )
}

type CompetitorPrice = {
  name: string
  vendor: string
  /** 公表されている料金体系 */
  pricing: string
  /** 中小企業の代表構成での年額（税抜） */
  representative: string
  /** (4)-5 機能比較表の「発注側 年額」欄 */
  buyerYearly: string
  source: string
  /** 招待型受注側無償／適格番号API検証／電帳法SHA-256+TS／多段階承認／発注・請求一貫管理 */
  features: [string, string, string, string, string]
  initialFee: string
}

/**
 * 類似ツールの公表価格（2026年9月時点・各社公式サイト／公式発表）。
 * 推計値は書かない。公表がない項目は「個別見積」。
 */
const COMPETITOR_PRICES: CompetitorPrice[] = [
  {
    name: "BtoBプラットフォーム 受発注",
    vendor: "株式会社インフォマート",
    pricing: "買い手: 本部 18,000円／月 ＋ 店舗 2,000円／月 × 店舗数 ＋ セットアップ費用（個別見積）。売り手: 月次受領金額に応じた4段階従量（1.1%〜0.05%、上限 150,000円／月）（2024年8月改定）",
    representative: "買い手 本部＋10拠点: 456,000円／年（公式例示: 100店舗で 2,616,000円／年）＋セットアップ費用。売り手側は別途",
    buyerYearly: "456,000円〜2,616,000円",
    source: "https://www.infomart.co.jp/order/price/ ／ 料金改定のお知らせ（2024-02-15）",
    features: ["◎", "○", "○", "○", "○"],
    initialFee: "個別見積",
  },
  {
    name: "TS-BASE 受発注",
    vendor: "竹田印刷株式会社",
    pricing: "初期費用 470,000円、月額 100,000円（3ID）〜。機能・ID数により見積",
    representative: "初年度 1,670,000円（初期＋12か月）、2年目以降 1,200,000円／年〜",
    buyerYearly: "1,670,000円（初年度）",
    source: "https://ts-base.jp/price",
    features: ["○", "△", "△", "△", "○"],
    initialFee: "470,000円",
  },
  {
    name: "CO-NECT",
    vendor: "CO-NECT株式会社",
    pricing: "発注側: 無料。受注側: 取引先数・月間受注数に応じた有料プラン（月数千円〜・個別見積）。初期費用 0円",
    representative: "発注側 0円（費用は受注側が負担）",
    buyerYearly: "0円（受注側課金）",
    source: "https://biz.conct.jp/supplier/lp/plan/",
    features: ["◎", "△", "△", "△", "△"],
    initialFee: "無料",
  },
  {
    name: "Bill One 請求書受領",
    vendor: "Sansan株式会社",
    pricing: "従業員100名以下: 無料（月100通まで）。超過時・101名以上: 有料プラン 月額 100,000円〜（個別見積）",
    representative: "101名以上: 1,200,000円／年〜（請求書受領のみ・発注機能なし）",
    buyerYearly: "1,200,000円〜",
    source: "Sansan株式会社 公式発表（スモールビジネスプラン）",
    features: ["△", "◎", "◎", "○", "—"],
    initialFee: "個別見積",
  },
  {
    name: "invox 受取請求書",
    vendor: "株式会社invox",
    pricing: "初期費用 0円。ミニマム 980円／月、ベーシック 9,800円／月 ＋ データ処理 1件 50円（オペレータ確認なし）〜100円（あり）",
    representative: "ベーシック＋月300件（確認あり）: 477,600円／年（請求書受領のみ）",
    buyerYearly: "477,600円",
    source: "https://invox.jp/how-to-charge",
    features: ["△", "○", "○", "△", "—"],
    initialFee: "無料",
  },
  {
    name: "ANDPAD（受発注オプション）",
    vendor: "株式会社アンドパッド",
    pricing: "初期費用 100,000円〜、月額 36,000円〜（ID数・プランにより変動）。受発注機能はオプション（個別見積）",
    representative: "最安構成 初年度 532,000円〜。受発注オプション込みは個別見積",
    buyerYearly: "532,000円〜（個別見積）",
    source: "公式サイトは個別見積。価格は公開解説記事（デジタル化の窓口）による",
    features: ["○", "△", "○", "◎", "○"],
    initialFee: "100,000円〜",
  },
  {
    name: "楽楽明細",
    vendor: "株式会社ラクス",
    pricing: "初期費用 100,000円、月額 25,000円〜（発行件数・オプションにより変動）",
    representative: "初年度 400,000円〜（請求書等の発行のみ）",
    buyerYearly: "400,000円〜",
    source: "https://www.rakurakumeisai.jp/price/",
    features: ["△", "○", "△", "—", "—"],
    initialFee: "100,000円",
  },
]

export function TransactRationaleDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  return (
    <TransactDocumentShell
      title="申請価格理由書"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      docNo="資料③ 申請価格理由書"
      indexHref={`/transact/subsidy${variantSuffix}`}
      schemeLabel={SCHEME_LABEL}
      pcode="主Pコード: 共P-02（単独）"
    >

      <section className="mb-8 avoid-break">
        <div className="border-4 border-black p-5">
          <h2 className="text-center text-xl font-black tracking-widest border-y-4 border-black py-2 mb-3">
            目　次
          </h2>
          <table className="w-full border-collapse text-sm">
            <tbody>
              {[
                { no: "★0", label: "前回提出（2026-09-09）からの修正箇所（別紙1(2)対応）", page: "P.2" },
                { no: "①", label: "IT導入支援事業者名", page: "P.3" },
                { no: "②", label: "ITツール名", page: "P.3" },
                { no: "③", label: "価格設定の内容", page: "P.3" },
                { no: "④ (1)", label: "リリース初期における開発費用の資金回収計画", page: "P.4" },
                { no: "★④ (2)", label: "市場における希少性・独自性（招待型／両社間電子取引）", page: "P.4" },
                { no: "④ (3)", label: "SaaS 提供に必要な継続的コスト", page: "P.5" },
                { no: "★④ (4)", label: "他社販売の同一ツール・類似ツールとの価格比較（比較対象のツール名・料金体系・価格帯・出典）", page: "P.6〜P.9" },
                { no: "⑤", label: "最小販売価格の根拠", page: "P.10" },
                { no: "⑥", label: "価格改定方針", page: "P.10" },
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

      {/* ★0 前回提出からの修正箇所 — ITツール登録要領 別紙1(2)「資料内で前回からの修正箇所を明記すること」 */}
      <section className="mb-8 page-break-before avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">
          ★0 前回提出（2026-09-09）からの修正箇所
        </h2>
        <p className="mb-3 text-sm leading-relaxed">
          2026-09-10 付の事務局からの修正依頼
          「標準販売価格（税抜）が、他社販売の同一ツールまたは類似ツールの価格と比較した際に適正価格であることが
          十分に確認できない」に対応し、本理由書を以下のとおり修正・新規添付しました。
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold w-10">#</th>
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold w-40">箇所</th>
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">修正内容</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["1", "本理由書 全体", "前回提出時は申請ポータルのソフトウェア価格画面に理由書の添付欄が表示されず未提出でした。今回、事務局の案内に従い「その他説明資料（任意）」欄に本理由書を添付し、備考欄にその旨を記載しています。"],
              ["2", "④ (4)-1（新設）", "「他社販売の同一ツール」の有無と価格を明記（同一ツールを販売するIT導入支援事業者は2社で、いずれも同一定価）。"],
              ["3", "④ (4)-2（刷新）", "類似ツール7製品について、製品名・提供企業名・公表されている料金体系・中小企業の代表構成での年額（税抜）・出典URLを表形式で明記。公表価格のない製品は「個別見積」と記載し、推計値を排除。"],
              ["4", "④ (4)-3・(4)-4（新設）", "比較製品の価格帯の中での本ツールの位置づけ、および受注側企業が無償である点を含めた「取引先1社あたりの負担額」の比較を追加。"],
              ["5", "④ (4)-5 機能比較表", "比較対象を (4)-2 と同じ7製品に揃え、最小販売価格の表記誤り（誤 1,800,000円 → 正 " + yen(yearly(MINIMUM_PLAN)) + "）を修正。"],
            ].map(([n, where, what]) => (
              <tr key={n}>
                <td className="border-2 border-black px-2 py-1.5 text-center font-bold">{n}</td>
                <td className="border-2 border-black px-2 py-1.5 font-bold">{where}</td>
                <td className="border-2 border-black px-2 py-1.5">{what}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-600">
          ※ 本ページの修正箇所は本文中でも「修正」バッジで示しています。価格（標準 {jpy(yearly(STANDARD_PLAN))}／最小 {jpy(yearly(MINIMUM_PLAN))}）自体の変更はありません。
        </p>
      </section>

      <TransactSection label="① IT導入支援事業者名">
        <p className="text-base">{providerName}</p>
      </TransactSection>

      <TransactSection label="② ITツール名">
        <p className="text-base">{TOOL_NAME}</p>
      </TransactSection>

      <TransactSection label="③ 価格設定の内容">
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
      </TransactSection>

      <TransactSection label="④ 価格設定の理由">
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
            (4) 他社販売の同一ツール・類似ツールとの価格比較
          </h3>
        </div>
        <p className="text-sm leading-relaxed mb-4">
          <RevisedBadge />
          事務局からの修正依頼（2026-09-10）に基づき、本節では
          <strong>「他社販売の同一ツール」</strong>と<strong>「類似ツール」</strong>のそれぞれについて、
          比較対象の具体的なツール名・提供企業名・公表されている料金体系・価格帯・出典を明らかにし、
          本ツールの標準販売価格（年額{jpy(yearly(STANDARD_PLAN))}）および最小販売価格（年額{jpy(yearly(MINIMUM_PLAN))}）が
          一般的な市場価格の範囲内であることを説明します。
          公表価格のない製品は推計せず「個別見積」と記載しています。
        </p>

        {/* (4)-1 同一ツール */}
        <h4 className="mt-5 mb-2 border-l-4 border-black pl-3 text-base font-bold">
          (4)-1 他社販売の同一ツール（{TOOL_NAME}）の価格
        </h4>
        <table className="w-full border-collapse text-sm mb-2">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">販売するIT導入支援事業者</th>
              <th className="border-2 border-black px-2 py-1.5 text-right text-xs font-bold w-40">標準販売価格（年額・税抜）</th>
              <th className="border-2 border-black px-2 py-1.5 text-right text-xs font-bold w-40">最小販売価格（年額・税抜）</th>
            </tr>
          </thead>
          <tbody>
            {["株式会社LET（開発メーカー兼IT導入支援事業者）", "株式会社TX.企画（IT導入支援事業者）"].map((name) => (
              <tr key={name}>
                <td className="border-2 border-black px-2 py-1.5 font-bold">{name}</td>
                <td className="border-2 border-black px-2 py-1.5 text-right font-mono">{yen(yearly(STANDARD_PLAN))}</td>
                <td className="border-2 border-black px-2 py-1.5 text-right font-mono">{yen(yearly(MINIMUM_PLAN))}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs leading-relaxed text-slate-700 mb-4">
          本ツールを販売するのは上記2社のみで、販売代理店による別価格での販売はありません。
          いずれも開発メーカー {MAKER_NAME} が定める同一の定価（料金表・価格説明資料と同一）で販売しており、
          事業者間の価格差はありません。
        </p>

        {/* (4)-2 類似ツールの料金体系・価格帯・出典 */}
        <h4 className="mt-6 mb-2 border-l-4 border-black pl-3 text-base font-bold page-break-before">
          (4)-2 類似ツールの料金体系・価格帯・出典（{PRICE_SURVEY_DATE}時点の各社公表情報）
        </h4>
        <p className="text-xs leading-relaxed mb-2">
          比較対象は、企業間の発注・請求データを電子的に授受するクラウドサービスのうち、国内で実際に販売され
          料金体系が公表されている製品です。「代表構成の年額」は、中小企業（取引先 数十社・拠点 10 程度）が
          各製品を利用する場合の税抜年額を、公表単価から機械的に計算したものです。
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border-2 border-black px-2 py-1.5 text-left font-bold w-36">製品名（提供企業）</th>
                <th className="border-2 border-black px-2 py-1.5 text-left font-bold">公表されている料金体系</th>
                <th className="border-2 border-black px-2 py-1.5 text-left font-bold w-44">代表構成の年額（税抜）</th>
                <th className="border-2 border-black px-2 py-1.5 text-left font-bold w-40">出典</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-yellow-100">
                <td className="border-2 border-black px-2 py-1.5 font-bold">{TOOL_NAME}（{MAKER_NAME}）本ツール</td>
                <td className="border-2 border-black px-2 py-1.5">発注側企業のみ年額定額（標準 {jpy(yearly(STANDARD_PLAN))}／ミドル {jpy(yearly(MIDDLE_PLAN))}／最小 {jpy(yearly(MINIMUM_PLAN))}）。初期費用 0円、受注側企業 0円、取引先数上限 200社／100社／50社</td>
                <td className="border-2 border-black px-2 py-1.5 font-mono font-bold">{yen(yearly(STANDARD_PLAN))}（標準）<br />{yen(yearly(MINIMUM_PLAN))}（最小）</td>
                <td className="border-2 border-black px-2 py-1.5">本申請 価格説明資料・料金表</td>
              </tr>
              {COMPETITOR_PRICES.map((c) => (
                <tr key={c.name}>
                  <td className="border-2 border-black px-2 py-1.5 font-bold">{c.name}<br /><span className="font-normal">（{c.vendor}）</span></td>
                  <td className="border-2 border-black px-2 py-1.5">{c.pricing}</td>
                  <td className="border-2 border-black px-2 py-1.5 font-mono">{c.representative}</td>
                  <td className="border-2 border-black px-2 py-1.5 break-all">{c.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
          ※ 各社の公式サイト・公式発表（{PRICE_SURVEY_DATE}時点）に基づく。「個別見積」は公表価格がない項目。
          代表構成の年額は初期費用を含む初年度額（初期費用がある製品）または年額利用料で、導入構成・契約期間により変動します。
          本表は価格帯の比較を目的とし、各社製品の優劣を示すものではありません。
        </p>

        {/* (4)-3 価格帯の位置づけ */}
        <h4 className="mt-6 mb-2 border-l-4 border-black pl-3 text-base font-bold page-break-before">
          (4)-3 比較製品の価格帯における本ツールの位置づけ
        </h4>
        <table className="w-full border-collapse text-sm mb-2">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">区分</th>
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">発注側（買い手）企業の年額（税抜）</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["比較製品の価格帯（公表価格から計算）", "約 40万円（楽楽明細・初年度）〜 約 262万円（BtoBプラットフォーム 受発注・100店舗の公式例示）。Bill One は 101名以上 120万円〜、TS-BASE 受発注は初年度 167万円"],
              ["本ツール 最小販売価格", `${yen(yearly(MINIMUM_PLAN))}（取引先 50社まで・受注側 0円）`],
              ["本ツール 標準販売価格", `${yen(yearly(STANDARD_PLAN))}（取引先 200社まで・受注側 0円）`],
            ].map(([k, v]) => (
              <tr key={k}>
                <td className="border-2 border-black px-2 py-1.5 font-bold w-64">{k}</td>
                <td className="border-2 border-black px-2 py-1.5">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-sm leading-relaxed mb-4">
          本ツールの価格は比較製品の価格帯（約 40万〜262万円）の内側にあり、
          発注側企業の年額で見ると帯の中位から上位に位置します。
          ITツール登録要領 2-3(1)9.(ウ) にいう「一般的な市場価格と比較して著しく高額」には該当しません。
          なお、比較製品のうち BtoBプラットフォーム 受発注・CO-NECT は受注側（売り手）企業にも課金される料金体系であり、
          発注側の年額だけでは取引全体の費用を比較できないため、次項で取引先1社あたりの負担額を比較します。
        </p>

        {/* (4)-4 取引先1社あたりの負担 */}
        <h4 className="mt-6 mb-2 border-l-4 border-black pl-3 text-base font-bold">
          (4)-4 取引先1社あたりの負担額（受注側企業の費用を含めた比較）
        </h4>
        <table className="w-full border-collapse text-sm mb-2">
          <thead>
            <tr className="bg-slate-100">
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold w-44">製品</th>
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">発注側の負担（取引先1社あたり・年）</th>
              <th className="border-2 border-black px-2 py-1.5 text-left text-xs font-bold">受注側（取引先）の負担（年）</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-yellow-100">
              <td className="border-2 border-black px-2 py-1.5 font-bold">{TOOL_NAME} 標準</td>
              <td className="border-2 border-black px-2 py-1.5 font-mono">{yen(yearly(STANDARD_PLAN))} ÷ 200社 ＝ {yen(yearly(STANDARD_PLAN) / STANDARD_PLAN.partnerAccountLimit)}</td>
              <td className="border-2 border-black px-2 py-1.5 font-bold">0円（無償招待）</td>
            </tr>
            <tr className="bg-yellow-100">
              <td className="border-2 border-black px-2 py-1.5 font-bold">{TOOL_NAME} 最小</td>
              <td className="border-2 border-black px-2 py-1.5 font-mono">{yen(yearly(MINIMUM_PLAN))} ÷ 50社 ＝ {yen(yearly(MINIMUM_PLAN) / MINIMUM_PLAN.partnerAccountLimit)}</td>
              <td className="border-2 border-black px-2 py-1.5 font-bold">0円（無償招待）</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-1.5 font-bold">BtoBプラットフォーム 受発注（インフォマート）</td>
              <td className="border-2 border-black px-2 py-1.5">本部 216,000円／年 ＋ 拠点 24,000円／年 × 拠点数（取引先数に応じた課金はなし）</td>
              <td className="border-2 border-black px-2 py-1.5">月次受領金額の 1.1%〜0.05%（上限 150,000円／月＝1,800,000円／年）を受注側が負担。例: 月次受領 100万円の受注側は年 132,000円</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-1.5 font-bold">CO-NECT（CO-NECT株式会社）</td>
              <td className="border-2 border-black px-2 py-1.5">0円（発注側無料）</td>
              <td className="border-2 border-black px-2 py-1.5">取引先数・月間受注数に応じた有料プラン（個別見積）を受注側が負担</td>
            </tr>
            <tr>
              <td className="border-2 border-black px-2 py-1.5 font-bold">Bill One 請求書受領（Sansan）</td>
              <td className="border-2 border-black px-2 py-1.5">101名以上: 1,200,000円／年〜（請求書受領のみ・発注機能なし）</td>
              <td className="border-2 border-black px-2 py-1.5">0円（請求書を送るだけ）</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm leading-relaxed mb-4">
          本ツールは受注側企業に一切課金しないため、発注側・受注側の合計で見た取引先1社あたりの負担は
          年 {jpy(yearly(STANDARD_PLAN) / STANDARD_PLAN.partnerAccountLimit)}円（標準）〜 {jpy(yearly(MINIMUM_PLAN) / MINIMUM_PLAN.partnerAccountLimit)}円（最小）です。
          受注側に従量課金が生じる製品（最大 年 1,800,000円／社）と比べて取引全体の費用は同等以下であり、
          電子取引類型が求める「受注側企業の負担なく電子取引を広げる」構造を価格面でも実現しています。
        </p>

        {/* (4)-5 機能比較 */}
        <h4 className="mt-6 mb-2 border-l-4 border-black pl-3 text-base font-bold page-break-before">
          (4)-5 類似ツールとの機能比較
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-2 py-2 text-left font-bold w-44">製品</th>
                <th className="border border-slate-300 px-2 py-2 text-right font-bold w-28">発注側 年額<br />（税抜・代表構成）</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">招待型<br />受注側無償</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">適格番号<br />国税庁API<br />自動検証</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">電帳法<br />SHA-256+<br />TS自動付与</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">多段階<br />承認</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">発注・請求<br />一貫管理</th>
                <th className="border border-slate-300 px-2 py-2 text-center font-bold">初期費用</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-teal-50">
                <td className="border border-slate-300 px-2 py-2 font-bold text-teal-700">{TOOL_NAME}（本ツール／標準）</td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono font-bold">{yen(yearly(STANDARD_PLAN))}</td>
                {["◎", "◎", "◎", "◎", "◎", "無料"].map((v, i) => (
                  <td key={i} className="border border-slate-300 px-2 py-2 text-center font-bold text-teal-700">{v}</td>
                ))}
              </tr>
              <tr className="bg-teal-50">
                <td className="border border-slate-300 px-2 py-2 font-bold text-teal-700">
                  {TOOL_NAME}（本ツール／最小）<RevisedBadge />
                </td>
                <td className="border border-slate-300 px-2 py-2 text-right font-mono font-bold">{yen(yearly(MINIMUM_PLAN))}</td>
                {["◎", "◎", "◎", "◎", "◎", "無料"].map((v, i) => (
                  <td key={i} className="border border-slate-300 px-2 py-2 text-center font-bold text-teal-700">{v}</td>
                ))}
              </tr>
              {COMPETITOR_PRICES.map((c) => (
                <tr key={c.name}>
                  <td className="border border-slate-300 px-2 py-2 font-bold">{c.name}<br /><span className="font-normal">（{c.vendor}）</span></td>
                  <td className="border border-slate-300 px-2 py-2 text-right font-mono">{c.buyerYearly}</td>
                  {c.features.map((v, i) => (
                    <td key={i} className="border border-slate-300 px-2 py-2 text-center">{v}</td>
                  ))}
                  <td className="border border-slate-300 px-2 py-2 text-center">{c.initialFee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
          凡例: ◎ 標準機能として提供／○ 一部または有償オプションで提供／△ 手動対応または限定的に提供／
          — 機能非搭載。機能の有無は各社公開資料（{PRICE_SURVEY_DATE}時点）に基づく調査値で、
          各社製品の優劣を断定するものではありません。
        </p>

        <h4 className="mt-5 mb-2 text-sm font-bold text-slate-900">
          比較から導かれる本ツールの価格設定の妥当性
        </h4>
        <ol className="list-decimal pl-6 text-sm leading-relaxed space-y-2">
          <li>
            <strong>価格帯の内側にあること</strong>：発注側企業の年額で比較すると、本ツール（{jpy(yearly(MINIMUM_PLAN))}〜{jpy(yearly(STANDARD_PLAN))}円）は
            比較製品の価格帯（約 40万〜262万円）の内側にあり、著しく高額ではありません。
          </li>
          <li>
            <strong>受注側無償を含めた総費用</strong>：受注側にも課金する製品（BtoBプラットフォーム 受発注・CO-NECT）と比べ、
            取引先1社あたりの負担（年 {jpy(yearly(STANDARD_PLAN) / STANDARD_PLAN.partnerAccountLimit)}円〜{jpy(yearly(MINIMUM_PLAN) / MINIMUM_PLAN.partnerAccountLimit)}円・受注側 0円）は同等以下です。
          </li>
          <li>
            <strong>初期費用・オプション費用がないこと</strong>：TS-BASE 受発注（初期 470,000円）、楽楽明細（初期 100,000円）、
            ANDPAD（初期 100,000円〜）と異なり、本ツールは初期費用・オプション費用を設けていません。
          </li>
          <li>
            <strong>機能集約性</strong>：招待型・受注側無償、適格請求書発行事業者番号の国税庁API自動検証、電子帳簿保存法の電子取引要件への自動準拠
            （SHA-256＋タイムスタンプ）、多段階承認、発注〜請求の一貫管理の5機能を標準搭載する製品は比較対象の中で本ツールのみです。
          </li>
        </ol>
      </TransactSection>

      <TransactSection label="⑤ 最小販売価格の根拠">
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
      </TransactSection>

      <TransactSection label="⑥ 価格改定方針">
        <p className="text-sm leading-relaxed">
          価格改定を行う場合は、契約更新のタイミングで新価格を適用し、
          既存契約の期中には影響しません。重要な価格改定を行う際は
          2ヶ月前までに登録メールアドレスへ通知します。
          本申請期間中の価格改定予定はありません。
        </p>
      </TransactSection>

      <p className="mt-8 text-xs text-slate-500 leading-relaxed avoid-break">
        本書は、{SCHEME_LABEL} の交付申請において、IT導入支援事業者 {providerName} が販売する
        「{TOOL_NAME}」の販売価格設定の理由を説明する目的で作成されたものです。
        記載内容は 2026年9月時点の事業計画・各社公表価格に基づき、将来予告なく変更される場合があります。
      </p>
    </TransactDocumentShell>
  )
}
