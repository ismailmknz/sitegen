'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { SupabaseClient, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabaseClient'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signUp: (opts: { email: string; password: string }) => Promise<{ error?: string }>
  signIn: (opts: { email: string; password: string }) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  hasSupabase: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const client = supabase as SupabaseClient | null

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      setLoading(true)
      if (!client) {
        setUser(null)
        setLoading(false)
        return
      }

      const { data } = await client.auth.getUser()
      if (!isMounted) return
      setUser(data.user ?? null)
      setLoading(false)
    }

    void init()

    let subscription: { unsubscribe: () => void } | null = null

    if (client) {
      const res = client.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })
      subscription = res.data.subscription
    }

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  const signUp: AuthContextValue['signUp'] = async ({ email, password }) => {
    if (!client) {
      return { error: 'Supabase non configuré.' }
    }
    const { error } = await client.auth.signUp({ email, password })
    if (error) return { error: error.message }
    return {}
  }

  const signIn: AuthContextValue['signIn'] = async ({ email, password }) => {
    if (!client) {
      return { error: 'Supabase non configuré.' }
    }
    const { error } = await client.auth.signInWithPassword({ email, password })
    if (error) return { error: error.message }
    return {}
  }

  const signOut = async () => {
    if (!client) return
    await client.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, hasSupabase: !!client }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth doit être utilisé à l’intérieur de AuthProvider')
  }
  return ctx
}

