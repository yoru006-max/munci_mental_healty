"use client"

import { useState } from "react"
import { AlertCircle, Phone, MessageSquare, X, Eye, Wind, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export function EmergencyButton() {
  const [showEmergency, setShowEmergency] = useState(false)

  if (showEmergency) {
    return (
      <Card className="p-6 bg-destructive/10 border-destructive/30 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <h3 className="font-semibold text-destructive-foreground">Estoy aqui contigo</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setShowEmergency(false)} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm mb-4 text-balance leading-relaxed">
          Respira conmigo. Inhala... Exhala... Estas a salvo. Este momento pasara.
        </p>

        <div className="space-y-2">
          <Link href="/bonus/breathing" className="block">
            <Button variant="default" className="w-full justify-start gap-2">
              <Wind className="w-4 h-4" />
              Ejercicio de respiracion
            </Button>
          </Link>
          <Link href="/grounding" className="block">
            <Button variant="secondary" className="w-full justify-start gap-2">
              <Eye className="w-4 h-4" />
              Anclaje: 5 cosas que veo
            </Button>
          </Link>
          <Link href="/grounding/touch" className="block">
            <Button
              variant="secondary"
              className="w-full justify-start gap-2"
            >
              <Zap className="w-4 h-4" />
              4 cosas que puedas tocar
            </Button>
          </Link>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-transparent"
            onClick={() => (window.location.href = "tel:")}
          >
            <Phone className="w-4 h-4" />
            Llamar a contacto de confianza
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-transparent"
            onClick={() => (window.location.href = "sms:")}
          >
            <MessageSquare className="w-4 h-4" />
            Enviar mensaje de ayuda
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Button
      onClick={() => setShowEmergency(true)}
      className="w-full h-auto py-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg"
    >
      <AlertCircle className="w-5 h-5 mr-2" />
      <span className="font-semibold">No estoy bien</span>
    </Button>
  )
}
