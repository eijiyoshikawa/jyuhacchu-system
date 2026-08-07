import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * カスタムドメインとITツールの対応
 *  - lsystem.let-inc.net → 受発注Lシステム（インボイス対応類型）の LP／申請資料
 *  - dsystem.let-inc.net → 電子取引Lシステム（電子取引類型）の LP／申請資料
 *  - jyuhacchu-system.vercel.app → システム本体（フォールバック）
 */
const LSYSTEM_HOST = "lsystem.let-inc.net"
const DSYSTEM_HOST = "dsystem.let-inc.net"
const SYSTEM_FALLBACK_HOST = "https://jyuhacchu-system.vercel.app"

/** lsystem.let-inc.net で配信するパス（受発注Lシステム のマーケティング領域） */
function isLsystemPath(pathname: string): boolean {
  return (
    pathname === "/lp" ||
    pathname.startsWith("/lp/") ||
    pathname === "/subsidy" ||
    pathname.startsWith("/subsidy/") ||
    pathname === "/terms" ||
    pathname === "/privacy" ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images/")
  )
}

/** dsystem.let-inc.net で配信するパス（電子取引Lシステム のマーケティング＋招待受諾） */
function isDsystemPath(pathname: string): boolean {
  return (
    pathname === "/transact" ||
    pathname.startsWith("/transact/") ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/api/invitations/") ||
    pathname === "/terms" ||
    pathname === "/privacy" ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images/")
  )
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase()
  const pathname = req.nextUrl.pathname

  // ── lsystem.let-inc.net: 受発注Lシステム 用 ────────────────
  if (host === LSYSTEM_HOST) {
    // ルート `/` は /lp にリライトして 受発注Lシステム LP を配信
    if (pathname === "/") {
      const url = req.nextUrl.clone()
      url.pathname = "/lp"
      return NextResponse.rewrite(url)
    }
    if (!isLsystemPath(pathname)) {
      // 対象外パス（システム画面や /transact など）は本体ドメインへ誘導
      return NextResponse.redirect(
        new URL(pathname + req.nextUrl.search, SYSTEM_FALLBACK_HOST)
      )
    }
    return NextResponse.next()
  }

  // ── dsystem.let-inc.net: 電子取引Lシステム 用 ──────────────
  if (host === DSYSTEM_HOST) {
    // ルート `/` は /transact にリライトして 電子取引Lシステム LP を配信
    if (pathname === "/") {
      const url = req.nextUrl.clone()
      url.pathname = "/transact"
      return NextResponse.rewrite(url)
    }
    if (!isDsystemPath(pathname)) {
      return NextResponse.redirect(
        new URL(pathname + req.nextUrl.search, SYSTEM_FALLBACK_HOST)
      )
    }
    return NextResponse.next()
  }

  // ── 本体ドメイン（jyuhacchu-system.vercel.app 他） ─────────
  const isAuthPage = pathname.startsWith("/auth")
  const isApiAuth = pathname.startsWith("/api/auth")
  const isLegalPage = pathname === "/terms" || pathname === "/privacy"
  const isApiHealth = pathname === "/api/health"
  const isPublicMarketing =
    pathname === "/lp" ||
    pathname.startsWith("/lp/") ||
    pathname === "/subsidy" ||
    pathname.startsWith("/subsidy/") ||
    pathname === "/transact" ||
    pathname.startsWith("/transact/") ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/api/invitations/")

  // Public routes (system domain)
  if (isApiAuth || isLegalPage || isApiHealth || isPublicMarketing) {
    return NextResponse.next()
  }

  // Check for NextAuth session token cookie
  const sessionToken =
    req.cookies.get("__Secure-authjs.session-token") ??
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token")

  const isLoggedIn = !!sessionToken

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.url))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
