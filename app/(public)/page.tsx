"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, LoaderCircle, Shield, Zap } from "lucide-react"

export default function HomePage() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to Our App
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of productivity with our powerful and intuitive platform.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {isLoading ? (
              <Button disabled>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </Button>
            ) : session ? (
              <>
                <Button asChild>
                  <Link href="/dashboard" className="flex items-center">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/api/auth/signout" className="flex items-center">
                    Sign Out
                  </Link>
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/login" className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Easy to Use',
              description: 'Intuitive interface that makes managing your tasks a breeze.',
              icon: Zap,
            },
            {
              name: 'Secure',
              description: 'Your data is protected with enterprise-grade security.',
              icon: Shield,
            },
            {
              name: 'Always Available',
              description: 'Access your data from anywhere, anytime.',
              icon: Globe,
            },
          ].map((feature) => (
            <div key={feature.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

