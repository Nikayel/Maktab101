'use client'

import { useRouter } from 'next/navigation'
import { Header } from '../../components/Header'
import { AuthForm } from '../../components/AuthForm'
import { useAuth } from '../../lib/auth'

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <AuthForm onSubmit={handleSubmit} formType="login" />
      </main>
    </div>
  )
}

