'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'
import { useAuth } from '../../lib/auth'
import { CommunityService } from '../../lib/communityService'

export default function CreateCommunity() {
  const router = useRouter()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [details, setDetails] = useState('')
  const [isPublic, setIsPublic] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user && user.role === 'mentor') {
      try {
        await CommunityService.createCommunity({
          name,
          purpose,
          details,
          isPublic,
          memberCount: 1,
          maxCapacity: 50,
          creatorId: user.id
        })
        router.push('/dashboard')
      } catch (error) {
        console.error('Error creating community:', error)
      }
    }
  }

  if (!user || user.role !== 'mentor') {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create a New Community</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
            <input
              type="text"
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">Public Community</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Community
          </button>
        </form>
      </main>
    </div>
  )
}

