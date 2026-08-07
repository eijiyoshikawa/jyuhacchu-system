/**
 * ホスト別ブランディング
 *  - dlsystem.aigrowthx.pro       → 電子取引Lシステム（電子取引類型）
 *  - それ以外（lsystem / vercel.app）→ 受発注Lシステム（インボイス対応類型）
 *
 * 1つのデプロイで2つのITツールを配信しているため、システム本体（ログイン・
 * ダッシュボード・法務ページ）の名称はリクエストホストで切り替える。
 * 審査ではツール名の混在が不備と判定されるため、電子取引Lシステムのデモは
 * 必ず dlsystem.aigrowthx.pro 側の URL で案内すること。
 */

export type SystemBrandKey = "lsystem" | "dsystem"

export type SystemBrand = {
  key: SystemBrandKey
  /** ツール正式名称 */
  toolName: string
  /** 「L」の前に置く名称プレフィックス（ロゴ表記 <前>+L+システム 用） */
  namePrefix: string
  /** サブコピー */
  tagline: string
}

export const LSYSTEM_BRAND: SystemBrand = {
  key: "lsystem",
  toolName: "受発注Lシステム",
  namePrefix: "受発注",
  tagline: "インボイス対応クラウド受発注プラットフォーム",
}

export const DSYSTEM_BRAND: SystemBrand = {
  key: "dsystem",
  toolName: "電子取引Lシステム",
  namePrefix: "電子取引",
  tagline: "招待型クラウド電子取引プラットフォーム",
}

/** ホスト名からシステムブランドを解決する（サブドメイン dlsystem.* を電子取引L と判定） */
export function brandFromHost(host: string | null | undefined): SystemBrand {
  const h = (host ?? "").toLowerCase()
  return h === "dlsystem.aigrowthx.pro" || h.startsWith("dlsystem.")
    ? DSYSTEM_BRAND
    : LSYSTEM_BRAND
}
