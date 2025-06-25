import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('All cookies:', request.cookies.getAll());
  const token = request.cookies.get('token')?.value;
  console.log('Token found:', !!token);
  console.log('Token value (first 50 chars):', token?.substring(0, 50));
  
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Accessing admin route');
    
    // If no token, redirect to login
    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      // Decode JWT token payload (frontend only approach)
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded payload:', payload);
      
      // If not admin, redirect to unauthorized page
      if (!payload.admin) {
        console.log('User is not admin, redirecting to unauthorized');
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
      
      console.log('User is admin, allowing access');
    } catch (error) {
      console.log('Error decoding token:', error);
      // If token is invalid, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};

