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
} from "lucide-react"

const navigation = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "案件管理", href: "/projects", icon: FolderOpen },
  { name: "発注管理", href: "/orders", icon: FileText },
  { name: "請求管理", href: "/invoices", icon: Receipt },
  { name: "承認", href: "/approvals", icon: ClipboardCheck },
  { name: "協力会社管理", href: "/partners", icon: Building2 },
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
    <aside className="flex h-full w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-lg font-bold text-gray-900">受発注管理</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
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
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}

        {isAdmin && (
          <>
            <div className="my-3 border-t" />
            {adminNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </>
        )}
      </nav>
      <div className="border-t px-6 py-3">
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
