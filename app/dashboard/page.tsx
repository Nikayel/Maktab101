'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'
import { useAuth, withAuth } from '../../lib/auth'
import { CommunityService } from '../../lib/communityService'
import { Community } from '../../lib/types'

const Dashboard = () => {
  const router = useRouter()
  const { user } = useAuth()
  const [communities, setCommunities] = useState<Community[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      fetchCommunities()
    }
  }, [user, router])

  const fetchCommunities = async () => {
    if (user) {
      try {
        const userCommunities = await CommunityService.getCommunities(user.id)
        setCommunities(userCommunities)
      } catch (error) {
        console.error('Error fetching communities:', error)
      }
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4">My Communities</h2>
            {communities.length > 0 ? (
              <ul>
                {communities.map((community) => (
                  <li key={community.id} className="mb-2">
                    <a href={`/community/${community.id}`} className="text-blue-600 hover:underline">
                      {community.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You are not part of any communities yet.</p>
            )}
          </div>
          {user.role === 'student' && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Explore Communities</h2>
              <a href="/explore" className="text-blue-600 hover:underline">
                Find new communities to join
              </a>
            </div>
          )}
          {user.role === 'tutor' && user.approvalStatus === 'approved' && (
            <>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Create Community</h2>
                <a href="/create-community" className="text-blue-600 hover:underline">
                  Create a new community
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Manage Courses</h2>
                <a href="/manage-courses" className="text-blue-600 hover:underline">
                  Create and manage your courses
                </a>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4">Assign Homework</h2>
                <a href="/assign-homework" className="text-blue-600 hover:underline">
                  Assign homework to your students
                </a>
              </div>
            </>
          )}
          {user.role === 'tutor' && user.approvalStatus !== 'approved' && (
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">Approval Status</h2>
              <p>
                Your tutor account is currently {user.approvalStatus}.
                {user.approvalStatus === 'pending' && ' Please wait for admin approval.'}
              </p>
              <a href="/tutor-approval" className="text-blue-600 hover:underline">
                Check approval status
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default withAuth(Dashboard)

