'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth/auth'

export function ProtectRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login')
    }
  }, [router])

  if (!isAuthenticated()) {
    return <div>Redirigiendo a login...</div>
  }

  return <>{children}</>
}
