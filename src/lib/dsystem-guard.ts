import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { brandFromHost } from "@/lib/brand"

/**
 * 電子取引くん 固有機能のガード。
 *
 * 受発注Lシステム と 電子取引くん は別製品として登録申請するため、
 * 電子取引類型に固有の機能（アカウント利用状況・電子取引アーカイブ）は
 * 電子取引くん のホストでのみ提供する。
 * 受発注Lシステム 側からアクセスされた場合は 404 とする。
 */
export async function requireDsystem() {
  const h = await headers()
  if (brandFromHost(h.get("host")).key !== "dsystem") {
    notFound()
  }
}
