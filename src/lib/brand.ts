/**
 * ホスト別ブランディング
 *  - dlsystem.aigrowthx.pro / denshi-kun.aigrowthx.pro → 電子取引くん（電子取引類型）
 *  - それ以外（lsystem / vercel.app）                  → 受発注Lシステム（インボイス対応類型）
 *
 * 1つのデプロイで2つのITツールを配信しているため、システム本体（ログイン・
 * ダッシュボード・法務ページ）の名称はリクエストホストで切り替える。
 * 審査ではツール名の混在が不備と判定されるため、電子取引くんのデモは
 * 必ず DSYSTEM_HOST 側の URL で案内すること。
 *
 * ⚠️ ITツール名を改名する場合は DSYSTEM_BRAND / LSYSTEM_BRAND の定義だけを直すこと。
 * 資料コンポーネント（transact/subsidy/_components/*）は TOOL_NAME をここから
 * 参照しているため、名称のハードコードを増やさないこと。
 */

export type SystemBrandKey = "lsystem" | "dsystem"


/**
 * ブランドごとの外観テーマ。
 *
 * 受発注Lシステム と 電子取引くん は「別製品」であり、審査でも実機デモを
 * 比較されうるため、ナビゲーション形状・配色・角丸まで含めて明確に分ける。
 * Tailwind はクラス名を静的解析するため、必ず完全なクラス文字列を持たせること
 * （`text-${color}-500` のような動的生成はビルドで削除される）。
 */
export type SystemBrandTheme = {
  /** ナビゲーションの形（左サイドバー／上部バー） */
  nav: "sidebar" | "topbar"
  /** 明るい背景の上でのアクセント色 */
  accentText: string
  /** 暗い背景の上でのアクセント色 */
  accentTextOnDark: string
  /** ナビゲーション地色 */
  chromeBg: string
  chromeText: string
  chromeBorder: string
  /** ナビゲーションの選択中項目 */
  navActive: string
  navIdle: string
  /** コンテンツ領域の背景 */
  appBg: string
  /** カード等の角丸 */
  radius: string
  /** 主ボタンの配色 */
  primaryButton: string
}

export type SystemBrand = {
  key: SystemBrandKey
  /** ツール正式名称（申請書類・タブタイトル・法務ページで使う唯一の正） */
  toolName: string
  /** ロゴ表記の前半（通常色） */
  logoBase: string
  /** ロゴ表記の強調部（オレンジ色） */
  logoAccent: string
  /** ロゴ表記の後半（通常色。無い場合は空文字） */
  logoSuffix: string
  /** サブコピー */
  tagline: string
  /** 申請資料・デモ案内で使う公開ホスト（プロトコル無し） */
  host: string
  /** 外観テーマ */
  theme: SystemBrandTheme
}

export const LSYSTEM_BRAND: SystemBrand = {
  key: "lsystem",
  toolName: "受発注Lシステム",
  logoBase: "受発注",
  logoAccent: "L",
  logoSuffix: "システム",
  tagline: "インボイス対応クラウド受発注プラットフォーム",
  host: "lsystem.let-inc.net",
  theme: {
    nav: "sidebar",
    accentText: "text-orange-500",
    accentTextOnDark: "text-orange-400",
    chromeBg: "bg-white",
    chromeText: "text-gray-900",
    chromeBorder: "border-gray-200",
    navActive: "bg-orange-50 text-orange-700",
    navIdle: "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
    appBg: "bg-[#f1f3f5]",
    radius: "rounded-sm",
    primaryButton: "bg-orange-500 hover:bg-orange-600 text-white",
  },
}

export const DSYSTEM_BRAND: SystemBrand = {
  key: "dsystem",
  toolName: "電子取引くん",
  logoBase: "電子取引",
  logoAccent: "くん",
  logoSuffix: "",
  tagline: "招待型クラウド電子取引プラットフォーム",
  host: "dlsystem.aigrowthx.pro",
  theme: {
    nav: "topbar",
    accentText: "text-teal-600",
    accentTextOnDark: "text-teal-300",
    chromeBg: "bg-slate-900",
    chromeText: "text-white",
    chromeBorder: "border-slate-800",
    navActive: "bg-teal-500/20 text-teal-200",
    navIdle: "text-slate-300 hover:bg-slate-800 hover:text-white",
    appBg: "bg-slate-100",
    radius: "rounded-xl",
    primaryButton: "bg-teal-600 hover:bg-teal-700 text-white",
  },
}

/** 電子取引くん を配信するホスト（新旧サブドメインの両方を受け付ける） */
const DSYSTEM_HOST_PREFIXES = ["dlsystem.", "denshi-kun.", "denshitorihiki-kun."]

/** ホスト名からシステムブランドを解決する */
export function brandFromHost(host: string | null | undefined): SystemBrand {
  const h = (host ?? "").toLowerCase()
  return DSYSTEM_HOST_PREFIXES.some((p) => h.startsWith(p))
    ? DSYSTEM_BRAND
    : LSYSTEM_BRAND
}
