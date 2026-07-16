'use client'

import { useSessionTimeout } from '@/hooks/useSessionTimeout'
import { ReactNode } from 'react'

export function SessionTimeoutWrapper({ children }: { children: ReactNode }) {
  useSessionTimeout()

  return <>{children}</>
}
