"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { useSystemBrand } from "@/components/use-system-brand"
import { BrandWordmark } from "@/components/layout/brand-wordmark"
import { adminNavigation, isNavActive, navigation, visibleNav } from "@/components/layout/nav-items"

/**
 * 電子取引くん 用の上部ナビゲーション。
 * 受発注Lシステム（左サイドバー・明るい地色）とは意図的に異なる形にしている。
 */
export function TopNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const brand = useSystemBrand()
  const t = brand.theme
  const isAdmin = session?.user?.role === "ADMIN"
  const items = [...visibleNav(navigation, brand.key), ...(isAdmin ? adminNavigation : [])]

  return (
    <header className={cn(t.chromeBg, t.chromeText, "border-b", t.chromeBorder)}>
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <Link href="/" className="shrink-0 text-lg font-black tracking-tight">
          <BrandWordmark onDark />
        </Link>
        <span className="hidden xl:block text-[11px] text-slate-400">{brand.tagline}</span>
        <div className="ml-auto flex items-center gap-3">
          {session?.user && (
            <div className="text-right leading-tight">
              <div className="text-sm font-semibold">{session.user.name}</div>
              <div className="text-[11px] text-slate-400">{session.user.companyName}</div>
            </div>
          )}
        </div>
      </div>
      <nav className="flex items-stretch gap-0.5 overflow-x-auto px-2 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:px-4 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const active = isNavActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-2.5 text-[13px] font-medium transition-colors",
                active
                  ? cn("border-teal-400", t.navActive, "rounded-t-lg")
                  : cn("border-transparent", t.navIdle, "rounded-t-lg")
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
