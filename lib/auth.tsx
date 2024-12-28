'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { SupabaseClient } from '@supabase/supabase-js'
import { User } from './types'
import { useRouter } from 'next/navigation'

type SignupResult = {
  error?: Error;
  data?: any;
};

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role: 'student' | 'tutor', additionalData?: any) => Promise<SignupResult>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({
  children,
  supabaseClient
}: {
  children: React.ReactNode
  supabaseClient: SupabaseClient
}) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id) // Debug log

      if (session?.user) {
        try {
          const { data: userData, error } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (error) {
            console.error('Error fetching user data:', error)
            // If user doesn't exist in users table, create them
            const { error: insertError } = await supabaseClient
              .from('users')
              .insert([
                {
                  id: session.user.id,
                  email: session.user.email,
                  role: session.user.user_metadata.role
                }
              ])
            if (insertError) {
              console.error('Error creating user record:', insertError)
              setUser(null)
              return
            }
            // Fetch the user data again
            const { data: newUserData } = await supabaseClient
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single()
            setUser(newUserData)
          } else {
            setUser(userData)
          }
        } catch (error) {
          console.error('Error in auth state change:', error)
          setUser(null)
        }
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [supabaseClient])

  const login = async (email: string, password: string) => {
    if (!supabaseClient) throw new Error('Supabase client not initialized')
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signup = async (email: string, password: string, role: 'student' | 'tutor', additionalData?: any): Promise<SignupResult> => {
    try {
      if (!supabaseClient) throw new Error('Supabase client not initialized')

      // Debug logs
      console.log('Signup attempt with:', { email, role })

      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { role, ...additionalData }
        }
      })

      if (error) {
        console.error('Supabase auth error:', error) // Log the specific error
        throw error
      }

      if (!data?.user) {
        throw new Error('No user data returned from signup')
      }

      return { data }
    } catch (error: any) {
      console.error('Full signup error:', {
        message: error.message,
        details: error.details,
        stack: error.stack
      })
      return { error }
    }
  }

  const logout = async () => {
    if (!supabaseClient) throw new Error('Supabase client not initialized')
    const { error } = await supabaseClient.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return function AuthenticatedComponent(props: any) {
    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.push('/login')
      }
    }, [user, router])

    if (!user) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

