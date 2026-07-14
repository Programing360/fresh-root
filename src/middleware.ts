import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Replace this with your actual JWT/Cookie check logic
  const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;

  // Protect paths starting with /items/add or /items/manage
  if (!token && (pathname.startsWith('/items/add') || pathname.startsWith('/items/manage'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/shop/:path*'], // Applies middleware to all subroutes of /items
};