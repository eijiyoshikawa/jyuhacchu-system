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
  Archive,
  UserCheck,
  type LucideIcon,
} from "lucide-react"
import type { SystemBrandKey } from "@/lib/brand"

export type NavItem = {
  name: string
  href: string
  icon: LucideIcon
  /** この項目を表示するブランド。未指定は全ブランド共通 */
  onlyFor?: SystemBrandKey
}

/**
 * 業務メニュー。
 * `onlyFor: "dsystem"` の項目は 電子取引くん 固有機能であり、
 * 受発注Lシステム では表示しない（別製品として機能構成を分けるため）。
 */
export const navigation: NavItem[] = [
  { name: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { name: "案件管理", href: "/projects", icon: FolderOpen },
  { name: "発注管理", href: "/orders", icon: FileText },
  { name: "請求管理", href: "/invoices", icon: Receipt },
  { name: "承認", href: "/approvals", icon: ClipboardCheck },
  { name: "取引先管理", href: "/partners", icon: Building2 },
  { name: "取引先招待", href: "/partners/invite", icon: Mail, onlyFor: "dsystem" },
  { name: "アカウント利用状況", href: "/partners/accounts", icon: UserCheck, onlyFor: "dsystem" },
  { name: "電子取引アーカイブ", href: "/archive", icon: Archive, onlyFor: "dsystem" },
  { name: "設定", href: "/settings", icon: Settings },
]

export const adminNavigation: NavItem[] = [
  { name: "監査ログ", href: "/admin/audit-logs", icon: ScrollText },
  { name: "ユーザー管理", href: "/admin/users", icon: Users },
]

export function visibleNav(items: NavItem[], brand: SystemBrandKey): NavItem[] {
  return items.filter((i) => !i.onlyFor || i.onlyFor === brand)
}

export function isNavActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/"
  // 「取引先管理」が「取引先招待」「アカウント利用状況」を巻き込まないようにする
  if (href === "/partners") {
    return pathname === "/partners" || /^\/partners\/[^/]+$/.test(pathname)
  }
  return pathname === href || pathname.startsWith(href + "/")
}
