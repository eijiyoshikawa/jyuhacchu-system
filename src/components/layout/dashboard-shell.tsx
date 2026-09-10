"use client"

import { useState } from "react"
import { logoutToLogin } from "@/lib/logout"
import { Sidebar } from "@/components/layout/sidebar"
import { TopNav } from "@/components/layout/topnav"
import { Header } from "@/components/layout/header"
import { useSystemBrand } from "@/components/use-system-brand"
import { cn } from "@/lib/utils"
import { LogOut, Menu, X } from "lucide-react"

/**
 * ブランドごとに画面の骨格を切り替える。
 *  - 受発注Lシステム: 左サイドバー + 明るいヘッダ
 *  - 電子取引くん   : 濃色の上部ナビゲーション（サイドバーなし）
 * 別製品として実機デモの見た目を明確に分けるための分岐。
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const brand = useSystemBrand()
  const t = brand.theme

  if (t.nav === "topbar") {
    return (
      <div className={cn("flex h-screen flex-col", t.appBg)}>
        <TopNav />
        <div className="flex items-center justify-end px-4 py-2 lg:px-6">
          <button
            onClick={() => logoutToLogin()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <LogOut className="h-3.5 w-3.5" />
            ログアウト
          </button>
        </div>
        <main className="flex-1 overflow-y-auto px-4 pb-8 lg:px-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 flex h-full w-64 flex-col shadow-xl">
            <div className="absolute right-2 top-3 z-10">
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-sm p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b border-gray-200 bg-white px-4 lg:px-6">
          <button
            className="mr-3 rounded-sm p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Header />
        </header>
        <main className={cn("flex-1 overflow-y-auto p-4 md:p-6", t.appBg)}>
          {children}
        </main>
      </div>
    </div>
  )
}
