import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Authentication Error</h1>
          <p className="text-muted-foreground">
            Something went wrong during authentication. Please try again.
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <Button asChild>
            <Link href="/login">Back to Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
