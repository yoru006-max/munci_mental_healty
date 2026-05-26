'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, Check, Lock, X } from 'lucide-react'
import { usePin } from '@/hooks/usePin'

interface PinSetupProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function PinSetup({ onSuccess, onCancel }: PinSetupProps) {
  const { setPin, removePin, pinSet } = usePin()
  const [step, setStep] = useState<'setup' | 'confirm' | 'success'>('setup')
  const [firstPin, setFirstPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')
  const [showRemove, setShowRemove] = useState(false)

  const handleSetup = () => {
    setError('')

    if (firstPin.length < 4) {
      setError('El PIN debe tener al menos 4 dígitos')
      return
    }

    if (!/^\d+$/.test(firstPin)) {
      setError('El PIN solo debe contener números')
      return
    }

    setStep('confirm')
  }

  const handleConfirm = () => {
    setError('')

    if (firstPin !== confirmPin) {
      setError('Los PINs no coinciden')
      setConfirmPin('')
      return
    }

    if (setPin(firstPin)) {
      setStep('success')
      setTimeout(() => {
        onSuccess?.()
      }, 2000)
    } else {
      setError('Error al guardar el PIN')
    }
  }

  const handleRemovePin = () => {
    removePin()
    setShowRemove(false)
    setStep('setup')
    setFirstPin('')
    setConfirmPin('')
    setError('')
  }

  if (showRemove) {
    return (
      <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2 text-destructive">Eliminar PIN</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Si eliminas el PIN, cualquiera con acceso a tu dispositivo podrá abrir la app sin restricciones.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRemovePin} variant="destructive" size="sm" className="flex-1">
            Eliminar PIN
          </Button>
          <Button onClick={() => setShowRemove(false)} variant="outline" size="sm" className="flex-1">
            Cancelar
          </Button>
        </div>
      </Card>
    )
  }

  if (step === 'success') {
    return (
      <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-green-500/20 p-3">
            <Check className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h3 className="font-semibold mb-2">PIN Configurado</h3>
        <p className="text-sm text-muted-foreground">Tu PIN se ha guardado correctamente</p>
      </Card>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Confirmar PIN</h3>
              <p className="text-sm text-muted-foreground">Ingresa el PIN nuevamente para confirmar</p>
            </div>
          </div>

          <div className="mb-6">
            <input
              type="password"
              inputMode="numeric"
              pattern="\d*"
              value={confirmPin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '')
                setConfirmPin(val)
                setError('')
              }}
              placeholder="Confirmar PIN"
              className="w-full px-4 py-2 text-center text-2xl tracking-widest border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={8}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => setStep('setup')} variant="outline" className="flex-1">
              Atrás
            </Button>
            <Button onClick={handleConfirm} className="flex-1">
              Confirmar
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Crear PIN de Seguridad</h3>
            <p className="text-sm text-muted-foreground">
              {pinSet ? 'Crea un nuevo PIN para reemplazar el existente' : 'Crea un PIN para proteger funciones sensibles'}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="password"
            inputMode="numeric"
            pattern="\d*"
            value={firstPin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '')
              setFirstPin(val)
              setError('')
            }}
            placeholder="Ingresa PIN (4-8 dígitos)"
            className="w-full px-4 py-2 text-center text-2xl tracking-widest border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            maxLength={8}
          />
          <p className="text-xs text-muted-foreground mt-2">
            Usa solo números. Mínimo 4 dígitos.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex gap-2">
          {pinSet && (
            <Button onClick={() => setShowRemove(true)} variant="outline" className="flex-1" size="sm">
              Eliminar
            </Button>
          )}
          <Button onClick={onCancel} variant="outline" className="flex-1">
            Cancelar
          </Button>
          <Button onClick={handleSetup} className="flex-1">
            Siguiente
          </Button>
        </div>
      </Card>
    </div>
  )
}
