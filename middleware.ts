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

  const isAdminPath = matchesPath(pathname, adminRoutes)
  const isUserPath = matchesPath(pathname, userRoutes)
  const isDashboardRoot = pathname === "/dashboard"
  const isProtected = isAdminPath || isUserPath || isDashboardRoot

  // If route is protected and user not authenticated -> login
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Admin protection
  if (isAdminPath && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/not-found", req.url))
  }

  // User protection
  // Allow admins to access user routes too
  if (isUserPath && !(user?.role === "user" || user?.role === "admin")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url))
  }
  // Redirect /dashboard to role-specific dashboard (only after auth)
  if (isDashboardRoot && user) {
    const redirectPath = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'
    return NextResponse.redirect(new URL(redirectPath, req.url))
  }
  

  // All other routes are public by default
  return NextResponse.next()
})