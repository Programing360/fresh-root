import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Replace this with your actual JWT/Cookie check logic
  const token = request.cookies.get('token')?.value; 
  const { pathname } = request.nextUrl;
  // Protect paths starting with /items/add or /items/manage
  if (!token && (pathname.startsWith('/dashboard/items/add') || pathname.startsWith('/dashboard/items/manage'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/items/add', '/dashboard/items/manage','/dashboard/items/profile' ], // Applies middleware to all subroutes of /items
};