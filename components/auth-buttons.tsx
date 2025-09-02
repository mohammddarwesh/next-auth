"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, LoaderCircle } from "lucide-react"
import UserDropdown from "./user-dropdown"
import { useUser } from "@/hooks/useUser"

export function AuthButtons() {
  const { user, isLoading } = useUser()


  if (isLoading) {
    return (
      <Button disabled>
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  if (user) {
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
