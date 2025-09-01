"use client"

import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { User } from "next-auth"
import UserDropdown from "@/components/user-dropdown"
import { Home } from "lucide-react"
import Link from "next/link"

interface UserProps {
  name?: string | null
  email?: string | null
  image?: string | null
}

export function DashboardHeader({ user }: { user: UserProps }) {
  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/"><Home className="h-6 w-6 mr-2 text-gray-600 inline-block hover:text-gray-900" /></Link>
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name}
            </span>
            <UserDropdown user={user} />
          </div>
        </div>
      </div>
    </header>
  )
}
