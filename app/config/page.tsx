"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Lock, Bell, Palette, Volume2, Eye, Shield, Moon, Sun } from "lucide-react"

export default function ConfigPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [privateMode, setPrivateMode] = useState(false)

  const settings = [
    {
      icon: darkMode ? Moon : Sun,
      title: "Modo Oscuro",
      description: "Tema visual para la noche",
      value: darkMode,
      onChange: setDarkMode,
    },
    {
      icon: Bell,
      title: "Recordatorios Suaves",
      description: "Notificaciones no invasivas",
      value: notifications,
      onChange: setNotifications,
    },
    {
      icon: Volume2,
      title: "Sonidos Ambiente",
      description: "Música y efectos de sonido",
      value: soundEnabled,
      onChange: setSoundEnabled,
    },
    {
      icon: Eye,
      title: "Modo Privado",
      description: "Oculta contenido sensible",
      value: privateMode,
      onChange: setPrivateMode,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-balance mb-2">Configuración</h1>
          <p className="text-muted-foreground text-sm">Personaliza tu experiencia</p>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-6 max-w-lg mx-auto">
        {/* Privacy Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Privacidad y Seguridad</h2>
          </div>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-1/10 border-primary/20">
            <div className="flex items-start gap-3 mb-4">
              <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Tus datos están seguros</h3>
                <p className="text-sm text-muted-foreground text-balance leading-relaxed">
                  Toda tu información se guarda localmente en tu dispositivo. Nada se comparte con terceros. Puedes usar
                  Munci de forma anónima.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Configurar Bloqueo con PIN
            </Button>
          </Card>
        </div>

        {/* Appearance & Behavior */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Apariencia y Comportamiento</h2>
          </div>

          {settings.map((setting, index) => {
            const Icon = setting.icon
            return (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium mb-0.5">{setting.title}</h3>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <Switch checked={setting.value} onCheckedChange={setting.onChange} />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Data Management */}
        <div className="space-y-3">
          <h2 className="font-semibold">Gestión de Datos</h2>

          <Card className="p-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Exportar mis datos
            </Button>
          </Card>

          <Card className="p-4">
            <Button
              variant="outline"
              className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
            >
              Borrar todos mis datos
            </Button>
          </Card>
        </div>

        {/* About */}
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
          <h3 className="font-semibold mb-2">Sobre Munci</h3>
          <p className="text-sm text-muted-foreground text-balance leading-relaxed mb-3">
            Munci es un refugio emocional creado con amor. No sustituye ayuda profesional, pero está aquí para
            acompañarte en tus días difíciles.
          </p>
          <p className="text-xs text-muted-foreground">Versión 1.0.0</p>
        </Card>
      </div>
    </div>
  )
}
