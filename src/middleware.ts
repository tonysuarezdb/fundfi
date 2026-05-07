import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p);
  // Real app: check for the httpOnly JWT cookie set by the server on login.
  // Mock app: check for the client-set cookie from authService.login().
  const isAuthenticated = request.cookies.has('fundfi_auth');

  if (!isPublic && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirect already-authenticated users away from the login page
  if (pathname === '/' && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.webp|.*\\.png|.*\\.jpg|.*\\.ico).*)'],
};
