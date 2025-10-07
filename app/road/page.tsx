"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, Calendar, Heart, Sparkles, Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function RoadPage() {
  // Mock data - in real app this would come from local storage
  const stats = {
    daysActive: 12,
    emotionalCheckins: 28,
    breathingExercises: 15,
    journalEntries: 8,
    challengesCompleted: 6,
  }

  const recentMood = [
    { day: "Lun", mood: 3, color: "bg-chart-1" },
    { day: "Mar", mood: 2, color: "bg-chart-3" },
    { day: "Mié", mood: 4, color: "bg-primary" },
    { day: "Jue", mood: 3, color: "bg-chart-1" },
    { day: "Vie", mood: 4, color: "bg-primary" },
    { day: "Sáb", mood: 3, color: "bg-chart-1" },
    { day: "Dom", mood: 5, color: "bg-chart-4" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-balance mb-2">Tu Proceso</h1>
          <p className="text-muted-foreground text-sm">Espacio privado de autogestión</p>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-6 max-w-lg mx-auto">
        {/* Anchor Phrase */}
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-chart-1/20 border-primary/30">
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Tu frase de anclaje</h3>
              <p className="text-balance leading-relaxed italic">
                "Cada día es una oportunidad para cuidarme. Merezco amor y comprensión."
              </p>
            </div>
          </div>
        </Card>

        {/* Days Active */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Días contigo</h3>
            </div>
            <span className="text-3xl font-bold text-primary">{stats.daysActive}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Has estado usando Munci durante {stats.daysActive} días. Cada día cuenta.
          </p>
        </Card>

        {/* Weekly Mood Chart */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Tu semana emocional</h3>
          </div>

          <div className="flex items-end justify-between gap-2 h-32 mb-2">
            {recentMood.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex items-end justify-center h-full">
                  <div
                    className={`w-full rounded-t-lg ${day.color} transition-all`}
                    style={{ height: `${day.mood * 20}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            No se trata de ser perfecto, sino de estar presente contigo mismo
          </p>
        </Card>

        {/* Activities Progress */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Actividades realizadas</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Registros emocionales</span>
                <span className="text-muted-foreground">{stats.emotionalCheckins}</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Ejercicios de respiración</span>
                <span className="text-muted-foreground">{stats.breathingExercises}</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Entradas en diario</span>
                <span className="text-muted-foreground">{stats.journalEntries}</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Retos completados</span>
                <span className="text-muted-foreground">{stats.challengesCompleted}</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-gradient-to-br from-accent/20 to-chart-2/10">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-accent-foreground" />
            <h3 className="font-semibold">Logros personales</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xl">🌱</div>
              <div>
                <p className="font-medium text-sm">Primer Paso</p>
                <p className="text-xs text-muted-foreground">Registraste tu primera emoción</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
              <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center text-xl">🌸</div>
              <div>
                <p className="font-medium text-sm">Una Semana Contigo</p>
                <p className="text-xs text-muted-foreground">7 días usando Munci</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 opacity-50">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">🌻</div>
              <div>
                <p className="font-medium text-sm">Mes de Cuidado</p>
                <p className="text-xs text-muted-foreground">30 días de autocuidado</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Encouraging Message */}
        <Card className="p-6 bg-gradient-to-br from-chart-5/20 to-chart-3/10 border-chart-5/30">
          <p className="text-sm text-balance leading-relaxed text-center">
            Estás haciendo un trabajo importante al cuidar de ti mismo. Cada pequeño paso es un acto de valentía y amor
            propio.
          </p>
        </Card>
      </div>
    </div>
  )
}
