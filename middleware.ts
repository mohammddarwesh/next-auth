import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Public routes
  const publicRoutes = ['/', '/login', '/about']
  
  // Allow access to public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Role-based access control
  const userRole = session.user?.role || 'user'
  
  // Define protected routes and required roles
  const protectedRoutes = {
    '/dashboard': ['user', 'admin'],
    '/admin': ['admin'],
  }

  // Check if the current route is protected
  const matchedRoute = Object.entries(protectedRoutes).find(([route]) =>
    pathname.startsWith(route)
  )

  if (matchedRoute) {
    const [route, allowedRoles] = matchedRoute
    const hasAccess = allowedRoles.includes(userRole)

    if (!hasAccess) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  return NextResponse.next()
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|error|unauthorized).*)',
  ],
}