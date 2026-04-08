import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
  const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth")
  const isLegalPage = req.nextUrl.pathname === "/terms" || req.nextUrl.pathname === "/privacy"
  const isApiHealth = req.nextUrl.pathname === "/api/health"
  const isApiSeed = req.nextUrl.pathname === "/api/seed"

  // Public routes
  if (isApiAuth || isLegalPage || isApiHealth || isApiSeed) return NextResponse.next()

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
