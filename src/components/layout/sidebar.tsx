"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { useSystemBrand } from "@/components/use-system-brand"
import { BrandWordmark } from "@/components/layout/brand-wordmark"
import { adminNavigation, isNavActive, navigation, visibleNav } from "@/components/layout/nav-items"

interface SidebarProps {
  onNavigate?: () => void
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const brand = useSystemBrand()
  const isAdmin = session?.user?.role === "ADMIN"

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14 items-center border-b border-gray-200 px-6">
        <h1 className="text-lg font-bold text-gray-900">
          <BrandWordmark />
        </h1>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {visibleNav(navigation, brand.key).map((item) => {
          const isActive = isNavActive(pathname, item.href)
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
              const isActive = isNavActive(pathname, item.href)
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
