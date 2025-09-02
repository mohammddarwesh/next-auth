import { auth } from "@/auth"
import { NextResponse } from "next/server"

const adminRoutes = ["/dashboard/admin", "/admin", "/api/admin", "/actions"]
const userRoutes = ["/dashboard/user", "/store", "/api/user"]

function matchesPath(pathname: string, routes: string[]) {
  return routes.some((route) => pathname.startsWith(route))
}

export default auth((req) => {
  const { pathname } = req.nextUrl
  const user = req.auth?.user

  // Block logged-in users from accessing login page
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Admin protection
  if (matchesPath(pathname, adminRoutes) && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/not-found", req.url))
  }

  // User protection
  if (matchesPath(pathname, userRoutes) && user?.role !== "user") {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }
   // Redirect /dashboard to role-specific dashboard
   if (pathname === '/dashboard') {
    const redirectPath = user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'
    return NextResponse.redirect(new URL(redirectPath, req.url))
  }
  

  // All other routes are public by default
  return NextResponse.next()
})