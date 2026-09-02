import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { NextResponse } from "next/server"
import { brandFromHost } from "@/lib/brand"

/**
 * 電子取引くん 固有機能のガード。
 *
 * 受発注Lシステム と 電子取引くん は別製品として登録申請するため、
 * 電子取引類型に固有の機能は 電子取引くん のホストでのみ提供する。
 *
 * 対象:
 *  - 招待型・受注側無償アカウント発行（/partners/invite・/invite/[token]・/api/invitations/*）
 *  - アカウント利用状況（/partners/accounts）
 *  - 電子取引アーカイブ（/archive）
 *
 * 受発注Lシステム の機能説明資料には招待機能の記載がないため、
 * こちらから外しても登録済みの内容と矛盾しない。
 */
export async function isDsystemHost(): Promise<boolean> {
  const h = await headers()
  return brandFromHost(h.get("host")).key === "dsystem"
}

/** サーバーコンポーネント／レイアウト用。受発注Lシステム側では 404 にする。 */
export async function requireDsystem() {
  if (!(await isDsystemHost())) notFound()
}

/** ルートハンドラ用。対象外ホストなら 404 レスポンスを返す（null なら続行）。 */
export async function dsystemApiGuard(): Promise<NextResponse | null> {
  if (await isDsystemHost()) return null
  return NextResponse.json(
    { error: "この機能は電子取引くんでのみ提供しています" },
    { status: 404 }
  )
}
