/**
 * Claude Team（他社製 生成AIツール）の登録価格・役務・導入事例の定義。
 *
 * ⚠️ 価格を変更するときは必ずこのファイルだけを直すこと。
 * 機能説明資料・価格説明資料・申請価格理由書・補助額試算は全てここから描画している。
 * 登録画面（IT-33-1）の「標準販売価格」「最小販売価格」「ライセンス価格」「価格設定の内訳」と
 * 資料の金額は一字一句一致させる（ITツール登録の手引き 3-5 ❺）。
 *
 * 計画・入力値の全体像は docs/AI_TOOLS_REGISTRATION_PLAN.md を参照。
 */

/** ITツール正式名称（登録画面・資料で統一する唯一の正） */
export const CLAUDE_TOOL_NAME = "Claude Team（クロード チーム）"
/** 開発メーカー（他社製品） */
export const CLAUDE_MAKER_NAME = "Anthropic, PBC"
/** 製品公式URL（WEB掲載用URL） */
export const CLAUDE_PRODUCT_URL = "https://claude.com/"
export const SCHEME_LABEL = "デジタル化・AI導入補助金2026 通常枠"
export const PCODE_LABEL = "汎P-07 汎用・自動化・分析ツール"
/** 資料作成年月（表紙・識別表） */
export const DOCUMENT_DATE = "2026年9月"

/**
 * 円換算レート（円/USD）。
 * 登録価格は固定になるため、実勢レートに 3〜5% の余裕を持たせる（10% 超は付けない）。
 * 登録日に実勢レートで見直すこと。
 */
export const FX_RATE_JPY_PER_USD = 160

export type SeatPlan = {
  mark: string
  name: string
  /** 製造元定価（USD／席／月・年払い） */
  usdPerSeatPerMonth: number
  /** 特徴（資料の表で使う短文） */
  summary: string
  /** 登録画面上の扱い */
  applicationCategory: string
}

export const SEAT_PLANS: SeatPlan[] = [
  {
    mark: "①",
    name: "標準席",
    usdPerSeatPerMonth: 20,
    summary: "Claude アプリ（Web・デスクトップ・モバイル）、Projects、連携機能、組織管理",
    applicationCategory: "標準販売価格（最低契約席数 2席分）／ライセンス1価格（追加1席）",
  },
  {
    mark: "②",
    name: "プレミアム席",
    usdPerSeatPerMonth: 100,
    summary: "標準席の全機能に加え、利用上限の拡大とコード生成環境 Claude Code",
    applicationCategory: "ライセンス2価格（1席あたり）",
  },
]

export const STANDARD_SEAT = SEAT_PLANS[0]
export const PREMIUM_SEAT = SEAT_PLANS[1]

/** 最低契約席数（製造元の Team プラン条件） */
export const MINIMUM_SEATS = 2

/** 1席あたり年額（税抜・円）。USD 年額 × レート、100円未満切り捨て */
export function seatYearlyJpy(plan: SeatPlan): number {
  const usdYear = plan.usdPerSeatPerMonth * 12
  return Math.floor((usdYear * FX_RATE_JPY_PER_USD) / 100) * 100
}

/** 標準販売価格（税抜）= 標準席 × 最低契約席数 × 1年 */
export const STANDARD_PRICE = seatYearlyJpy(STANDARD_SEAT) * MINIMUM_SEATS
/** 最小販売価格（税抜）= 最低構成と同額 */
export const MINIMUM_PRICE = STANDARD_PRICE
/** ライセンス1価格（標準席 追加1席・年額） */
export const LICENSE1_PRICE = seatYearlyJpy(STANDARD_SEAT)
/** ライセンス2価格（プレミアム席 1席・年額） */
export const LICENSE2_PRICE = seatYearlyJpy(PREMIUM_SEAT)

/** 通常枠の補助率（基本） */
export const SUBSIDY_RATE_BASIC = 1 / 2
/** 通常枠 1プロセス以上の補助額下限・上限 */
export const SUBSIDY_MIN = 50_000
export const SUBSIDY_CAP_1PROCESS = 1_500_000 - 1

export type ServiceItem = {
  name: string
  /** 役務カテゴリー（登録画面の名称） */
  category: string
  price: number
  /** 単価×数量の内訳 */
  breakdown: string
  works: { task: string; deliverable: string }[]
  /** 含めない内容（カテゴリー混在の防止） */
  excludes: string
}

/** 本ITツールに紐付けて登録する役務 */
export const SERVICES: ServiceItem[] = [
  {
    name: "導入コンサルティング",
    category: "導入コンサルティング（役務）",
    price: 100_000,
    breakdown: "50,000円／人日 × 2人日",
    works: [
      {
        task: "現状業務のヒアリングと生成AI適用業務の選定（文書作成・要約・議事録・データ整理・問い合わせ対応 等）",
        deliverable: "適用業務一覧",
      },
      {
        task: "機密情報・個人情報の取扱いルールと利用ガイドラインの策定",
        deliverable: "生成AI利用ガイドライン",
      },
      {
        task: "組織設定方針（席の割当・権限・データ設定）の設計",
        deliverable: "導入計画書",
      },
    ],
    excludes: "初期設定の代行、マニュアル作成、問い合わせ対応・障害対応（保守サポート）、補助金申請のサポート",
  },
  {
    name: "導入研修",
    category: "導入設定・マニュアル作成・導入研修（役務）",
    price: 100_000,
    breakdown: "半日研修 1回（最大10名）＋ 教材作成",
    works: [
      {
        task: "操作研修（基本操作、Projects による業務別テンプレート化、連携機能の使い方）",
        deliverable: "研修実施報告",
      },
      {
        task: "部門別ユースケース演習とプロンプト集の作成",
        deliverable: "プロンプト集（PDF）",
      },
    ],
    excludes: "初期設定の代行、問い合わせ対応・障害対応（保守サポート）",
  },
]

export type CaseStudy = {
  /** 導入企業の名称（掲載許諾済みの実名） */
  name: string
  industry: string
  employees: string
  seats: string
  /** 利用開始年月 */
  startedAt: string
  /** 契約形態（有償である旨を必ず明記） */
  contract: string
  challenges: string[]
  effects: string[]
}

/**
 * 実在の導入実績のみを列挙する。空配列のあいだは事例カードを描画しない。
 *
 * ⚠️ 「（想定）」「仮例示」は要件違反（ITツール登録要領 別紙1（1）2.⑥ は
 * 「過去の導入事例・実績」を求めている）。電子取引Lシステムはこれで不採択になった
 * （docs/APPLICATION_PLAYBOOK.md §11-B）。事実のみを書くこと。
 */
export const CASE_STUDIES: CaseStudy[] = []

export type Competitor = {
  name: string
  vendor: string
  /** 公表価格（USD／ユーザー／月、年払い換算） */
  usdPerUserPerMonth: string
  generativeAi: string
  sharedKnowledge: string
  connectors: string
  noTraining: string
  codeGen: string
}

/**
 * 類似ITツール比較（Playbook §8-7 教訓5・8: 具体製品名＋提供企業名＋公表価格）。
 * 価格は 2026年9月時点の各社公開情報（年払い換算）。
 */
export const COMPETITORS: Competitor[] = [
  {
    name: CLAUDE_TOOL_NAME,
    vendor: CLAUDE_MAKER_NAME,
    usdPerUserPerMonth: "$20（標準席）／$100（プレミアム席）",
    generativeAi: "◎",
    sharedKnowledge: "◎ Projects",
    connectors: "◎ Google Drive・Gmail・Slack・Microsoft 365・GitHub",
    noTraining: "◎",
    codeGen: "◎ Claude Code（プレミアム席）",
  },
  {
    name: "ChatGPT Business",
    vendor: "OpenAI",
    usdPerUserPerMonth: "$20",
    generativeAi: "◎",
    sharedKnowledge: "◎ Projects／GPTs",
    connectors: "○ Google Drive・SharePoint 等",
    noTraining: "◎",
    codeGen: "○ Codex",
  },
  {
    name: "Gemini（Google Workspace Business Standard 同梱）",
    vendor: "Google",
    usdPerUserPerMonth: "$14（Workspace 込み）",
    generativeAi: "◎",
    sharedKnowledge: "○ Gems",
    connectors: "◎ Gmail・ドライブ・Meet（同一スイート内）",
    noTraining: "◎",
    codeGen: "△",
  },
  {
    name: "Microsoft 365 Copilot",
    vendor: "Microsoft",
    usdPerUserPerMonth: "$30（Microsoft 365 別途）",
    generativeAi: "◎",
    sharedKnowledge: "○ Copilot エージェント",
    connectors: "◎ Microsoft 365 内",
    noTraining: "◎",
    codeGen: "△",
  },
  {
    name: "Perplexity Enterprise Pro",
    vendor: "Perplexity AI",
    usdPerUserPerMonth: "$40",
    generativeAi: "◎（検索特化）",
    sharedKnowledge: "○ Spaces",
    connectors: "○",
    noTraining: "◎",
    codeGen: "—",
  },
  {
    name: "Notion AI（Notion Business 同梱）",
    vendor: "Notion Labs",
    usdPerUserPerMonth: "$20（Notion 込み）",
    generativeAi: "○",
    sharedKnowledge: "◎ Notion ページ",
    connectors: "○ Slack・Google Drive",
    noTraining: "◎",
    codeGen: "—",
  },
]

export function jpy(n: number): string {
  return n.toLocaleString("ja-JP")
}
export function yen(n: number): string {
  return `${jpy(n)}円`
}
