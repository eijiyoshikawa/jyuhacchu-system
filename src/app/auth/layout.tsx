import type { Metadata } from "next"
import { headers } from "next/headers"
import { brandFromHost } from "@/lib/brand"
import { SystemBrandProvider } from "@/components/use-system-brand"

// ログイン画面のタブタイトル・表示ブランドをホスト別に切り替える
// （dlsystem.aigrowthx.pro では「電子取引くん」）
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const brand = brandFromHost(h.get("host"))
  return {
    title: `ログイン｜${brand.toolName}`,
    description: brand.tagline,
  }
}

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const h = await headers()
  const brand = brandFromHost(h.get("host"))
  return <SystemBrandProvider brand={brand}>{children}</SystemBrandProvider>
}
