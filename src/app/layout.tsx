import type { Metadata } from "next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "受発注Lシステム",
  description: "業種を問わず使えるクラウド型の受発注・請求管理プラットフォーム。インボイス制度・電子帳簿保存法に対応。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
