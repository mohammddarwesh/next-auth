"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LoaderCircle, LogOut, User } from "lucide-react"
import UserDropdown from "./user-dropdown"

export function AuthButtons() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (isLoading) {
    return (
      <Button disabled>
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (session) {
    const user = {
      name: session?.user?.name || null,
      email: session?.user?.email || null,
      image: session?.user?.image || null
    }
    return (
      <UserDropdown user={user} />
    )
  }

  return (
    <Button asChild>
      <Link href="/login" className="flex items-center">
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}
