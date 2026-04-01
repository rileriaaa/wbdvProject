import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED = [
  '/profile',
  '/messages',
  '/notifications',
  '/cart',
  '/checkout',
  '/order',
  '/orders',
  '/review',
]

const AUTH_ONLY = [
  '/login',
  '/signup',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Read auth cookie — we set this on login, remove on logout
  const isLoggedIn = request.cookies.has('sd_auth')

  // Check if route is protected
  const isProtected = PROTECTED.some(path => pathname.startsWith(path))
  const isAuthOnly  = AUTH_ONLY.some(path  => pathname.startsWith(path))

  // Redirect logged-out users away from protected pages
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url)
    // Pass the original URL so we can redirect back after login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from login/signup
  if (isAuthOnly && isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
}