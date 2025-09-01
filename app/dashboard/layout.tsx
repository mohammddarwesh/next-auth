import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "./_components/DashboardHeader"

type UserProps = {
  name?: string | null
  email?: string | null
  image?: string | null
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={{
        name: session.user?.name || null,
        email: session.user?.email || null,
        image: session.user?.image || null
      }} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
