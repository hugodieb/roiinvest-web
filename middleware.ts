import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const isAuthenticated = request.cookies.has('access')

  if (request.nextUrl.pathname === '/password-reset') {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.next()
  }

  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAuthenticated && request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}