import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Play, Music2 } from "lucide-react"
import Link from "next/link"

export default function MusicPage() {
  const playlists = [
    {
      title: "Calma Profunda",
      description: "Sonidos ambientales y naturaleza",
      mood: "Relajación",
      color: "from-primary/20 to-chart-1/10",
    },
    {
      title: "Abrazo Sonoro",
      description: "Melodías suaves y reconfortantes",
      mood: "Consuelo",
      color: "from-chart-2/20 to-accent/10",
    },
    {
      title: "Lluvia Nocturna",
      description: "Sonidos de lluvia para dormir",
      mood: "Sueño",
      color: "from-chart-3/20 to-primary/10",
    },
    {
      title: "Respirar Contigo",
      description: "Música para meditar",
      mood: "Meditación",
      color: "from-chart-4/20 to-chart-2/10",
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
            <h1 className="text-2xl font-bold">Música Relajante</h1>
            <p className="text-sm text-muted-foreground">Sonidos que calman</p>
          </div>
        </div>
      </header>

      <div className="px-6 pb-6 space-y-4 max-w-lg mx-auto">
        {playlists.map((playlist, index) => (
          <Card key={index} className={`p-6 bg-gradient-to-br ${playlist.color}`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-background/50">
                <Music2 className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold mb-1">{playlist.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-background/50 text-muted-foreground">
                      {playlist.mood}
                    </span>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="flex-shrink-0">
                <Play className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
