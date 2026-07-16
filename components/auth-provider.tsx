'use client'

import { useState, useEffect, useContext, createContext, ReactNode } from 'react'
import { User, getCurrentUser, isAuthenticated, logout as logoutAuth } from '@/lib/auth/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser())
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    logoutAuth()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
