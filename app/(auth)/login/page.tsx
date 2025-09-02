"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { LoaderCircle } from 'lucide-react'
// Using console.error for now since we don't have sonner installed
// import { toast } from 'sonner'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()

  // Get callback URL from query params or default to dashboard
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard'
  const error = searchParams?.get('error')

  // Redirect if already authenticated
  useEffect(() => {
    if (status === 'authenticated' && session) {
      // If callbackUrl is provided, use it, otherwise redirect based on role
      if (callbackUrl && callbackUrl !== '/dashboard') {
        router.push(callbackUrl)
      } else {
        const redirectPath = session.user?.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'
        router.push(redirectPath)
      }
    }
  }, [status, session, callbackUrl, router])

  // Handle sign in with Auth0
  const handleSignIn = async () => {
    try {
      setIsLoading(true)

      // Sign in with Auth0
      const result = await signIn('auth0', {
        // Always redirect to dashboard, we'll handle the specific path in the middleware
        callbackUrl: '/dashboard',
        redirect: false,
      })

      // If there's an error, show it
      if (result?.error) {
        console.error('Login error:', result.error)
        return
      }

      // If successful, redirect to the callback URL
      if (result?.url) {
        window.location.href = result.url
      }

    } catch (error) {
      console.error('Login error:', error)
      console.error('Failed to sign in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Kayra Export
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your account
          </p>

          {error && (
            <div className="mt-4 rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <LoaderCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {error === 'AccessDenied'
                      ? 'You do not have permission to access this page.'
                      : 'An error occurred during sign in. Please try again.'}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-6">
          <Button
            onClick={handleSignIn}
            disabled={isLoading}
            className="w-full justify-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2"
            size="lg"
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.auth0 className="mr-2 h-4 w-4" />
            )}
            Continue with Auth0
          </Button>

        </div>
      </div>
    </div>
  )
}
