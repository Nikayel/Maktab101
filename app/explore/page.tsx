'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'
import { useAuth } from '../../lib/auth'
import { CommunityService } from '../../lib/communityService'
import { Community } from '../../lib/types'

export default function Explore() {
  const router = useRouter()
  const { user } = useAuth()
  const [communities, setCommunities] = useState<Community[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (user.role !== 'student') {
      router.push('/dashboard')
    } else {
      fetchPublicCommunities()
    }
  }, [user, router])

  const fetchPublicCommunities = async () => {
    try {
      const publicCommunities = await CommunityService.getPublicCommunities()
      setCommunities(publicCommunities)
    } catch (error) {
      console.error('Error fetching public communities:', error)
    }
  }

  const handleJoin = async (communityId: string) => {
    if (user) {
      try {
        await CommunityService.joinCommunity(user.id, communityId)
        // Refresh the list of communities
        fetchPublicCommunities()
      } catch (error) {
        console.error('Error joining community:', error)
      }
    }
  }

  if (!user || user.role !== 'student') return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore Communities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div key={community.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-2">{community.name}</h2>
              <p className="text-gray-600 mb-4">{community.purpose}</p>
              <p className="text-sm text-gray-500 mb-4">Members: {community.memberCount}/{community.maxCapacity}</p>
              <button
                onClick={() => handleJoin(community.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                disabled={community.memberCount >= community.maxCapacity}
              >
                {community.memberCount >= community.maxCapacity ? 'Full' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

