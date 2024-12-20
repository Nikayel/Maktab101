import React, { createContext, useState, useContext, useEffect } from 'react';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

const supabaseUrl = 'https://sqghnwxxxfckqsjffndg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ2hud3h4eGZja3FzamZmbmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Mzc3OTEsImV4cCI6MjA1MDIxMzc5MX0.uwlQUncVGtWGgka_O5XIFr7rsSkEVG4EnKoEfbCjy-A';

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string, fullName: string, role: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabase] = useState<SupabaseClient>(() => createClient(supabaseUrl, supabaseAnonKey));

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [supabase.auth]);

  const signUp = async (email: string, password: string, fullName: string, role: string) => {
    const { user, error } = await supabase.auth.signUp({ 
      email, 
      password,
    });
    if (error) throw error;

    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, full_name: fullName, role, approved: role === 'student' }]);

      if (profileError) throw profileError;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

