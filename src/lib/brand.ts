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
}

export const LSYSTEM_BRAND: SystemBrand = {
  key: "lsystem",
  toolName: "受発注Lシステム",
  logoBase: "受発注",
  logoAccent: "L",
  logoSuffix: "システム",
  tagline: "インボイス対応クラウド受発注プラットフォーム",
  host: "lsystem.let-inc.net",
}

export const DSYSTEM_BRAND: SystemBrand = {
  key: "dsystem",
  toolName: "電子取引くん",
  logoBase: "電子取引",
  logoAccent: "くん",
  logoSuffix: "",
  tagline: "招待型クラウド電子取引プラットフォーム",
  host: "dlsystem.aigrowthx.pro",
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
