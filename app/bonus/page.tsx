import { Music, Palette, Gamepad2, Wind, Sparkles, Heart, BookOpen } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function BonusPage() {
  const activities = [
    {
      icon: Music,
      title: "Música Relajante",
      description: "Playlist adaptada a tu estado de ánimo",
      color: "from-chart-2/20 to-chart-2/5",
      iconColor: "text-chart-2",
      href: "/bonus/music",
    },
    {
      icon: Wind,
      title: "Respiración Guiada",
      description: "Ejercicios para calmar la ansiedad",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
      href: "/bonus/breathing",
    },
    {
      icon: Palette,
      title: "Arte Libre",
      description: "Dibuja y expresa tus emociones",
      color: "from-chart-3/20 to-chart-3/5",
      iconColor: "text-chart-3",
      href: "/bonus/art",
    },
    {
      icon: Gamepad2,
      title: "Juegos Tranquilos",
      description: "Distrae tu mente con calma",
      color: "from-chart-4/20 to-chart-4/5",
      iconColor: "text-chart-4",
      href: "/bonus/games",
    },
    {
      icon: Sparkles,
      title: "Retos Suaves",
      description: "Pequeñas metas para hoy",
      color: "from-chart-5/20 to-chart-5/5",
      iconColor: "text-chart-5",
      href: "/bonus/challenges",
    },
    {
      icon: Heart,
      title: "Caja de Recuerdos",
      description: "Guarda momentos positivos",
      color: "from-accent/20 to-accent/5",
      iconColor: "text-accent-foreground",
      href: "/bonus/memories",
    },
    {
      icon: BookOpen,
      title: "Biblioteca",
      description: "Sube y guarda libros de interés",
      color: "from-chart-1/20 to-chart-1/5",
      iconColor: "text-chart-1",
      href: "/bonus/library",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-balance mb-2">Bonus</h1>
          <p className="text-muted-foreground text-sm">Recursos para tu bienestar</p>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <Link key={index} href={activity.href}>
              <Card
                className={`p-6 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br ${activity.color} hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-background/50 ${activity.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
