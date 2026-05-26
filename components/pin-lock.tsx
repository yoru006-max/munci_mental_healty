'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Lock, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { usePin } from '@/hooks/usePin'

interface PinLockProps {
  onUnlock: () => void
  onCancel?: () => void
  title?: string
}

export function PinLock({ onUnlock, onCancel, title }: PinLockProps) {
  const { verifyPin, getRemainingAttemptCount, checkLocked, getLockedTimeRemaining } = usePin()
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [locked, setLocked] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)
  const [showPin, setShowPin] = useState(false)

  useEffect(() => {
    setLocked(checkLocked())
    if (checkLocked()) {
      setRemainingTime(getLockedTimeRemaining())
    }
  }, [checkLocked, getLockedTimeRemaining])

  useEffect(() => {
    if (!locked) return

    const interval = setInterval(() => {
      const remaining = getLockedTimeRemaining()
      if (remaining <= 0) {
        setLocked(false)
        clearInterval(interval)
      } else {
        setRemainingTime(remaining)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [locked, getLockedTimeRemaining])

  const handleSubmit = () => {
    setError('')

    if (!pin) {
      setError('Ingresa tu PIN')
      return
    }

    if (verifyPin(pin)) {
      onUnlock()
    } else {
      setError('PIN incorrecto')
      setPin('')
      const remaining = getRemainingAttemptCount()
      if (remaining === 0) {
        setLocked(true)
        setRemainingTime(getLockedTimeRemaining())
      }
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  if (locked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Card className="w-full max-w-sm p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/20 p-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <h2 className="text-center font-semibold mb-2 text-destructive">Seguridad Activada</h2>
          <p className="text-center text-sm text-muted-foreground mb-4">
            Demasiados intentos fallidos. Intenta de nuevo en:
          </p>
          <div className="text-center text-3xl font-bold text-destructive mb-6 font-mono">
            {formatTime(remainingTime)}
          </div>
          {onCancel && (
            <Button onClick={onCancel} variant="outline" className="w-full">
              Atrás
            </Button>
          )}
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <Card className="w-full max-w-sm p-6">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/20 p-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-center font-semibold mb-2 text-lg">{title || 'Contenido Protegido'}</h2>
        <p className="text-center text-sm text-muted-foreground mb-6">Ingresa tu PIN para continuar</p>

        <div className="mb-6 relative">
          <input
            type={showPin ? 'text' : 'password'}
            inputMode="numeric"
            pattern="\d*"
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '')
              setPin(val)
              setError('')
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
            placeholder="Ingresa PIN"
            className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={8}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">{error}</p>
              <p className="text-xs text-destructive/80 mt-1">
                Intentos restantes: {getRemainingAttemptCount()}
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {onCancel && (
            <Button onClick={onCancel} variant="outline" className="flex-1">
              Cancelar
            </Button>
          )}
          <Button onClick={handleSubmit} className="flex-1">
            Desbloquear
          </Button>
        </div>
      </Card>
    </div>
  )
}
