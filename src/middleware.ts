import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * カスタムドメインとITツールの対応
 *  - lsystem.let-inc.net → 受発注Lシステム（インボイス対応類型）の LP／申請資料
 *  - dlsystem.aigrowthx.pro → 電子取引くん（電子取引類型）の LP／申請資料
 *  - jyuhacchu-system.vercel.app → システム本体（フォールバック）
 */
const LSYSTEM_HOST = "lsystem.let-inc.net"
const DSYSTEM_HOST = "dlsystem.aigrowthx.pro"
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

/**
 * dlsystem.aigrowthx.pro から他ツール（受発注Lシステム）ドメインへ退避させるパス。
 * それ以外（/transact・/invite・システム本体・認証・API）は dlsystem 上で直接配信し、
 * システム画面は 電子取引くん ブランドで表示される（src/lib/brand.ts）。
 */
function isLsystemOnlyPath(pathname: string): boolean {
  return (
    pathname === "/lp" ||
    pathname.startsWith("/lp/") ||
    pathname === "/subsidy" ||
    pathname.startsWith("/subsidy/")
  )
}

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase()
  const pathname = req.nextUrl.pathname

  // NextAuth セッションクッキー（ホストごとに独立）
  const sessionToken =
    req.cookies.get("__Secure-authjs.session-token") ??
    req.cookies.get("authjs.session-token") ??
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token")
  const isLoggedIn = !!sessionToken

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

  // ── dlsystem.aigrowthx.pro: 電子取引くん 用 ────────────
  if (host === DSYSTEM_HOST) {
    // ルート `/` は未ログイン時のみ /transact にリライトして LP を配信
    // （ログイン済みの場合はダッシュボードをこのホストで表示する）
    if (pathname === "/" && !isLoggedIn) {
      const url = req.nextUrl.clone()
      url.pathname = "/transact"
      return NextResponse.rewrite(url)
    }
    // 受発注Lシステム 専用領域（LP・申請資料）のみ本体ドメインへ退避。
    // それ以外（/transact・/invite・/auth・ダッシュボード・API）は
    // このホストで配信し、認証チェックは下の共通ロジックに委ねる
    // （システム画面は 電子取引くん ブランドで表示）。
    if (isLsystemOnlyPath(pathname)) {
      return NextResponse.redirect(
        new URL(pathname + req.nextUrl.search, SYSTEM_FALLBACK_HOST)
      )
    }
    // fall through: 共通の認証・公開ルート判定へ
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
    // 他社製 生成AIツール（通常枠）の申請資料。製品ブランドを持たないため本体ドメインで配信
    pathname.startsWith("/ai-tools/") ||
    pathname.startsWith("/invite/") ||
    pathname.startsWith("/api/invitations/")

  // Public routes (system domain)
  if (isApiAuth || isLegalPage || isApiHealth || isPublicMarketing) {
    return NextResponse.next()
  }

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
  // 静的アセット（画像・robots）は認証・ホスト振り分けの対象外にする。
  // ここを除外し忘れると、申請資料に埋め込んだ画面キャプチャが未ログインの
  // 審査員に対して /auth/login へリダイレクトされ、図が一切表示されなくなる。
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|robots.txt).*)"],
}
