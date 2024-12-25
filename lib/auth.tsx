'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js'
import { User } from './types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role: 'student' | 'tutor', additionalData?: any) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: SupabaseClient | null = null

if (typeof window !== 'undefined') {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!supabase) {
      console.error('Supabase client not initialized')
      return
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Error fetching user data:', error)
          setUser(null)
        } else {
          setUser(userData as User)
        }
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signup = async (email: string, password: string, role: 'student' | 'tutor', additionalData?: any) => {
    if (!supabase) throw new Error('Supabase client not initialized')
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { role, ...additionalData }
      }
    })
    if (error) throw error

    if (data.user) {
      await supabase.from('users').insert([
        { id: data.user.id, email, role, ...additionalData }
      ])
    }
  }

  const logout = async () => {
    if (!supabase) throw new Error('Supabase client not initialized')
    const { error } = await supabase.auth.signOut()
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

