import type { Metadata } from "next"
import { requireDsystem } from "@/lib/dsystem-guard"

// 招待受諾は電子取引くん（電子取引類型）専用のフローのため、ブランドを固定する
export const metadata: Metadata = {
  title: "取引先ご招待｜電子取引くん",
  description:
    "電子取引くんの招待受諾ページ。発注側企業からの招待により、受注側企業は無償でアカウントを発行できます。",
}

export default async function InviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 招待受諾は 電子取引くん 固有のフロー。受発注Lシステム側では提供しない。
  await requireDsystem()
  return <>{children}</>
}
