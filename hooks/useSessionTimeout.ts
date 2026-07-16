'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { updateLastActivity, checkAndLogoutIfExpired } from '@/lib/auth/auth'

export function useSessionTimeout() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // No monitorear en la página de login
    if (pathname?.includes('/auth/login')) {
      return
    }

    // Función para manejar actividad del usuario
    const handleUserActivity = () => {
      updateLastActivity()
    }

    // Eventos que cuentan como actividad
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click']

    // Agregar listeners para cada evento
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity)
    })

    // Verificar sesión cada 30 segundos
    const sessionCheckInterval = setInterval(() => {
      if (checkAndLogoutIfExpired()) {
        router.push('/auth/login')
      }
    }, 30000) // Revisar cada 30 segundos

    // Cleanup
    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity)
      })
      clearInterval(sessionCheckInterval)
    }
  }, [router, pathname])
}
