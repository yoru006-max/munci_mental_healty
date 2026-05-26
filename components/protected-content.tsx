'use client'

import { useState } from 'react'
import { PinLock } from '@/components/pin-lock'
import { usePin } from '@/hooks/usePin'

interface ProtectedContentProps {
  children: React.ReactNode
  title?: string
  requiresPin?: boolean
}

export function ProtectedContent({ children, title, requiresPin = true }: ProtectedContentProps) {
  const { pinSet, isLoading } = usePin()
  const [unlocked, setUnlocked] = useState(false)

  if (isLoading) {
    return null
  }

  // Si no hay PIN configurado, mostrar contenido sin protección
  if (!pinSet || !requiresPin) {
    return <>{children}</>
  }

  // Si ya está desbloqueado, mostrar contenido
  if (unlocked) {
    return <>{children}</>
  }

  // Si no está desbloqueado, mostrar pantalla de bloqueo
  return <PinLock onUnlock={() => setUnlocked(true)} title={title} />
}
