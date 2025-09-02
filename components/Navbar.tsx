import { Home, Info } from "lucide-react"
import Link from "next/link"
import { AuthButtons } from "@/components/auth-buttons"


export function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center text-gray-900 hover:text-gray-600">
            <Home className="h-6 w-6 mr-2" />
            <span className="text-xl font-semibold">NextAuth Demo</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-gray-500 hover:text-gray-900 flex items-center">
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
          </nav>
        </div>
        <AuthButtons />
      </div>
    </nav>
  )
}
