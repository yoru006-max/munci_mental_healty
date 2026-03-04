import { Heart, MessageCircle, Music, Sparkles, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { EmotionSelector } from "@/components/emotion-selector"
import { EmergencyButton } from "@/components/emergency-button"
import { DailyQuote } from "@/components/daily-quote"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl font-bold text-balance mb-2 bg-gradient-to-r from-primary via-accent to-chart-5 bg-clip-text text-transparent">
            Munci
          </h1>
          <p className="text-muted-foreground text-sm">Tu refugio emocional</p>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-6 max-w-lg mx-auto">
        {/* Emergency Button */}
        <EmergencyButton />

        {/* Daily Emotion Check */}
        <Card className="p-6 bg-gradient-to-br from-card to-secondary/30 border-2 border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">¿Cómo te sientes hoy?</h2>
          </div>
          <EmotionSelector />
        </Card>

        {/* Daily Quote */}
        <DailyQuote />

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/bonus/music">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-chart-2/20 to-chart-2/5">
              <Music className="w-8 h-8 text-chart-2 mb-3" />
              <h3 className="font-semibold mb-1">Música</h3>
              <p className="text-xs text-muted-foreground">Sonidos que calman</p>
            </Card>
          </Link>

          <Link href="/diary">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-chart-3/20 to-chart-3/5">
              <MessageCircle className="w-8 h-8 text-chart-3 mb-3" />
              <h3 className="font-semibold mb-1">Diario</h3>
              <p className="text-xs text-muted-foreground">Escribe libremente</p>
            </Card>
          </Link>

          <Link href="/bonus/breathing">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-primary/20 to-primary/5">
              <Sparkles className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Respiración</h3>
              <p className="text-xs text-muted-foreground">Ejercicios guiados</p>
            </Card>
          </Link>

          <Link href="/resources">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-chart-5/20 to-chart-5/5">
              <AlertCircle className="w-8 h-8 text-chart-5 mb-3" />
              <h3 className="font-semibold mb-1">Recursos</h3>
              <p className="text-xs text-muted-foreground">Ayuda profesional</p>
            </Card>
          </Link>
        </div>

        {/* Recommendation of the day */}
        <Card className="p-6 bg-gradient-to-br from-accent/30 to-accent/10 border-accent/30">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-foreground" />
            Recomendación del día
          </h3>
          <p className="text-sm text-balance leading-relaxed">
            Toma 5 minutos para hacer algo que disfrutes, sin presiones. Puede ser escuchar una canción, mirar por la
            ventana, o simplemente respirar.
          </p>
        </Card>
      </div>
    </div>
  )
}
