import type { Metadata } from "next"

// 招待受諾は電子取引くん（電子取引類型）専用のフローのため、ブランドを固定する
export const metadata: Metadata = {
  title: "取引先ご招待｜電子取引くん",
  description:
    "電子取引くんの招待受諾ページ。発注側企業からの招待により、受注側企業は無償でアカウントを発行できます。",
}

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
