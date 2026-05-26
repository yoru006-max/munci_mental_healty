'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lock, Shield, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PinSetup } from '@/components/pin-setup'
import { usePin } from '@/hooks/usePin'

export default function SecurityPage() {
  const { pinSet } = usePin()
  const [showPinSetup, setShowPinSetup] = useState(false)

  if (showPinSetup) {
    return (
      <div className="min-h-screen bg-background">
        <header className="px-6 pt-8 pb-6">
          <div className="max-w-lg mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPinSetup(false)}
              className="mb-4 -ml-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
            <h1 className="text-3xl font-bold text-balance mb-2">Seguridad</h1>
            <p className="text-muted-foreground text-sm">Configura tu PIN de protección</p>
          </div>
        </header>

        <div className="px-6 pb-6 max-w-lg mx-auto">
          <PinSetup onCancel={() => setShowPinSetup(false)} onSuccess={() => setShowPinSetup(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <Link href="/config">
            <Button variant="ghost" size="sm" className="mb-4 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Atrás
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-balance mb-2">Privacidad y Seguridad</h1>
          <p className="text-muted-foreground text-sm">Tus datos están seguros</p>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-6 max-w-lg mx-auto">
        {/* Main Security Section */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
          <div className="flex items-start gap-3 mb-4">
            <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-2">Tus datos están seguros</h3>
              <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                Toda tu información se guarda localmente en tu dispositivo. Nada se comparte con terceros. Puedes usar
                Munci de forma anónima y privada.
              </p>
            </div>
          </div>
        </Card>

        {/* PIN Protection Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Protección con PIN</h2>
          </div>

          <Card className="p-6 bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 mt-0.5">
                  {pinSet ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-chart-4" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">
                    {pinSet ? 'PIN Configurado' : 'PIN No Configurado'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {pinSet
                      ? 'Tu PIN está activo y protege funciones sensibles de la app'
                      : 'Crea un PIN para bloquear funciones sensibles'}
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => setShowPinSetup(true)} className="w-full">
              {pinSet ? 'Cambiar PIN' : 'Configurar PIN'}
            </Button>
          </Card>
        </div>

        {/* Protected Features Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Funciones Protegidas</h2>
          </div>

          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Diario Privado</h4>
                  <p className="text-sm text-muted-foreground">
                    Tus registros personales requieren PIN para acceder
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Contactos de Emergencia</h4>
                  <p className="text-sm text-muted-foreground">
                    Los números de emergencia están protegidos
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Historial Emocional</h4>
                  <p className="text-sm text-muted-foreground">
                    Tu análisis emocional personal requiere PIN
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Privacy Tips Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Consejos de Seguridad</h2>
          </div>

          <div className="space-y-3">
            <Card className="p-4 border-border/50">
              <h4 className="font-medium mb-2">🔐 PIN Fuerte</h4>
              <p className="text-sm text-muted-foreground">
                Usa una combinación de números que solo tú conoces. No uses fechas de cumpleaños o
                secuencias obvias.
              </p>
            </Card>

            <Card className="p-4 border-border/50">
              <h4 className="font-medium mb-2">🤐 Privacidad Total</h4>
              <p className="text-sm text-muted-foreground">
                Munci no recopila, almacena ni comparte tus datos personales con terceros. Todo
                permanece en tu dispositivo.
              </p>
            </Card>

            <Card className="p-4 border-border/50">
              <h4 className="font-medium mb-2">🛡️ Intenta Fallidos</h4>
              <p className="text-sm text-muted-foreground">
                Después de 5 intentos fallidos, la app se bloqueará por 15 minutos como medida de
                seguridad.
              </p>
            </Card>

            <Card className="p-4 border-border/50">
              <h4 className="font-medium mb-2">📱 Anónimo</h4>
              <p className="text-sm text-muted-foreground">
                Puedes usar Munci completamente anónimo. No se requiere crear una cuenta.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
