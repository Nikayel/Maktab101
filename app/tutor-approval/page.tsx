'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'
import { useAuth } from '../../lib/auth'

export default function TutorApproval() {
  const router = useRouter()
  const { user } = useAuth()
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (user.role !== 'tutor') {
      router.push('/dashboard')
    } else {
      setApprovalStatus(user.approvalStatus || 'pending')
    }
  }, [user, router])

  if (!user || user.role !== 'tutor') return null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Tutor Approval Status</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <p className="text-xl mb-4">
            Your current approval status is: <strong>{approvalStatus}</strong>
          </p>
          {approvalStatus === 'pending' && (
            <p>
              Your application is currently under review. Please check back later for updates.
            </p>
          )}
          {approvalStatus === 'approved' && (
            <p>
              Congratulations! Your application has been approved. You can now create communities and courses.
            </p>
          )}
          {approvalStatus === 'rejected' && (
            <p>
              We're sorry, but your application has been rejected. If you believe this is an error, please contact our support team.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

