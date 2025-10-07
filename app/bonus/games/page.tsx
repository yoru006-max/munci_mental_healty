import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Cloud, Puzzle, Sparkles } from "lucide-react"
import Link from "next/link"

export default function GamesPage() {
  const games = [
    {
      icon: Cloud,
      title: "Mueve las Nubes",
      description: "Arrastra las nubes hacia el sol",
      color: "from-chart-1/20 to-primary/10",
    },
    {
      icon: Puzzle,
      title: "Rompecabezas Suave",
      description: "Imágenes tranquilas para armar",
      color: "from-chart-3/20 to-chart-2/10",
    },
    {
      icon: Sparkles,
      title: "Jardín de Estrellas",
      description: "Crea constelaciones de calma",
      color: "from-chart-4/20 to-chart-5/10",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 pt-8 pb-6">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Link href="/bonus">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Juegos Tranquilos</h1>
            <p className="text-sm text-muted-foreground">Distrae tu mente con calma</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        {games.map((game, index) => {
          const Icon = game.icon
          return (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br ${game.color} hover:shadow-lg transition-all cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-background/50">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{game.title}</h3>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                </div>
                <Button size="sm" variant="secondary">
                  Jugar
                </Button>
              </div>
            </Card>
          )
        })}

        <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/5 border-accent/30">
          <p className="text-sm text-balance leading-relaxed text-center text-muted-foreground">
            Estos juegos están diseñados para ser relajantes, no competitivos. No hay puntajes ni presiones.
          </p>
        </Card>
      </div>
    </div>
  )
}
