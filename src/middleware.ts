import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebaseIdToken');
  const { pathname } = request.nextUrl;

  // If the user is trying to access any protected admin route
  // and they are not authenticated, redirect them to the login page.
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!token) {
      // The root admin path requires a redirect to the full dashboard path
      if (pathname === '/admin') {
         return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If the user is authenticated and tries to access the login page,
  // redirect them to the admin dashboard.
  if (pathname.startsWith('/admin/login') && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // This matcher will protect all routes under /admin, including the root.
   matcher: ['/admin/:path*', '/admin'],
};
