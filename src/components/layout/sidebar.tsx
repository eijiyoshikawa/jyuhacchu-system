"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Building2,
  FolderOpen,
  Receipt,
  ClipboardCheck,
  ScrollText,
  Settings,
  Users,
  Mail,
} from "lucide-react"

const navigation = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "案件管理", href: "/projects", icon: FolderOpen },
  { name: "発注管理", href: "/orders", icon: FileText },
  { name: "請求管理", href: "/invoices", icon: Receipt },
  { name: "承認", href: "/approvals", icon: ClipboardCheck },
  { name: "取引先管理", href: "/partners", icon: Building2 },
  { name: "取引先招待", href: "/partners/invite", icon: Mail },
  { name: "設定", href: "/settings", icon: Settings },
]

const adminNavigation = [
  { name: "監査ログ", href: "/admin/audit-logs", icon: ScrollText },
  { name: "ユーザー管理", href: "/admin/users", icon: Users },
]

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "ADMIN"

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center border-b border-gray-200 px-6">
        <h1 className="text-lg font-bold text-gray-900">
          受発注<span className="text-orange-500">L</span>システム
        </h1>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-orange-50 text-orange-600 border-l-2 border-orange-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-orange-500" : "text-gray-400")} />
              {item.name}
            </Link>
          )
        })}

        {isAdmin && (
          <>
            <div className="my-3 border-t border-gray-200" />
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              管理者メニュー
            </div>
            {adminNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-orange-50 text-orange-600 border-l-2 border-orange-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-orange-500" : "text-gray-400")} />
                  {item.name}
                </Link>
              )
            })}
          </>
        )}
      </nav>
      <div className="border-t border-gray-200 px-6 py-3">
        <div className="flex gap-3 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-gray-600 hover:underline">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:text-gray-600 hover:underline">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </aside>
  )
}
