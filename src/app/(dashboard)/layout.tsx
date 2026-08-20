import type { Metadata } from "next"
import { headers } from "next/headers"
import { brandFromHost } from "@/lib/brand"
import { SystemBrandProvider } from "@/components/use-system-brand"
import { DashboardShell } from "@/components/layout/dashboard-shell"

// ダッシュボードのタブタイトル・表示ブランドをホスト別に切り替える
// （dlsystem.aigrowthx.pro では「電子取引くん」）
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const brand = brandFromHost(h.get("host"))
  return {
    title: brand.toolName,
    description: brand.tagline,
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const h = await headers()
  const brand = brandFromHost(h.get("host"))
  return (
    <SystemBrandProvider brand={brand}>
      <DashboardShell>{children}</DashboardShell>
    </SystemBrandProvider>
  )
}
