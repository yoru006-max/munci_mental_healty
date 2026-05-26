'use client'

import { Lock } from 'lucide-react'
import Link from 'next/link'
import { usePin } from '@/hooks/usePin'

export function PinIndicator() {
  const { pinSet, isLoading } = usePin()

  if (isLoading || !pinSet) return null

  return (
    <Link href="/config/security" title="PIN de seguridad activo">
      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors">
        <Lock className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-medium text-primary">Seguro</span>
      </div>
    </Link>
  )
}
