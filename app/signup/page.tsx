'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'
import { StudentSignupForm } from '../../components/StudentSignupForm'
import { TutorSignupForm } from '../../components/TutorSignupForm'
import { useAuth } from '../../lib/auth'

export default function SignUp() {
  const router = useRouter()
  const { signup } = useAuth()
  const [userType, setUserType] = useState<'student' | 'tutor' | null>(null)

  const handleStudentSignup = async (email: string, password: string) => {
    try {
      await signup(email, password, 'student')
      router.push('/dashboard')
    } catch (error) {
      console.error('Student signup failed:', error)
    }
  }

  const handleTutorSignup = async (tutorData: {
    email: string
    password: string
    fieldOfStudy: string
    plansToTeach: string
    // Add any other tutor-specific fields here
  }) => {
    try {
      await signup(tutorData.email, tutorData.password, 'tutor', {
        fieldOfStudy: tutorData.fieldOfStudy,
        plansToTeach: tutorData.plansToTeach,
        approvalStatus: 'pending'
      })
      router.push('/tutor-approval')
    } catch (error) {
      console.error('Tutor signup failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {!userType ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up As</h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setUserType('student')}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Student
              </button>
              <button
                onClick={() => setUserType('tutor')}
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Tutor
              </button>
            </div>
          </div>
        ) : userType === 'student' ? (
          <StudentSignupForm onSubmit={handleStudentSignup} />
        ) : (
          <TutorSignupForm onSubmit={handleTutorSignup} />
        )}
      </main>
    </div>
  )
}

