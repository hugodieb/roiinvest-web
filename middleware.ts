import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

  const isAuthenticated = request.cookies.has('access')

  if (request.nextUrl.pathname.startsWith('/activation')) {
    return NextResponse.next()
  }

  if (!isAuthenticated && !request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
}