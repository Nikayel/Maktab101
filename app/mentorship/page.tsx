'use client'

import { useAuth } from '../../lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Header } from '../../components/Header'

const mentors = [
  { id: 1, name: 'Sarah Johnson', expertise: 'Software Engineering', bio: 'Tech lead with 10 years of experience in web development.' },
  { id: 2, name: 'Amina Ahmadi', expertise: 'Entrepreneurship', bio: 'Founder of a successful tech startup, passionate about empowering women in business.' },
  { id: 3, name: 'Fatima Karimi', expertise: 'Data Science', bio: 'Data scientist working on AI applications in healthcare.' },
]

export default function Mentorship() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find a Mentor</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{mentor.name}</h2>
                <p className="text-purple-600 font-semibold mb-4">{mentor.expertise}</p>
                <p className="text-gray-600 mb-4">{mentor.bio}</p>
                <button className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

