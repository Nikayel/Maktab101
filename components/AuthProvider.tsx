'use client'

import { createClient } from '@supabase/supabase-js'
import { AuthProvider as BaseAuthProvider } from '../lib/auth'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <BaseAuthProvider supabaseClient={supabase}>{children}</BaseAuthProvider>
} 