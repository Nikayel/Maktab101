'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../lib/auth'
import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'

const forumTopics = [
  { id: 1, title: 'Tips for learning to code', author: 'Zahra', replies: 15, likes: 23, views: 102 },
  { id: 2, title: 'Balancing studies and work', author: 'Maryam', replies: 8, likes: 17, views: 76 },
  { id: 3, title: 'Preparing for job interviews', author: 'Fatima', replies: 12, likes: 31, views: 145 },
  { id: 4, title: 'Networking strategies for introverts', author: 'Soraya', replies: 6, likes: 9, views: 58 },
]

export default function Community() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  const filteredTopics = forumTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
          <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            {filteredTopics.map((topic) => (
              <div key={topic.id} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2 text-purple-600">{topic.title}</h2>
                <p className="text-sm text-gray-600 mb-2">Started by {topic.author}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{topic.replies} replies</span>
                  <span>{topic.likes} likes</span>
                  <span>{topic.views} views</span>
                </div>
                <button className="mt-2 text-purple-600 hover:underline">View Discussion</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

