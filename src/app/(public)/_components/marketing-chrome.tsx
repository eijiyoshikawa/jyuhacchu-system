import Link from "next/link"
import { DSYSTEM_BRAND, LSYSTEM_BRAND, type SystemBrandKey } from "@/lib/brand"

/**
 * 公開サイト（LP・申請資料）の共通ヘッダ／フッタ。
 * ツールごとにブランド表記とナビゲーションを完全に分離する
 * （申請審査でツール名の混在が不備と判定されるため）。
 */
export function MarketingChrome({
  brand,
  children,
}: {
  brand: SystemBrandKey
  children: React.ReactNode
}) {
  const isD = brand === "dsystem"
  // ツール名・ロゴ表記は src/lib/brand.ts を唯一の正とする（改名時の直し漏れ防止）
  const b = isD ? DSYSTEM_BRAND : LSYSTEM_BRAND
  const toolName = b.toolName
  const homeHref = isD ? "/transact" : "/lp"
  const tagline = isD
    ? b.tagline
    : "インボイス対応クラウド受発注・請求管理プラットフォーム"
  const schemeLine = isD
    ? "インボイス枠 電子取引類型 対応ITツール"
    : "インボイス枠 インボイス対応類型 対応ITツール"

  const navLinks = isD
    ? [
        { href: "/transact#features", label: "機能" },
        { href: "/transact#flow", label: "導入フロー" },
        { href: "/transact#faq", label: "FAQ" },
      ]
    : [
        { href: "/lp#features", label: "機能" },
        { href: "/lp#pricing", label: "料金" },
        { href: "/subsidy", label: "IT導入補助金" },
        { href: "/lp#faq", label: "FAQ" },
      ]

  const footerProductLinks = isD
    ? [
        { href: "/transact#features", label: "機能" },
        { href: "/transact#flow", label: "導入フロー" },
        { href: "/transact#faq", label: "FAQ" },
      ]
    : [
        { href: "/lp#features", label: "機能" },
        { href: "/lp#pricing", label: "料金" },
        { href: "/subsidy", label: "IT導入補助金" },
      ]

  return (
    <>
      <header className="print-hide border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href={homeHref} className="text-lg font-black tracking-tight text-slate-900">
            {b.logoBase}<span className="text-orange-500">{b.logoAccent}</span>{b.logoSuffix}
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-slate-900">
                {l.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="rounded-sm bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="print-hide border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-base font-bold text-slate-900">
                {b.logoBase}<span className="text-orange-500">{b.logoAccent}</span>{b.logoSuffix}
              </p>
              <p className="mt-2 text-xs">{tagline}</p>
              <p className="mt-4 text-xs">
                IT導入補助金（デジタル化・AI導入補助金2026）<br />
                {schemeLine}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="mb-2 font-bold text-slate-900">プロダクト</p>
                <ul className="space-y-1">
                  {footerProductLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-bold text-slate-900">法令</p>
                <ul className="space-y-1">
                  <li><Link href="/terms" className="hover:underline">利用規約</Link></li>
                  <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-400">
            © 2026 {toolName}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
