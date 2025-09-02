'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome back, {user.name || 'User'}!</h2>
        <p className="text-gray-600">This is your personal dashboard where you can manage your account and activities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-900">Your Stats</h3>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Joined</span>
              <span className="font-medium">2 months ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Activities</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-900">Recent Activity</h3>
          <ul className="mt-4 space-y-3">
            <li className="text-sm text-gray-600 border-b pb-2">Updated profile information</li>
            <li className="text-sm text-gray-600 border-b pb-2">Completed onboarding</li>
            <li className="text-sm text-gray-600">Logged in from new device</li>
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-medium text-gray-900">Quick Actions</h3>
          <div className="mt-4 space-y-3">
            <Link 
              href="#" 
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              Edit Profile
            </Link>
            <Link 
              href="#" 
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              Account Settings
            </Link>
            <Link   
              href="#" 
              className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
            >
              View Activity Log
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900">Notifications</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">Mark all as read</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600">!</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Welcome to your new dashboard!</p>
              <p className="text-sm text-gray-500">We've updated our interface. Let us know what you think!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}