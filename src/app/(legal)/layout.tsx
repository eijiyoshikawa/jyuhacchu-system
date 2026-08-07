import type { Metadata } from "next"
import Link from "next/link"
import { headers } from "next/headers"
import { brandFromHost } from "@/lib/brand"

// 法務ページのタブタイトルもホスト別ブランドに合わせる
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const brand = brandFromHost(h.get("host"))
  return {
    title: brand.toolName,
    description: brand.tagline,
  }
}

export default async function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const h = await headers()
  const brand = brandFromHost(h.get("host"))
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900">
            {brand.toolName}
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            ログイン
          </Link>
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  )
}
