import type { Metadata } from "next"

// 補助金申請資料は審査員が直接 URL を辿って閲覧する非公開経路。
// LP からの導線を持たず、検索エンジンからも除外する。
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default function TransactSubsidyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
