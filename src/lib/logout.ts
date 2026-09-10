"use client"

import { signOut } from "next-auth/react"

/**
 * ログアウト後は「現在のホスト」のログイン画面へ戻す。
 *
 * `signOut({ callbackUrl })` は NEXTAUTH_URL / AUTH_URL の origin を基準に
 * 遷移先を組み立てるため、dlsystem.aigrowthx.pro（電子取引くん）でログアウトすると
 * jyuhacchu-system.vercel.app（受発注Lシステム表記）へ飛んでしまう事故があった
 * （2026-09-10 審査中に発生）。審査でツール名の混在と見られないよう、
 * リダイレクトはクライアント側で相対パスに固定する。
 */
export async function logoutToLogin(): Promise<void> {
  await signOut({ redirect: false })
  window.location.assign("/auth/login")
}
