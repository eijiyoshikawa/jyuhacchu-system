import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const MARKETING_HOST = "lsystem.let-inc.net"
const SYSTEM_FALLBACK_HOST = "https://jyuhacchu-system.vercel.app"

function isMarketingPath(pathname: string): boolean {
  return (
    pathname === "/" ||
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

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") ?? "").toLowerCase()
  const pathname = req.nextUrl.pathname

  // Custom marketing domain: only marketing pages are served here.
  // System pages (/orders, /auth/login, /api/*) are redirected to the Vercel URL.
  if (host === MARKETING_HOST) {
    if (!isMarketingPath(pathname)) {
      return NextResponse.redirect(
        new URL(pathname + req.nextUrl.search, SYSTEM_FALLBACK_HOST)
      )
    }
    return NextResponse.next()
  }

  const isAuthPage = pathname.startsWith("/auth")
  const isApiAuth = pathname.startsWith("/api/auth")
  const isLegalPage = pathname === "/terms" || pathname === "/privacy"
  const isApiHealth = pathname === "/api/health"
  const isPublicMarketing =
    pathname === "/lp" ||
    pathname.startsWith("/lp/") ||
    pathname === "/subsidy" ||
    pathname.startsWith("/subsidy/")

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
