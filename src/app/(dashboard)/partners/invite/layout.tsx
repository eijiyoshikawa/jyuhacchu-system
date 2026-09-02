import { requireDsystem } from "@/lib/dsystem-guard"

/**
 * 取引先招待（無償アカウント発行）は 電子取引くん 固有機能。
 * 招待発行画面はクライアントコンポーネントのため、ここでホストを判定する。
 */
export default async function PartnersInviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireDsystem()
  return <>{children}</>
}
